import styled from '@emotion/styled/macro';
import React, { useEffect, useState } from 'react';
import { Button, Text } from 'components/ui';
import Cell from './Cell';
import { WinnerType } from './utils/types';
import Banner from '../ui/Banner';

type BoardProps = {
  cells: string[];
  onCellClick(cellIndex: number): void;
  winner?: WinnerType;
  onPlayAgain(): void;
  onSeeRecord(): void;
  onResetGame(): void;
  showActionButtons: boolean;
  gameStatusText: string | JSX.Element;
  boardSize: number;
};

const BoardWrapper = styled.div`
  position: relative;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: fit-content;
  height: 100%;
  padding: 20px 10px;
`;
const BoardInner = styled.div<{ boardSize: number }>`
  display: grid;
  grid-template-columns: repeat(${({ boardSize }) => boardSize}, 80px);
  margin: 30px auto;
  grid-gap: 1px;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 15px;
`;

const GameStatusText = styled(Text)`
  margin-top: 50px;
  font-weight: 300;
  text-transform: capitalize;
`;

const Board: React.FC<BoardProps> = ({
  cells,
  onCellClick,
  winner,
  onPlayAgain,
  gameStatusText,
  onSeeRecord,
  showActionButtons,
  boardSize,
  onResetGame,
}) => {
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowBanner(false), 2000);
  }, []);

  return (
    <BoardWrapper>
      <Banner isSlidUp={!showBanner}>Now in game</Banner>
      <GameStatusText>{gameStatusText}</GameStatusText>
      <BoardInner boardSize={boardSize}>
        {cells.map((value, index) => (
          <Cell
            key={index}
            value={value}
            cellIndex={index}
            onClick={onCellClick}
            winner={winner}
            size={boardSize}
          />
        ))}
      </BoardInner>
      <Actions>
        {showActionButtons && (
          <>
            <Button onClick={onPlayAgain}>Play Again</Button>
            <Button onClick={onSeeRecord}>See Record</Button>
            <Button onClick={onResetGame}>Reset Game</Button>
          </>
        )}
      </Actions>
    </BoardWrapper>
  );
};

export default Board;
