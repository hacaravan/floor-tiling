'use strict'

class Comparison{
  constructor(params) {
    this.tileList = params.tileList
  }
  findCheapestTile() {
    let returnArr = []
    for(let i = 0; i < this.tileList.length; i++){
      if(this.tilingCost(i) === this.cheapestCost()) {
        returnArr.push(i)
      }
    }
    return returnArr;
  }

  cheapestCost() {
    return Math.min(...this.tilingCostList())
  }

  tilingCostList() {
    return this.tileList.map((tile, index) => this.tilingCost(index))
  }

  tilingCost(tileNumber) {
    let tile = this.tileList[tileNumber]
    return tile.costPerTile/(tile.tileLength * tile.tileWidth)
    // This is currently being calculated as the cost per area of the tiles, eventually that will change
  }
}

module.exports = Comparison
