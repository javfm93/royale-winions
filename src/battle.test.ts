import { Battle } from './battle'
import {
  strongBasicMeleeTroopFactory,
  weakBasicMeleeTroopFactory
} from "../test/factories/troops"
import { Troop } from "./troop/troop"
import { FightEngine } from "./fightEngine"

interface MeleeBasicTroopsFixtures {
  winner: Troop, looser: Troop
}

describe('Battle', () => {
  describe('One Card Battle', () => {
    describe('Individual troop', () => {
      let meleeBasicTroops: MeleeBasicTroopsFixtures

      beforeEach(() => {
        const winnerMeleeTroop = strongBasicMeleeTroopFactory()
        const looserMeleeTroop = weakBasicMeleeTroopFactory()
        meleeBasicTroops = { winner: winnerMeleeTroop, looser: looserMeleeTroop }
      })
      const timeReturnedPerIteration = 10
      const iterations = 3
      const killLocalAfter3Iterations = (local: Troop): number => {
        local.receiveAttack(local.hp / 2 - 1)
        return timeReturnedPerIteration
      }

      test("call fightIterations until one troop is not alive", () => {
        const fightEngine: FightEngine = { fightIteration: jest.fn().mockImplementation(killLocalAfter3Iterations) }

        new Battle(meleeBasicTroops.looser, fightEngine).vs(meleeBasicTroops.winner)

        expect(fightEngine.fightIteration).toBeCalledTimes(iterations)
      })

      test("return the sum of the time of all the iterations ", () => {
        const fightEngine: FightEngine = { fightIteration: jest.fn().mockImplementation(killLocalAfter3Iterations) }

        const { time } = new Battle(meleeBasicTroops.looser, fightEngine).vs(meleeBasicTroops.winner)

        expect(time).toBe(timeReturnedPerIteration * iterations)
      })

      test('return the winner', () => {
        const fightEngine: FightEngine = { fightIteration: jest.fn().mockImplementation(killLocalAfter3Iterations) }

        const { winner } = new Battle(meleeBasicTroops.looser, fightEngine).vs(meleeBasicTroops.winner)

        expect(winner).toStrictEqual(meleeBasicTroops.winner)
      })
    })
  })
})
