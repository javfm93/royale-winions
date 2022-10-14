import { Battle, BattleComponent, round } from './battle'
import {
  strongBasicGroundMeleeTroopFactory,
  weakBasicGroundMeleeTroopFactory
} from "../test/factories/troops"
import { Troop } from "./troop/troop"
import { FightEngine } from "./defaultFightEngine"
import { Battlefield } from "./classicalBattlefield"

interface MeleeBasicTroopsFixtures {
  winner: BattleComponent, looser: BattleComponent
}

describe('Battle', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('One Card Battle', () => {
    describe('Individual troop', () => {
      let meleeBasicTroops: MeleeBasicTroopsFixtures
      let fightEngineMock: FightEngine
      let battleFieldMock: Battlefield
      const timeReturnedPerIteration = 10
      const iterations = 3
      const timeReturnedPerIterations = timeReturnedPerIteration * iterations
      const timeReturnedPerRangeDamage = 10
      const distanceReturnedBetweenTroops = 2
      const killLocalAfter3Iterations = (_: Troop, foreign: Troop): number => {
        foreign.receiveDamage(foreign.hp / 2 - 1)
        return timeReturnedPerIteration
      }

      beforeEach(() => {
        const winnerMeleeTroop = strongBasicGroundMeleeTroopFactory()
        const looserMeleeTroop = weakBasicGroundMeleeTroopFactory()
        meleeBasicTroops = { winner: { troop: winnerMeleeTroop, position: 0 }, looser: { troop: looserMeleeTroop, position: 2 } }
        fightEngineMock = {
          fightIteration: jest.fn().mockImplementation(killLocalAfter3Iterations),
          computeDamagePerRange: jest.fn().mockReturnValue(timeReturnedPerRangeDamage)
        }
        battleFieldMock = {
          calculateDistanceBetween: jest.fn().mockReturnValue(distanceReturnedBetweenTroops),
          place: jest.fn()
        }
      })

      test("place all the battleComponents", () => {
        new Battle(fightEngineMock, battleFieldMock).of(meleeBasicTroops.winner).vs(meleeBasicTroops.looser)

        expect(battleFieldMock.place).toBeCalledWith(meleeBasicTroops.winner)
        expect(battleFieldMock.place).toBeCalledWith(meleeBasicTroops.looser)
      })

      test("call fightIterations until one troop is not alive", () => {
        new Battle(fightEngineMock, battleFieldMock).of(meleeBasicTroops.winner).vs(meleeBasicTroops.looser)

        expect(fightEngineMock.fightIteration).toBeCalledTimes(iterations)
      })

      test("return the sum of the time of all the battle phases", () => {
        const { winner, looser } = meleeBasicTroops

        const { time } = new Battle(fightEngineMock, battleFieldMock).of(winner).vs(looser)

        const timeToEncounter = distanceReturnedBetweenTroops / (winner.troop.speed + looser.troop.speed)
        const expectedTime = timeReturnedPerIterations + timeReturnedPerRangeDamage + timeToEncounter
        expect(time).toBe(round(expectedTime, 1))
      })

      test('return the winner', () => {
        const { winner } = new Battle(fightEngineMock, battleFieldMock).of(meleeBasicTroops.winner).vs(meleeBasicTroops.looser)

        expect(winner).toStrictEqual(meleeBasicTroops.winner.troop)
      })

      test('battle applies range damage', () => {
        new Battle(fightEngineMock, battleFieldMock).of(meleeBasicTroops.winner).vs(meleeBasicTroops.looser)

        expect(fightEngineMock.computeDamagePerRange).toBeCalled()
      })
    })
  })
})
