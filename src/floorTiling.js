'use strict'

class Floor {
  constructor (floorLength, floorWidth, tileLength, tileWidth, canCutLength = false) {
    this.floorLength = floorLength;
    this.floorWidth = floorWidth;
    this.tileLength = tileLength;
    this.tileWidth = tileWidth;
    this.canCutLength = canCutLength
  }

  calculateTileCount() {
    return Math.ceil(this.lengthRatio() * this.widthRatio())
    // Take the ceiling for the case when cutting is allowed since you still
    // have to use a whole tile, even if some of it can be cut up and used
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
    let exactRatio = this.floorLength/this.tileLength
    return this.canCutLength ? exactRatio : Math.ceil(exactRatio)
    // if cutting is allowed, you can fit partial tiles, so can use exact ratio
    // Otherwise you have to use a whole tile if there's overlap
  }

  widthRatio() {
    return Math.ceil(this.floorWidth/this.tileWidth)
  }

  wastedArea() {
    return this.tileArea() - this.floorArea()
  }

  tileArea() {
    return this.calculateTileCount() * this.tileLength * this.tileWidth
  }

  floorArea() {
    return this.floorWidth * this.floorLength
  }

  rotatedTileFloor() {
    return new Floor(this.floorLength, this.floorWidth, this.tileWidth, this.tileLength)
  }
}

module.exports = Floor
