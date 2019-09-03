export interface Troop {
  name: string;
  hp: number;
  speed: number;
  damage: number;
  range: number;
  hitSpeed: number;
  currentHp: number;
  nextAttack: number;
  isAlive: boolean;
  updateNextAttack(time: number): void;
  receiveAttack(damage: number): void;
}
