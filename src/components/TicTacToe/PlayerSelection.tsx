import cx from 'classnames';
import './PlayerSelection.scss';
import React from 'react';
import { playerIds } from 'components/TicTacToe/gameUtils';
import { Button, InfoText } from 'components/ui';
import { PlayersType } from './types';

type PlayerSelectionProps = {
  selectPlayer(playerId: string): void;
  players: PlayersType;
  matchSecondPlayer(): void;
  isWaitingForOpponent: boolean;
};

const PlayerSelection: React.FC<PlayerSelectionProps> = ({
  selectPlayer,
  players,
  matchSecondPlayer,
  isWaitingForOpponent,
}) => {
  return (
    <div className={cx('PlayerSelection', { waiting: isWaitingForOpponent })}>
      {isWaitingForOpponent ? (
        <InfoText className="waiting-text">
          Waiting to find your opponent…
        </InfoText>
      ) : (
        <>
          <InfoText>Welcome</InfoText>
          <InfoText>Pick your player</InfoText>
        </>
      )}
      <div className="options">
        {Object.values(playerIds).map(id => (
          <div
            key={id}
            className={cx('option-item', { selected: players?.first === id })}
            onClick={() => selectPlayer(id)}
          >
            {id}
          </div>
        ))}
      </div>
      {!isWaitingForOpponent && (
        <Button onClick={matchSecondPlayer} disabled={!players.first}>
          Match me with my opponent
        </Button>
      )}
    </div>
  );
};

export default PlayerSelection;
