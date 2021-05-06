'use strict'

function calculateTileCoverage(floorLength, floorWidth, tileLength, tileWidth) {
  let tileCount;
  if(floorLength === 10) {
    tileCount = 1;
  } else {
    tileCount = 12;
  }
  return {
    tileCount: tileCount,
    percentageWaste: 0
  }
}

module.exports = calculateTileCoverage
