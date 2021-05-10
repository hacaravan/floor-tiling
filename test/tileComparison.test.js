'use strict'

const Comparison = require('../src/tileComparison.js')

describe('tileComparison', () => {
  describe('findCheapestTile', () => {
    describe('when passed a single tile', () => {
      let comparison = new Comparison({floorLength: 40, floorWidth: 25,
                                      tileList: [{length: 8, width: 5, costPerTile: 10}]
                                      })
      test('returns an array with the single value 0', () => {
        expect(comparison.findCheapestTile()).toEqual([0])
      })
    })
    describe('when passed two tiles which cost different amounts to cover the floor', () => {
      let comparison = new Comparison({floorLength: 42, floorWidth: 27,
                                      tileList: [
                                        {length: 6, width: 9, costPerTile: 10},
                                        {length: 3, width: 9, costPerTile: 4}
                                      ]
                                      })
      test('returns an array with the index of the tile that costs less to cover the floor', () => {
        expect(comparison.findCheapestTile()).toEqual([1])
      })
    })
    describe('when passed two tiles which cost the same to cover the floor', () => {
      let comparison = new Comparison({floorLength: 42, floorWidth: 27,
                                      tileList: [
                                        {length: 6, width: 9, costPerTile: 10},
                                        {length: 3, width: 9, costPerTile: 5}
                                      ]
                                      })
      test('returns an array with 0 and 1 in it, i.e. both indexes', () => {
        expect(comparison.findCheapestTile()).toEqual([0, 1])
      })
    })
    describe('when passed multiple tiles with one outright cheapest to cover the floor', () => {
      let comparison = new Comparison({floorLength: 42, floorWidth: 60,
                                      tileList: [
                                        {length: 3, width: 6, costPerTile: 4},
                                        {length: 3, width: 10, costPerTile: 5},
                                        {length: 6, width: 12, costPerTile: 10},
                                        {length: 3, width: 10, costPerTile: 20}
                                      ]
                                      })
      test('returns an array with the index of the cheapest tile', () => {
        expect(comparison.findCheapestTile()).toEqual([2])
      })
    })
    describe('when passed multiple tiles with two equal cheapest to cover the floor', () => {
      let comparison = new Comparison({floorLength: 42, floorWidth: 60,
                                      tileList: [
                                        {length: 6, width: 12, costPerTile: 20},
                                        {length: 7, width: 12, costPerTile: 100},
                                        {length: 3, width: 6, costPerTile: 5},
                                        {length: 14, width: 6, costPerTile: 50}
                                      ]
                                      })
      test('returns an array with the indexes of the two cheapest tiles', () => {
        expect(comparison.findCheapestTile()).toEqual([0, 2])
      })
    })
    describe('when passed multiple tiles with multiple equal cheapest to cover the floor', () => {
      let comparison = new Comparison({floorLength: 42, floorWidth: 60,
                                      tileList: [
                                        {length: 6, width: 12, costPerTile: 20},
                                        {length: 7, width: 12, costPerTile: 100},
                                        {length: 3, width: 6, costPerTile: 5},
                                        {length: 3, width: 12, costPerTile: 10}
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
                                          {length: 8, width: 7, costPerTile: 10},
                                          {length: 6, width: 12, costPerTile: 15}
                                        ]
                                        })
        test('returns an array with the index of the tile that is cheaper overall but more expensive per area', () => {
          expect(comparison.findCheapestTile()).toEqual([1])
        })
      })
      describe('when the cheaper cost per area outweighs the better coverage', () => {
        let comparison = new Comparison({floorLength: 42, floorWidth: 60,
                                        tileList: [
                                          {length: 8, width: 7, costPerTile: 5},
                                          {length: 6, width: 12, costPerTile: 10}
                                        ]
                                        })
        test('returns an array with the index of the tile that is cheaper overall but more expensive per area', () => {
          expect(comparison.findCheapestTile()).toEqual([0])
        })
      })
    })
  })
})
