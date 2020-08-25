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
        this.$el.append($ul);
        //self.addDroppableListener($ul);
    };

    createShapes() {
        this.shapes = [];
        for (var i = 0; i < SHAPES.length; i++) {
            this.shapes.push(new Shape(i));
        }
    };
    submitSolution(){
        var boardGrid = window.view.game.board.grid;
        var solutions = window.view.solutions;
        //console.log(this.compareSolution(boardGrid));
        if(this.isPieceInGrid(boardGrid)) {
            if (!this.compareSolution(boardGrid)) {
                this.buildSolutionGrid(boardGrid);
                solutions.push(this.deepCloneArray(boardGrid));
                var rotatedGrid = boardGrid;
                if (this.shapeInGridRotatable(boardGrid)){
                    for (var i = 0; i < 3; i++) {
                        rotatedGrid = this.rotateSolutionGrid(rotatedGrid);
                        this.buildSolutionGrid(rotatedGrid);
                        solutions.push(this.deepCloneArray(rotatedGrid));
                    }
                }
            } else {
                var pieceFound = document.getElementById('piece-found');
                var instance1 = M.Modal.init(pieceFound);
                instance1.open();
            }
        } else {
            var noPiece = document.getElementById('no-piece');
            var instance2 = M.Modal.init(noPiece);
            instance2.open();
        }
    }

    deepCloneArray(arr) {
        //  return arr.map(row => row.slice(0));
        return JSON.parse(JSON.stringify(arr));
    }

    buildSolutionGrid(boardGrid) {
        var self = this;
        var swiperContainer = $("<div>").addClass("swiper-slide");
        var $ul = $("<ul>").addClass("solution");
        boardGrid.forEach(function (row, rowIdx) {
            row.forEach(function (tile, tileIdx) {
                var $li = $("<li>");
                $li.data("pos", [rowIdx, tileIdx]);
                $li.css('background', tile.color);
                if(!tile.color){
                    $li.css('visibility', 'hidden');
                }
                $ul.append($li);
            });
        });
        swiperContainer.append($ul);
        window.view.swiper.appendSlide(swiperContainer);
    }

    rotateSolutionGrid(boardGrid) {
        return boardGrid.map((val, index) => boardGrid.map(row => row[index]).reverse());
    }

    compareSolution(newSolution) {
        var solutions = window.view.solutions;
        // var solutions = [newSolution];
        var startPosNewSolution = this.getFirstPiecePos(newSolution);
        var status = false;
        return solutions.some((solution) => {
            var startPosSolution = this.getFirstPiecePos(solution);
            var i = startPosNewSolution[0];
            var n = startPosNewSolution[1];
            var f = startPosSolution[0];
            var j = startPosSolution[1];
            var condition;
            i + n * 5 <= f + j * 5 ? condition = f < newSolution.length - 1 || j < newSolution.length - 1 : condition = i < newSolution.length - 1 || n < newSolution.length - 1;
            console.log(condition);
            for (; condition;) {
                if (solution[f][j].type !== newSolution[i][n].type) {
                    break;
                    //return false;
                }
                if ((f === newSolution.length - 1 && j === newSolution.length - 1) || (i === newSolution.length - 1 && n === newSolution.length - 1)) {
                    status = true;
                    break;
                }
                if (i === newSolution.length - 1) {
                    i = -1;
                    n++;
                }
                if (f === newSolution.length - 1) {
                    f = -1;
                    j++;
                }
                f++;
                i++;
            }
            return status;
        });
    }
    isPieceInGrid(grid) {
        for (var i = 0; i < grid.length; i++) {
            for (var n = 0; n < grid[i].length; n++) {
                if (grid[i][n].type) {
                    return true;
                }
            }
        }
    }
    shapeInGridRotatable(grid) {
        for (var i = 0; i < grid.length; i++) {
            for (var n = 0; n < grid[i].length; n++) {
                if (grid[i][n].type && grid[i][n].type !== "square") {
                    return true;
                }
            }
        }
        return false;
    }
    getFirstPiecePos(grid) {
        for (var i = 0; i < grid.length; i++) {
            for (var n = 0; n < grid[i].length; n++) {
                if (grid[i][n].type) {
                    return [i, n];
                }
            }
        }
    }

    /*View.prototype.placeShape = function (listItem) {
        this.game.playMove();
        this.setupPieceTray();
    };*/

    transformCoords(startPos, coords) {
        this.transformedCoords = coords.map(function (pos) {
            return [startPos[0] + pos[0], startPos[1] + pos[1]];
        });
    };

    renderFullShape(color) {
        this.listItems.forEach(function ($li) {
            $li.css('background', color);
            $li.data('color', color);
            //$li.addClass('piece')
        });
        // this.horizontals();
        //this.verticals();
    };

    validMove(startPos) {
        var self = this;
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
    };

    isValidPos(pos) {
        return (
            (0 <= pos[0]) && (pos[0] < 5) && (0 <= pos[1]) && (pos[1] < 5)
        );
    };

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

        /*$('.tray').draggable({
            //scope:'group',
            //cursor: 'pointer',
            //revert: true,
            snap: '.snap',
            snapMode: 'inner',
            snapTolerance: 30,
            snaped: function(event, ui) {
                console.log("snapper");
            },
            helper: function (e) {
                var helperList = $('<ul class="draggable-helper">')
                helperList.append($('.tray > li').clone());
                return helperList;
            },
            drag: function (e, ui) {
                //$('.tray > li.piece').css('visibility', 'hidden');
                //$(".tray").css("background", "white");
            },
            stop: function (e, ui) {
                var snapped = $(this).data('ui-draggable').snapElements;
                var snappedTo = $.map(snapped, function(element) {
                    return element.snapping ? element.item : null;
                });
               /*var snappedTo = $.map($(this).data('piece').snapElements, function (element) {
                    if (element.snapping) { return console.log("true"); }
                });
                //$(".tray").css("background", "green");
                //$( '.tray' ).draggable( "option", "revert", true );
                if (!this.validMove) {
                    //$( '.tray' ).draggable( "option", "revert", true );
                    //$('.tray > li.piece').css('visibility', 'visible');
                }
            },
            cursorAt: {left: 30, top: 30}
        });*/
    };

    /*$.fn.multiDraggable = function (opts) {
        var initLeftOffset = []
            ,initTopOffset = [];
        return this.each (function (){
            $(this).live("mouseover", function() {
                if (!$(this).data("init")) {
                    $(this).data("init", true).draggable(opts,{
                        snap: '.snap',
                        snapMode: 'inner',
                        snapTolerance: 30,
                        start: function (event,ui) {
                            var pos = $(this).position();
                            $.each(opts.group || {}, function(key,value) {
                                var elemPos = $(value).position();
                                initLeftOffset[key] = elemPos.left - pos.left;
                                initTopOffset[key] = elemPos.top - pos.top;
                            });
                            opts.startNative ? opts.startNative() : {};
                        },
                        drag: function(event,ui) {
                            var pos = $(this).offset();
                            $.each(opts.group || {}, function(key,value) {
                                $(value).offset({left: pos.left + initLeftOffset[key],
                                    top: pos.top + initTopOffset[key]});
                            });
                            opts.dragNative ? opts.dragNative() : {};
                        },
                        stop: function(event,ui) {
                            var pos = $(this).offset();
                            $.each(opts.group || {}, function(key,value) {
                                $(value).offset({left: pos.left + initLeftOffset[key],
                                    top: pos.top + initTopOffset[key]});
                            });
                            opts.stopNative ? opts.stopNative() : {};
                        },
                    });
                }
            });
        });
    };*/

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
