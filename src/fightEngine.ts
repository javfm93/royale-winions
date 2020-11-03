import { Surface, Troop } from './troop/troop'

export interface FightEngine {
  fightIteration: (local: Troop, foreign: Troop) => number,
  computeDamagePerRange: (local: Troop, foreign: Troop) => number
}

const computeDamagePerRange = (local: Troop, foreign: Troop): number => {
  const rangeDiff = local.range - foreign.range
  return rangeDiff > 0
    ? executeRangeDamage(local, foreign)
    : executeRangeDamage(foreign, local)
}

const is = (local: Troop) => ({ ableToHit: (foreign: Troop) => foreign.surface === Surface.Air && local.surface === Surface.Ground })

const fightIteration = (local: Troop, foreign: Troop): number => {
  return is(local).ableToHit(foreign)
    ? computeUnreachableDamage(foreign, local)
    : is(foreign).ableToHit(local)
      ? computeUnreachableDamage(local, foreign)
      : executeDirectConfrontation(local, foreign)
}

// what happens if attacker deal 2 hits but defender die in the first one (time fails)
const executeRangeDamage = (attacker: Troop, defender: Troop): number => {
  const rangeToArrive = attacker.range - defender.range
  const timeToStayInRange = rangeToArrive / defender.speed
  const hitsTillDefenderArrives = timeToStayInRange / attacker.hitSpeed
  const completeHits = Math.floor(hitsTillDefenderArrives)
  const partialHit = hitsTillDefenderArrives - completeHits
  defender.receiveDamage(completeHits * attacker.damage)
  attacker.reduceNextAttackTimeBy(partialHit)
  console.log(`range difference: ${rangeToArrive}, time needed ${timeToStayInRange}, `)
  console.log(`range damage: ${attacker.name} did ${completeHits * attacker.damage} to ${defender.name}`)
  return defender.isAlive ? timeToStayInRange : completeHits * attacker.hitSpeed
}

const computeUnreachableDamage = (attacker: Troop, defender: Troop) => {
  defender.receiveDamage(attacker.damage)
  return attacker.hitSpeed
}

const executeDirectConfrontation = (local: Troop, foreign: Troop) => {
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
  defender.receiveDamage(attacker.damage)
  defender.reduceNextAttackTimeBy(timeToNextAttack)
  attacker.reduceNextAttackTimeBy(timeToNextAttack)
  // console.log(`${attacker.name} Attacks, ${defender.name} hp is ${defender.currentHp}`)
  return timeToNextAttack
}

export const fightEngine: FightEngine = { fightIteration, computeDamagePerRange }
