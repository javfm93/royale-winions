import { Battle, BattleComponent } from './battle'
import { BasicTroop } from './troop/basicTroop'
import { TroopProperties } from './troop/troop'
import troops from "../test/factories/troops"
import { checkWinner } from "../test/helpers"

const createBattleComponentOfTroop = (troop: TroopProperties, position: number) => ({
  troop: new BasicTroop(troop),
  position
})

describe('Battle', () => {
  describe('One Card Battle', () => {
    describe('Individual troop', () => {
      let miniPekka: BattleComponent,
        knight: BattleComponent,
        musketeer: BattleComponent,
        megaMinion: BattleComponent,
        bomber: BattleComponent,
        babyDragon: BattleComponent

      beforeEach(() => {
        miniPekka = createBattleComponentOfTroop(troops.miniPekka, 0)
        knight = createBattleComponentOfTroop(troops.knight, 1)
        musketeer = createBattleComponentOfTroop(troops.musketeer, troops.musketeer.range)
        megaMinion = createBattleComponentOfTroop(troops.megaMinion, 0)
        bomber = createBattleComponentOfTroop(troops.bomber, troops.bomber.range)
        babyDragon = createBattleComponentOfTroop(troops.babyDragon, troops.babyDragon.range)
      })

      it('Melee vs Melee Battle', () => {
        const { winner, time } = new Battle().of(miniPekka).vs(knight)

        checkWinner(miniPekka.troop.name, 300, winner)
        expect(time).toBe(5.4)
      })

      it('Melee vs Range Battle', () => {
        const { winner, time } = new Battle().of(knight).vs(musketeer)

        checkWinner(musketeer.troop.name, 265, winner)
        expect(time).toBe(7.7)
      })

      it('Melee vs Air Battle', () => {
        const { winner, time } = new Battle().of(knight).vs(megaMinion)

        checkWinner(megaMinion.troop.name, megaMinion.troop.hp, winner)
        expect(time).toBe(7.5)
      })

      it('Ranged vs Ranged Battle', () => {
        const { winner, time } = new Battle().of(musketeer).vs(bomber)

        checkWinner(musketeer.troop.name, musketeer.troop.hp, winner)
        expect(time).toBe(2.2)
      })

      it('Ranged vs Air Battle', () => {
        const { winner, time } = new Battle().of(musketeer).vs(megaMinion)
        checkWinner(musketeer.troop.name, musketeer.troop.hp, winner)
        expect(time).toBe(4.4)
      })

      it('Air vs Air Battle', () => {
        const { winner, time } = new Battle().of(babyDragon).vs(megaMinion)
        checkWinner(babyDragon.troop.name, 506, winner)
        expect(time).toBe(6.4)
      })
    })
  })
})
