import { Troop } from '../../src/troop/troop'
import { round } from "../../src/battle"

interface MeleeBasicTroopsFixtures {
  winner: Troop, looser: Troop
}

export const checkWinner = (name: string, hp: number, winner: Troop): void => {
  expect(winner.name).toBe(name)
  expect(winner.currentHp).toBe(hp)
}

interface expectedFightResults {
  expectedWinnerHp: number, expectedFightTime: number
}

export const expectedFightResults = ({ winner, looser }: MeleeBasicTroopsFixtures): expectedFightResults => {
  const winnerHits = Math.ceil(looser.hp / winner.damage)
  if (winnerHits < 0) {
    return { expectedWinnerHp: winner.hp, expectedFightTime: 0 }
  }
  const expectedFightTime = winnerHits * winner.hitSpeed
  const looserHits = Math.floor(expectedFightTime / looser.hitSpeed)
  const expectedWinnerHp = winner.hp - (looserHits * looser.damage)

  return { expectedWinnerHp, expectedFightTime }
}

export const calculateDamagePerRange = (ranged: Troop, melee: Troop): number => {
  const timeToStayInRange = calculateTimeToArrive(ranged, melee)
  const hitsTillDefenderArrives = Math.floor(timeToStayInRange / ranged.hitSpeed)
  return round(hitsTillDefenderArrives * ranged.damage, 2)
}

export const calculateTimeToArrive = (ranged: Troop, melee: Troop): number => {
  const rangeToArrive = ranged.range - melee.range
  return round(rangeToArrive / melee.speed, 2)
}
