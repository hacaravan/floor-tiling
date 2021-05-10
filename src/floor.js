'use strict'

class Floor {
  constructor (params) {
    this.length = params.length;
    this.width = params.width;
  }

  area() {
    return this.length * this.width;
  }
}

module.exports = Floor
