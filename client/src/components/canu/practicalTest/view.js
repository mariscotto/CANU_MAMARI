import $ from 'jquery';
import 'jquery-ui-bundle';
import 'jquery-ui-bundle/jquery-ui.min.css';
import 'jquery-ui';
import Tray from "./tray";
import Shape from "./shape";
import M from "materialize-css";


const SHAPES = require("./shapes");

class View {
    constructor(game, $el) {
        this.game = game;
        // this.board = game.board;
        this.$el = $el;
        this.valid = true;
        this.setupBoard();
        this.solutions = [];
        //this.setupPieceTray();
        //this.placeShape();
    };

   setupBoard() {
        var self = this;
        var $ul = $("<ul>").addClass("group");
        var pallet = $("<div id='pieces-pallet' class='pieces-pallet'></div>");
        this.game.board.grid.forEach(function (row, rowIdx) {
            row.forEach(function (tile, tileIdx) {
                var $li = $("<li>");
                $li.data("pos", [rowIdx, tileIdx]);
                $li.addClass('snap');
                $ul.append($li);
            });
        });

        this.$el.append(pallet);
        this.addDroppableListener(pallet);
        this.addDroppableListenerSolution($ul);
        this.$el.append($ul);
        //self.addDroppableListener($ul);
    };

    createShapes() {
        this.shapes = [];
        for (var i = 0; i < SHAPES.length; i++) {
            this.shapes.push(new Shape(i));
        }
    };

    /*View.prototype.placeShape = function (listItem) {
        this.game.playMove();
        this.setupPieceTray();
    };*/

   /* transformCoords(startPos, coords) {
        this.transformedCoords = coords.map(function (pos) {
            return [startPos[0] + pos[0], startPos[1] + pos[1]];
        });
    };*/


    /*var self = this;
    var coords = this.shapes[0].coords;
    this.transformCoords(startPos, coords);
    this.transformedCoords.forEach((pos) => {
    if (this.isValidPos(pos)) {
    $('.group > li').each((idx, li) => {
    var $li = $(li);
    if (($li.data('pos').equals(pos)) && ($li.data('color') !== undefined)) {
    self.valid = false;
} else if ($li.data('pos').equals(pos)) {
    self.listItems.push($li);
}
});
} else {
    self.valid = false;
}
});
};*/
   /* isValidPos(pos) {
        return (
            (0 <= pos[0]) && (pos[0] < 5) && (0 <= pos[1]) && (pos[1] < 5)
        );
    };*/

    /*View.prototype.rotateShape = function () {
        //this.game.playMove();
        //this.setupPieceshape();
        if (this.game.shape.rotation == "270") {
            this.game.playMove(1, "0", this.game.shape.scaled);
            this.setupPieceTray();
        } else {
            var rotation = parseInt(this.game.shape.rotation) + 90;
            this.game.playMove(1, rotation.toString(), this.game.shape.scaled);
            //  var tray = new Tray(1,rotation.toString(),0);
            this.setupPieceTray();
        }
    };

    View.prototype.scaleShape = function () {
        if (this.game.tray.shape.scaled == 0) {
            this.game.playMove(1, this.game.tray.shape.rotation, 1);
            this.setupPieceTray();
        } else {
            this.game.playMove(1, this.game.tray.shape.rotation, 0);
            this.setupPieceTray();
        }
    };
    */
    /*View.prototype.verticals = function () {
      var self = this;
      var grid = this.grid;
      var cols = grid[0].map(function(col, i) {
        return grid.map(function(row) {
          return row[i];
        });
      });
      cols.forEach(function (row) {
        if (self.full(row)) {
          self.clear(row);
        }
      });
    };

    View.prototype.horizontals = function () {
      this.grid = [];
      var self = this;
      var row = [];
      $('.group > li').each(function (idx, li) {
        var $li = $(li);
        row.push($li[0]);
        if (row.length === 10) {
          if (self.full(row)) {
            self.clear(row);
          }
          self.grid.push(row);
          row = [];
        }
      });
    }; */

    /*View.prototype.full = function (arr) {
      var full = true;
      arr.forEach(function (li) {
        var $li = $(li);
        if ($li.data('color') === undefined) {
          full = false;
        }
      });
      return full;
    };
    */
    /*View.prototype.clear = function (arr) {
      var self = this;
      arr.forEach(function (li) {
        var $li = $(li);
        $li.animate({ 'background-color': '#ccc' }, 500, function() {
          $li.removeAttr('style');
          $li.removeData('color');
          $li.removeClass('piece');
            });
      });

      return true;
    };*/

    setupPieceTray() {
        var self = this;
        //$('.tray').remove();
        var shape = this.game.shape;
        var $ul = $("<ul>");
        $ul.addClass("tray");
        // $ul.append("<button class='menu'></button>");
        shape.grid.forEach(function (row, rowIdx) {
            row.forEach(function (tile, tileIdx) {
                var $li = $("<li>");
                if (!tile.empty) {
                    $li.data("color", tile.color);
                    $li.css('background', tile.color);
                    $li.addClass("piece");
                }

                $li.data("pos", [rowIdx, tileIdx]);
                $ul.append($li);
            });
        });

        this.$el.append($ul);
        this.addClickEvent();
        this.addDraggableListener();
    };

    addClickEvent() {
        // $('.tray > li.piece').addEventListener("onClick")
        $('.tray > li.piece').on("mousedown", () => {
            //$(".tray").css("background", "green");
            //$(".tray").addClass("reveal-menu");
        });

    };

    addDroppableListener(item) {
        var self = this;
        item.droppable({
            /*hoverClass: 'hovered',*/
            tolerance: "fit",
            drop: function (e, ui) {
                const menu = $("#" + ui.draggable[0].id + " .menu");
                if(menu.hasClass('hide-menu')){
                    menu.removeClass('hide-menu');
                }
                /*self.valid = true;
                self.listItems = [];
                self.validMove($(this).data('pos'));
                if (self.valid) {
                  //self.renderFullShape($(ui.draggable[0]).data('color'));
                    self.renderFullShape("green");
                  //self.placeShape();
                }*/
            },
        });
    };
    addDroppableListenerSolution(item) {
        var self = this;
        item.droppable({
            /*hoverClass: 'hovered',*/
            tolerance: "touch",
            drop: (e, ui) => {
                var shape = this.getShape(ui.helper[0].id);
                var snapped = ui.helper.data('ui-draggable').snapElements;
                /*var snappedTo = $.map(snapped, function(element) {
                    return element.snapping ? element.item : null;
                });*/
                var xCoord = Math.round((ui.offset["top"] - snapped[0].top) / 40);
                xCoord = xCoord == -0 ? 0 : xCoord;
                var yCoord = Math.round((ui.offset["left"] - snapped[0].left) / 40);
                yCoord = yCoord == -0 ? 0 : yCoord;
                var startPos = [xCoord, yCoord];
                var coords = shape.coords;
                var transformedCoords = this.transformCoords(startPos, coords);
               if (!this.validMove(transformedCoords) && transformedCoords) {
                   if(window.view.transformedCoords) {
                       this.renderFullShape(window.view.transformedCoords, shape);
                   }
                    window.view.valid = false;
                }

                /*self.valid = true;
                self.listItems = [];
                self.validMove($(this).data('pos'));
                if (self.valid) {
                  //self.renderFullShape($(ui.draggable[0]).data('color'));
                    self.renderFullShape("green");
                  //self.placeShape();
                }*/
            },
        });
    };
    getShape(id) {
        var shapes = window.view.shapes;
        var shape;
        shapes.forEach((item) => {
            if(item.name === id){shape = item}
        });
        return shape
    };

    transformCoords(startPos, coords) {
        return coords.map(function (pos) {
            return [startPos[0] + pos[0], startPos[1] + pos[1]];
        });
    };
    validMove(transformedCoords) {
        var view = window.view;
        //view.valid = true;
        //view.listItems = [];
        return this.isValidPos(transformedCoords) && !this.pieceExists(transformedCoords);
    };

    validTurn() {
        if(!window.view.valid){
            window.view.valid = true;
            return true;
        }else{
            return false;
        }
    }

    isValidPos(transformedCoords) {
        return !transformedCoords.some(pos => ((pos[0] < 0) || (pos[0] >= 5)) || ((pos[1] < 0) || (pos[1] >= 5)));
    };

    pieceExists(transformedCoords) {
        var boardGrid = window.view.game.board.grid;
        return transformedCoords.some(pos => boardGrid[pos[0]][pos[1]].type);
    };

    renderFullShape(transformedCoords, shape) {
        var boardGrid = window.view.game.board.grid;
        transformedCoords.forEach((coord) => {
            boardGrid[coord[0]][coord[1]].type = shape.name;
            boardGrid[coord[0]][coord[1]].kind = shape.kind;
            boardGrid[coord[0]][coord[1]].color = shape.color;
        });
    };

    addDraggableListener() {
        var self = this;

        document.addEventListener("touchstart", this.touchHandler, true);
        document.addEventListener("touchmove", this.touchHandler, true);
        document.addEventListener("touchend", this.touchHandler, true);
        document.addEventListener("touchcancel", this.touchHandler, true);
        //$(".tray > li.piece").multiDraggable({ group: $(".piece"), dragNative : function () {}});
        $(".tray").multiDraggable({group: $(".piece")});
        // $(".tray").removeClass("")
        /*  $('.tray > li.piece').draggable({
              cursor: 'pointer',
              revert: false,
              helper: function(e) {
                  var helperList = $('<ul class="draggable-helper">');
                  helperList.append($('.tray > li').clone());
                  return helperList;
              },
              drag: function (e, ui) {
                  $('.tray > li.piece').css('visibility', 'hidden');
              },

              stop: function(e, ui) {
                  if (!this.validMove) {
                      $('.tray > li.piece').css('visibility', 'visible');
                  }
              },
              cursorAt: { top: 40 }
          });*/

    };

   touchHandler(event) {
        var touch = event.changedTouches[0];
        var simulatedEvent = document.createEvent("MouseEvent");
        simulatedEvent.initMouseEvent({
                touchstart: "mousedown",
                touchmove: "mousemove",
                touchend: "mouseup"
            }[event.type], true, true, window, 1,
            touch.screenX, touch.screenY,
            touch.clientX, touch.clientY, false,
            false, false, false, 0, null);

        touch.target.dispatchEvent(simulatedEvent);
        event.preventDefault();
    }

    /*View.prototype.Snap = function (value) {
      return Math.round(value / 50) * 50;
    }

    View.prototype.SnapMoving = function (options) {
      var self = this;
      $('.tray > li.piece').css('visibility', 'hidden');
      options.target.set({
        left: view.Snap(options.target.left),
        top: view.Snap(options.target.top)
      });
    }*/

    equals(array) {
        if (!array)
            return false;
        if (this.length !== array.length)
            return false;
        for (var i = 0, l = this.length; i < l; i++) {
            if (this[i] instanceof Array && array[i] instanceof Array) {
                if (!this[i].equals(array[i]))
                    return false;
            } else if (this[i] !== array[i]) {
                return false;
            }
        }
        return true;
    }
}
export default View;
