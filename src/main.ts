export interface iTroop {
  hp: number;
  damage: number;
  name: string;
  hitSpeed: number;
  currentHp: number;
  nextAttack: number;
  isAlive: boolean;
  updateNextAttack(time: number): void;
  receiveAttack(damage: number): void;
}

export class Troop implements iTroop {
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

  public receiveAttack(damage: number): void {
    this.hp -= damage;
  }

  get isAlive() {
    return this.hp > 0;
  }
}
export class Battle {
  private time: number = 0;

  constructor(private local: iTroop) {}

  public vs(foreign: iTroop): { winner: iTroop; time: number } {
    const winner = this.fight(this.local, foreign);
    return { winner, time: this.time };
  }

  private fight(local: iTroop, foreign: iTroop): iTroop {
    while (local.isAlive && foreign.isAlive) {
      this.checkAttacker(local, foreign);
    }
    return local.isAlive ? local : foreign;
  }

  private checkAttacker(local: iTroop, foreign: iTroop) {
    const isReciprocalAttack = local.nextAttack === foreign.nextAttack;
    if (isReciprocalAttack) {
      this.computeDamage(local, foreign);
      this.computeDamage(foreign, local);
    } else {
      const isLocalAttack = local.nextAttack < foreign.nextAttack;
      isLocalAttack
        ? this.computeDamage(local, foreign)
        : this.computeDamage(foreign, local);
    }
  }

  private computeDamage(attacker: iTroop, defender: iTroop) {
    const timeToNextAttack = attacker.nextAttack;
    defender.receiveAttack(attacker.damage);
    this.time += timeToNextAttack;
    defender.updateNextAttack(timeToNextAttack);
    attacker.updateNextAttack(timeToNextAttack);
    console.log('Local Attack', this.time);
  }
}
