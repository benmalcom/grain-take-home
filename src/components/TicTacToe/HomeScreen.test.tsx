import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { playerIds } from 'components/TicTacToe/utils/gameUtils';
import HomeScreen from './HomeScreen';

const PLAYERS = { first: 'me', second: 'you' };

describe('<HomeScreen />', function () {
  test('Renders with instructions', () => {
    const selectPlayerMock = jest.fn();
    const selectBoardSizeMock = jest.fn();
    const matchSecondPlayerMock = jest.fn();
    render(
      <HomeScreen
        players={PLAYERS}
        selectPlayer={selectPlayerMock}
        matchSecondPlayer={matchSecondPlayerMock}
        boardSize={3}
        onSelectBoardSize={selectBoardSizeMock}
      />
    );
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Pick your player/i)).toBeInTheDocument();
    expect(screen.getByText(playerIds.O)).toBeInTheDocument();
    expect(screen.getByText(playerIds.X)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Match me with my opponent' })
    ).toBeInTheDocument();
  });

  test('Checks if playerId is selected', () => {
    const selectPlayerMock = jest.fn();
    const matchSecondPlayerMock = jest.fn();
    const selectBoardSizeMock = jest.fn();

    render(
      <HomeScreen
        players={PLAYERS}
        selectPlayer={selectPlayerMock}
        matchSecondPlayer={matchSecondPlayerMock}
        boardSize={3}
        onSelectBoardSize={selectBoardSizeMock}
      />
    );
    const playerO = screen.getByText(playerIds.O);
    userEvent.click(playerO);
    expect(selectPlayerMock).toHaveBeenCalled();
  });
  test('Renders with waiting for opponent', () => {
    const selectPlayerMock = jest.fn();
    const matchSecondPlayerMock = jest.fn();
    const selectBoardSizeMock = jest.fn();

    render(
      <HomeScreen
        players={PLAYERS}
        selectPlayer={selectPlayerMock}
        matchSecondPlayer={matchSecondPlayerMock}
        isWaitingForOpponent={true}
        boardSize={3}
        onSelectBoardSize={selectBoardSizeMock}
      />
    );
    expect(
      screen.getByText(/Waiting to find your opponent…/i)
    ).toBeInTheDocument();
  });
});
