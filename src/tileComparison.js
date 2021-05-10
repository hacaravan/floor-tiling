'use strict'

class Comparison{
  constructor(params) {
    this.tileList = params.tileList
  }
  findCheapestTile() {

    if (this.tileList.length === 1) {
      return [0]
    } else if (this.tileList[0].costPerTile/(this.tileList[0].tileLength * this.tileList[0].tileWidth) ===
    this.tileList[1].costPerTile/(this.tileList[1].tileLength * this.tileList[1].tileWidth)){
      return [0, 1]
    }
    else {
      return [1]
    }

  }
}

module.exports = Comparison
