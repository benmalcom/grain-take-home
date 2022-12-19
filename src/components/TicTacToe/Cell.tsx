import styled from '@emotion/styled/macro';
import React from 'react';
import { WinnerType } from './types';

type CellProps = {
  onClick(cellIndex: number): void;
  winner?: WinnerType;
  value: string;
  cellIndex: number;
  size: number;
};

const CellWrapper = styled.div<{
  isInvalid?: boolean;
  isWinner?: boolean;
  size: number;
}>`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 5px solid #7e7e7e;
  font-weight: 400;
  border-bottom: none;
  font-family: 'Baskerville', sans-serif;
  font-style: normal;
  font-size: 48px;
  line-height: 55px;
  color: #201238;

  &:nth-of-type(${({ size }) => size}n + 1) {
    border-left: none;
  }
  &:nth-of-type(${({ size }) => size}n + ${({ size }) => size}) {
    border-right: none;
    border-left: none;
  }
  &:nth-of-type(-n + ${({ size }) => size}) {
    border-top: none;
  }
  &:empty {
    cursor: pointer;
  }

  cursor: ${({ isInvalid }) => (isInvalid ? 'not-allowed' : 'default')};
  background-color: ${({ isWinner }) => isWinner && '#5cb85c'};
`;

const Cell: React.FC<CellProps> = ({
  value,
  onClick,
  cellIndex,
  winner,
  size,
}) => {
  return (
    <CellWrapper
      isWinner={!!winner && winner.combination.includes(cellIndex)}
      isInvalid={!!winner && !winner.combination.includes(cellIndex)}
      onClick={() => onClick(cellIndex)}
      size={size}
    >
      {value}
    </CellWrapper>
  );
};

export default Cell;
