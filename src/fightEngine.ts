import { Troop } from './troop/troop'

export interface FightEngine {
  fightIteration: (local: Troop, foreign: Troop) => number
}
// compute damage

const fightIteration = (local: Troop, foreign: Troop): number => {
  const isReciprocalAttack = local.nextAttack === foreign.nextAttack
  return isReciprocalAttack
    ? computeReciprocalAttack(local, foreign)
    : computeOneWayAttack(local, foreign)
}

const computeReciprocalAttack = (local: Troop, foreign: Troop): number => {
  computeDamage(local, foreign)
  return computeDamage(foreign, local)
}

const computeOneWayAttack = (local: Troop, foreign: Troop): number => {
  const isLocalAttack = local.nextAttack < foreign.nextAttack
  return isLocalAttack
    ? computeDamage(local, foreign)
    : computeDamage(foreign, local)
}

const computeDamage = (attacker: Troop, defender: Troop): number => {
  const timeToNextAttack = attacker.nextAttack
  defender.receiveAttack(attacker.damage)
  defender.updateNextAttack(timeToNextAttack)
  attacker.updateNextAttack(timeToNextAttack)
  console.log(`${attacker.name} Attacks, ${defender.name} hp is ${defender.currentHp}`)
  return timeToNextAttack
}

export const fightEngine = { fightIteration }

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
