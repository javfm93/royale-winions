import { Battle } from './battle'
import {
  strongBasicMeleeTroopFactory,
  weakBasicMeleeTroopFactory
} from "../test/factories/troops"
import { checkWinner, expectedFightResults } from "../test/helpers"
import { Troop } from "./troop/troop"
import { fightEngine } from "./fightEngine"

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

      it('Melee vs Melee Battle - Wins First', () => {
        const { winner, time } = new Battle(meleeBasicTroops.winner, fightEngine).vs(meleeBasicTroops.looser)

        const { expectedFightTime, expectedWinnerHp } = expectedFightResults(meleeBasicTroops)
        checkWinner(meleeBasicTroops.winner.name, expectedWinnerHp, winner)
        expect(time).toBe(expectedFightTime)
      })

      it('Melee vs Melee Battle - Wins Second', () => {
        const { winner, time } = new Battle(meleeBasicTroops.looser, fightEngine).vs(meleeBasicTroops.winner)

        const { expectedFightTime, expectedWinnerHp } = expectedFightResults(meleeBasicTroops)
        checkWinner(meleeBasicTroops.winner.name, expectedWinnerHp, winner)
        expect(time).toBe(expectedFightTime)
      })

      // it('Melee vs Range Battle', () => {
      //   const { winner, time } = new Battle(knight).vs(musketeer)
      //   checkWinner(musketeer.name, 190, winner)
      //   expect(time).toBe(7.7)
      // })
    })
  })
})
