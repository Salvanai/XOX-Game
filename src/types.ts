export type SquareValue = 'X' | 'O' | null;

export enum GameMode {
  SINGLE_PLAYER = 'SINGLE_PLAYER',
  MULTIPLAYER = 'MULTIPLAYER',
}

export interface Player {
  name: string;
  score: number;
}