'use strict'

const calculateTileCoverage = require('../src/floorTiling.js')

describe('calculateTileCoverage', () => {
  describe('when passsed a tile size the same as the floor size', () => {
    test('Returns an object with tileCount of 1', () => {
      expect(calculateTileCoverage(10, 10, 10, 10).tileCount).toBe(1)
    })
  })
})
