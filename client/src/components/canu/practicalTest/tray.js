import $ from 'jquery';
var Shape = require('./shape');
var Tile = require('./tile');
var NullTile = require('./nullTile');

class Tray {

  constructor(type, rotation, scaled) {
    this.grid = Tray.makeGrid();
    this.shape = new Shape(type, rotation, scaled);
    this.placeShape(this.shape);
  }

  makeGrid() {
    var grid = [];
    for (var i = 0; i < 2; i++) {
      grid.push([]);
      for (var j = 0; j < 2; j++) {
        grid[i].push(new NullTile([i, j], null));
      }
    }
    return grid;
  };

  placeShape(shape) {
    shape.coords.forEach(function (pos) {
      this.grid[pos[0]][pos[1]] = new Tile(pos, shape.color);
    }.bind(this));
  };
}
export default Tray;
