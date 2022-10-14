import { Surface, Target, Troop, TroopProperties } from './troop'

export class BasicTroop implements Troop {
  name: string;
  hp: number;
  damage: number;
  range: number;
  hitSpeed: number;
  currentHp: number;
  nextAttack: number;
  speed: number;
  surface: Surface;
  target: Array<Target>;
  isOnBattle: boolean;

  constructor(props: TroopProperties) {
    this.name = props.name
    this.hp = props.hp
    this.damage = props.damage
    this.hitSpeed = props.hitSpeed
    this.range = props.range
    this.speed = props.speed
    this.surface = props.surface
    this.target = props.target
    this.currentHp = props.hp
    this.nextAttack = props.hitSpeed
    this.isOnBattle = false
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
