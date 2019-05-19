import troop from './fixtures/troop';

interface iTroop {
  hp: number;
  damage: number;
  name: string;
  hitSpeed: number;
  currentHp: number;
  nextAttack: number;
  updateNextAttack(time: number): void;
}

class Troop implements iTroop {
  hp: number;
  damage: number;
  name: string;
  hitSpeed: number;
  currentHp: number;
  nextAttack: number;
  // tslint:disable-next-line:typedef
  constructor({ hp, damage, name, hitSpeed }) {
    this.nextAttack = this.hitSpeed = hitSpeed;
    this.currentHp = this.hp = hp;
    this.damage = damage;
    this.name = name;
  }

  public updateNextAttack(time: number): void {
    const nextAttack = parseFloat((this.nextAttack - time).toFixed(1));
    this.nextAttack = nextAttack === 0.0 ? this.hitSpeed : nextAttack;
  }
}
class Battle {
  private foreign: iTroop;
  private time: number = 0;

  constructor(private local: iTroop) {}

  public vs(foreign: iTroop): iTroop {
    this.foreign = foreign;
    return this.fight();
  }

  private fight(): iTroop {
    while (this.local.hp > 0 && this.foreign.hp > 0) {
      const isLocalAttack = this.local.nextAttack < this.foreign.nextAttack;
      if (isLocalAttack) {
        this.foreign.hp -= this.local.damage;
        this.time += this.local.nextAttack;
        this.foreign.updateNextAttack(this.local.nextAttack);
        this.local.updateNextAttack(this.local.nextAttack);
        console.log('Local Attack', this.time);
      } else {
        this.local.hp -= this.foreign.damage;
        this.time += this.foreign.nextAttack;
        this.local.updateNextAttack(this.foreign.nextAttack);
        this.foreign.updateNextAttack(this.foreign.nextAttack);
        console.log('Foreign Attack', this.time);
      }
    }
    return this.local.hp > 0 ? this.local : this.foreign;
  }
}

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
