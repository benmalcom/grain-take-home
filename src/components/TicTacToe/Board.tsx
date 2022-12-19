import cx from 'classnames';
import './Board.scss';
import React, { useEffect, useState } from 'react';
import { Button, InfoText } from 'components/ui';
import { WinnerType } from './types';

type BoardProps = {
  cells: string[];
  onCellClick(cellIndex: number): void;
  winner?: WinnerType;
  onPlayAgain(): void;
  onSeeRecord(): void;
  showActionButtons: boolean;
  gameStatusText: string;
};

const Board: React.FC<BoardProps> = ({
  cells,
  onCellClick,
  winner,
  onPlayAgain,
  gameStatusText,
  onSeeRecord,
  showActionButtons,
}) => {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowBanner(false), 2000);
  }, []);

  return (
    <div className="Board">
      <div
        className={cx('banner', {
          'slide-up': !showBanner,
        })}
      >
        Now in game
      </div>
      <InfoText className="player-status">{gameStatusText}</InfoText>
      <div className="board-inner">
        {cells.map((value, index) => (
          <Cell
            key={index}
            value={value}
            cellIndex={index}
            onClick={onCellClick}
            winner={winner}
          />
        ))}
      </div>
      <div className="actions">
        {showActionButtons && (
          <>
            <Button onClick={onPlayAgain}>Play Again</Button>
            <Button onClick={onSeeRecord}>See Record</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Board;

type CellProps = {
  onClick(cellIndex: number): void;
  winner?: WinnerType;
  value: string;
  cellIndex: number;
};

const Cell: React.FC<CellProps> = ({ value, onClick, cellIndex, winner }) => {
  return (
    <div
      className={cx('Cell', {
        winner: !!winner && winner.combination.includes(cellIndex),
        invalid: !!winner && !winner.combination.includes(cellIndex),
      })}
      onClick={() => onClick(cellIndex)}
    >
      {value}
    </div>
  );
};
