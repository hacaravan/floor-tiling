# Floor Tiling

## Intro

A tool to calculate how many tiles are needed to cover a given floor area, and what proportion of the tiles are wasted. This is part of a tech test I am doing for an interview.

## Brief


Design and code an application which will solve the following problem:

Given a flooring area of Length floor_length and width floor_width
and a tile/decking board of length tile_length and width tile_width,
what is the number of tiles required to cover the area.

Also return the percentage waste (comparing area of unused tiles to area of the floor) to the nearest percent.

### Input/Output Table

 Scenario | Inputs | | | | Outputs | |
---|---|---|---|---|---|---
 |**Floor Length** | **Floor Width** | **Tile Length** | **Tile Width** | **\# Tiles** | **% Waste**
 Perfect Fit with Single Tile | 10 | 10 | 10 | 10 | 1 | 0
Perfect Fit with Multiple Tiles |80 | 30 | 20 | 10 | 12 | 0
Mismatched Length |85 | 45 | 30 | 3 | 45 | 6
Mismatched Width |45 | 85 | 3 | 30 | 45 | 6
Mismatched Length & Width |89 | 35 | 15 | 12 | 18 | 4
Mismatched Length & Width with high wastage |20 | 20 | 19 | 19 | 4 | 261
Large Area |1234 | 897 | 22 | 14 | 3705 | 3

## Planning
#### Original
- Class `Floor`
- Has functions `calculateTileCount` and `calculatePercentageWaste`, plus multiple small methods which these functions call on
- On construction takes list of inputs, `floorLength`, `floorWidth`, `tileLength`, `tileWidth`

#### Extension A
- Added functions `calculateRotatedTileCount` and `calculateRotatedPercentageWaste`
- Each draws on the original versions of the functions but with a new instance of the `Floor` class, with length and width of tiles swapped

#### Extension B
- Currently only cutting tiles to shorten them (i.e. changing length, not width)
- Currently also not factoring in combined effect of rotation and cutting
- Pass in boolean of `canCutLength` in constructor, defaults to `false`
- If `canCutLength` is true, calculate the exact division of tile length into the floor length, rather than the ceiling of this
  - This is a slight oversimplification since it assumes you can perfectly cut the tiles at any length
  - Also assuming that adding parts from two cut tiles is OK
- Then multiply the number of tiles that go into the width (`widthRatio`) by this number
- That's how many tiles will be used, but you must take the ceiling of this value
- The wasted area is now the tile area based on the new tile count, minus the floor area
- Doing it in the opposite orientation with `canCutWidth` should work the same

##### Examples
| Scenario                                                             | Floor Length | Floor Width | Tile Length | Tile Width | Cutting Allowed | Tile Count | Percentage Waste |
|----------------------------------------------------------------------|--------------|-------------|-------------|------------|-----------------|------------|------------------|
| Perfect fit with single tile - no cutting                            |           10 |          10 |          10 |         10 |      FALSE      |          1 |                0 |
| Perfect fit with single tile - cutting                               |           10 |          10 |          10 |         10 |       TRUE      |          1 |                0 |
| Perfect fit with multiple tiles - no cutting                         |           80 |          30 |          20 |         10 |      FALSE      |         12 |                0 |
| Perfect fit with multiple tiles - cutting                            |           80 |          30 |          20 |         10 |       TRUE      |         12 |                0 |
| Wrong length but remainder divides missing area - no cutting         |           42 |          60 |          10 |         12 |      FALSE      |         25 |               19 |
| Wrong length but remainder divides missing area - cutting            |           42 |          60 |          10 |         12 |       TRUE      |         21 |                0 |
| Wrong length and remainder does not divide missing area - no cutting |           42 |          60 |           8 |         12 |      FALSE      |         30 |               14 |
| Wrong length and remainder does not divide missing area - cutting    |           42 |          60 |           8 |         12 |       TRUE      |         27 |                3 |
| Wrong length and width but remainder divides missing area - no cutting         |           42 |          60 |          10 |         12 |      FALSE      |         25 |               19 |
| Wrong length and width but remainder divides missing area - cutting            |           42 |          60 |          10 |         12 |       TRUE      |         21 |                0 |
| Wrong length and width and remainder does not divide missing area - no cutting |           42 |          60 |           8 |         12 |      FALSE      |         30 |               14 |
| Wrong length and width and remainder does not divide missing area - cutting    |           42 |          60 |           8 |         12 |       TRUE      |         27 |                3 |

#### Extension C
- Separate class, `Comparison`
- Feed into it a single floor dimension and array with multiple tile shapes & costs
- So input like `{floorLength: x, floorWidth: y, tileList: [{tileLength: a, tileWidth: b, costPerTile: c}, {tileLength d, ...}, ...] }`
- `findCheapestTile()` outputs array with 0(?)-based index of cheapest tile
- If there is a tie, output array has several indexes
- For now assume no rotation and no cutting
- Could easily add `findCheapestCost()` by returning the `totalCost` of the cheapest tile option

##### Examples
| Scenario                                               | floorLength | floorWidth | tileList                                                                                                                                                                                                      | findCheapestTile() |
|--------------------------------------------------------|-------------|------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------|
| Only one tile                                          |          40 |         25 | {tileLength: 8, tileWidth: 5, costPerTile: 10}                                                                                                                                                                | [0]                |
| Two tiles with different costs                         |          42 |         27 | {tileLength: 6, tileWidth: 9, costPerTile: 10}, <br>{tileLength: 3, tileWidth: 9, costPerTile: 4}                                                                                                             | [1]                |
| Two tiles with same costs                              |          42 |         27 | {tileLength: 6, tileWidth: 9, costPerTile: 10}, <br>{tileLength: 3, tileWidth: 9, costPerTile: 5}                                                                                                             | [0, 1]             |
| Multiple tiles, one outright cheapest                  |          42 |         60 | {tileLength: 3, tileWidth: 6, costPerTile: 4}, <br>{tileLength: 3, tileWidth: 10, costPerTile: 5}, <br>{tileLength: 6, tileWidth: 12, costPerTile: 10}                                                        | [2]                |
| Multiple tiles, two same price                         |          42 |         60 | {tileLength: 6, tileWidth: 12, costPerTile: 20}, <br>{tileLength: 7, tileWidth: 12, costPerTile: 100}, <br>{tileLength: 3, tileWidth: 6, costPerTile: 5}, <br>{tileLength: 14, tileWidth: 6, costPerTile: 50} | [0, 2]             |
| Multiple tiles, multiple same price                    |          42 |         60 | {tileLength: 6, tileWidth: 12, costPerTile: 20}, <br>{tileLength: 7, tileWidth: 12, costPerTile: 100}, <br>{tileLength: 3, tileWidth: 6, costPerTile: 5}, <br>{tileLength: 6, tileWidth: 24, costPerTile: 40} | [0, 2, 3]          |
| Expensive tile that fits well can be cheaper overall than wasteful tile that's cheaper per area |          42 |         60 | {tileLength: 8, tileWidth: 7, costPerTile: 10}, <br>{tileLength: 6, tileWidth: 12, costPerTile: 15}                                                                                                            | [1]                |
| Cheap wasteful tile cheaper than expensive perfect fit |          42 |         60 | {tileLength: 8, tileWidth: 7, costPerTile: 5}, <br>{tileLength: 6, tileWidth: 12, costPerTile: 10}                                                                                                            | [0]                |
