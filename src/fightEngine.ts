import { Troop } from './troop/troop'

export interface FightEngine {
  fightIteration: (local: Troop, foreign: Troop) => number,
  computeDamagePerRange: (local: Troop, foreign: Troop) => number
}

const computeDamagePerRange = (local: Troop, foreign: Troop): number => {
  const rangeDiff = local.range - foreign.range
  return rangeDiff > 0
    ? execRangeDamage(local, foreign)
    : execRangeDamage(foreign, local)
}

const fightIteration = (local: Troop, foreign: Troop): number => {
  const isReciprocalAttack = local.nextAttack === foreign.nextAttack
  return isReciprocalAttack
    ? computeReciprocalAttack(local, foreign)
    : computeOneWayAttack(local, foreign)
}

// what happens if attacker deal 2 hits but defender die in the first one (time fails)
const execRangeDamage = (attacker: Troop, defender: Troop): number => {
  const rangeToArrive = attacker.range - defender.range
  const timeToStayInRange = rangeToArrive / defender.speed
  const hitsTillDefenderArrives = timeToStayInRange / attacker.hitSpeed
  const completeHits = Math.floor(hitsTillDefenderArrives)
  const partialHit = hitsTillDefenderArrives - completeHits
  defender.receiveAttack(completeHits * attacker.damage)
  attacker.updateNextAttack(partialHit)
  console.log(`range difference: ${rangeToArrive}, time needed ${timeToStayInRange}, `)
  console.log(`range damage: ${attacker.name} did ${completeHits * attacker.damage} to ${defender.name}`)
  return defender.isAlive ? timeToStayInRange : completeHits * attacker.hitSpeed
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
  // console.log(`${attacker.name} Attacks, ${defender.name} hp is ${defender.currentHp}`)
  return timeToNextAttack
}

export const fightEngine: FightEngine = { fightIteration, computeDamagePerRange }
