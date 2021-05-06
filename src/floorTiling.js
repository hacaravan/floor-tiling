'use strict'

function calculateTileCoverage(floorLength, floorWidth, tileLength, tileWidth) {
  let lengthRatio = Math.ceil(floorLength/tileLength)
  let widthRatio = Math.ceil(floorWidth/tileWidth)
  let tileCount = lengthRatio * widthRatio
  let wastedLength = lengthRatio * tileLength - floorLength;
  let wastedLengthArea = wastedLength * tileWidth * widthRatio;
  let wastedWidth = widthRatio * tileWidth - floorWidth;
  let wastedWidthArea = wastedWidth * tileLength * lengthRatio;

  let percentageWaste = Math.round((wastedLengthArea + wastedWidthArea)/(floorLength * floorWidth) * 100);

  return {
    tileCount: tileCount,
    percentageWaste: percentageWaste
  }
}

module.exports = calculateTileCoverage
