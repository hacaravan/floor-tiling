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

  calculateRotatedTileCount() {
    return this.rotatedTileFloor().calculateTileCount()
  }

  calculateRotatedPercentageWaste() {
    return this.rotatedTileFloor().calculatePercentageWaste()
  }

  lengthRatio() {
    return Math.ceil(this.floorLength/this.tileLength)
  }

  widthRatio() {
    return Math.ceil(this.floorWidth/this.tileWidth)
  }

  wastedArea() {
    return this.tileArea() - this.floorArea()
  }

  tileArea() {
    return this.lengthRatio() * this.tileLength * this.widthRatio() * this.tileWidth
  }

  floorArea() {
    return this.floorWidth * this.floorLength
  }

  rotatedTileFloor() {
    return new Floor(this.floorLength, this.floorWidth, this.tileWidth, this.tileLength)
  }
}

module.exports = Floor
