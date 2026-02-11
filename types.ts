
export interface Game {
  id: string;
  title: string;
  category: GameCategory;
  url: string;
  thumbnail: string;
  description: string;
  rating: number;
  plays: number;
}

export enum GameCategory {
  ALL = 'All',
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  SPORTS = 'Sports',
  CLASSIC = 'Classic',
  STRATEGY = 'Strategy',
  DRIVING = 'Driving'
}

export type ThemeType = 'dark' | 'light';
