'use strict'

class Floor {
  constructor (floorLength, floorWidth, tileLength, tileWidth) {
    this.floorLength = floorLength;
    this.floorWidth = floorWidth;
    this.tileLength = tileLength;
    this.tileWidth = tileWidth;
  }

  calculateTileCount() {
    return this.lengthRatio() * this.widthRatio()
  }

  calculatePercentageWaste() {
    let wastedProportion = this.wastedArea()/this.floorArea()
    return Math.round(wastedProportion * 100)
  }

  lengthRatio() {
    return Math.ceil(this.floorLength/this.tileLength)
  }

  widthRatio() {
    return Math.ceil(this.floorWidth/this.tileWidth)
  }

  wastedLength() {
    return this.lengthRatio() * this.tileLength - this.floorLength
  }

  wastedLengthArea() {
    return this.wastedLength() * this.tileWidth * this.widthRatio()
  }

  wastedWidth() {
    return this.widthRatio() * this.tileWidth - this.floorWidth
  }

  wastedWidthArea() {
    return this.wastedWidth() * this.tileLength * this.lengthRatio()
  }

  wastedArea() {
    return this.wastedWidthArea() + this.wastedLengthArea()
  }

  floorArea() {
    return this.floorWidth * this.floorLength
  }

}

module.exports = Floor
