import { Battle } from './battle'
import { BasicTroop } from './troop/basicTroop'
import { Troop } from './troop/troop'
import troops from "../test/factories/troops"
import { checkWinner } from "../test/helpers"

describe('Battle', () => {
  describe('One Card Battle', () => {
    describe('Individual troop', () => {
      let miniPekka: Troop, knight: Troop, musketeer: Troop
      beforeEach(() => {
        miniPekka = new BasicTroop(troops.miniPekka)
        knight = new BasicTroop(troops.knight)
        musketeer = new BasicTroop(troops.musketeer)
      })

      it('Melee vs Melee Battle - Wins First', () => {
        const { winner, time } = new Battle(miniPekka).vs(knight)
        checkWinner(miniPekka.name, 300, winner)
        expect(time).toBe(5.4)
      })

      it('Melee vs Melee Battle - Wins Second', () => {
        const { winner, time } = new Battle(knight).vs(miniPekka)
        checkWinner(miniPekka.name, 300, winner)
        expect(time).toBe(5.4)
      })

      xit('Melee vs Range Battle', () => {
        const { winner, time } = new Battle(knight).vs(musketeer)
        checkWinner(musketeer.name, 190, winner)
        expect(time).toBe(7.7)
      })
    })
  })
})
