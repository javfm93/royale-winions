import { BasicTroop } from "./basicTroop"
import {
  basicMeleeGroundTroopFactory,
  basicTroopPropertiesGenerator,
} from "../../test/factories/troops"

describe('Basic Troop', () => {
  test('Create a troop', () => {
    const basicTroopProperties = basicTroopPropertiesGenerator()
    const basicTroop = new BasicTroop(basicTroopProperties)

    expect(basicTroop).toMatchObject(basicTroopProperties)
  })

  describe('Given a created basic melee troop', () => {
    let basicTroop: BasicTroop

    beforeEach(() => {
      basicTroop = basicMeleeGroundTroopFactory()
    })

    test('when a troop received damage it reduces the current HP', () => {
      const damageDealt = 100
      const initialHp = basicTroop.hp
      basicTroop.receiveDamage(100)

      expect(basicTroop.currentHp).toBe(initialHp - damageDealt)
    })

    test('when a troop less damage than hp it still alive', () => {
      basicTroop.receiveDamage(basicTroop.hp / 2)

      expect(basicTroop.isAlive).toBe(true)
    })

    test('when a troop received the same damage than hp it returns is not alive', () => {
      basicTroop.receiveDamage(basicTroop.hp)

      expect(basicTroop.isAlive).toBe(false)
    })

    test('when a troop received more damage than hp it returns is not alive', () => {
      basicTroop.receiveDamage(basicTroop.hp + 1)

      expect(basicTroop.isAlive).toBe(false)
    })

    test('when time passes, the time to next attack reduces', () => {
      const timePassed = (basicTroop.hitSpeed / 2)

      basicTroop.reduceNextAttackTimeBy(timePassed)

      expect(basicTroop.nextAttack).toBe(basicTroop.hitSpeed - timePassed)
    })

    test('when passes the same time than needed to next attack, next attack is set to hitSpeed', () => {
      basicTroop.reduceNextAttackTimeBy(basicTroop.hitSpeed)

      expect(basicTroop.nextAttack).toBe(basicTroop.hitSpeed)
    })

    test('when passes more time than needed to next attack, next attack is set to hitSpeed', () => {
      basicTroop.reduceNextAttackTimeBy(basicTroop.hitSpeed + 1)

      expect(basicTroop.nextAttack).toBe(basicTroop.hitSpeed)
    })
  })
})
