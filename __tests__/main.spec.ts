import { Troop, Battle, iTroop } from './../src/main';
import troop from './fixtures/troop';
import { checkWinner } from './helpers';

describe('Troops', () => {
  describe('One Card Battle', () => {
    describe('Individual troop', () => {
      let miniPekka: iTroop, knight: iTroop, musketeer: iTroop;
      beforeEach(() => {
        miniPekka = new Troop(troop.miniPekka);
        knight = new Troop(troop.knight);
        musketeer = new Troop(troop.musketeer);
      });
      it('Melee vs Melee Battle - Wins First', () => {
        const { winner, time } = new Battle(miniPekka).vs(knight);
        checkWinner(miniPekka.name, 300, winner);
        expect(time).toBe(5.4);
      });

      it('Melee vs Melee Battle - Wins Second', () => {
        const { winner, time } = new Battle(knight).vs(miniPekka);
        checkWinner(miniPekka.name, 300, winner);
        expect(time).toBe(5.4);
      });

      it('Melee vs Range Battle', () => {
        const { winner, time } = new Battle(knight).vs(musketeer);
        checkWinner(musketeer.name, 190, winner);
        expect(time).toBe(7.7);
      });
    });
  });
});
