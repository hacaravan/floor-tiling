'use strict'

const FloorTiling = require('../src/floorTiling.js')

describe('FloorTiling', () => {
  describe('when initiated with a square tile the same size as the floor', () => {
    let floor = new FloorTiling({floorLength: 10, floorWidth: 10, tileLength: 10, tileWidth: 10, costPerTile: 5});
    test('calculateTileCount() is 1', () => {
      expect(floor.calculateTileCount()).toBe(1)
    })
    test('calculatePercentageWaste() is 0', () => {
      expect(floor.calculatePercentageWaste()).toBe(0)
    })
    test('calculateRotatedTileCount() is 1', () => {
      expect(floor.calculateRotatedTileCount()).toBe(1)
    })
    test('calculateRotatedPercentageWaste() is 0', () => {
      expect(floor.calculateRotatedPercentageWaste()).toBe(0)
    })
    test('total cost is cost of one tile', () => {
      expect(floor.calculateTotalCost()).toBe(5)
    })
  })
  describe('when initiated with tile length & width which divide the floor length & width', () => {
    let floor = new FloorTiling({floorLength: 80, floorWidth: 30, tileLength: 20, tileWidth: 10, costPerTile: 5});
    test('calculateTileCount() is the number of tiles that fit into the space', () => {
      expect(floor.calculateTileCount()).toBe(12)
    })
    test('calculatePercentageWaste() is 0', () => {
      expect(floor.calculatePercentageWaste()).toBe(0)
    })
    test('total cost is cost per tile multiplied by number of tiles needed', () => {
      expect(floor.calculateTotalCost()).toBe(60)
    })
  })
  describe('when initiated with a length that does not fit perfectly & width which does', () => {
    let floor = new FloorTiling({floorLength: 85, floorWidth: 45, tileLength: 30, tileWidth: 3, costPerTile: 10});
    test('calculateTileCount() is the number of tiles needed to cover the width and more than cover the length', () => {
      expect(floor.calculateTileCount()).toBe(45)
    })
    test('calculatePercentageWaste() is the area of wasted tiles as proportion of floor to nearest whole number', () => {
      expect(floor.calculatePercentageWaste()).toBe(6)
    })
    test('total cost is cost per tile ultiplied by whole number of tiles needed', () => {
      expect(floor.calculateTotalCost()).toBe(450)
    })
  })
  describe('when initiated with a width that does not fit perfectly & length which does', () => {
    let floor = new FloorTiling({floorLength: 45, floorWidth: 85, tileLength: 3, tileWidth: 30, costPerTile: 20});
    test('calculateTileCount() is the number of tiles needed to cover the length and more than cover the width', () => {
      expect(floor.calculateTileCount()).toBe(45)
    })
    test('percentage waste is the area of tiles wasted as proportion of floor to nearest whole number', () => {
      expect(floor.calculatePercentageWaste()).toBe(6)
    })
    test('total cost is cost per tile ultiplied by whole number of tiles needed', () => {
      expect(floor.calculateTotalCost()).toBe(900)
    })
  })
  describe('when initiated with a width & length that do not fit perfectly', () => {
    let floor = new FloorTiling({floorLength: 89, floorWidth: 35, tileLength: 15, tileWidth: 12, costPerTile: 15});
    test('calculateTileCount() is the number of tiles needed to more than cover the length and width', () => {
      expect(floor.calculateTileCount()).toBe(18)
    })
    test('percentage waste is the area of tiles wasted as proportion of floor to nearest whole number', () => {
      expect(floor.calculatePercentageWaste()).toBe(4)
    })
    test('total cost is cost per tile multiplied by whole number of tiles needed', () => {
      expect(floor.calculateTotalCost()).toBe(270)
    })
  })
  describe('when one tile very nearly fills the space so there is a lot of waste', () => {
    let floor = new FloorTiling({floorLength: 20, floorWidth: 20, tileLength: 19, tileWidth: 19});
    test('calculateTileCount() is number of tiles needed to more than cover the length and width', () => {
      expect(floor.calculateTileCount()).toBe(4)
    })
    test('percentage waste counts the total area wasted without double counting excess height & length', () => {
      expect(floor.calculatePercentageWaste()).toBe(261)
    })
  })
  describe('when the floor area is large and the tiles do not fit perfectly in either direction', () => {
    let floor = new FloorTiling({floorLength: 1234, floorWidth: 897, tileLength: 22, tileWidth: 14})
    test('calculateTileCount() is number of tiles needed to more than cover the length and width', () => {
      expect(floor.calculateTileCount()).toBe(3705)
    })
    test('percentage waste is the area of tiles wasted as proportion of floor to nearest whole number', () => {
      expect(floor.calculatePercentageWaste()).toBe(3)
    })
  })
  describe('when initiated with tile width and length that each divide the floor length and width', () => {
    let floor = new FloorTiling({floorLength: 42, floorWidth: 84, tileLength: 7, tileWidth: 6})
    test('calculateTileCount() is number of tiles needed to perfectly cover the floor in normal orientation', () => {
      expect(floor.calculateTileCount()).toBe(84)
    })
    test('percentage waste is 0', () => {
      expect(floor.calculatePercentageWaste()).toBe(0)
    })
    test('calculateRotatedTileCount() is same as normal tile count', () => {
      expect(floor.calculateTileCount()).toBe(84)
    })
    test('rotated percentage waste is still 0', () => {
      expect(floor.calculatePercentageWaste()).toBe(0)
    })
  })
  describe('effect of rotation', () => {
    describe('when tile width divides floor width and length, tile length only divides floor length', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 7, tileWidth: 4})
      test('calculateTileCount() is the number needed to cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(300)
      })
      test('percentage waste in original orientation is 0', () => {
        expect(floor.calculatePercentageWaste()).toBe(0)
      })
      test('calculateRotatedTileCount() is higher since some tiles are wasted', () => {
        expect(floor.calculateRotatedTileCount()).toBe(315)
      })
      test('percentage waste when tiles are rotated is non-zero', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(5)
      })
    })
    describe('when tile width divides floor width and length, tile length only divides floor width', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 5, tileWidth: 4})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(425)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(1)
      })
      test('calculateRotatedTileCount() is lower since no tiles are wasted', () => {
        expect(floor.calculateRotatedTileCount()).toBe(420)
      })
      test('percentage waste when tiles are rotated is 0', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(0)
      })
    })
    describe('when tile width divides floor width and length, tile length does not divide either', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 9, tileWidth: 4})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(250)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(7)
      })
      test('calculateRotatedTileCount() is different but still more than covers the floor area', () => {
        expect(floor.calculateRotatedTileCount()).toBe(252)
      })
      test('percentage waste when tiles are rotated is still non-zero but different', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(8)
      })
    })
    describe('when tile width only divides floor width, tile length divides floor length and width', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 4, tileWidth: 5})
      test('calculateTileCount() is the number needed to cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(420)
      })
      test('percentage waste in original orientation is 0', () => {
        expect(floor.calculatePercentageWaste()).toBe(0)
      })
      test('calculateRotatedTileCount() is higher since some tiles are wasted', () => {
        expect(floor.calculateRotatedTileCount()).toBe(425)
      })
      test('percentage waste when tiles are rotated is now non-zero', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(1)
      })
    })
    describe('when tile width only divides floor width, tile length only divides floor length', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 7, tileWidth: 5})
      test('calculateTileCount() is the number needed to perfectly cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(240)
      })
      test('percentage waste in original orientation is 0', () => {
        expect(floor.calculatePercentageWaste()).toBe(0)
      })
      test('calculateRotatedTileCount() is higher since there is now some waste', () => {
        expect(floor.calculateRotatedTileCount()).toBe(255)
      })
      test('percentage waste when tiles are rotated is non-zero', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(6)
      })
    })
    describe('when tile width only divides floor width, tile length only divides floor width', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 5, tileWidth: 5})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(340)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(1)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floor.calculateRotatedTileCount()).toBe(340)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(1)
      })
    })
    describe('when tile width only divides floor width, tile length does not divide either', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 9, tileWidth: 5})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(200)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(7)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floor.calculateRotatedTileCount()).toBe(204)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(9)
      })
    })
    describe('when tile width only divides floor length, tile length divides floor length and width', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 4, tileWidth: 7})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(315)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(5)
      })
      test('calculateRotatedTileCount() is less because the tiles now fit perfectly', () => {
        expect(floor.calculateRotatedTileCount()).toBe(300)
      })
      test('percentage waste when tiles are rotated is now 0', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(0)
      })
    })
    describe('when tile width only divides floor length, tile length only divides floor length', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 7, tileWidth: 7})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(180)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(5)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floor.calculateRotatedTileCount()).toBe(180)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(5)
      })
    })
    describe('when tile width only divides floor length, tile length only divides floor width', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 5, tileWidth: 7})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(255)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(6)
      })
      test('calculateRotatedTileCount() is less because the tiles now fit perfectly', () => {
        expect(floor.calculateRotatedTileCount()).toBe(240)
      })
      test('percentage waste when tiles are rotated is now 0', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(0)
      })
    })
    describe('when tile width only divides floor length, tile length does not divide either', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 9, tileWidth: 7})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(150)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(13)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floor.calculateRotatedTileCount()).toBe(144)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(8)
      })
    })
    describe('when tile width does not divide either, tile length divides floor length and width', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 4, tileWidth: 9})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(252)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(8)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floor.calculateRotatedTileCount()).toBe(250)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(7)
      })
    })
    describe('when tile width does not divide either, tile length only divides floor length', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 7, tileWidth: 9})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(144)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(8)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floor.calculateRotatedTileCount()).toBe(150)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(13)
      })
    })
    describe('when tile width does not divide either, tile length only divides floor width', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 5, tileWidth: 9})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(204)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(9)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floor.calculateRotatedTileCount()).toBe(200)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(7)
      })
    })
    describe('when tile width does not divide either, tile length does not divide either', () => {
      let floor = new FloorTiling({floorLength: 84, floorWidth: 100, tileLength: 9, tileWidth: 9})
      test('calculateTileCount() is the number needed to more than cover the floor in original orientation', () => {
        expect(floor.calculateTileCount()).toBe(120)
      })
      test('percentage waste in original orientation is non-zero', () => {
        expect(floor.calculatePercentageWaste()).toBe(16)
      })
      test('calculateRotatedTileCount() is the number needed to more than cover the floor after rotation', () => {
        expect(floor.calculateRotatedTileCount()).toBe(120)
      })
      test('percentage waste when tiles are rotated is still non-zero', () => {
        expect(floor.calculateRotatedPercentageWaste()).toBe(16)
      })
    })
  })
  describe('effect of cutting the length', () => {
    describe('on single tile which perfectly fits floor', () => {
      let floor = new FloorTiling({floorLength: 10, floorWidth: 10, tileLength: 10, tileWidth: 10, canCutLength: true});
      test('tile count is still 1', () => {
        expect(floor.calculateTileCount()).toBe(1)
      })
      test('waste percentage is still 0', () => {
        expect(floor.calculatePercentageWaste()).toBe(0)
      })
    })
    describe('on multiples tiles which cover floor perfectly', () => {
      let floor = new FloorTiling({floorLength: 80, floorWidth: 30, tileLength: 20, tileWidth: 10, canCutLength: true});
      test('tile count is still the same', () => {
        expect(floor.calculateTileCount()).toBe(12)
      })
      test('waste percentage is still 0', () => {
        expect(floor.calculatePercentageWaste()).toBe(0)
      })
    })
    describe('when the tiles do not fit lengthways', () => {
      describe('when the excess length multiplied by the number of tiles wide is a whole number', () => {
        let noCutFloor = new FloorTiling({floorLength: 42, floorWidth: 60, tileLength: 10, tileWidth: 12, canCutLength: false})
        let cutFloor = new FloorTiling({floorLength: 42, floorWidth: 60, tileLength: 10, tileWidth: 12, canCutLength: true})
        describe('without cutting', () => {
          test('there are more tiles needed', () => {
            expect(noCutFloor.calculateTileCount()).toBe(25)
          })
          test('there is non-zero waste', () => {
            expect(noCutFloor.calculatePercentageWaste()).toBe(19)
          })
        })
        describe('with cutting', () => {
          test('the tile count is lower', () => {
            expect(cutFloor.calculateTileCount()).toBe(21)
          })
          test('the percentage waste is 0', () => {
            expect(cutFloor.calculatePercentageWaste()).toBe(0)
          })
        })
      })
      describe('when the excess length cannot all be used', () => {
        let noCutFloor = new FloorTiling({floorLength: 42, floorWidth: 60, tileLength: 8, tileWidth: 12, canCutLength: false})
        let cutFloor = new FloorTiling({floorLength: 42, floorWidth: 60, tileLength: 8, tileWidth: 12, canCutLength: true})
        describe('without cutting', () => {
          test('there are more tiles needed', () => {
            expect(noCutFloor.calculateTileCount()).toBe(30)
          })
          test('there is non-zero waste', () => {
            expect(noCutFloor.calculatePercentageWaste()).toBe(14)
          })
        })
        describe('with cutting', () => {
          test('the tile count is lower but still does not fit perfectly', () => {
            expect(cutFloor.calculateTileCount()).toBe(27)
          })
          test('the percentage waste is still non-zero, but is lower', () => {
            expect(cutFloor.calculatePercentageWaste()).toBe(3)
          })
        })
      })
    })
    describe('when the tiles do not fit lengthways or widthways', () => {
      describe('when the excess length multiplied by the number of tiles wide is a whole number', () => {
        let noCutFloor = new FloorTiling({floorLength: 42, floorWidth: 55, tileLength: 10, tileWidth: 12, canCutLength: false})
        let cutFloor = new FloorTiling({floorLength: 42, floorWidth: 55, tileLength: 10, tileWidth: 12, canCutLength: true})
        describe('without cutting', () => {
          test('there are more tiles needed', () => {
            expect(noCutFloor.calculateTileCount()).toBe(25)
          })
          test('there is non-zero waste', () => {
            expect(noCutFloor.calculatePercentageWaste()).toBe(30)
          })
        })
        describe('with cutting', () => {
          test('the tile count is lower', () => {
            expect(cutFloor.calculateTileCount()).toBe(21)
          })
          test('the percentage waste is lower but still non-zero due tothe excess width', () => {
            expect(cutFloor.calculatePercentageWaste()).toBe(9)
          })
        })
      })
      describe('when the excess length cannot be spread evenly over the width of all the tiles', () => {
        let noCutFloor = new FloorTiling({floorLength: 42, floorWidth: 55, tileLength: 8, tileWidth: 12, canCutLength: false})
        let cutFloor = new FloorTiling({floorLength: 42, floorWidth: 55, tileLength: 8, tileWidth: 12, canCutLength: true})
        describe('without cutting', () => {
          test('there are more tiles needed', () => {
            expect(noCutFloor.calculateTileCount()).toBe(30)
          })
          test('there is non-zero waste', () => {
            expect(noCutFloor.calculatePercentageWaste()).toBe(25)
          })
        })
        describe('with cutting', () => {
          test('the tile count is lower but still does not fit perfectly', () => {
            expect(cutFloor.calculateTileCount()).toBe(27)
          })
          test('the percentage waste is still non-zero, but is lower', () => {
            expect(cutFloor.calculatePercentageWaste()).toBe(12)
          })
        })
      })
    })
  })
})
