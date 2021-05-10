'use strict'

const {FloorTiling, Floor, Tile} = require('./floorTiling.js')

class Comparison{
  constructor(params) {
    this.floor = new Floor({length: params.floorLength, width: params.floorWidth})
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
    let tile = new Tile(this.tileList[tileNumber])
    let floor = new FloorTiling(this.floor, tile)
    return floor.calculateTotalCost()
  }
}

module.exports = Comparison
