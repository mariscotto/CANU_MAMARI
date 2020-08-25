import NullTile from './nullTile';
const MoveError = require("./moveError");
const Tile = require('./tile');

class Board {
    constructor() {
        this.grid = this.makeGrid();
    };

    makeGrid() {
        var grid = [];
        for (var i = 0; i < 5; i++) {
            grid.push([]);
            for (var j = 0; j < 5; j++) {
                grid[i].push(new NullTile([i, j]));
            }
        }
        return grid;
    };

    validPos(pos) {
        return (
            (0 <= pos[0]) && (pos[0] < 5) && (0 <= pos[1]) && (pos[1] < 5)
        );
    };

    addShape(shape) {
        var coords = shape.coords;
        if (this.emptyCoords(coords)) {
            coords.forEach(function (row, rowIdx) {
                row.forEach(function (tile, tileIdx) {
                    tile = new Tile([rowIdx, tileIdx], shape.color);
                });
            });
        }
    };

    emptyCoords(coords) {
        var self = this;
        coords.forEach(function (row, rowIdx) {
            row.forEach(function (tile, tileIdx) {
                if (this.validPos([rowIdx, tileIdx])) {
                    var tile = self.grid[rowIdx][tileIdx];
                    if (tile.empty) {
                        return false;
                    }
                }
            });
        });
        return true;
    };

    isOver() {
        for (var rowIdx = 0; rowIdx < 3; rowIdx++) {
            for (var colIdx = 0; colIdx < 3; colIdx++) {
                if (this.isEmptyPos([rowIdx, colIdx])) {
                    return false;
                }
            }
        }
        return true;
    };
}

export default Board;
