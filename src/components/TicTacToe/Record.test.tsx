import { render, screen } from '@testing-library/react';
import Record from './Record';

const PLAYERS = { first: 'me', second: 'you' };

describe('<Record />', function () {
  test('Renders with accurate player statistics', () => {
    const onPlayAgainMock = jest.fn();
    render(
      <Record
        onPlayAgain={onPlayAgainMock}
        players={PLAYERS}
        winnings={{
          [PLAYERS.first]: 3,
          [PLAYERS.second]: 2,
          tie: 1,
        }}
      />
    );
    expect(
      screen.getByText(/You have won 3 time\(s\) and lost 2 time\(s\)/i)
    ).toBeInTheDocument();
  });
});
