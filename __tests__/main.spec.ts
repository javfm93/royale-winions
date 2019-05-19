import { Troop, Battle } from './../src/main';
import troop from './fixtures/troop';
import { checkWinner } from './helpers';

describe('Troops', () => {
  describe('One Card Battle', () => {
    describe('Individual troop', () => {
      it('Melee Battle - Wins First', () => {
        const miniPekka = new Troop(troop.miniPekka);
        const knight = new Troop(troop.knight);

        const { winner, time } = new Battle(miniPekka).vs(knight);

        checkWinner(miniPekka.name, 300, winner);
        expect(time).toBe(5.4);
      });

      it('Melee Battle - Wins Second', () => {
        const miniPekka = new Troop(troop.miniPekka);
        const knight = new Troop(troop.knight);

        const { winner, time } = new Battle(knight).vs(miniPekka);

        checkWinner(miniPekka.name, 300, winner);
        expect(time).toBe(5.4);
      });
    });
  });
});
