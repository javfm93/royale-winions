import { iTroop } from '../../src/main';

export const checkWinner = (name: string, hp: number, winner: iTroop) => {
  expect(winner.name).toBe(name);
  expect(winner.hp).toBe(hp);
};
