import { Troop } from './troop/troop'
import { FightEngine } from "./fightEngine"

// time and players in the field
export class Battle {
  private time = 0;

  // eslint-disable-next-line no-useless-constructor
  constructor (private local: Troop, private fightEngine: FightEngine) {}

  public vs (foreign: Troop): { winner: Troop; time: number } {
    const winner = this.fight(this.local, foreign)
    return { winner, time: this.time }
  }

  private fight (local: Troop, foreign: Troop): Troop {
    // this.computeDamagePerRange(local, foreign)
    while (local.isAlive && foreign.isAlive) {
      const iterationTime = this.fightEngine.fightIteration(local, foreign)
      this.time += iterationTime
    }
    return local.isAlive ? local : foreign
  }
}
