import { PlayersType, WinningsType } from './types';

type GameData = {
  cells?: string[];
  currentPlayer?: string;
  winnings?: WinningsType;
  players?: PlayersType;
  boardSize?: number;
  gameMode?: string;
  winner?: { player: string };
};
export const saveGameData = (data: GameData): void => {
  try {
    const jsonData = localStorage.getItem('ttt-data');
    if (jsonData) {
      const parsedData = JSON.parse(jsonData);
      localStorage.setItem(
        'ttt-data',
        JSON.stringify({ ...parsedData, ...data })
      );
    } else {
      localStorage.setItem('ttt-data', JSON.stringify(data));
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
};

export const getGameData = (): GameData => {
  let gameData;
  try {
    const jsonData = localStorage.getItem('ttt-data');
    gameData = jsonData ? JSON.parse(jsonData) : null;
  } catch (e) {
    gameData = null;
  }
  return gameData;
};
