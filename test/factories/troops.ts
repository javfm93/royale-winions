import { BasicTroop } from "../../src/troop/basicTroop"
import * as faker from "faker"
import { Surface, Troop, TroopProperties } from "../../src/troop/troop"

enum HP {
  MAX = 2000,
  MIN_STRONG = 1500,
  MAX_WEAK = 1000,
  MIN = 200
}

enum DAMAGE {
  MAX = 1000,
  MIN_STRONG = 800,
  MAX_WEAK = 300,
  MIN = 10
}

enum HIT_SPEED {
  MAX = 2,
  MIN = 1
}

export const basicTroopPropertiesGenerator = (): TroopProperties => ({
  name: faker.name.jobType(),
  hp: faker.random.number({ min: HP.MIN, max: HP.MAX }),
  damage: faker.random.number({ min: DAMAGE.MAX, max: DAMAGE.MIN }),
  hitSpeed: faker.random.number({ min: HIT_SPEED.MIN, max: HIT_SPEED.MAX, precision: 0.1 }),
  range: faker.random.number(9),
  speed: faker.random.number({ min: 0.875, max: 1.5, precision: 0.1 }),
  surface: faker.random.arrayElement(Object.values(Surface))
})

export const basicTroopFactory = (props: Partial<TroopProperties> = {}): Troop => {
  const defaultProps = basicTroopPropertiesGenerator()
  return new BasicTroop({ ...defaultProps, ...props })
}

export const basicMeleeGroundTroopFactory = (props: Partial<TroopProperties> = {}): Troop =>
  basicTroopFactory({ ...props, range: 1, surface: Surface.Ground })

export const strongBasicGroundMeleeTroopFactory = (props: Partial<TroopProperties> = {}): Troop => {
  const strongProps: Partial<TroopProperties> = {
    hp: faker.random.number({ min: HP.MIN_STRONG, max: HP.MAX }),
    damage: faker.random.number({ min: HP.MIN_STRONG, max: HP.MAX }),
  }

  return basicMeleeGroundTroopFactory({ ...props, ...strongProps })
}

export const weakBasicGroundMeleeTroopFactory = (props: Partial<TroopProperties> = {}): Troop => {
  const strongProps: Partial<TroopProperties> = {
    hp: faker.random.number({ min: HP.MIN, max: HP.MAX_WEAK }),
    damage: faker.random.number({ min: HP.MIN, max: HP.MAX_WEAK }),
  }

  return basicMeleeGroundTroopFactory({ ...props, ...strongProps })
}

export const basicGroundRangedTroopFactory = (props: Partial<TroopProperties> = {}): Troop => {
  if (props.range <= 1) throw Error("Not a ranged troop")
  const range = faker.random.number({ min: 2, max: 9 })
  return basicTroopFactory({ range, ...props, surface: Surface.Ground })
}

export const strongBasicGroundRangedTroopFactory = (props: Partial<TroopProperties> = {}): Troop => {
  const strongProps: Partial<TroopProperties> = {
    hp: faker.random.number({ min: HP.MIN_STRONG, max: HP.MAX }),
    damage: faker.random.number({ min: HP.MIN_STRONG, max: HP.MAX }),
  }

  return basicGroundRangedTroopFactory({ ...props, ...strongProps })
}

export const weakBasicGroundRangedTroopFactory = (props: Partial<TroopProperties> = {}): Troop => {
  const strongProps: Partial<TroopProperties> = {
    hp: faker.random.number({ min: HP.MIN, max: HP.MAX_WEAK }),
    damage: faker.random.number({ min: HP.MIN, max: HP.MAX_WEAK }),
  }

  return basicGroundRangedTroopFactory({ ...props, ...strongProps })
}

export default {
  knight: {
    name: 'knight',
    cost: 3,
    type: 'Troop',
    rarity: 'Common',
    hp: 660,
    damage: 75,
    radius: 1,
    hitSpeed: 1.1,
    damagePerSecond: 68,
    surface: 'Ground',
    target: 'Ground',
    range: 1,
    speed: 0.875,
    deployTime: 1,
    count: 1,
  },
  miniPekka: {
    name: 'miniPekka',
    cost: 4,
    type: 'Troop',
    rarity: 'Rare',
    hp: 600,
    damage: 325,
    radius: 1,
    hitSpeed: 1.8,
    damagePerSecond: 180,
    surface: 'Ground',
    target: 'Ground',
    range: 1,
    speed: 0.625,
    deployTime: 1,
    count: 1,
  },
  megaMinion: {
    name: 'megaMinion',
    cost: 3,
    type: 'Troop',
    rarity: 'Rare',
    hp: 395,
    damage: 147,
    radius: 1,
    hitSpeed: 1.5,
    damagePerSecond: 98,
    surface: 'Air',
    target: 'All',
    range: 2,
    speed: 0.875,
    deployTime: 1,
    count: 1,
  },
  musketeer: {
    name: 'musketeer',
    cost: 4,
    type: 'Troop',
    rarity: 'Rare',
    hp: 340,
    damage: 100,
    radius: 1,
    hitSpeed: 1.1,
    damagePerSecond: 90,
    surface: 'Ground',
    target: 'All',
    range: 6,
    speed: 0.875,
    deployTime: 1,
    count: 1,
  },
  bomber: {
    name: 'bomber',
    cost: 3,
    type: 'Troop',
    rarity: 'Common',
    hp: 147,
    damage: 128,
    radius: 3,
    hitSpeed: 1.9,
    damagePerSecond: 67,
    surface: 'Ground',
    target: 'Ground',
    range: 4.5,
    speed: 0.875,
    deployTime: 1,
    count: 1,
  },
  babyDragon: {
    name: 'babyDragon',
    cost: 4,
    type: 'Troop',
    rarity: 'Epic',
    hp: 800,
    damage: 100,
    radius: 3,
    hitSpeed: 1.6,
    damagePerSecond: 62,
    surface: 'Air',
    target: 'All',
    range: 3.5,
    speed: 0.625,
    deployTime: 1,
    count: 1,
  },
  skeletons: {
    name: 'skeletons',
    cost: 1,
    type: 'Troop',
    rarity: 'Common',
    hp: 32,
    damage: 32,
    radius: 1,
    hitSpeed: 1,
    damagePerSecond: 32,
    surface: 'Ground',
    target: 'Ground',
    range: 1,
    speed: 0.625,
    deployTime: 1,
    count: 4,
  },
  goblins: {
    name: 'goblins',
    cost: 2,
    type: 'Troop',
    rarity: 'Common',
    hp: 80,
    damage: 50,
    radius: 1,
    hitSpeed: 1.1,
    damagePerSecond: 45,
    surface: 'Ground',
    target: 'Ground',
    range: 1,
    speed: 0.375,
    deployTime: 1,
    count: 3,
  },
  minionHorde: {
    name: 'minionHorde',
    cost: 5,
    type: 'Troop',
    rarity: 'Common',
    hp: 90,
    damage: 40,
    radius: 1,
    hitSpeed: 1,
    damagePerSecond: 40,
    surface: 'Air',
    target: 'All',
    range: 2,
    speed: 0.625,
    deployTime: 1,
    count: 6,
  },
  threeMusketeers: {
    name: 'threeMusketeers',
    cost: 9,
    type: 'Troop',
    rarity: 'Rare',
    hp: 340,
    damage: 100,
    radius: 1,
    hitSpeed: 1.1,
    damagePerSecond: 90,
    surface: 'Ground',
    target: 'All',
    range: 6,
    speed: 0.875,
    deployTime: 1,
    count: 3,
  },
  barbarians: {
    name: 'barbarians',
    cost: 5,
    type: 'Troop',
    rarity: 'Common',
    hp: 300,
    damage: 75,
    radius: 1,
    hitSpeed: 1.5,
    damagePerSecond: 50,
    surface: 'Ground',
    target: 'Ground',
    range: 1,
    speed: 0.875,
    deployTime: 1,
    count: 4,
  },
}
