'use strict'

const calculateTileCoverage = require('../src/floorTiling.js')

describe('calculateTileCoverage', () => {
  describe('when passsed a tile size the same as the floor size', () => {
    let result = calculateTileCoverage(10, 10, 10, 10);
    test('returns an object with tileCount of 1', () => {
      expect(result.tileCount).toBe(1)
    })
    test('returns an object with percentageWaste of 0', () => {
      expect(result.percentageWaste).toBe(0)
    })
  })
  describe('when passed tile length & width which divide the floor length & width', () => {
    let result = calculateTileCoverage(80, 30, 20, 10);
    test('returns an object with the number of tiles that fit into the space', () => {
      expect(result.tileCount).toBe(12)
    })
    test('returns an object with percentageWaste of 0', () => {
      expect(result.percentageWaste).toBe(0)
    })
  })
  describe('when passed a length that does not fit perfectly & width which does', () => {
    let result = calculateTileCoverage(85, 45, 30, 3);
    test('returns an object with the number of tiles needed to cover the width and more than cover the length', () => {
      expect(result.tileCount).toBe(45)
    })
    test('returns an object with the area of wasted tiles as proportion of floor to nearest whole number', () => {
      expect(result.percentageWaste).toBe(6)
    })
  })
  describe('when passed a width that does not fit perfectly & length which does', () => {
    let result = calculateTileCoverage(45, 85, 3, 30);
    test('returns an object with the number of tiles needed to cover the length and more than cover the width', () => {
      expect(result.tileCount).toBe(45)
    })
    test('returns an object with the area of wasted tiles as proportion of floor to nearest whole number', () => {
      expect(result.percentageWaste).toBe(6)
    })
  })
})
