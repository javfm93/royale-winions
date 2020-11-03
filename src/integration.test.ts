import { Battle, round } from './battle'
import {
  basicTroopFactory,
  strongBasicGroundMeleeTroopFactory, strongBasicGroundRangedTroopFactory,
  // strongBasicRangedTroopFactory,
  weakBasicGroundMeleeTroopFactory,
  // weakBasicRangedTroopFactory
} from "../test/factories/troops"
import { calculateDamagePerRange, checkWinner, expectedFightResults } from "../test/helpers"
import { Troop } from "./troop/troop"
import { fightEngine } from "./fightEngine"

interface BasicTroopsFixtures {
  winner: Troop, looser: Troop
}

describe('Battle', () => {
  describe('One Card Battle', () => {
    describe('Individual troop', () => {
      let meleeBasicTroops: BasicTroopsFixtures
      // let rangedBasicTroops: BasicTroopsFixtures

      beforeEach(() => {
        const strongMeleeTroop = strongBasicGroundMeleeTroopFactory()
        const weakMeleeTroop = weakBasicGroundMeleeTroopFactory()
        meleeBasicTroops = { winner: strongMeleeTroop, looser: weakMeleeTroop }

        // const strongRangedTroop = strongBasicRangedTroopFactory()
        // const weakRangedTroop = weakBasicRangedTroopFactory()
        // rangedBasicTroops = { winner: strongRangedTroop, looser: weakRangedTroop }
      })

      test('Melee vs Melee Battle - Wins First', () => {
        const { winner, time } = new Battle(meleeBasicTroops.winner, fightEngine).vs(meleeBasicTroops.looser)

        const { expectedFightTime, expectedWinnerHp } = expectedFightResults(meleeBasicTroops)
        checkWinner(meleeBasicTroops.winner.name, expectedWinnerHp, winner)
        expect(time).toBe(expectedFightTime)
      })

      test('Melee vs Melee Battle - Wins Second', () => {
        const { winner, time } = new Battle(meleeBasicTroops.looser, fightEngine).vs(meleeBasicTroops.winner)

        const { expectedFightTime, expectedWinnerHp } = expectedFightResults(meleeBasicTroops)
        checkWinner(meleeBasicTroops.winner.name, expectedWinnerHp, winner)
        expect(time).toBe(expectedFightTime)
      })

      test('Range vs Melee Battle - Wins First', () => {
        const ranged = strongBasicGroundRangedTroopFactory({ range: 3 })
        const melee = strongBasicGroundMeleeTroopFactory({ speed: 0.5 })
        const rangeDamage = calculateDamagePerRange(ranged, melee)
        const damagedMelee = basicTroopFactory({ ...melee, hp: melee.hp - rangeDamage })

        const { winner, time } = new Battle(ranged, fightEngine).vs(melee)

        const { expectedFightTime, expectedWinnerHp } = expectedFightResults({ winner: ranged, looser: damagedMelee })
        checkWinner(ranged.name, expectedWinnerHp, winner)
        expect(time).toBe(round(expectedFightTime + (rangeDamage / ranged.damage) * ranged.hitSpeed, 1))
      })
    })
  })
})
