import { Troop } from './troop/troop'
import { FightEngine } from "./fightEngine"

// time and players in the field
export function round(value: number, decimals: number): number {
  return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)
}

export class Battle {
  private time = 0;

  // eslint-disable-next-line no-useless-constructor
  constructor (private local: Troop, private fightEngine: FightEngine) {}

  public vs (foreign: Troop): { winner: Troop; time: number } {
    const winner = this.fight(this.local, foreign)
    return { winner, time: round(this.time, 1) }
  }

  private fight (local: Troop, foreign: Troop): Troop {
    const rangeDamageTime = this.fightEngine.computeDamagePerRange(local, foreign)
    this.time += rangeDamageTime
    while (local.isAlive && foreign.isAlive) {
      const iterationTime = this.fightEngine.fightIteration(local, foreign)
      this.time += iterationTime
    }
    return local.isAlive ? local : foreign
  }
}
