import $ from 'jquery';
import Tile from './tile';
import NullTile from './nullTile';
const SHAPES = require("./shapes");
/*'lelbow3', 'lelbow3_upscaled','horizontal3', 'puzzle', 'counterpart'*//*,'rgb(250,137,123, 0.6)'*/
var COLORS = ['rgb(134,227,206, 0.6)', 'rgb(136, 185, 153, 0.6)', 'rgb(255,221,148, 0.6)', 'rgb(134,227,206, 0.6)', 'rgb(204,171,216, 0.6)', 'rgb(72, 73, 124, 0.6)'];

class Shape {

  constructor(type = 1, rotation = "0", scaled = 0) {
    this.type = type;
    this.name = SHAPES[type].name;
    this.kind = SHAPES[type].kind;
    this.scalable = SHAPES[type].scalable;
    this.rotatable = SHAPES[type].rotatable;
    this.rotation = rotation;
    this.scaled = scaled;
    this.active = false;
    this.coords = SHAPES[type].shapes[rotation][scaled];
    this.color = COLORS[type];
    this.grid = this.makeGrid();
    this.placeShape();
    this.setupPieceGrid();

  };

  makeGrid() {
    var grid = [];
    var size = this.getGridSize();
    for (var i = 0; i < size; i++) {
      grid.push([]);
      for (var j = 0; j < size; j++) {
        grid[i].push(new NullTile([i, j]));
      }
    }
    return grid;
  };

  getGridSize() {
    var maxRow = this.coords.map(function (row) {
      return Math.max.apply(Math, row);
    });
    return Math.max.apply(null, maxRow) + 1;
  }

  placeShape() {
    this.coords.forEach(function (pos) {
      this.grid[pos[0]][pos[1]] = new Tile(pos, this.color);
    }.bind(this));
  };

  createTray(tray) {
    tray.css("height", this.getGridSize() * 40 + "px");
    tray.css("width", this.getGridSize() * 40 + "px");
  }

  createMenu() {
    var menu = $("<div class='menu'></div>");
    if(this.scalable) {
      menu.append("<i id='size-up' class='scale material-icons'>add</i>")
    }
    if(this.rotatable) {
      menu.append("<i class='rotate material-icons'>refresh</i>")
    }
    return menu;

  }

  setupPieceGrid() {
    var self = window.view;
    //$('.tray').remove();
    var shape = this;
    //if($("#"+this.name))
    var shapeWrapper = $("<div id='" + this.name + "' class='shape-wrapper'>")
    var $ul = $("<ul>");
    var menu = this.createMenu();
    shapeWrapper.append(menu);
    shapeWrapper.append($ul);
    //$ul.addClass(this.name);
    $ul.addClass("tray");
    //$ul.css("width", toString(this.getGridSize()*50) + "px");
    this.createTray($ul);
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

    $(".pieces-pallet").append(shapeWrapper);
    //this.addClickEvent();
    $("#" + this.name + " .rotate").on("mousedown", {shape: this}, shape.rotateShape);
    $("#" + this.name + " .scale").on("mousedown", {shape: this}, shape.scaleShape);
    this.addDraggableListener();
  };

  /*Shape.prototype.addClickEvent = function () {
    // $('.tray > li.piece').addEventListener("onClick")
    $('.tray').on("mousedown", (event) => {
        var activeItems = document.getElementsByClassName("active-piece");
        if(activeItems.length > 0) {
        for(var i = 0; i<activeItems.length; i++) {
            activeItems[i].className = activeItems[i].className.replace(" active-piece", "");
        }
        //current[0].className = current[0].className.replace(" active-piece", "");
        }
        $(event.currentTarget).addClass('active-piece');
      //$(".tray").css("background", "green");
      //$(".tray").addClass("reveal-menu");
    });

  };*/

  addDraggableListener() {
    var self = this;
    document.getElementsByClassName("wrapper")[0].addEventListener("touchstart", this.touchHandler, {passive: false});
    document.getElementsByClassName("wrapper")[0].addEventListener("touchmove", this.touchHandler, {passive: false});
    document.getElementsByClassName("wrapper")[0].addEventListener("touchend", this.touchHandler, {passive: false});
    document.getElementsByClassName("wrapper")[0].addEventListener("touchcancel", this.touchHandler, {passive: false});
    //$("." + this.name +" > li.piece").multiDraggable({ group: $("."+this.name + " .piece"), dragNative : function () {}});
    //  $(".shape-wrapper").multiDraggable({group: $("." + this.name +" > li.piece")});
    //$(".shape-wrapper").multiDraggable({});
    //$("." + this.name +" > li.piece").multiDraggable({});
    // $("." + this.name +" > li.piece").removeClass("ui-draggable-handle");
    //$(".shape-wrapper").removeClass("ui-draggable-handle");
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

    $('.shape-wrapper').draggable({
      //scope:'group',
      //cursor: 'pointer',
      revert:window.view.validTurn,
      handle: '.piece',
      containment: '.wrapper',
      snap: '.snap',
      snapMode: 'inner',
      snapTolerance: 37,
      start: (e, ui) => {
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
        if(this.isValidPos(transformedCoords)) {
          window.view.transformedCoords = transformedCoords;
        } else {
          window.view.transformedCoords = null;
        }
      },
      drag: (e, ui) => {
        $("#" + ui.helper[0].id).addClass('jello-vertical');
        var menu = $("#" + ui.helper[0].id + " .menu");
        var shape = this.getShape(ui.helper[0].id);
        menu.addClass('hide-menu');
        this.removeShape(shape);
        //menu.hasClass('hide-menu') ? menu.addClass('hide-menu'): menu.addClass('hide-menu');
        //$('.tray > li.piece').css('visibility', 'hidden');
        //$(".tray").css("background", "white");
      },
      stop: (e, ui) => {
        var ui = ui;
        $("#" + ui.helper[0].id).removeClass('jello-vertical');
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
        /* var snappedTo = $.map($(this).data('piece').snapElements, function (element) {
              if (element.snapping) { return console.log("true"); }
          });*/
        //$(".tray").css("background", "green");
        //$( '.tray' ).draggable( "option", "revert", true );
        //this.validMove(startPos,shape);
        if (this.validMove(transformedCoords)) {
          console.log("true");
          this.renderFullShape(transformedCoords, shape);
          //$( '.shape-wrapper' ).draggable( "option", "revert", true );
          //$( '.shape-wrapper' ).draggable( "option", "revert", true );
          //$('.tray > li.piece').css('visibility', 'visible');
        } else{
          //window.view.valid=false;
          //$("#"+shape.name).animate({'left': ui.offset.left-window.view.startLeft+'px','bottom':ui.offset.top-window.view.startTop+'px'});
        }
      }
      //cursorAt: {left: 30, top: 30}
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

  removeShape(shape) {
    var boardGrid = window.view.game.board.grid;
    boardGrid.forEach(function (row, rowIdx) {
      row.forEach(function (tile, tileIdx) {
        if (tile.type === shape.name) {
          tile.type = null;
          tile.kind = null;
          tile.color = null;
        }
      });
    });
  }

  transformCoords(startPos, coords) {
    return coords.map(function (pos) {
      return [startPos[0] + pos[0], startPos[1] + pos[1]];
    });
  };

  /*this.listItems.forEach(function ($li) {
    $li.css('background', color);
    $li.data('color', color);
    $li.data('empty', false);
    //$li.addClass('piece')
  });
  // this.horizontals();
  //this.verticals();*/
  renderFullShape(transformedCoords, shape) {
    var boardGrid = window.view.game.board.grid;
    transformedCoords.forEach((coord) => {
      boardGrid[coord[0]][coord[1]].type = shape.name;
      boardGrid[coord[0]][coord[1]].kind = shape.kind;
      boardGrid[coord[0]][coord[1]].color = shape.color;
    });
  };


  /*
    var view = window.view;
    view.valid = true;
    view.listItems = [];
    var coords = this.coords;
    this.transformCoords(startPos, coords);
    this.transformedCoords.forEach((pos) => {
      if (this.isValidPos(pos)) {
        $(this.name+' > li').each((idx, li) => {
          var $li = $(li);
          if (($li.data('pos').equals(pos)) && ($li.data('color') !== undefined)) {
            view.valid = false;
          } else if ($li.data('pos').equals(pos)) {
            view.listItems.push($li);
          }
        });
      } else {
        view.valid = false;
      }
    });


         $(this.name+' > li').each((idx, li) => {
          var $li = $(li);
          if (($li.data('pos').equals(pos)) && ($li.data('color') !== undefined)) {
            view.valid = false;
          } else if ($li.data('pos').equals(pos)) {
            view.listItems.push($li);
          }
        });

          this.transformedCoords.forEach((pos) => {
      if (!this.isValidPos(pos)) {
      }
    else if(this.pieceExists(transformedCoords)){

    }
      } else {
        view.valid = false;
      }
    });
     return (
        (0 <= pos[0]) && (pos[0] < 5) && (0 <= pos[1]) && (pos[1] < 5)
    );
   */


  validMove(transformedCoords) {
    var view = window.view;
    //view.valid = true;
    //view.listItems = [];
    return this.isValidPos(transformedCoords) && !this.pieceExists(transformedCoords);
  };

  isValidPos(transformedCoords) {
    return !transformedCoords.some(pos => ((pos[0] < 0) || (pos[0] >= 5)) || ((pos[1] < 0) || (pos[1] >= 5)));
  };

  pieceExists(transformedCoords) {
    var boardGrid = window.view.game.board.grid;
    return transformedCoords.some(pos => boardGrid[pos[0]][pos[1]].type);
  };


  rotateShape(event) {
    //this.game.playMove();
    //this.setupPieceshape();
    var shape = event.data.shape;
    if (shape.rotation === "270") {
      //window.view.shapes[0]= new Shape(1, "0", event.data.shape.scaled);
      shape.rotation = "0";
      shape.coords = SHAPES[shape.type].shapes[shape.rotation][shape.scaled];
      shape.grid = shape.makeGrid();
      shape.placeShape();
      shape.doRotation(shape);
    } else {
      var rotation = parseInt(event.data.shape.rotation) + 90;
      shape.rotation = rotation.toString();
      shape.coords = SHAPES[shape.type].shapes[shape.rotation][shape.scaled];
      shape.grid = shape.makeGrid();
      shape.placeShape();
      shape.doRotation(shape);
      //window.view.shapes[0]= new Shape(1, rotation.toString(), event.data.shape.scaled);
    }
  };

  doRotation(shape) {
    var $ul = $("<ul>");
    //var menu= shape.createMenu();
    //$("#"+shape.name ".").html(menu);
    $("#" + shape.name + " .tray").replaceWith($ul);
    //$ul.addClass(this.name);
    $ul.addClass("tray");
    //$ul.css("width", toString(this.getGridSize()*50) + "px");
    shape.createTray($ul);
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
    //$("#"+this.name+" .rotate").click({shape:this}, shape.rotateShape);
  }

  scaleShape(event) {
    var shape = event.data.shape;
    if (shape.scaled == 0) {
      //window.view.shapes[0]= new Shape(1, "0", event.data.shape.scaled);
      shape.scaled = 1;
      shape.coords = SHAPES[shape.type].shapes[shape.rotation][shape.scaled]
      shape.grid = shape.makeGrid();
      shape.placeShape();
      shape.doRotation(shape);
      $("#"+shape.name+">.menu .scale").html("remove");
    } else {
      shape.scaled = 0;
      shape.coords = SHAPES[shape.type].shapes[shape.rotation][shape.scaled]
      shape.grid = shape.makeGrid();
      shape.placeShape();
      shape.doRotation(shape);
      $("#"+shape.name+">.menu .scale").html("add");
      //window.view.shapes[0]= new Shape(1, rotation.toString(), event.data.shape.scaled);
    }
  };

  /*  if (this.game.tray.shape.scaled == 0) {
      this.game.playMove(1, this.game.tray.shape.rotation, 1);
      this.setupPieceTray();
    } else {

      this.game.playMove(1, this.game.tray.shape.rotation, 0);
      this.setupPieceTray();
    }*/
  /*Shape.prototype.doScaling = function (shape) {
    var $ul = $("<ul>");
    var menu= shape.createMenu();
    $("#"+shape.name).html(menu);
    $("#"+shape.name).append($ul);
    //$ul.addClass(this.name);
    $ul.addClass("tray");
    //$ul.css("width", toString(this.getGridSize()*50) + "px");
    shape.createTray($ul);
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
    $("#"+this.name+" .rotate").click({shape:this}, shape.rotateShape);
  }
  */



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

    event.preventDefault();
    touch.target.dispatchEvent(simulatedEvent);
  }

  /*Shape.prototype.render = function() {
    switch (this.type) {
      case 'dot':
        this.coords = [[0,0]];
        break;
      case 'sSquare':
        this.coords = [[0,0], [0,1], [1,0], [1,1]];
        break;
      case 'lelbow3':
        this.coords = [[0,0], [1,0], [1,1]];
        break;
      case 'lelbow3_upscaled':
        this.coords = [[0,0], [0,1], [1,0],[1,1],[1,2], [2,0], [2,1],[2,2]];
        break;
      case 'horizontal3':
        this.coords = [[0,0], [1,0], [2,0]];
        break;
      case 'puzzle':
        this.coords = [[0,0], [0,1], [1,1], [1,2], [2,0], [2,1]];
        break;
      case 'counterpart':
        this.coords = [[0,0], [0,1], [1,1], [2,0], [2,1]];
        break;
    }
  };*/


}

export default Shape;
