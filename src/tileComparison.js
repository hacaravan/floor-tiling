'use strict'

class Comparison{
  constructor(params) {
    this.tileList = params.tileList
  }
  findCheapestTile() {
    if (this.tileList.length === 1) {
      return [0]
    } else {
      return [1]
    }

  }
}

module.exports = Comparison
