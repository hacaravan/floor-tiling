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
    describe('when passed multiple tiles with one outright cheapest to cover the floor', () => {
      let comparison = new Comparison({floorLength: 42, floorWidth: 60,
                                      tileList: [
                                        {tileLength: 3, tileWidth: 6, costPerTile: 4},
                                        {tileLength: 3, tileWidth: 10, costPerTile: 5},
                                        {tileLength: 6, tileWidth: 12, costPerTile: 10},
                                        {tileLength: 3, tileWidth: 10, costPerTile: 20}
                                      ]
                                      })
      test('returns an array with the index of the cheapest tile', () => {
        expect(comparison.findCheapestTile()).toEqual([2])
      })
    })
    describe('when passed multiple tiles with two equal cheapest to cover the floor', () => {
      let comparison = new Comparison({floorLength: 42, floorWidth: 60,
                                      tileList: [
                                        {tileLength: 6, tileWidth: 12, costPerTile: 20},
                                        {tileLength: 7, tileWidth: 12, costPerTile: 100},
                                        {tileLength: 3, tileWidth: 6, costPerTile: 5},
                                        {tileLength: 14, tileWidth: 6, costPerTile: 50}
                                      ]
                                      })
      test('returns an array with the indexes of the two cheapest tiles', () => {
        expect(comparison.findCheapestTile()).toEqual([0, 2])
      })
    })
    describe('when passed multiple tiles with multiple equal cheapest to cover the floor', () => {
      let comparison = new Comparison({floorLength: 42, floorWidth: 60,
                                      tileList: [
                                        {tileLength: 6, tileWidth: 12, costPerTile: 20},
                                        {tileLength: 7, tileWidth: 12, costPerTile: 100},
                                        {tileLength: 3, tileWidth: 6, costPerTile: 5},
                                        {tileLength: 3, tileWidth: 12, costPerTile: 10}
                                      ]
                                      })
      test('returns an array with the indexes of all the cheapest tiles', () => {
        expect(comparison.findCheapestTile()).toEqual([0, 2, 3])
      })
    })
    describe('when passed an expensive tile which covers the floor well and a cheap tile that is wasteful', () => {
      describe('when the better coverage outweighs the cheaper cost per area', () => {
        let comparison = new Comparison({floorLength: 42, floorWidth: 60,
                                        tileList: [
                                          {tileLength: 8, tileWidth: 7, costPerTile: 10},
                                          {tileLength: 6, tileWidth: 12, costPerTile: 15}
                                        ]
                                        })
        test('returns an array with the index of the tile that is cheaper overall but more expensive per area', () => {
          expect(comparison.findCheapestTile()).toEqual([1])
        })
      })
      describe('when the cheaper cost per area outweighs the better coverage', () => {
        let comparison = new Comparison({floorLength: 42, floorWidth: 60,
                                        tileList: [
                                          {tileLength: 8, tileWidth: 7, costPerTile: 5},
                                          {tileLength: 6, tileWidth: 12, costPerTile: 10}
                                        ]
                                        })
        test('returns an array with the index of the tile that is cheaper overall but more expensive per area', () => {
          expect(comparison.findCheapestTile()).toEqual([0])
        })
      })
    })
  })
})
