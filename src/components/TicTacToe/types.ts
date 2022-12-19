export type PlayerIdsType = {
  X: string;
  O: string;
};
export type PlayersType = {
  first: string;
  second: string;
};

export type WinningsType = {
  [key: string]: number;
};

export type WinnerType = {
  combination: number[];
  player: string;
};

export type BoardStateType = {
  cells: string[];
  currentPlayer?: string;
  winner?: WinnerType;
  gameMode: string;
};

export type GameState = {
  onCellClick(cellIndex: number): void;
  winnings: WinningsType;
  setFirstPlayer(playerId: string): void;
  boardState: BoardStateType;
  players: PlayersType;
  matchSecondPlayer(): void;
  isWaitingForOpponent: boolean;
  onPlayAgain(): void;
  lastWinner: string | null;
  seeRecord(): void;
  onResetGame(): void;
};
