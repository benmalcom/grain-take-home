import styled from '@emotion/styled/macro';
import React, { useState } from 'react';
import Record from 'components/TicTacToe/Record';
import Board from './Board';
import HomeScreen from './HomeScreen';
import { useGameState } from './utils/gameState';
import { gameModes } from './utils/gameUtils';

const INITIAL_BOARD_STATE = {
  gameMode: gameModes.NOT_STARTED,
};

const TicTacToeWrapper = styled.div`
  text-align: center;
  margin: 50px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  height: fit-content;
  background: linear-gradient(
    180deg,
    #627a96 0%,
    #83b5c5 19.47%,
    #8dc7d4 39.07%,
    #93d2dc 82.24%,
    #95d6df 100%
  );
`;

const TicTacToe: React.FC = () => {
  const [boardSize, setBoardSize] = useState<number>(3);
  const {
    onCellClick,
    setFirstPlayer,
    boardState,
    players,
    isWaitingForOpponent,
    matchSecondPlayer,
    onPlayAgain,
    winnings,
    lastWinner,
    seeRecord,
    onResetGame,
  } = useGameState({
    initialBoardState: { ...INITIAL_BOARD_STATE, cells: [] },
    boardSize,
  });

  const getGamePlayStatus = () => {
    const { currentPlayer, winner, gameMode } = boardState;
    let status: string | JSX.Element = (
      <>
        Playing: <strong>{currentPlayer}</strong>
      </>
    );

    if (gameMode === gameModes.FINISHED || gameMode === gameModes.RECORD_VIEW) {
      if (winner) {
        status =
          lastWinner && lastWinner === winner.player
            ? `${winner.player} wins again!`
            : `${winner.player} wins!`;
      } else {
        status = `It's a tie!`;
      }
    }
    return status;
  };

  const onSelectBoardSize = (size: string) => setBoardSize(Number(size));

  const getCurrentScreen = () => {
    if (
      boardState.gameMode === gameModes.IN_PROGRESS ||
      boardState.gameMode === gameModes.FINISHED
    ) {
      return (
        <Board
          boardSize={boardSize}
          onSeeRecord={seeRecord}
          gameStatusText={getGamePlayStatus()}
          cells={boardState.cells}
          onCellClick={onCellClick}
          winner={boardState.winner}
          onPlayAgain={onPlayAgain}
          onResetGame={onResetGame}
          showActionButtons={boardState.gameMode === gameModes.FINISHED}
        />
      );
    }

    if (boardState.gameMode === gameModes.RECORD_VIEW) {
      return (
        <Record
          gameStatusText={getGamePlayStatus()}
          winnings={winnings}
          players={players}
          onPlayAgain={onPlayAgain}
        />
      );
    }
    return (
      <HomeScreen
        matchSecondPlayer={matchSecondPlayer}
        selectPlayer={setFirstPlayer}
        players={players}
        isWaitingForOpponent={isWaitingForOpponent}
        onSelectBoardSize={onSelectBoardSize}
        boardSize={boardSize}
      />
    );
  };

  return <TicTacToeWrapper>{getCurrentScreen()}</TicTacToeWrapper>;
};

export default TicTacToe;
