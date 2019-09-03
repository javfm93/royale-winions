import { Troop } from '../../src/troop/troop';

export const checkWinner = (name: string, hp: number, winner: Troop) => {
  expect(winner.name).toBe(name);
  expect(winner.hp).toBe(hp);
};
