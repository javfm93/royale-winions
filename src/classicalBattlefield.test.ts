import { ClassicalBattlefield } from "./classicalBattlefield"
import { battleComponentFactory } from "../test/factories/troops"

describe("classicalBattlefield", () => {
  test("when classicalBattlefield is instantiated, it returns a new instance", () => {
    const classicalBattlefield = new ClassicalBattlefield()

    expect(classicalBattlefield).toBeTruthy()
  })

  test("when you place a couple of troops, you can calculate the distance between them", () => {
    const classicalBattlefield = new ClassicalBattlefield()
    const firstBattleComponent = battleComponentFactory({ position: 0 })
    const secondBattleComponent = battleComponentFactory({ position: 1 })
    classicalBattlefield.place(firstBattleComponent)
    classicalBattlefield.place(secondBattleComponent)

    const distance = classicalBattlefield.calculateDistanceBetween(firstBattleComponent.troop, secondBattleComponent.troop)

    expect(distance).toBe(0)
  })

  test("when you place a two troops in the same place, it throw an error", () => {
    const classicalBattlefield = new ClassicalBattlefield()
    const firstBattleComponent = battleComponentFactory({ position: 0 })
    const secondBattleComponent = battleComponentFactory({ position: 0 })
    classicalBattlefield.place(firstBattleComponent)

    const expectedErrorOnCall = () => classicalBattlefield.place(secondBattleComponent)

    expect(expectedErrorOnCall).toThrow("Place two troops in the same position is not possible")
  })
})
