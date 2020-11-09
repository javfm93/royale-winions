import { Battle } from './battle'
import { BasicTroop } from './troop/basicTroop'
import { Troop } from './troop/troop'
import troops from "../test/factories/troops"
import { checkWinner } from "../test/helpers"
import { fightEngine } from "./fightEngine"

describe('Battle', () => {
  describe('One Card Battle', () => {
    describe('Individual troop', () => {
      let miniPekka: Troop,
        knight: Troop,
        musketeer: Troop,
        megaMinion: Troop,
        bomber: Troop,
        babyDragon: Troop

      beforeEach(() => {
        miniPekka = new BasicTroop(troops.miniPekka)
        knight = new BasicTroop(troops.knight)
        musketeer = new BasicTroop(troops.musketeer)
        megaMinion = new BasicTroop(troops.megaMinion)
        bomber = new BasicTroop(troops.bomber)
        babyDragon = new BasicTroop(troops.babyDragon)
      })

      it('Melee vs Melee Battle', () => {
        const { winner, time } = new Battle(miniPekka, fightEngine).vs(knight)
        checkWinner(miniPekka.name, 300, winner)
        expect(time).toBe(5.4)
      })

      it('Melee vs Range Battle', () => {
        const { winner, time } = new Battle(knight, fightEngine).vs(musketeer)
        checkWinner(musketeer.name, 265, winner)
        expect(time).toBe(7.7)
      })

      it('Melee vs Air Battle', () => {
        const { winner, time } = new Battle(knight, fightEngine).vs(megaMinion)
        checkWinner(megaMinion.name, megaMinion.hp, winner)
        expect(time).toBe(7.5)
      })

      it('Ranged vs Ranged Battle', () => {
        const { winner, time } = new Battle(musketeer, fightEngine).vs(bomber)
        checkWinner(musketeer.name, musketeer.hp, winner)
        expect(time).toBe(2.2)
      })

      it('Ranged vs Air Battle', () => {
        const { winner, time } = new Battle(musketeer, fightEngine).vs(megaMinion)
        checkWinner(musketeer.name, musketeer.hp, winner)
        expect(time).toBe(4.4)
      })

      it('Air vs Air Battle', () => {
        const { winner, time } = new Battle(babyDragon, fightEngine).vs(megaMinion)
        checkWinner(babyDragon.name, 506, winner)
        expect(time).toBe(6.4)
      })
    })
  })
})
