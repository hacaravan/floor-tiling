'use strict'

const Comparison = require('../src/tileComparison.js')

describe('tileComparison', () => {
  describe('findCheapestTile', () => {
    describe('when passed a single tile', () => {
      let comparison = new Comparison({floorLength: 40, floorWidth: 25,
                                      tileList: [{tileLength: 8, tileWidth: 5, costPerTile: 10}]
                                      })
      test('returns an array with the single value 0', () => {
        expect(comparison.findCheapestTile()).toEqual([0])
      })
    })
  })
})
