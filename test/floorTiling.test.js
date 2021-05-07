'use strict'

const Floor = require('../src/floorTiling.js')

describe('Floor', () => {
  describe('when initiated with a square tile the same size as the floor', () => {
    let floor = new Floor(10, 10, 10, 10);
    test('calculateTileCount() is 1', () => {
      expect(floor.calculateTileCount()).toBe(1)
    })
    test('calculatePercentageWaste() is 0', () => {
      expect(floor.calculatePercentageWaste()).toBe(0)
    })
    test('calculateRotatedTileCount() is 1', () => {
      expect(floor.calculateRotatedTileCount()).toBe(1)
    })
  })
  describe('when initiated with tile length & width which divide the floor length & width', () => {
    let floor = new Floor(80, 30, 20, 10);
    test('calculateTileCount() is the number of tiles that fit into the space', () => {
      expect(floor.calculateTileCount()).toBe(12)
    })
    test('calculatePercentageWaste() is 0', () => {
      expect(floor.calculatePercentageWaste()).toBe(0)
    })
  })
  describe('when initiated with a length that does not fit perfectly & width which does', () => {
    let floor = new Floor(85, 45, 30, 3);
    test('calculateTileCount() is the number of tiles needed to cover the width and more than cover the length', () => {
      expect(floor.calculateTileCount()).toBe(45)
    })
    test('calculatePercentageWaste() is the area of wasted tiles as proportion of floor to nearest whole number', () => {
      expect(floor.calculatePercentageWaste()).toBe(6)
    })
  })
  describe('when initiated with a width that does not fit perfectly & length which does', () => {
    let floor = new Floor(45, 85, 3, 30);
    test('calculateTileCount() is the number of tiles needed to cover the length and more than cover the width', () => {
      expect(floor.calculateTileCount()).toBe(45)
    })
    test('percentage waste is the area of tiles wasted as proportion of floor to nearest whole number', () => {
      expect(floor.calculatePercentageWaste()).toBe(6)
    })
  })
  describe('when initiated with a width & length that do not fit perfectly', () => {
    let floor = new Floor(89, 35, 15, 12);
    test('calculateTileCount() is the number of tiles needed to more than cover the length and width', () => {
      expect(floor.calculateTileCount()).toBe(18)
    })
    test('percentage waste is the area of tiles wasted as proportion of floor to nearest whole number', () => {
      expect(floor.calculatePercentageWaste()).toBe(4)
    })
  })
  describe('when one tile very nearly fills the space so there is a lot of waste', () => {
    let floor = new Floor(20, 20, 19, 19);
    test('calculateTileCount() is number of tiles needed to more than cover the length and width', () => {
      expect(floor.calculateTileCount()).toBe(4)
    })
    test('percentage waste counts the total area wasted without double counting excess height & length', () => {
      expect(floor.calculatePercentageWaste()).toBe(261)
    })
  })
  describe('when the floor area is large and the tiles do not fit perfectly in either direction', () => {
    let floor = new Floor(1234, 897, 22, 14)
    test('calculateTileCount() is number of tiles needed to more than cover the length and width', () => {
      expect(floor.calculateTileCount()).toBe(3705)
    })
    test('percentage waste is the area of tiles wasted as proportion of floor to nearest whole number', () => {
      expect(floor.calculatePercentageWaste()).toBe(3)
    })
  })
})
