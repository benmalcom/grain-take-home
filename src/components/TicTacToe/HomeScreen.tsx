import styled from '@emotion/styled/macro';
import React, { ChangeEvent } from 'react';
import { boardSizes, playerIds } from 'components/TicTacToe/utils/gameUtils';
import { Button, Text } from 'components/ui';
import { PlayersType } from './types';

type PlayerSelectionProps = {
  selectPlayer(playerId: string): void;
  players: PlayersType;
  matchSecondPlayer(): void;
  onSelectBoardSize(size: string): void;
  isWaitingForOpponent?: boolean;
  boardSize: number;
};

const HomeScreenWrapper = styled.div<{ isWaiting?: boolean }>`
  text-align: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 320px;
  height: 530px;
  padding: 20px 10px;
  justify-content: ${({ isWaiting }) =>
    isWaiting ? 'space-around' : 'space-between'};
`;

const WaitingText = styled(Text)`
  text-transform: unset;
  font-weight: 400;
  font-size: 18px;
  width: 210px;
`;
const WelcomeText = styled(Text)`
  font-weight: 400;
`;

const OptionList = styled.div`
  width: 210px;
  display: flex;
  justify-content: space-between;
`;

const OptionListItem = styled.div<{ isSelected?: boolean }>`
  cursor: pointer;
  border-bottom: 5px solid #ffffff;
  width: 60px;
  height: 60px;
  font-family: 'Baskerville', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 48px;
  line-height: 55px;
  color: #201238;
  border-color: ${({ isSelected }) => isSelected && '#5CB85C'};
`;

const PlayerPicker = styled.div`
  display: flex;
  flex-direction: column;
`;

const SizeSelector = styled.select`
  height: 30px;
  border-radius: 3px;
  cursor: pointer;
  outline: none;
`;

const HomeScreen: React.FC<PlayerSelectionProps> = ({
  selectPlayer,
  players,
  matchSecondPlayer,
  isWaitingForOpponent,
  onSelectBoardSize,
  boardSize,
}) => {
  return (
    <HomeScreenWrapper isWaiting={isWaitingForOpponent}>
      {isWaitingForOpponent ? (
        <WaitingText>Waiting to find your opponent…</WaitingText>
      ) : (
        <>
          {' '}
          <WelcomeText>Welcome</WelcomeText>
          <PlayerPicker>
            <Text>Select Board Size</Text>
            <SizeSelector
              value={boardSize}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                onSelectBoardSize(e.target.value)
              }
            >
              {Object.entries(boardSizes).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </SizeSelector>
          </PlayerPicker>
          <PlayerPicker>
            <Text>Pick your player</Text>
            <OptionList>
              {Object.values(playerIds).map(id => (
                <OptionListItem
                  key={id}
                  isSelected={players?.first === id}
                  onClick={() => selectPlayer(id)}
                >
                  {id}
                </OptionListItem>
              ))}
            </OptionList>
          </PlayerPicker>
          <Button onClick={matchSecondPlayer} disabled={!players.first}>
            Match me with my opponent
          </Button>
        </>
      )}
    </HomeScreenWrapper>
  );
};

export default HomeScreen;
