'use strict'

function calculateTileCoverage(floorLength, floorWidth, tileLength, tileWidth) {
  let tileCount = (floorLength/tileLength) * (floorWidth/tileWidth);
  return {
    tileCount: tileCount,
    percentageWaste: 0
  }
}

module.exports = calculateTileCoverage
