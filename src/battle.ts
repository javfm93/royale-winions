import { Troop } from './troop/troop'

export class Battle {
  private time = 0;

  // eslint-disable-next-line no-useless-constructor
  constructor (private local: Troop) {}

  public vs (foreign: Troop): { winner: Troop; time: number } {
    const winner = this.fight(this.local, foreign)
    return { winner, time: this.time }
  }

  private fight (local: Troop, foreign: Troop): Troop {
    // this.computeDamagePerRange(local, foreign)
    while (local.isAlive && foreign.isAlive) this.fightIteration(local, foreign)
    return local.isAlive ? local : foreign
  }

  // private computeDamagePerRange (local: Troop, foreign: Troop) {
  //   const rangeDiff = local.range - foreign.range
  //   rangeDiff > 0
  //     ? this.execRangeDamage(local, foreign)
  //     : this.execRangeDamage(foreign, local)
  // }
  //
  // private execRangeDamage (attacker: Troop, defender: Troop) {
  //   const rangeToArrive = attacker.range - defender.range
  //   const timeToStayInRange = rangeToArrive / defender.speed
  //   defender.updateNextAttack(-timeToStayInRange)
  // }

  private fightIteration (local: Troop, foreign: Troop) {
    const isReciprocalAttack = local.nextAttack === foreign.nextAttack
    isReciprocalAttack
      ? this.computeReciprocalAttack(local, foreign)
      : this.computeOneWayAttack(local, foreign)
  }

  private computeReciprocalAttack (local: Troop, foreign: Troop) {
    this.time += local.nextAttack
    this.computeDamage(local, foreign)
    this.computeDamage(foreign, local)
  }

  private computeOneWayAttack (local: Troop, foreign: Troop) {
    const isLocalAttack = local.nextAttack < foreign.nextAttack
    if (isLocalAttack) {
      this.time += local.nextAttack
      this.computeDamage(local, foreign)
    } else {
      this.time += foreign.nextAttack
      this.computeDamage(foreign, local)
    }
  }

  private computeDamage (attacker: Troop, defender: Troop) {
    const timeToNextAttack = attacker.nextAttack
    defender.receiveAttack(attacker.damage)
    defender.updateNextAttack(timeToNextAttack)
    attacker.updateNextAttack(timeToNextAttack)
    console.log(`${attacker.name} Attacks, ${defender.name} hp is ${defender.currentHp}`, this.time)
  }
}
