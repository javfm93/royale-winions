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
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('One Card Battle', () => {
    describe('Individual troop', () => {
      let meleeBasicTroops: MeleeBasicTroopsFixtures
      let fightEngineMock: FightEngine
      const timeReturnedPerIteration = 10
      const timeReturnedPerRangeDamage = 10
      const iterations = 3
      const killLocalAfter3Iterations = (local: Troop): number => {
        local.receiveAttack(local.hp / 2 - 1)
        return timeReturnedPerIteration
      }

      beforeEach(() => {
        const winnerMeleeTroop = strongBasicMeleeTroopFactory()
        const looserMeleeTroop = weakBasicMeleeTroopFactory()
        meleeBasicTroops = { winner: winnerMeleeTroop, looser: looserMeleeTroop }
        fightEngineMock = {
          fightIteration: jest.fn().mockImplementation(killLocalAfter3Iterations),
          computeDamagePerRange: jest.fn().mockReturnValue(timeReturnedPerRangeDamage)
        }
      })

      test("call fightIterations until one troop is not alive", () => {
        new Battle(meleeBasicTroops.looser, fightEngineMock).vs(meleeBasicTroops.winner)

        expect(fightEngineMock.fightIteration).toBeCalledTimes(iterations)
      })

      test("return the sum of the time of all the battle phases", () => {
        const { time } = new Battle(meleeBasicTroops.looser, fightEngineMock).vs(meleeBasicTroops.winner)

        const expectedTime = (timeReturnedPerIteration * iterations) + timeReturnedPerRangeDamage
        expect(time).toBe(expectedTime)
      })

      test('return the winner', () => {
        const { winner } = new Battle(meleeBasicTroops.looser, fightEngineMock).vs(meleeBasicTroops.winner)

        expect(winner).toStrictEqual(meleeBasicTroops.winner)
      })

      test('battle applies range damage', () => {
        new Battle(meleeBasicTroops.looser, fightEngineMock).vs(meleeBasicTroops.winner)

        expect(fightEngineMock.computeDamagePerRange).toBeCalled()
      })
    })
  })
})
