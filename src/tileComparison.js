'use strict'

class Comparison{
  constructor(params) {
    this.tileList = params.tileList
  }
  findCheapestTile() {
    let tilingCostList = this.tileList.map((tile, index) => this.tilingCost(index))
    let cheapestCost = Math.min(...tilingCostList)
    let returnArr = []
    for(let i = 0; i < tilingCostList.length; i++){
      if(tilingCostList[i] === cheapestCost) {
        returnArr.push(i)
      }
    }
    return returnArr;
  }
  tilingCost(tileNumber) {
    let tile = this.tileList[tileNumber]
    return tile.costPerTile/(tile.tileLength * tile.tileWidth)
    // This is currently being calculated as the cost per area of the tiles, eventually that will change
  }
}

module.exports = Comparison
