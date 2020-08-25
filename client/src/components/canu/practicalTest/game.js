import Board from "./board";
const Shape = require("./shape");
const MoveError = require("./moveError");

class Game {
    constructor() {
        this.board = new Board();
        //this.shape = new Shape();
    }
}
export default Game;
