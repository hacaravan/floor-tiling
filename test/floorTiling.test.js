'use strict'

const calculateTileCoverage = require('../src/floorTiling.js')

describe('calculateTileCoverage', () => {
  describe('when passsed a tile size the same as the floor size', () => {
    let result = calculateTileCoverage(10, 10, 10, 10);
    test('Returns an object with tileCount of 1', () => {
      expect(result.tileCount).toBe(1)
    })
    test('Returns an object with percentageWaste of 0', () => {
      expect(result.percentageWaste).toBe(0)
    })
  })
  describe('when passed tile length & width which divide the floor length & width', () => {
    let result = calculateTileCoverage(80, 30, 20, 10);
    test('Returns the number of tiles that fit into the space', () => {
      expect(result.tileCount).toBe(12)
    })
  })
})
