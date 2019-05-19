import { Delays, greeter } from '../src/main';
import troop from './fixtures/troop';

interface Troop {
  hp: number;
  damage: number;
  name: string;
}
class Battle {
  private foreign: Troop;
  constructor(private local: Troop) {}
  public vs(foreign: Troop): Troop {
    this.foreign = foreign;
    return this.fight();
  }
  private fight(): Troop {
    while (this.local.hp > 0) {
      this.foreign.hp -= this.local.damage;
      if (this.foreign.hp < 0) break;
      this.local.hp -= this.foreign.damage;
    }
    return this.local.hp > 0 ? this.local : this.foreign;
  }
}
describe('Troops', () => {
  describe('One Card Battle', () => {
    describe('Individual troop', () => {
      it('Melee Battle - Wins First', () => {
        const result = new Battle(troop.miniPekka).vs(troop.knight);
        expect(result.name).toBe(troop.miniPekka.name);
      });
      it('Melee Battle - Wins Second', () => {
        const result = new Battle(troop.knight).vs(troop.miniPekka);
        expect(result.name).toBe(troop.miniPekka.name);
      });
    });
  });
});
describe('greeter function', () => {
  // Read more about fake timers: http://facebook.github.io/jest/docs/en/timer-mocks.html#content
  jest.useFakeTimers();

  const name: string = 'John';
  let hello: string;

  // Act before assertions
  beforeAll(async () => {
    const p: Promise<string> = greeter(name);
    jest.runOnlyPendingTimers();
    hello = await p;
  });

  // Assert if setTimeout was called properly
  it('delays the greeting by 2 seconds', () => {
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(
      expect.any(Function),
      Delays.Long,
    );
  });

  // Assert greeter result
  it('greets a user with `Hello, {name}` message', () => {
    expect(hello).toBe(`Hello, ${name}`);
  });
});
