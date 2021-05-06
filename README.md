# Floor Tiling

## Intro

A tool to calculate how many tiles are needed to cover a given floor area, and what proportion of the tiles are wasted. This is part of a tech test i am doing for an interview.

### Running the Tool
:construction:

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

- Function `caclulateTileCoverage`
- Takes list of inputs, `floorLength`, `floorWidth`, `tileLength`, `tileWidth`
- Returns *object* with `tileCount` and `percentageWaste` properties
- Can then be easily built on in future
