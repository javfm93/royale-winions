import { Troop } from "./troop/troop"
import { BattleComponent } from "./battle"

export const linearBattlefield = (): Array<Troop | null> => Array(10).fill(null)

export interface Battlefield {
  place: (battleComponent: BattleComponent) => void,
  calculateDistanceBetween(local: Troop, foreign: Troop): number
}

export class ClassicalBattlefield implements Battlefield {
  constructor (private battlefield: Array<Troop | null> = linearBattlefield()) {}

  public place(battleComponent: BattleComponent): void {
    const { position, troop } = battleComponent
    if (this.battlefield[position]) {
      throw new Error("Place two troops in the same position is not possible")
    }
    this.battlefield[position] = troop
  }

  public calculateDistanceBetween(local: Troop, foreign: Troop): number {
    const localPosition = this.battlefield.indexOf(local)
    const foreignPosition = this.battlefield.indexOf(foreign)
    return Math.abs(localPosition - foreignPosition) - 1
  }
}
