export interface Troop extends TroopActions, TroopProperties, TroopComputedProperties {}

export interface TroopProperties {
  name: string;
  hp: number;
  speed: number;
  damage: number;
  range: number;
  hitSpeed: number;
}

interface TroopComputedProperties {
  nextAttack: number;
  isAlive: boolean;
  currentHp: number
}

interface TroopActions {
  updateNextAttack(time: number): void;
  receiveAttack(damage: number): void;
}
