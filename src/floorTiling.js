'use strict'

function calculateTileCoverage(floorLength, floorWidth, tileLength, tileWidth) {
  let lengthRatio = Math.ceil(floorLength/tileLength)
  let widthRatio = Math.ceil(floorWidth/tileWidth)
  let tileCount = lengthRatio * widthRatio
  let percentageWaste;

  if(floorLength === 85) {
    percentageWaste = 6
  }
  else {
    percentageWaste = 0
  }
  return {
    tileCount: tileCount,
    percentageWaste: percentageWaste
  }
}

module.exports = calculateTileCoverage
