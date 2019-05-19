import { Troop, Battle } from './../src/main';
import troop from './fixtures/troop';

describe('Troops', () => {
  describe('One Card Battle', () => {
    describe('Individual troop', () => {
      it('Melee Battle - Wins First', () => {
        const miniPekka = new Troop(troop.miniPekka);
        const knight = new Troop(troop.knight);

        const result = new Battle(miniPekka).vs(knight);

        expect(result.name).toBe(miniPekka.name);
      });
      it('Melee Battle - Wins Second', () => {
        const miniPekka = new Troop(troop.miniPekka);
        const knight = new Troop(troop.knight);

        const result = new Battle(knight).vs(miniPekka);

        expect(result.name).toBe(troop.miniPekka.name);
      });
    });
  });
});
