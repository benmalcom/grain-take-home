import { useCallback, useEffect, useState } from 'react';
import usePrevious from 'hooks/usePrevious';
import { getGameData, saveGameData } from './dataStorage';
import {
  gameModes,
  playerIds,
  getWinnerFromBoardState,
  getAICellIndex,
} from './gameUtils';
import { BoardStateType, GameState, PlayersType, WinningsType } from './types';

type UseGameStateProps = {
  initialBoardState: BoardStateType;
  boardSize: number;
};

/**
 * React hook to manage all the state changes in the game
 *
 * @param {UseGameStateProps} initialBoardState - the initial state of the board
 * @param {Number} boardSize
 */
export const useGameState = ({
  initialBoardState,
  boardSize,
}: UseGameStateProps): GameState => {
  const [boardState, setBoardState] =
    useState<BoardStateType>(initialBoardState);
  const [winnings, setWinnings] = useState<WinningsType>(
    () => getGameData()?.winnings || {}
  );
  const [players, setPlayers] = useState<PlayersType>(
    () =>
      getGameData()?.players || {
        first: '',
        second: '',
      }
  );

  const [isWaitingForOpponent, setIsWaitingForOpponent] =
    useState<boolean>(false);

  const initBoard = (boardSize: number) => {
    const cells = Array(boardSize * boardSize).fill('');
    setBoardState(currentBoardState => ({
      ...currentBoardState,
      cells,
    }));
  };

  /*
   *  Save changes to game data state to localStorage
   * */

  useEffect(() => {
    // Save players to localStorage
    saveGameData({ winner: boardState.winner });
  }, [boardState.winner]);

  useEffect(() => {
    // Save players to localStorage
    saveGameData({ players });
  }, [players]);

  useEffect(() => {
    // Save winnings to localStorage
    saveGameData({ winnings });
  }, [winnings]);

  useEffect(() => {
    // Save gameMode to localStorage
    saveGameData({ gameMode: boardState.gameMode });
  }, [boardState.gameMode]);

  useEffect(() => {
    // Save cells to localStorage
    saveGameData({ cells: boardState.cells });
  }, [boardState.cells]);

  useEffect(() => {
    // Save currentPlayer to localStorage
    saveGameData({ currentPlayer: boardState.currentPlayer });
  }, [boardState.currentPlayer]);

  /*
   *  End persistence to to localStorage
   * */

  const previousBoardSize = usePrevious(boardSize);

  useEffect(() => {
    if (
      (!previousBoardSize && boardState) ||
      (previousBoardSize && boardState && previousBoardSize !== boardSize)
    ) {
      if (boardState.gameMode === gameModes.NOT_STARTED) {
        initBoard(boardSize);
        // Save boardSize to localStorage
        saveGameData({ boardSize });
      }
    }
  }, [boardSize]);

  const setFirstPlayer = (playerId: string) =>
    setPlayers(currentPlayers => ({ ...currentPlayers, first: playerId }));

  const previousPlayers = usePrevious(players) as unknown as PlayersType;
  useEffect(() => {
    if (
      (!previousPlayers?.first && players.first) ||
      (previousPlayers?.first &&
        players.first &&
        previousPlayers.first !== players.first)
    ) {
      setBoardState(state => ({ ...state, currentPlayer: players.first }));
    } else if (!previousPlayers?.second && players.second) {
      setBoardState(state => ({ ...state, gameMode: gameModes.IN_PROGRESS }));
    }
    // Save to localStorage
    saveGameData({ players });
  }, [players, previousPlayers]);

  const matchSecondPlayer = () => {
    if (!players.first) return;
    setIsWaitingForOpponent(true);
  };

  const previousIsWaiting = usePrevious(isWaitingForOpponent);
  useEffect(() => {
    if (!previousIsWaiting && isWaitingForOpponent) {
      setTimeout(() => {
        setPlayers(currentState => {
          const second = Object.values(playerIds).filter(
            id => id !== currentState.first
          )[0];
          return {
            ...currentState,
            second,
          };
        });
      }, 500);
    }
  }, [isWaitingForOpponent, previousIsWaiting]);

  const onCellClick = useCallback(
    (cellIndex: number) => {
      if (boardState.winner) return;
      if (boardState.cells[cellIndex]) return;
      setBoardState(state => {
        const cells = [...state.cells];
        cells[cellIndex] = state.currentPlayer!;
        const configUpdate = { cells } as BoardStateType;
        const winner = getWinnerFromBoardState(
          cells,
          state.currentPlayer!,
          boardSize
        );
        if (winner) {
          configUpdate.winner = winner;
          configUpdate.gameMode = gameModes.FINISHED;
        } else {
          // Check if it's a tie and no winner
          if (cells.every(value => !!value)) {
            configUpdate.gameMode = gameModes.FINISHED;
          } else {
            configUpdate.currentPlayer =
              state.currentPlayer === playerIds.O ? playerIds.X : playerIds.O;
          }
        }

        return {
          ...state,
          ...configUpdate,
        };
      });
    },
    [boardState.cells, boardState.winner]
  );

  const previousPlayer = usePrevious(boardState.currentPlayer);
  useEffect(() => {
    if (
      previousPlayer &&
      previousPlayer !== boardState.currentPlayer &&
      boardState.currentPlayer === players.second
    ) {
      const bestIndex = getAICellIndex(boardState.cells, players, boardSize);
      // Simulate a 500ms second thinking time
      setTimeout(() => onCellClick(bestIndex), 500);
    }
  }, [
    boardState.cells,
    boardState.currentPlayer,
    onCellClick,
    players,
    previousPlayer,
  ]);

  const onPlayAgain = () => {
    setBoardState({
      ...initialBoardState,
      cells: Array(boardSize * boardSize).fill(''),
      gameMode: gameModes.IN_PROGRESS,
      currentPlayer: players.first,
    });
  };

  const seeRecord = () =>
    setBoardState(state => ({ ...state, gameMode: gameModes.RECORD_VIEW }));

  const onResetGame = () => {
    setIsWaitingForOpponent(false);
    setPlayers({
      first: '',
      second: '',
    });
    setWinnings({});
    setBoardState({ ...initialBoardState, gameMode: gameModes.NOT_STARTED });
    initBoard(boardSize);
  };

  const previousGameMode = usePrevious(boardState.gameMode);
  useEffect(() => {
    if (
      previousGameMode !== gameModes.FINISHED &&
      boardState.gameMode === gameModes.FINISHED
    ) {
      // Game is finished, let's set winning counts or set tie if no winner
      const player = boardState.winner?.player;

      setWinnings(currentWinnings => {
        const winningsUpdate = {} as WinningsType;
        if (player) {
          winningsUpdate[player] = currentWinnings[player]
            ? currentWinnings[player] + 1
            : 1;
        } else {
          winningsUpdate.tie = currentWinnings.tie
            ? currentWinnings.tie + 1
            : 1;
        }
        return { ...currentWinnings, ...winningsUpdate };
      });
    }
  }, [boardState.gameMode, boardState.winner, previousGameMode]);

  return {
    onCellClick,
    winnings,
    setFirstPlayer,
    boardState,
    players,
    matchSecondPlayer,
    isWaitingForOpponent,
    onPlayAgain,
    seeRecord,
    onResetGame,
  };
};
