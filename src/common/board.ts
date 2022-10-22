import { Pokemon } from "./pokemon";

export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
}

export const getBoardSize = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.EASY:
      return 4 * 4;
    case Difficulty.MEDIUM:
      return 6 * 6;
    case Difficulty.HARD:
      return 8 * 8;
  }
};

export enum ItemStatus {
  NONE,
  ACTIVE,
  FOUND,
}

export type BoardItem = {
  pokemon: Pokemon;
  status: ItemStatus;
};
