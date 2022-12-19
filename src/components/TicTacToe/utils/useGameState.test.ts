// useGameState.test.ts
import { act, renderHook } from '@testing-library/react-hooks';
import { gameModes, playerIds } from './gameUtils';
import { useGameState } from './useGameState';

describe('useGameState', () => {
  it('Should execute functions with outcomes/variables ', () => {
    const { result } = renderHook(() =>
      useGameState({
        initialBoardState: { gameMode: gameModes.NOT_STARTED, cells: [] },
        boardSize: 3,
      })
    );
    expect(result.current.boardState.cells.length).toEqual(9);
    act(() => {
      result.current.setFirstPlayer(playerIds.X);
    });
    expect(result.current.players.first).toEqual(playerIds.X);
    act(() => {
      result.current.matchSecondPlayer();
    });
    expect(result.current.isWaitingForOpponent).toEqual(true);
    act(() => {
      result.current.onCellClick(2);
    });
    expect(result.current.boardState.cells[2]).toEqual(playerIds.X);
  });
});
