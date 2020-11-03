export interface Troop extends TroopActions, TroopProperties, TroopComputedProperties {}

export enum Surface {
  Air = 'Air',
  Ground = "Ground"
}

export interface TroopProperties {
  name: string;
  hp: number;
  speed: number;
  damage: number;
  range: number;
  hitSpeed: number;
  surface: Surface
}

interface TroopComputedProperties {
  nextAttack: number;
  isAlive: boolean;
  currentHp: number
}

interface TroopActions {
  reduceNextAttackTimeBy(time: number): void;
  receiveDamage(damage: number): void;
}

// airTroop
// groundTroop
