'use strict'

class FloorTiling {
  constructor (params) {
    this.floorLength = params.floorLength;
    this.floorWidth = params.floorWidth;
    this.tileLength = params.tileLength;
    this.tileWidth = params.tileWidth;
    this.canCutLength = params.canCutLength;
    this.costPerTile = params.costPerTile;
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

  calculateTotalCost() {
    return this.costPerTile * this.calculateTileCount();
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
    return this.totalTileArea() - this.floorArea()
  }

  totalTileArea() {
    return this.calculateTileCount() * this.tileArea()
  }

  tileArea() {
    return this.tileLength * this.tileWidth
  }

  floorArea() {
    return this.floorWidth * this.floorLength
  }

  rotatedTileFloor() {
    return new FloorTiling({
      floorLength: this.floorLength,
      floorWidth: this.floorWidth,
      tileLength: this.tileWidth,
      tileWidth: this.tileLength
    })
    // The same floor but with tile width and length swapped
  }
}

module.exports = FloorTiling
