import styled from '@emotion/styled/macro';
import React from 'react';
import Record from 'components/TicTacToe/Record';
import Board from './Board';
import HomeScreen from './HomeScreen';
import { useGameState } from './utils/gameState';
import { gameModes } from './utils/gameUtils';

const INITIAL_BOARD_STATE = {
  cells: Array(9).fill(''),
  gameMode: gameModes.NOT_STARTED,
};

const TicTacToeWrapper = styled.div`
  text-align: center;
  margin: 100px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 320px;
  max-width: 324px;
  height: 530px;
  max-height: 600px;
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
  } = useGameState(INITIAL_BOARD_STATE);

  const getGamePlayStatusText = () => {
    const { currentPlayer, winner, gameMode } = boardState;
    let status = `${currentPlayer}'s turn!`;

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

  const getCurrentScreen = () => {
    if (
      boardState.gameMode === gameModes.IN_PROGRESS ||
      boardState.gameMode === gameModes.FINISHED
    ) {
      return (
        <Board
          boardSize={3}
          onSeeRecord={seeRecord}
          gameStatusText={getGamePlayStatusText()}
          cells={boardState.cells}
          onCellClick={onCellClick}
          winner={boardState.winner}
          onPlayAgain={onPlayAgain}
          showActionButtons={boardState.gameMode === gameModes.FINISHED}
        />
      );
    }

    if (boardState.gameMode === gameModes.RECORD_VIEW) {
      return (
        <Record
          gameStatusText={getGamePlayStatusText()}
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
      />
    );
  };

  return <TicTacToeWrapper>{getCurrentScreen()}</TicTacToeWrapper>;
};

export default TicTacToe;
