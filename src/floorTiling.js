'use strict'

function calculateTileCoverage(floorLength, floorWidth, tileLength, tileWidth) {
  let lengthRatio = Math.ceil(floorLength/tileLength)
  let tileCount = lengthRatio * (floorWidth/tileWidth)
  
  return {
    tileCount: tileCount,
    percentageWaste: 0
  }
}

module.exports = calculateTileCoverage
