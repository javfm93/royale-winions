import { Battle, round } from './battle'
import {
  basicGroundRangedTroopFactory,
  basicTroopFactory,
  strongBasicGroundMeleeTroopFactory,
  weakBasicGroundMeleeTroopFactory,
} from "../test/factories/troops"
import { calculateDamagePerRange, checkWinner, expectedFightResults } from "../test/helpers"
import { Surface, Target, Troop } from "./troop/troop"
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

      test.skip('Range vs Melee Battle - Wins First', () => {
        const ranged = basicGroundRangedTroopFactory({ range: 2, hp: 10000 })
        const melee = strongBasicGroundMeleeTroopFactory({ speed: 1 })
        const rangeDamage = calculateDamagePerRange(ranged, melee)
        const damagedMelee = basicTroopFactory({ ...melee, hp: melee.hp - rangeDamage })

        const { winner, time } = new Battle(ranged, fightEngine).vs(melee)

        const expectedMeleeTimeToReachRanged = (rangeDamage / ranged.damage) * ranged.hitSpeed
        const { expectedFightTime, expectedWinnerHp } = expectedFightResults({ winner: ranged, looser: damagedMelee })
        checkWinner(ranged.name, expectedWinnerHp, winner)
        expect(time).toBe(round(expectedFightTime + expectedMeleeTimeToReachRanged, 1))
      })

      test('Melee vs Air Battle', () => {
        const air = basicTroopFactory({ surface: Surface.Air, target: [Target.Ground, Target.Air], range: 9 })
        const melee = strongBasicGroundMeleeTroopFactory({ speed: 0.5 })

        const { winner, time } = new Battle(air, fightEngine).vs(melee)

        const expectedTime = round(Math.ceil(melee.hp / air.damage) * air.hitSpeed, 1)
        checkWinner(air.name, air.hp, winner)
        expect(time).toBe(expectedTime)
      })
    })
  })
})
