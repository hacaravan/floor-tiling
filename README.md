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
:construction:  
Not yet started
- Assuming only one direction is being reused (for now)
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
