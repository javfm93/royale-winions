import { Troop } from './troop/troop';

export class Battle {
  private time: number = 0;

  constructor(private local: Troop) {}

  public vs(foreign: Troop): { winner: Troop; time: number } {
    const winner = this.fight(this.local, foreign);
    return { winner, time: this.time };
  }

  private fight(local: Troop, foreign: Troop): Troop {
    this.computeDamagePerRange(local, foreign);
    while (local.isAlive && foreign.isAlive) this.checkAttacker(local, foreign);
    return local.isAlive ? local : foreign;
  }

  private computeDamagePerRange(local: Troop, foreign: Troop) {
    const rangeDiff = local.range - foreign.range;
    rangeDiff > 0
      ? this.execRangeDamage(local, foreign)
      : this.execRangeDamage(foreign, local);
  }

  private execRangeDamage(attacker: Troop, defender: Troop) {
    const rangeToArrive = attacker.range - defender.range;
    const timeToStayInRange = rangeToArrive / defender.speed;
    defender.updateNextAttack(-timeToStayInRange);
  }

  private checkAttacker(local: Troop, foreign: Troop) {
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

  private computeDamage(attacker: Troop, defender: Troop) {
    const timeToNextAttack = attacker.nextAttack;
    defender.receiveAttack(attacker.damage);
    this.time += timeToNextAttack;
    defender.updateNextAttack(timeToNextAttack);
    attacker.updateNextAttack(timeToNextAttack);
    console.log('Local Attack', this.time);
  }
}
