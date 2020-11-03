import { Surface, Troop } from './troop'

export class BasicTroop implements Troop {
  name: string;
  hp: number;
  damage: number;
  range: number;
  hitSpeed: number;
  currentHp: number;
  nextAttack: number;
  speed: number;
  surface: Surface

  constructor({ hp, damage, name, hitSpeed, range, speed, surface }) {
    this.name = name
    this.currentHp = this.hp = hp
    this.damage = damage
    this.nextAttack = this.hitSpeed = hitSpeed
    this.range = range
    this.speed = speed
    this.surface = surface
  }

  public reduceNextAttackTimeBy(time: number): void {
    const nextAttack = this.nextAttack - time
    this.nextAttack = nextAttack <= 0 ? this.hitSpeed : nextAttack
  }

  public receiveDamage(damage: number): void {
    this.currentHp -= damage
  }

  get isAlive(): boolean {
    return this.currentHp > 0
  }
}
