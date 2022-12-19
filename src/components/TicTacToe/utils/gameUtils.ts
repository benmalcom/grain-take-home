import { getWinningCombinations } from './winningCombinations';
import { PlayerIdsType, PlayersType, WinnerType } from '../types';

/*export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [2, 5, 8],
  [2, 4, 6],
  [1, 4, 7],
  [0, 4, 8],
];*/

export const boardSizes: { [key: number]: string } = {
  3: '3x3',
  4: '4x4',
  5: '5x5',
  6: '6x6',
};

export const gameModes: { [key: string]: string } = {
  NOT_STARTED: 'not_started',
  IN_PROGRESS: 'in_progress',
  FINISHED: 'finished',
  RECORD_VIEW: 'record_view',
};

export const playerIds: PlayerIdsType = {
  X: 'X',
  O: 'O',
};

export const getWinnerFromBoardState = (
  cells: string[],
  player: string,
  boardSize: number
): WinnerType | undefined => {
  const WINNING_COMBINATIONS = getWinningCombinations(boardSize);

  let winner;
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const combination = WINNING_COMBINATIONS[i];
    if (combination.every(index => cells[index] === player)) {
      winner = { combination, player };
      break;
    }
  }
  return winner;
};

/**
 * This function attempts to get the best index to choose based on the state of the board,
 * it checks if the computer is about to win or if the human is about to win, then returns the completing index for the win,
 * If this doesn't apply, then a random index is returned from available cells.
 *
 * @param {Array<String>} boardCells - current state of the cells
 * @param {Object} players - current state of the cells
 * @param {Number} boardSize
 */
export const getAICellIndex = (
  boardCells: string[],
  players: PlayersType,
  boardSize: number
): number => {
  const WINNING_COMBINATIONS = getWinningCombinations(boardSize);

  const { first: humanPlayerId, second: aiPlayerId } = players;
  let index;

  //1. BEST CHOICE: Check if the ai or human is about to win and return the last empty index in the combination
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const combination = WINNING_COMBINATIONS[i];

    if (hasVacantIndexes(boardCells, combination)) {
      if (
        getPlayerCellCounts(boardCells, combination, aiPlayerId!) ===
          boardSize - 1 ||
        getPlayerCellCounts(boardCells, combination, humanPlayerId!) ===
          boardSize - 1
      ) {
        const indexes = getVacantIndexes(boardCells, combination);
        index = indexes[0];
        break;
      }
    }
  }

  //2. SECOND BEST CHOICE: Check if the ai is already in a winning combination and fill another cell
  for (let i = 0; i < WINNING_COMBINATIONS.length; i++) {
    const combination = WINNING_COMBINATIONS[i];
    if (hasVacantIndexes(boardCells, combination)) {
      if (
        getPlayerCellCounts(boardCells, combination, aiPlayerId!) ===
        boardSize - 2
      ) {
        const indexes = getVacantIndexes(boardCells, combination);
        if (indexes.length > 1) index = indexes[0];
        break;
      }
    }
  }

  //3. SECOND BEST CHOICE: Get a random index if FIRST CHOICE and SECOND CHOICE fails
  if (typeof index === 'undefined') {
    const emptyCellsIndexes = getEmptyCellIndexes(boardCells);
    const randomIndex = Math.floor(Math.random() * emptyCellsIndexes.length);
    index = emptyCellsIndexes[randomIndex];
  }

  return index;
};

// Get the number of cells already occupied by this player in this combination
const getPlayerCellCounts = (
  boardCells: string[],
  combination: number[],
  playerId: string
) => {
  let count = 0;
  combination.forEach(cellIndex => {
    if (boardCells[cellIndex] === playerId) count++;
  });
  return count;
};

// Get indexes in combination array that has not been filled in board cells
const getVacantIndexes = (boardCells: string[], combination: number[]) =>
  combination.filter(index => !boardCells[index]);

// Check if any of the indexes in combination array are empty in the board cells
const hasVacantIndexes = (boardCells: string[], combination: number[]) =>
  combination.some(index => !boardCells[index]);

// Get the indexes of empty cells in the board cells array
const getEmptyCellIndexes = (boardCells: string[]) => {
  const emptyCellsIndexes: number[] = [];
  boardCells.forEach((cell, index) => {
    if (!cell) emptyCellsIndexes.push(index);
  });
  return emptyCellsIndexes;
};
