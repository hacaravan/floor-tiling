'use strict'

const {FloorTiling, Floor, Tile} = require('../src/floorTiling.js')

describe('FloorTiling', () => {
  describe('when initiated with a square tile the same size as the floor', () => {
    let floor = new Floor({length: 10, width: 10})
    let tile = new Tile({length: 10, width: 10, costPerTile: 5})
    let floorTiling = new FloorTiling(floor, tile);
    test('calculateTileCount() is 1', () => {
      expect(floorTiling.calculateTileCount()).toBe(1)
    })
    test('calculatePercentageWaste() is 0', () => {
      expect(floorTiling.calculatePercentageWaste()).toBe(0)
    })
    test('calculateRotatedTileCount() is 1', () => {
      expect(floorTiling.calculateRotatedTileCount()).toBe(1)
    })
    test('calculateRotatedPercentageWaste() is 0', () => {
      expect(floorTiling.calculateRotatedPercentageWaste()).toBe(0)
    })
    test('total cost is cost of one tile', () => {
      expect(floorTiling.calculateTotalCost()).toBe(5)
    })
  })
  describe('when initiated with tile length & width which divide the floor length & width', () => {
    let floor = new Floor({length: 80, width: 30})
    let tile = new Tile({length: 20, width: 10, costPerTile: 5});
    let floorTiling = new FloorTiling(floor, tile);
    test('calculateTileCount() is the number of tiles that fit into the space', () => {
      expect(floorTiling.calculateTileCount()).toBe(12)
    })
    test('calculatePercentageWaste() is 0', () => {
      expect(floorTiling.calculatePercentageWaste()).toBe(0)
    })
    test('total cost is cost per tile multiplied by number of tiles needed', () => {
      expect(floorTiling.calculateTotalCost()).toBe(60)
    })
  })
  describe('when initiated with a length that does not fit perfectly & width which does', () => {
    let floor = new Floor({length: 85, width: 45})
    let tile = new Tile({length: 30, width: 3, costPerTile: 10})
    let floorTiling = new FloorTiling(floor, tile);

    test('calculateTileCount() is the number of tiles needed to cover the width and more than cover the length', () => {
      expect(floorTiling.calculateTileCount()).toBe(45)
    })
    test('calculatePercentageWaste() is the area of wasted tiles as proportion of floor to nearest whole number', () => {
      expect(floorTiling.calculatePercentageWaste()).toBe(6)
    })
    test('total cost is cost per tile ultiplied by whole number of tiles needed', () => {
      expect(floorTiling.calculateTotalCost()).toBe(450)
    })
  })
  describe('when initiated with a width that does not fit perfectly & length which does', () => {
    let floor = new Floor({length: 45, width: 85})
    let tile = new Tile({length: 3, width: 30, costPerTile: 20})
    let floorTiling = new FloorTiling(floor, tile);
    test('calculateTileCount() is the number of tiles needed to cover the length and more than cover the width', () => {
      expect(floorTiling.calculateTileCount()).toBe(45)
    })
    test('percentage waste is the area of tiles wasted as proportion of floor to nearest whole number', () => {
      expect(floorTiling.calculatePercentageWaste()).toBe(6)
    })
    test('total cost is cost per tile ultiplied by whole number of tiles needed', () => {
      expect(floorTiling.calculateTotalCost()).toBe(900)
    })
  })
  describe('when initiated with a width & length that do not fit perfectly', () => {
    let floor = new Floor({length: 89, width: 35})
    let tile = new Tile({length: 15, width: 12, costPerTile: 15})
    let floorTiling = new FloorTiling(floor, tile);
    test('calculateTileCount() is the number of tiles needed to more than cover the length and width', () => {
      expect(floorTiling.calculateTileCount()).toBe(18)
    })
    test('percentage waste is the area of tiles wasted as proportion of floor to nearest whole number', () => {
      expect(floorTiling.calculatePercentageWaste()).toBe(4)
    })
    test('total cost is cost per tile multiplied by whole number of tiles needed', () => {
      expect(floorTiling.calculateTotalCost()).toBe(270)
    })
  })
  describe('when one tile very nearly fills the space so there is a lot of waste', () => {
    let floor = new Floor({length: 20, width: 20})
    let tile = new Tile({length: 19, width: 19})
    let floorTiling = new FloorTiling(floor, tile);
    test('calculateTileCount() is number of tiles needed to more than cover the length and width', () => {
      expect(floorTiling.calculateTileCount()).toBe(4)
    })
    test('percentage waste counts the total area wasted without double counting excess height & length', () => {
      expect(floorTiling.calculatePercentageWaste()).toBe(261)
    })
  })
  describe('when the floor area is large and the tiles do not fit perfectly in either direction', () => {
    let floor = new Floor({length: 1234, width: 897})
    let tile = new Tile({length: 22, width: 14})
    let floorTiling = new FloorTiling(floor, tile);
    test('calculateTileCount() is number of tiles needed to more than cover the length and width', () => {
      expect(floorTiling.calculateTileCount()).toBe(3705)
    })
    test('percentage waste is the area of tiles wasted as proportion of floor to nearest whole number', () => {
      expect(floorTiling.calculatePercentageWaste()).toBe(3)
    })
  })
  describe('when initiated with tile width and length that each divide the floor length and width', () => {
    let floor = new Floor({length: 42, width: 84})
    let tile = new Tile({length: 7, width: 6})
    let floorTiling = new FloorTiling(floor, tile);
    test('calculateTileCount() is number of tiles needed to perfectly cover the floor in normal orientation', () => {
      expect(floorTiling.calculateTileCount()).toBe(84)
    })
    test('percentage waste is 0', () => {
      expect(floorTiling.calculatePercentageWaste()).toBe(0)
    })
    test('calculateRotatedTileCount() is same as normal tile count', () => {
      expect(floorTiling.calculateTileCount()).toBe(84)
    })
    test('rotated percentage waste is still 0', () => {
      expect(floorTiling.calculatePercentageWaste()).toBe(0)
    })
  })
  describe('effect of rotation', () => {
    describe('when tile width divides floor width and length, tile length only divides floor length', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 7, width: 4})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(300)
      })
      test('percentage waste in original orientation is 0', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(0)
      })
      test('calculateRotatedTileCount() is higher since some tiles are wasted', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(315)
      })
      test('percentage waste when tiles are rotated is non-zero', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(5)
      })
    })
    describe('when tile width divides floor width and length, tile length only divides floor width', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 5, width: 4})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(425)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(1)
      })
      test('calculateRotatedTileCount() is lower since no tiles are wasted', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(420)
      })
      test('percentage waste when tiles are rotated is 0', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(0)
      })
    })
    describe('when tile width divides floor width and length, tile length does not divide either', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 9, width: 4})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(250)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(7)
      })
      test('calculateRotatedTileCount() is different but still more than covers the floor area', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(252)
      })
      test('percentage waste when tiles are rotated is still non-zero but different', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(8)
      })
    })
    describe('when tile width only divides floor width, tile length divides floor length and width', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 4, width: 5})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(420)
      })
      test('percentage waste in original orientation is 0', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(0)
      })
      test('calculateRotatedTileCount() is higher since some tiles are wasted', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(425)
      })
      test('percentage waste when tiles are rotated is now non-zero', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(1)
      })
    })
    describe('when tile width only divides floor width, tile length only divides floor length', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 7, width: 5})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to perfectly cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(240)
      })
      test('percentage waste in original orientation is 0', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(0)
      })
      test('calculateRotatedTileCount() is higher since there is now some waste', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(255)
      })
      test('percentage waste when tiles are rotated is non-zero', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(6)
      })
    })
    describe('when tile width only divides floor width, tile length only divides floor width', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 5, width: 5})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(340)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(1)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(340)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(1)
      })
    })
    describe('when tile width only divides floor width, tile length does not divide either', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 9, width: 5})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(200)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(7)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(204)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(9)
      })
    })
    describe('when tile width only divides floor length, tile length divides floor length and width', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 4, width: 7})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(315)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(5)
      })
      test('calculateRotatedTileCount() is less because the tiles now fit perfectly', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(300)
      })
      test('percentage waste when tiles are rotated is now 0', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(0)
      })
    })
    describe('when tile width only divides floor length, tile length only divides floor length', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 7, width: 7})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(180)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(5)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(180)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(5)
      })
    })
    describe('when tile width only divides floor length, tile length only divides floor width', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 5, width: 7})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(255)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(6)
      })
      test('calculateRotatedTileCount() is less because the tiles now fit perfectly', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(240)
      })
      test('percentage waste when tiles are rotated is now 0', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(0)
      })
    })
    describe('when tile width only divides floor length, tile length does not divide either', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 9, width: 7})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(150)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(13)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(144)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(8)
      })
    })
    describe('when tile width does not divide either, tile length divides floor length and width', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 4, width: 9})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(252)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(8)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(250)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(7)
      })
    })
    describe('when tile width does not divide either, tile length only divides floor length', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 7, width: 9})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(144)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(8)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(150)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(13)
      })
    })
    describe('when tile width does not divide either, tile length only divides floor width', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 5, width: 9})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(204)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(9)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(200)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(7)
      })
    })
    describe('when tile width does not divide either, tile length does not divide either', () => {
      let floor = new Floor({length: 84, width: 100})
      let tile = new Tile({length: 9, width: 9})
      let floorTiling = new FloorTiling(floor, tile);
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floorTiling.calculateTileCount()).toBe(120)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(16)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floorTiling.calculateRotatedTileCount()).toBe(120)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floorTiling.calculateRotatedPercentageWaste()).toBe(16)
      })
    })
  })
  describe('effect of cutting the length', () => {
    describe('on single tile which perfectly fits floor', () => {
      let floor = new Floor({length: 10, width: 10})
      let tile = new Tile({length: 10, width: 10, canCutLength: true})
      let floorTiling = new FloorTiling(floor, tile);
      test('tile count is still 1', () => {
        expect(floorTiling.calculateTileCount()).toBe(1)
      })
      test('waste percentage is still 0', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(0)
      })
    })
    describe('on multiples tiles which cover floor perfectly', () => {
      let floor = new Floor({length: 80, width: 30})
      let tile = new Tile({length: 20, width: 10, canCutLength: true})
      let floorTiling = new FloorTiling(floor, tile);
      test('tile count is still the same', () => {
        expect(floorTiling.calculateTileCount()).toBe(12)
      })
      test('waste percentage is still 0', () => {
        expect(floorTiling.calculatePercentageWaste()).toBe(0)
      })
    })
    describe('when the tiles do not fit lengthways', () => {
      describe('when the excess length multiplied by the number of tiles wide is a whole number', () => {
        let floor = new Floor({length: 42, width: 60})
        let noCutTile = new Tile({length: 10, width: 12, canCutLength: false})
        let cutTile = new Tile({length: 10, width: 12, canCutLength: true})
        let noCutFloorTiling = new FloorTiling(floor, noCutTile)
        let cutFloorTiling = new FloorTiling(floor, cutTile);

        describe('without cutting', () => {
          test('there are more tiles needed', () => {
            expect(noCutFloorTiling.calculateTileCount()).toBe(25)
          })
          test('there is non-zero waste', () => {
            expect(noCutFloorTiling.calculatePercentageWaste()).toBe(19)
          })
        })
        describe('with cutting', () => {
          test('the tile count is lower', () => {
            expect(cutFloorTiling.calculateTileCount()).toBe(21)
          })
          test('the percentage waste is 0', () => {
            expect(cutFloorTiling.calculatePercentageWaste()).toBe(0)
          })
        })
      })
      describe('when the excess length cannot all be used', () => {
        let floor = new Floor({length: 42, width: 60})
        let noCutTile = new Tile({length: 8, width: 12, canCutLength: false})
        let cutTile = new Tile({length: 8, width: 12, canCutLength: true})
        let noCutFloorTiling = new FloorTiling(floor, noCutTile)
        let cutFloorTiling = new FloorTiling(floor, cutTile)
        describe('without cutting', () => {
          test('there are more tiles needed', () => {
            expect(noCutFloorTiling.calculateTileCount()).toBe(30)
          })
          test('there is non-zero waste', () => {
            expect(noCutFloorTiling.calculatePercentageWaste()).toBe(14)
          })
        })
        describe('with cutting', () => {
          test('the tile count is lower but still does not fit perfectly', () => {
            expect(cutFloorTiling.calculateTileCount()).toBe(27)
          })
          test('the percentage waste is still non-zero, but is lower', () => {
            expect(cutFloorTiling.calculatePercentageWaste()).toBe(3)
          })
        })
      })
    })
    describe('when the tiles do not fit lengthways or widthways', () => {
      describe('when the excess length multiplied by the number of tiles wide is a whole number', () => {
        let floor = new Floor({length: 42, width: 55})
        let noCutTile = new Tile({length: 10, width: 12, canCutLength: false})
        let cutTile = new Tile({length: 10, width: 12, canCutLength: true})
        let noCutFloorTiling = new FloorTiling(floor, noCutTile)
        let cutFloorTiling = new FloorTiling(floor, cutTile)
        describe('without cutting', () => {
          test('there are more tiles needed', () => {
            expect(noCutFloorTiling.calculateTileCount()).toBe(25)
          })
          test('there is non-zero waste', () => {
            expect(noCutFloorTiling.calculatePercentageWaste()).toBe(30)
          })
        })
        describe('with cutting', () => {
          test('the tile count is lower', () => {
            expect(cutFloorTiling.calculateTileCount()).toBe(21)
          })
          test('the percentage waste is lower but still non-zero due tothe excess width', () => {
            expect(cutFloorTiling.calculatePercentageWaste()).toBe(9)
          })
        })
      })
      describe('when the excess length cannot be spread evenly over the width of all the tiles', () => {
        let floor = new Floor({length: 42, width: 55})
        let noCutTile = new Tile({length: 8, width: 12, canCutLength: false})
        let cutTile = new Tile({length: 8, width: 12, canCutLength: true})
        let noCutFloorTiling = new FloorTiling(floor, noCutTile)
        let cutFloorTiling = new FloorTiling(floor, cutTile)
        describe('without cutting', () => {
          test('there are more tiles needed', () => {
            expect(noCutFloorTiling.calculateTileCount()).toBe(30)
          })
          test('there is non-zero waste', () => {
            expect(noCutFloorTiling.calculatePercentageWaste()).toBe(25)
          })
        })
        describe('with cutting', () => {
          test('the tile count is lower but still does not fit perfectly', () => {
            expect(cutFloorTiling.calculateTileCount()).toBe(27)
          })
          test('the percentage waste is still non-zero, but is lower', () => {
            expect(cutFloorTiling.calculatePercentageWaste()).toBe(12)
          })
        })
      })
    })
  })
})
