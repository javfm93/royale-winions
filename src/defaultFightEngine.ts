import { Surface, Target, Troop } from './troop/troop'
import { round } from "./battle"

export interface FightEngine {
  fightIteration: (local: Troop, foreign: Troop) => number,
  computeDamagePerRange: (local: Troop, foreign: Troop) => number
}

// todo: calculate damage if distance is lower than range
const computeDamagePerRange = (local: Troop, foreign: Troop, distance = local.range): number => {
  const rangeDiff = local.range - foreign.range
  return rangeDiff > 0
    ? executeRangeDamage(local, foreign)
    : executeRangeDamage(foreign, local)
}

const fightIteration = (local: Troop, foreign: Troop): number => {
  if (is(local).notAbleToReach(foreign)) {
    return computeUnreachableDamage(foreign, local)
  }
  if (is(foreign).notAbleToReach(local)) {
    return computeUnreachableDamage(local, foreign)
  }

  return executeDirectConfrontation(local, foreign)
}

const is = (local: Troop) => ({
  notAbleToReach:
      (foreign: Troop) => foreign.surface === Surface.Air && !local.target.includes(Target.Air)
})

// what happens if attacker deal 2 hits but defender die in the first one (time fails)
// TODO reset test till it fails
const executeRangeDamage = (attacker: Troop, defender: Troop): number => {
  const { dealtHits, lastPartialHit } = calculateHitsToArrive(attacker, defender)
  executeRangeHits(attacker, defender, dealtHits)
  attacker.reduceNextAttackTimeBy(lastPartialHit * attacker.hitSpeed)
  return round((dealtHits + lastPartialHit) * attacker.hitSpeed, 2) // todo remove this round
}

const calculateHitsToArrive = (attacker: Troop, defender: Troop) => {
  const rangeToArrive = attacker.range - defender.range
  const timeToStayInRange = rangeToArrive / defender.speed
  const hitsTillDefenderArrives = timeToStayInRange / attacker.hitSpeed
  const completeHitsToArrive = Math.floor(hitsTillDefenderArrives)
  const hitsToDefeat = Math.ceil(defender.hp / attacker.damage)
  const defenderWillDie = completeHitsToArrive > hitsToDefeat
  const dealtHits = defenderWillDie ? hitsToDefeat : completeHitsToArrive
  const lastPartialHit = defenderWillDie ? 0 : hitsTillDefenderArrives - completeHitsToArrive
  console.log(`range damage:
  ${attacker.name} did ${dealtHits * attacker.damage} in ${dealtHits} hits to ${defender.name}
   in ${dealtHits * attacker.hitSpeed}s, ${lastPartialHit * attacker.hitSpeed}s to arrive`)
  return { dealtHits, lastPartialHit }
}

const executeRangeHits = (attacker: Troop, defender: Troop, hitsLeft: number) => {
  if (!hitsLeft) return true
  defender.receiveDamage(attacker.damage)
  return executeRangeHits(attacker, defender, hitsLeft - 1)
}

const computeUnreachableDamage = (attacker: Troop, defender: Troop) => {
  defender.receiveDamage(attacker.damage)
  const timeToNextAttack = attacker.nextAttack
  attacker.reduceNextAttackTimeBy(timeToNextAttack)
  return timeToNextAttack
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
  console.log(`${attacker.name} Attacks, ${defender.name} hp is ${defender.currentHp}`)
  return timeToNextAttack
}

export const defaultFightEngine: FightEngine = { fightIteration, computeDamagePerRange }
