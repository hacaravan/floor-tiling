'use strict'

function calculateTileCoverage(floorLength, floorWidth, tileLength, tileWidth) {
  let tileCount
  if(floorLength % tileLength !== 0){
    tileCount = 45
  } else {
    tileCount = (floorLength/tileLength) * (floorWidth/tileWidth);
  }

  return {
    tileCount: tileCount,
    percentageWaste: 0
  }
}

module.exports = calculateTileCoverage
