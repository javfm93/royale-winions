import { fightEngine } from "./fightEngine"
import {
  basicTroopFactory,
  strongBasicGroundMeleeTroopFactory,
  strongBasicGroundRangedTroopFactory,
  weakBasicGroundRangedTroopFactory
} from "../test/factories/troops"
import { calculateDamagePerRange, calculateTimeToArrive } from "../test/helpers"
import * as faker from "faker"
import { Surface, Target } from "./troop/troop"

describe("fightEngine", () => {
  describe("Given 2 troops that are in range [fightIteration]", () => {
    test('it doesnt apply range damage', () => {
      const local = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })
      const foreign = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })

      const timeToApplyRangeDamage = fightEngine.computeDamagePerRange(local, foreign)

      expect(timeToApplyRangeDamage).toBe(0)
      expect(local.currentHp).toBe(local.hp)
      expect(foreign.currentHp).toBe(foreign.hp)
    })

    describe("Given 2 troops with same hitSpeed", () => {
      test("The time returned is hitSpeed", () => {
        const local = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })
        const foreign = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })

        fightEngine.fightIteration(local, foreign)
        const iterationTime = fightEngine.fightIteration(local, foreign)

        expect(iterationTime).toBe(2)
      })
      test("Both troops are damaged", () => {
        const local = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })
        const foreign = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })

        fightEngine.fightIteration(local, foreign)

        expect(local.currentHp).toBe(local.hp - foreign.damage)
        expect(foreign.currentHp).toBe(foreign.hp - local.damage)
      })
    })

    describe("Given a troop that is faster than the other", () => {
      test("When faster hits slower troop is damaged", () => {
        const faster = strongBasicGroundMeleeTroopFactory({ hitSpeed: 1.5 })
        const slower = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })

        fightEngine.fightIteration(faster, slower)

        expect(faster.currentHp).toBe(faster.hp)
        expect(slower.currentHp).toBe(slower.hp - faster.damage)
      })

      test("When faster hits slower troop is damaged (reverse)", () => {
        const faster = strongBasicGroundMeleeTroopFactory({ hitSpeed: 1.5 })
        const slower = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })

        fightEngine.fightIteration(slower, faster)

        expect(faster.currentHp).toBe(faster.hp)
        expect(slower.currentHp).toBe(slower.hp - faster.damage)
      })

      test("When we have 2 iterations both hit once", () => {
        const faster = strongBasicGroundMeleeTroopFactory({ hitSpeed: 1.5 })
        const slower = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })

        fightEngine.fightIteration(faster, slower)
        fightEngine.fightIteration(faster, slower)

        expect(faster.currentHp).toBe(faster.hp - slower.damage)
        expect(slower.currentHp).toBe(slower.hp - faster.damage)
      })

      test("it returns the time passed in the iteration", () => {
        const faster = strongBasicGroundMeleeTroopFactory({ hitSpeed: 1 })
        const slower = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })

        const iterationTime = fightEngine.fightIteration(faster, slower)

        expect(iterationTime).toBe(1)
      })

      test("it returns the time passed in the iteration (reverse)", () => {
        const faster = strongBasicGroundMeleeTroopFactory({ hitSpeed: 1 })
        const slower = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })

        const iterationTime = fightEngine.fightIteration(faster, slower)

        expect(iterationTime).toBe(1)
      })

      test("When we are in the second iteration it returns the time left to hit of the other troop", () => {
        const faster = strongBasicGroundMeleeTroopFactory({ hitSpeed: 1.5 })
        const slower = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })

        fightEngine.fightIteration(faster, slower)
        const iterationTime = fightEngine.fightIteration(faster, slower)

        expect(iterationTime).toBe(0.5)
      })

      test("When we are in the second iteration it returns the time left to hit of the other troop (reverse)", () => {
        const faster = strongBasicGroundMeleeTroopFactory({ hitSpeed: 1.5 })
        const slower = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })

        fightEngine.fightIteration(slower, faster)
        const iterationTime = fightEngine.fightIteration(slower, faster)

        expect(iterationTime).toBe(0.5)
      })
    })

    describe("Given a troop which hits twice before the other", () => {
      test("Slower its damaged", () => {
        const faster = strongBasicGroundMeleeTroopFactory({ hitSpeed: 0.5 })
        const slower = strongBasicGroundMeleeTroopFactory({ hitSpeed: 2 })

        fightEngine.fightIteration(faster, slower)
        fightEngine.fightIteration(faster, slower)

        expect(faster.currentHp).toBe(faster.hp)
        expect(slower.currentHp).toBe(slower.hp - (faster.damage * 2))
      })
    })
  })

  describe("Given 2 troops with different range [computeDamagePerRange]", () => {
    test("Troop with bigger range damage the other until it arrives", () => {
      const ranged = weakBasicGroundRangedTroopFactory({ range: faker.random.number({ min: 2, max: 4 }) })
      const melee = strongBasicGroundMeleeTroopFactory()

      fightEngine.computeDamagePerRange(ranged, melee)

      const expectedHp = melee.hp - calculateDamagePerRange(ranged, melee)
      expect(melee.currentHp).toBe(expectedHp)
    })

    test("Troop with more range damage the other until it arrives (reverse)", () => {
      const ranged = weakBasicGroundRangedTroopFactory({ range: faker.random.number({ min: 2, max: 4 }) })
      const melee = strongBasicGroundMeleeTroopFactory()

      fightEngine.computeDamagePerRange(melee, ranged)

      const expectedHp = melee.hp - calculateDamagePerRange(ranged, melee)
      expect(melee.currentHp).toBe(expectedHp)
    })

    test("it returns the time passed until defender arrives", () => {
      const ranged = weakBasicGroundRangedTroopFactory({ range: faker.random.number({ min: 2, max: 4 }) })
      const melee = strongBasicGroundMeleeTroopFactory()

      const timeToArrive = fightEngine.computeDamagePerRange(ranged, melee)

      expect(timeToArrive).toBe(calculateTimeToArrive(ranged, melee))
    })

    test("it returns the time passed until defender arrives (reverse)", () => {
      const ranged = weakBasicGroundRangedTroopFactory({ range: faker.random.number({ min: 2, max: 4 }) })
      const melee = strongBasicGroundMeleeTroopFactory()

      const timeToArrive = fightEngine.computeDamagePerRange(melee, ranged)

      expect(timeToArrive).toBe(calculateTimeToArrive(ranged, melee))
    })
  })

  describe("Given an air troop versus a ground melee troop", () => {
    test("Ground troop is not able to hit air troop", () => {
      const air = basicTroopFactory({ hitSpeed: 1, surface: Surface.Air, target: [Target.Air, Target.Ground] })
      const melee = strongBasicGroundMeleeTroopFactory({ hitSpeed: 0.5 })

      fightEngine.fightIteration(air, melee)

      expect(melee.currentHp).toBe(melee.hp - air.damage)
      expect(air.currentHp).toBe(air.hp)
    })

    test("Ground troop is not able to hit air troop (reverse)", () => {
      const air = basicTroopFactory({ hitSpeed: 1, surface: Surface.Air, target: [Target.Air, Target.Ground] })
      const melee = strongBasicGroundMeleeTroopFactory({ hitSpeed: 0.5, surface: Surface.Ground })

      fightEngine.fightIteration(melee, air)

      expect(melee.currentHp).toBe(melee.hp - air.damage)
      expect(air.currentHp).toBe(air.hp)
    })

    test("The iteration returns the air attack speed", () => {
      const air = basicTroopFactory({ hitSpeed: 1, surface: Surface.Air, target: [Target.Air, Target.Ground] })
      const melee = strongBasicGroundMeleeTroopFactory({ hitSpeed: 0.5, surface: Surface.Ground })

      const iterationTime = fightEngine.fightIteration(melee, air)

      expect(iterationTime).toBe(air.hitSpeed)
    })
  })

  describe('Given an air troop versus a ground ranged troop', () => {
    test("Ground troop is able to hit air troop", () => {
      const ranged = strongBasicGroundRangedTroopFactory({ hitSpeed: 0.5 })
      const air = basicTroopFactory({ hitSpeed: 1, surface: Surface.Air, target: [Target.Air, Target.Ground] })

      fightEngine.fightIteration(air, ranged)

      expect(air.currentHp).toBe(air.hp - ranged.damage)
    })

    test("Ground troop is not able to hit air troop (reverse)", () => {
      const ranged = strongBasicGroundRangedTroopFactory({ hitSpeed: 0.5 })
      const air = basicTroopFactory({ hitSpeed: 1, surface: Surface.Air, target: [Target.Air, Target.Ground] })

      fightEngine.fightIteration(ranged, air)

      expect(air.currentHp).toBe(air.hp - ranged.damage)
    })

    test("The iteration returns the air attack speed", () => {
      const ranged = strongBasicGroundRangedTroopFactory({ hitSpeed: 0.5 })
      const air = basicTroopFactory({ hitSpeed: 1, surface: Surface.Air, target: [Target.Air, Target.Ground] })

      const iterationTime = fightEngine.fightIteration(ranged, air)

      expect(iterationTime).toBe(ranged.hitSpeed)
    })
  })
})
