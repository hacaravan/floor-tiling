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
    test('calculateRotatedPercentageWaste() is 0', () => {
      expect(floor.calculateRotatedPercentageWaste()).toBe(0)
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
  describe('when initiated with tile width and length that each divide the floor length and width', () => {
    let floor = new Floor(42, 84, 7, 6)
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
      let floor = new Floor(84, 100, 7, 4)
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
      let floor = new Floor(84, 100, 5, 4)
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
      let floor = new Floor(84, 100, 9, 4)
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
      let floor = new Floor(84, 100, 4, 5)
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
      let floor = new Floor(84, 100, 7, 5)
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
      let floor = new Floor(84, 100, 5, 5)
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
      let floor = new Floor(84, 100, 9, 5)
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
    // describe('when tile width only divides floor length, tile length divides floor length and width', () => {
    //   let floor = new Floor(84, 100, 4, 7)
    // })
    // describe('when tile width only divides floor length, tile length only divides floor length', () => {
    //   let floor = new Floor(84, 100, 7, 7)
    // })
    // describe('when tile width only divides floor length, tile length only divides floor width', () => {
    //   let floor = new Floor(84, 100, 5, 7)
    // })
    // describe('when tile width only divides floor length, tile length does not divide either', () => {
    //   let floor = new Floor(84, 100, 9, 7)
    // })
    // describe('when tile width does not divide either, tile length divides floor length and width', () => {
    //   let floor = new Floor(84, 100, 4, 9)
    // })
    // describe('when tile width does not divide either, tile length only divides floor length', () => {
    //   let floor = new Floor(84, 100, 7, 9)
    // })
    // describe('when tile width does not divide either, tile length only divides floor width', () => {
    //   let floor = new Floor(84, 100, 5, 9)
    // })
    // describe('when tile width does not divide either, tile length does not divide either', () => {
    //   let floor = new Floor(84, 100, 9, 9)
    // })
  })
})
