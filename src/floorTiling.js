'use strict'

const Floor = require ('./floor.js')
const Tile = require ('./tile.js')

class FloorTiling {
  constructor (floor, tile) {
    this.floor = floor;
    this.tile = tile;
  }

  calculateTileCount() {
    return Math.ceil(this.lengthRatio() * this.widthRatio())
    // Take the ceiling for the case when cutting is allowed since you still
    // have to use a whole tile, even if some of it can be cut up and used
  }

  calculatePercentageWaste() {
    let wastedProportion = this.wastedArea()/this.floor.area()
    return Math.round(wastedProportion * 100)
  }

  calculateRotatedTileCount() {
    return this.rotatedTileFloor().calculateTileCount()
  }

  calculateRotatedPercentageWaste() {
    return this.rotatedTileFloor().calculatePercentageWaste()
  }

  calculateTotalCost() {
    return this.tile.costPerTile * this.calculateTileCount();
  }

  lengthRatio() {
    let exactRatio = this.floor.length/this.tile.length
    return this.tile.canCutLength ? exactRatio : Math.ceil(exactRatio)
    // if cutting is allowed, you can fit partial tiles, so can use exact ratio
    // Otherwise you have to use a whole tile if there's overlap
  }

  widthRatio() {
    return Math.ceil(this.floor.width/this.tile.width)
  }

  wastedArea() {
    return this.totalTileArea() - this.floor.area()
  }

  totalTileArea() {
    return this.calculateTileCount() * this.tile.area()
  }

  // tileArea() {
  //   return this.tileLength * this.tileWidth
  // }

  // floorArea() {
  //   return this.floorWidth * this.floorLength
  // }

  rotatedTileFloor() {
    let rotatedTile = new Tile({length: this.tile.width,
                              width: this.tile.length,
                              costPerTile: this.tile.costPerTile,
                              canCutLength: this.tile.canCutLength})
    return new FloorTiling(this.floor, rotatedTile)
    // The same floor but with tile width and length swapped
  }
}

module.exports = {FloorTiling, Floor, Tile}
