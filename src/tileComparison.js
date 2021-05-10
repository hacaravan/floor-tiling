'use strict'

class Comparison{
  constructor(params) {
    this.tileList = params.tileList
  }
  findCheapestTile() {
    let tilingCostList = this.tileList.map((tile, index) => this.tilingCost(index))
    if (tilingCostList.length === 1) {
      return [0]
    } else if (tilingCostList[0] === tilingCostList[1]){
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
