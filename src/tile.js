'use strict'

class Tile {
  constructor(params) {
    this.length = params.length
    this.width = params.width
    this.costPerTile = params.costPerTile
    this.canCutLength = params.canCutLength || false //default cutting length to false
  }

  area() {
    return this.length * this.width
  }
}

module.exports = Tile
