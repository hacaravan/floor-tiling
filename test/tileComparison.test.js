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
    describe('when passed two tiles which cost different amounts to cover the floor', () => {
      let comparison = new Comparison({floorLength: 42, floorWidth: 27,
                                      tileList: [
                                        {tileLength: 6, tileWidth: 9, costPerTile: 10},
                                        {tileLength: 3, tileWidth: 9, costPerTile: 4}
                                      ]
                                      })
      test('returns an array with the index of the tile that costs less to cover the floor', () => {
        expect(comparison.findCheapestTile()).toEqual([1])
      })
    })
    describe('when passed two tiles which cost the same to cover the floor', () => {
      let comparison = new Comparison({floorLength: 42, floorWidth: 27,
                                      tileList: [
                                        {tileLength: 6, tileWidth: 9, costPerTile: 10},
                                        {tileLength: 3, tileWidth: 9, costPerTile: 5}
                                      ]
                                      })
      test('returns an array with 0 and 1 in it, i.e. both indexes', () => {
        expect(comparison.findCheapestTile()).toEqual([0, 1])
      })
    })
  })
})
