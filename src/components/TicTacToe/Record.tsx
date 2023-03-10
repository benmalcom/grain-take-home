import styled from '@emotion/styled/macro';
import React from 'react';
import { Button, Text } from 'components/ui';
import { PlayersType, WinningsType } from './utils/types';

const RecordWrapper = styled.div`
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px 10px;
`;

const InfoText = styled(Text)`
  &:first-of-type {
    margin-top: 30px;
    font-weight: 300;
  }
  &:last-of-type {
    width: 209px;
    font-weight: 300;
    text-transform: initial;
  }
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

type RecordProps = {
  onPlayAgain(): void;
  players: PlayersType;
  winnings: WinningsType;
};

const Record: React.FC<RecordProps> = ({ onPlayAgain, winnings, players }) => {
  const totalWinsAndLosses = Object.entries(winnings)
    .filter(([key]) => key !== 'tie')
    .reduce((acc, [, value]) => acc + value, 0);

  const playerWinCount = winnings[players.first!] || 0;

  return (
    <RecordWrapper>
      <InfoText>
        You have won {playerWinCount} time(s) and lost{' '}
        {totalWinsAndLosses - playerWinCount} time(s)
      </InfoText>
      <Actions>
        <Button onClick={onPlayAgain}>Play Again</Button>
      </Actions>
    </RecordWrapper>
  );
};

export default Record;
