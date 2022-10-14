import { Troop } from './troop/troop'
import { defaultFightEngine, FightEngine } from "./defaultFightEngine"
import { Battlefield, ClassicalBattlefield } from "./classicalBattlefield"

export function round(value: number, decimals: number): number {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)
}

interface BattleResult {
  winner: Troop;
  time: number
}

export interface BattleComponent {
  troop: Troop;
  position: number
}

export class Battle {
  private time = 0;
  private local: Troop
  private foreign: Troop

  constructor (private fightEngine: FightEngine = defaultFightEngine, private battlefield: Battlefield = new ClassicalBattlefield()) {}

  public of (local: BattleComponent): {vs: (foreign: BattleComponent) => BattleResult} {
    this.local = local.troop
    this.battlefield.place(local)

    return { vs: this.vs.bind(this) }
  }

  private vs (foreign: BattleComponent): BattleResult {
    this.foreign = foreign.troop
    this.battlefield.place(foreign)
    const winner = this.fight(this.local, this.foreign)
    return { winner, time: round(this.time, 1) }
  }

  // should they travel a distance to be on range?
  // should they apply range damage
  // fight
  private fight (local: Troop, foreign: Troop): Troop {
    const distanceToEncounter = this.battlefield.calculateDistanceBetween(local, foreign)
    const timeToEncounter = distanceToEncounter / (local.speed + foreign.speed)
    this.time += timeToEncounter
    console.log("Time to Encounter: ", timeToEncounter)
    const rangeDamageTime = this.fightEngine.computeDamagePerRange(local, foreign)
    this.time += rangeDamageTime

    while (local.isAlive && foreign.isAlive) {
      const iterationTime = this.fightEngine.fightIteration(local, foreign)
      this.time += iterationTime
      console.log("iteration time check:", this.time)
    }
    return local.isAlive ? local : foreign
  }
}
