'use strict'

const Floor = require('./floorTiling.js')

class Comparison{
  constructor(params) {
    this.floorLength = params.floorLength;
    this.floorWidth = params.floorWidth;
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
    let floor = new Floor({floorLength: this.floorLength, floorWidth: this.floorWidth,
                          tileLength: tile.tileLength, tileWidth: tile.tileWidth, costPerTile: tile.costPerTile})
    return floor.calculateTotalCost()
  }
}

module.exports = Comparison
