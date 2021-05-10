'use strict'

class Comparison{
  constructor(params) {
    this.tileList = params.tileList
  }
  findCheapestTile() {

    if (this.tileList.length === 1) {
      return [0]
    } else if (this.tilingCost(0) === this.tilingCost(1)){
      return [0, 1]
    }
    else {
      return [1]
    }
  }
  tilingCost(tileNumber) {
    let tile = this.tileList[tileNumber]
    return tile.costPerTile/(tile.tileLength * tile.tileWidth)
    // This is currently being calculated as the cost per area of the tiles, eventually that will change
  }
}

module.exports = Comparison
