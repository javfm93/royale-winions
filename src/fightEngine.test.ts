import { fightEngine } from "./fightEngine"
import { basicTroopFactory } from "../test/factories/troops"

describe("fightEngine", () => {
  describe("Given 2 troops with same hitSpeed", () => {
    test("The time returned is hitSpeed", () => {
      const local = basicTroopFactory({ hitSpeed: 2 })
      const foreign = basicTroopFactory({ hitSpeed: 2 })

      fightEngine.fightIteration(local, foreign)
      const iterationTime = fightEngine.fightIteration(local, foreign)

      expect(iterationTime).toBe(2)
    })
    test("Both troops are damaged", () => {
      const local = basicTroopFactory({ hitSpeed: 2 })
      const foreign = basicTroopFactory({ hitSpeed: 2 })

      fightEngine.fightIteration(local, foreign)

      expect(local.currentHp).toBe(local.hp - foreign.damage)
      expect(foreign.currentHp).toBe(foreign.hp - local.damage)
    })
  })

  describe("Given a troop that is faster than the other", () => {
    test("When faster hits slower troop is damaged", () => {
      const faster = basicTroopFactory({ hitSpeed: 1.5 })
      const slower = basicTroopFactory({ hitSpeed: 2 })

      fightEngine.fightIteration(faster, slower)

      expect(faster.currentHp).toBe(faster.hp)
      expect(slower.currentHp).toBe(slower.hp - faster.damage)
    })

    test("When faster hits slower troop is damaged (reverse)", () => {
      const faster = basicTroopFactory({ hitSpeed: 1.5 })
      const slower = basicTroopFactory({ hitSpeed: 2 })

      fightEngine.fightIteration(slower, faster)

      expect(faster.currentHp).toBe(faster.hp)
      expect(slower.currentHp).toBe(slower.hp - faster.damage)
    })

    test("When we have 2 iterations both hit once", () => {
      const faster = basicTroopFactory({ hitSpeed: 1.5 })
      const slower = basicTroopFactory({ hitSpeed: 2 })

      fightEngine.fightIteration(faster, slower)
      fightEngine.fightIteration(faster, slower)

      expect(faster.currentHp).toBe(faster.hp - slower.damage)
      expect(slower.currentHp).toBe(slower.hp - faster.damage)
    })

    test("it returns the time passed in the iteration", () => {
      const faster = basicTroopFactory({ hitSpeed: 1 })
      const slower = basicTroopFactory({ hitSpeed: 2 })

      const iterationTime = fightEngine.fightIteration(faster, slower)

      expect(iterationTime).toBe(1)
    })

    test("it returns the time passed in the iteration (reverse)", () => {
      const faster = basicTroopFactory({ hitSpeed: 1 })
      const slower = basicTroopFactory({ hitSpeed: 2 })

      const iterationTime = fightEngine.fightIteration(faster, slower)

      expect(iterationTime).toBe(1)
    })

    test("When we are in the second iteration it returns the time left to hit of the other troop", () => {
      const faster = basicTroopFactory({ hitSpeed: 1.5 })
      const slower = basicTroopFactory({ hitSpeed: 2 })

      fightEngine.fightIteration(faster, slower)
      const iterationTime = fightEngine.fightIteration(faster, slower)

      expect(iterationTime).toBe(0.5)
    })

    test("When we are in the second iteration it returns the time left to hit of the other troop (reverse)", () => {
      const faster = basicTroopFactory({ hitSpeed: 1.5 })
      const slower = basicTroopFactory({ hitSpeed: 2 })

      fightEngine.fightIteration(slower, faster)
      const iterationTime = fightEngine.fightIteration(slower, faster)

      expect(iterationTime).toBe(0.5)
    })
  })

  describe("Given a troop which hits twice before the other", () => {
    test("Slower its damaged", () => {
      const faster = basicTroopFactory({ hitSpeed: 0.5 })
      const slower = basicTroopFactory({ hitSpeed: 2 })

      fightEngine.fightIteration(faster, slower)
      fightEngine.fightIteration(faster, slower)

      expect(faster.currentHp).toBe(faster.hp)
      expect(slower.currentHp).toBe(slower.hp - (faster.damage * 2))
    })
  })
})
