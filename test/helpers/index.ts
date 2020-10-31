import { Troop } from '../../src/troop/troop'
import { MeleeBasicTroopsFixtures } from "../../src/battle.test"

export const checkWinner = (name: string, hp: number, winner: Troop): void => {
  expect(winner.name).toBe(name)
  expect(winner.currentHp).toBe(hp)
}

interface expectedFightResults {
  expectedWinnerHp: number, expectedFightTime: number
}

export const expectedFightResults = ({ winner, looser }: MeleeBasicTroopsFixtures): expectedFightResults => {
  const winnerHits = Math.ceil(looser.hp / winner.damage)
  const expectedFightTime = winnerHits * winner.hitSpeed
  const looserHits = Math.floor(expectedFightTime / looser.hitSpeed)
  const expectedWinnerHp = winner.hp - (looserHits * looser.damage)

  return { expectedWinnerHp, expectedFightTime }
}
