export interface Troop extends TroopActions, TroopProperties, TroopComputedProperties {}

export enum Surface {
  Air = 'Air',
  Ground = "Ground"
}

export enum Target {
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
  surface: Surface;
  target: Array<Target>
}

interface TroopComputedProperties {
  nextAttack: number;
  isAlive: boolean;
  currentHp: number;
  isOnBattle: boolean
}

interface TroopActions {
  reduceNextAttackTimeBy(time: number): void;
  receiveDamage(damage: number): void;
}
