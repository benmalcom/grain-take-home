import './Record.scss';
import React from 'react';
import { Button, InfoText } from 'components/ui';
import { PlayersType, WinningsType } from './types';

type RecordProps = {
  onPlayAgain(): void;
  players: PlayersType;
  winnings: WinningsType;
  gameStatusText: string;
};

const Record: React.FC<RecordProps> = ({
  onPlayAgain,
  winnings,
  gameStatusText,
  players,
}) => {
  const totalWinsAndLosses = Object.entries(winnings)
    .filter(([key]) => key !== 'tie')
    .reduce((acc, [, value]) => acc + value, 0);

  const playerWinCount = winnings[players.first!] || 0;

  return (
    <div className="Record">
      <InfoText className="player-status">{gameStatusText}</InfoText>
      <InfoText className="player-statistics">
        You have won {playerWinCount} times and lost{' '}
        {totalWinsAndLosses - playerWinCount} times
      </InfoText>
      <div className="actions">
        <Button onClick={onPlayAgain}>Play Again</Button>
      </div>
    </div>
  );
};

export default Record;
