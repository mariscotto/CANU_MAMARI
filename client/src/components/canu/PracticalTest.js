// Study Landing Page Component

import React from "react";
import {Link, withRouter} from "react-router-dom";
import M from "materialize-css"; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import $ from 'jquery';
import 'material-icons';
import "./PracticalTest.css";
import './practicalTest/board.js';
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';
import Game from './practicalTest/game.js';
import View from './practicalTest/view.js';
/*import './practicalTest/moveError.js';
import './practicalTest/nullTile.js';
import './practicalTest/shape.js';
import './practicalTest/tile.js';
import './practicalTest/tray.js';*/
import PracticalTestIntroduction from "./PracticalTestIntroduction";
import VideoPopup from "./VideoPopup";
import axios from "axios";
import Impressum from "./Impressum";
import Countdown2 from "./Countdown2";


class PracticalTest extends React.Component {
    constructor(props) {
        super(props);
        this.submitSolution = this.submitSolution.bind(this);
        this.compareSolution = this.compareSolution.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.postSolutions = this.postSolutions.bind(this);
        this.triggerSubmitSolution = this.triggerSubmitSolution.bind(this);
    }

    // storing link to tasks
    state = {
        link: `/${this.props.match.params.studyid}/${
            this.props.match.params.groupid
        }/canu/apm`,
        solutions: [],
        motivated: undefined,
    };
    line = 100;
    workTime = 720;
    running = false;
    startTime;
    minutes = this.workTime / 60;
    seconds = 0;
    tickCheck;

    onChangeSolutions(e) {
        if (e.target.checked) {
            this.setState({
                solutions: [...this.state.solutions, e.target.value]
            })
        } else {
            this.setState({solutions: this.state.solutions.filter(solution => solution !== e.target.value)})
        }
    };

    async postSolutions() {
        return await Promise.all([this.state.solutions.map(async (solution) => {
            const usefulness = this.calculateUsefulness(solution);
            var minSolution = this.beautifySolution(this.deepCloneArray(solution));
            const solutionObject = {
                solution: this.prepareArrayForPost(minSolution),
                usefulness_score: usefulness
            };

            try {
                const res = await axios.post(
                    `/api/solutionCanu/${this.props.match.params.studyid}/${
                        this.props.match.params.groupid
                    }`,
                    solutionObject
                );
                console.log(res.data);
            } catch (err) {
                console.log(err.response);
            }
        })]);
    }

    componentDidMount() {
        const rootEl = $('.wrapper');
        const game = new Game();
        window.view = new View(game, rootEl);
        window.view.createShapes();
        //var submit = $("<a id=\"submit-button\" class=\"waves-effect waves-light btn-large\" onclick='{this.submitSolution()}'>Submit</a>");
        //rootEl.append(submit);
        //load audio files
        //Motivated or Not


        window.view.swiper = new Swiper('.swiper-container', {
            slidesPerView: 6,
            spaceBetween: 10,
            freeMode: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        /*axios.get(`/api/study/${this.props.match.params.groupid}/getGroup`)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err.response);
            });*/
        document.getElementById('circle-fill').setAttributeNS(null, 'stroke-dasharray', "0 100");
        if(this.state.motivated) {
            document.getElementById('circle-fill').setAttributeNS(null, 'stroke-dasharray', "100 100");
            $('#work-box').text("Work: " + (this.workTime / 60) + " min");
            $('#countdown').text(this.workTime / 60 + ":00");
        }
       // $(".clock-container").css("visibility", "hidden");
        //This function controls the clock display and ticking

        //functions for the start, pause, and reset buttons
        /* $('#start-button').click(function () {
             if (!running) {
                 $('#circle-fill').css('transition', 'stroke-dasharray 0.1s');
                 startTime = new Date().getTime();
                 timerID = setInterval(timer, 90);
                 running = true;
             }
             $('#activity').addClass("animated rubberBand");
         });*/
/*
        $('#pause-button').click(function () {
            this.state.running = false;
            clearInterval(this.state.timerID);
            $('#activity').removeClass("animated rubberBand");
        });*/

        /*$('#reset-button').click(function () {
            minutes = workTime / 60;
            running = false;
            clearInterval(timerID);
            line = 0;
            minutes = workTime / 60;
            seconds = 0;
            $('#countdown').text(workTime / 60 + ":00");
            $('#activity').text("");
            $('#activity').removeClass("animated rubberBand");
            $('#work-slider').slider('enable');
            $('#work-box').css('background-color', '#212121');
            $('#work-box').css('color', '#E0F7FA');
            $('#break-slider').slider('enable');
            $('#break-box').css('background-color', '#212121');
            $('#break-box').css('color', '#E0F7FA');
            $('#circle-fill').css('transition', 'stroke-dasharray 1.5s ease-out');
            document.getElementById('circle-fill').setAttributeNS(null, 'stroke-dasharray', "0 100");
        });*/
    }

    startClock() {
        var self = this;
        //$('#break-box').text("Break: " + (breakTime / 60) + " min");
        if (!this.running) {
            $('#circle-fill').css('transition', 'stroke-dasharray 0.1s');
            this.startTime = new Date().getTime();
            this.timerID = setInterval(this.timer.bind(this), 100);
            this.running = true;
        }
        $('#activity').addClass("animated rubberBand");
    }

    timer() {
        const currentTime = new Date().getTime();
        //Time to work. Fill the circle.
        //Start the break countdown
        this.line -= (((currentTime - this.startTime) / 1000) / this.workTime) * 100;
        if (this.line < 0) {
            this.line = 0;
        }
        document.getElementById('circle-fill').setAttributeNS(null, 'stroke-dasharray', this.line + " 100");
        this.countDown((currentTime - this.startTime) / 1000);
        this.startTime = currentTime;
        //Keep the circle from underfilling, creates a visual glitch
    }

    countDown(num) {
        this.seconds -= num;
        //play a tick if the second will change
        if (Math.floor(this.seconds) !== this.tickCheck) {
            //ticking.play();
            this.tickCheck = Math.floor(this.seconds);
        }
        //roll over to the next minute
        if (this.seconds <= 0 && this.minutes <= 0) {
            clearInterval(this.timerID);
            //console.log(this.postSolution);
            var elem = document.getElementById('countdown-over');
            var instance = M.Modal.init(elem,{dismissible:false});
            instance.open();
            // this.postSolution();
        } else if (this.seconds <= 0) {
            this.seconds = 59.9;
            this.minutes -= 1;
        }
        //prevent minutes from displaying -1
        if (this.minutes < 0) {
            this.minutes = 0;
        }
        if (this.seconds < 0) {
            this.seconds = 0;
        }
        //change the countdown text
        if ($('#countdown')) {
            $('#countdown').text(this.minutes + ":" + ("0" + Math.floor(this.seconds)).slice(-2));
        }
    }
    onSubmitPopup(){
        var elem = document.getElementById('practical-test-finish');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
    }
    triggerSubmitSolution(){
        this.postSolutions().then((r) => {this.props.history.push(this.state.link);});
    }

    submitSolution() {
        var boardGrid = window.view.game.board.grid;
        var solutions = this.state.solutions;
        var minifiedGrid;
        //console.log(this.compareSolution(boardGrid));
        if (this.isPieceInGrid(boardGrid)) {
            if (!this.compareSolution(boardGrid)) {
                /*$(".App").addClass("blink-2");
                setTimeout(() =>  $(".App").removeClass("blink-2"), 750);*/
                console.log(this.calculateUsefulness(boardGrid));
                minifiedGrid = this.beautifySolution(this.deepCloneArray(boardGrid));
                this.buildSolutionGrid(minifiedGrid);
                solutions.push(this.deepCloneArray(boardGrid));
                var rotatedGrid = boardGrid;
                if (this.shapeInGridRotatable(boardGrid)) {
                    for (var i = 0; i < 3; i++) {
                        rotatedGrid = this.rotateSolutionGrid(rotatedGrid);
                        solutions.push(this.deepCloneArray(rotatedGrid));
                        minifiedGrid = this.beautifySolution(this.deepCloneArray(rotatedGrid));
                        //this.buildSolutionGrid(minifiedGrid);
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

    prepareArrayForPost(solution){
        return solution.map(row => row.map((col) => {return {kind:col.kind}}));
    }

    deepCloneArray(arr) {
        //  return arr.map(row => row.slice(0));
        return JSON.parse(JSON.stringify(arr));
    }

    buildSolutionGrid(boardGrid) {
        var self = this;
        var swiperContainer = $("<div>").addClass("swiper-slide");
        var $ul = $("<ul>").addClass("solution");
        $ul.css('min-height', boardGrid.length * 20 + "px");
        $ul.css('max-height', boardGrid.length * 20 + "px");
        $ul.css('min-width', boardGrid[0].length * 20 + "px");
        $ul.css('max-width', boardGrid[0].length * 20 + "px");
        boardGrid.forEach(function (row, rowIdx) {
            row.forEach(function (tile, tileIdx) {
                var $li = $("<li>");
                $li.data("pos", [rowIdx, tileIdx]);
                $li.css('background', tile.color);
                if (!tile.color) {
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
        var solutions = this.state.solutions;
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
            i + n * 5 <= f + j * 5 ? condition = f <= newSolution.length - 1 || j <= newSolution.length - 1 : condition = i <= newSolution.length - 1 || n <= newSolution.length - 1;
            for (; condition;) {
                if (solution[f][j].kind !== newSolution[i][n].kind) {
                    break;
                    //return false;
                }
                if ((f === newSolution.length - 1 && j === newSolution.length - 1) || (i === newSolution.length - 1 && n === newSolution.length - 1)) {
                    status = true;
                    break;
                }
                if (n === newSolution.length - 1) {
                    n = -1;
                    i++;
                }
                if (j === newSolution.length - 1) {
                    j = -1;
                    f++;
                }
                j++;
                n++;
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

    calculateUsefulness(grid) {
        var usefulnessOuterVariables = this.calculateUsefulnessOuter(this.deepCloneArray(grid));
        var usefulnessOuter = usefulnessOuterVariables[0] / usefulnessOuterVariables[1];
        var usefulnessInner = this.calculateUsefulnessInner(this.deepCloneArray(grid), usefulnessOuterVariables[0], usefulnessOuterVariables[1]);
        return usefulnessOuter >= usefulnessInner ? usefulnessOuter : usefulnessInner;
    }

    calculateUsefulnessOuter(grid) {
        var totalFields;
        var filledFields = 0;
        this.removeTopRows(grid);
        this.removeBotRows(grid);
        this.removeLeftCols(grid);
        this.removeRightCols(grid);
        grid.length >= grid[0].length ? totalFields = grid.length * grid.length : totalFields = grid[0].length * grid[0].length;
        for (let i = 0; i < grid.length; i++) {
            for (let n = 0; n < grid[i].length; n++) {
                if (grid[i][n].type) {
                    filledFields++;
                }
            }
        }
        return [filledFields, totalFields];
    }

    calculateUsefulnessInner(grid, filledFields, totalFieldsOuter) {
        var largestSquare = this.largestSquare(grid);
        var fields = largestSquare * largestSquare;
        //if (largestSquare === totalFieldsOuter - 1) {
        return (fields - (filledFields - fields)) / fields;

    }

    deleteRow(arr, row) {
        // arr = arr.slice(0); // make copy
        arr.splice(row, 1);
        return arr;
    }

    deleteCol(arr, col) {
        //  arr = arr.slice(0); // make copy
        for (let i = 0; i < arr.length; i++) {
            let row = arr[i];
            row.splice(col, 1);
        }
        return arr;
    }

    removeTopRows(grid) {
        var deleted = true;
        var pieceFoundFlag = false;
        for (let i = 0; i < grid.length; i++) {
            for (let n = 0; n < grid[i].length; n++) {
                if (grid[0][n].type) {
                    deleted = false;
                    pieceFoundFlag = true;
                    break;
                }
            }
            if (pieceFoundFlag) {
                pieceFoundFlag = false;
                break;
            }
            if (deleted) {
                grid = this.deleteRow(grid, 0);
                deleted = true;
            }
        }
        return grid;
    }

    removeBotRows(grid) {
        var deleted = true;
        var pieceFoundFlag = false;
        for (let a = grid.length - 1; a >= 0; a--) {
            for (let b = 0; b < grid[a].length; b++) {
                if (grid[grid.length - 1][b].type) {
                    deleted = false;
                    break;
                }
            }
            if (pieceFoundFlag) {
                pieceFoundFlag = false;
                break;
            }
            if (deleted) {
                grid = this.deleteRow(grid, grid.length - 1);
                deleted = true;
            }
        }
        return grid;
    }

    removeLeftCols(grid) {
        var deleted = true;
        var pieceFoundFlag = false;
        for (let f = 0; f < grid[0].length; f++) {
            for (let j = 0; j < grid.length; j++) {
                if (grid[j][0].type) {
                    deleted = false;
                    pieceFoundFlag = true;
                    break;
                }
            }
            if (pieceFoundFlag) {
                return grid;
            }
            if (deleted) {
                grid = this.deleteCol(grid, 0);
                deleted = true;
            }
        }
        return grid;
    }

    removeRightCols(grid) {
        var deleted = true;
        var pieceFoundFlag = false;
        for (let y = grid[0].length - 1; y >= 0; y--) {
            for (let z = 0; z < grid.length; z++) {
                if (grid[z][grid[0].length - 1].type) {
                    deleted = false;
                    pieceFoundFlag = true;
                    break;
                }
            }
            if (pieceFoundFlag) {
                return grid;
            }
            if (deleted) {
                grid = this.deleteCol(grid, grid[0].length - 1);
                deleted = true;
            }
        }
        return grid;
    }


    beautifySolution(grid) {
        this.removeTopRows(grid);
        this.removeBotRows(grid);
        this.removeLeftCols(grid);
        this.removeRightCols(grid);
        return grid;
    }

    /*calculateUsefulness(grid) {
        var colIsNotEmpty = false;
        var lineIsNotEmpty = false;
        var maxPosRight = grid.length;
        var maxPosBottom = grid.length;
        var posTop = 0;
        var posLeft = 0;
        var maxSize = grid.length;
        var emptyCounter;
        for (var i = 0; i < 4; i++) {
            for (var n = 0; n < grid[i].length; n++) {
                var topIsEmpty, botIsEmpty, rightIsEmpty, leftIsEmpty = true;
                if (grid[posTop][n].type) {
                    topIsEmpty = false;
                }
                if (grid[maxPosBottom][n].type) {
                    botIsEmpty = false;
                }
                if (grid[n][posLeft].type) {
                    leftIsEmpty = false;
                    colIsNotEmpty++;
                }
                if (grid[maxPosRight][n].type) {
                    rightIsEmpty = false;
                }
                if (topIsEmpty + botIsEmpty === rightIsEmpty + leftIsEmpty) {

                } else {
                    return grid.length - 1;
                }
            }
            if (leftIsEmpty && rightIsEmpty && botIsEmpty && topIsEmpty) {
                maxSize -= 2;
                posTop++;
                posLeft++;
                maxPosBottom--;
                maxPosRight--;

            } else {
                emptyCounter = this.calculateEmptyCounter(topIsEmpty, rightIsEmpty, botIsEmpty, leftIsEmpty);
                if (emptyCounter >= 2) {
                    maxSize--;
                    break;
                }
                if (emptyCounter < 2) {
                    return emptyCounter;
                }
            }
            if (!(leftIsEmpty || rightIsEmpty || botIsEmpty || topIsEmpty)) {
                return maxSize;
            }
        }
    }*/


    encodeArray(grid) {
        var arr = this.deepCloneArray(grid);
        for (var i = 0; i < arr.length; i++) {
            for (var n = 0; n < arr[i].length; n++) {
                if (arr[i][n].type) {
                    arr[i][n] = 1;
                } else {
                    arr[i][n] = 0;
                }
            }
        }
        return arr;
    }

    largestSquare(grid) {
        var cache = this.encodeArray(grid);
        var result = 0;
        for (var i = 0; i < grid.length; i++) {
            for (var n = 0; n < grid[i].length; n++) {
                if (i === 0 || n === 0) {

                } else if (cache[i][n] > 0 || cache[i][n].type) {
                    cache[i][n] = 1 + Math.min(cache[i - 1][n], cache[i][n - 1], cache[i - 1][n - 1]);
                }
                if (cache[i][n] > result) {
                    result = cache[i][n];
                }
            }
        }
        return result;
    }

    openImpressum() {
        var elem = document.getElementById('impressum');
        var instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
    }

    render() {
        const randomNum = Math.round(Math.random());
        randomNum === 1 ? this.state.motivated = false : this.state.motivated = true;
        return (
            <div style={{height: "100%"}}>
                <Countdown2 practicalTest={this} motivated={this.state.motivated}/>
                <Impressum/>
                <PracticalTestIntroduction motivated={this.state.motivated}/>
                <div id="practical-test-finish" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img className="lifeguard-logo" src="/ressources/lifeguardLogo.svg"/>
                        </div>
                        <div className="text-container">
                            <h1>Finish</h1>
                            <p>Are you done with the Practical Test?</p>
                            <div className="popup-footer">
                            <a onClick={this.triggerSubmitSolution}
                               className="waves-effect waves-light btn-large">Yes</a>
                            <a href="#!" className="waves-effect waves-light btn-large modal-action modal-close">No</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="countdown-over" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img id="clock-logo" src="/ressources/clock.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Time's up</h1>
                            <p>You've finished the Practical Test - click next to proceed.</p>
                            <a href="#" onMouseDown={this.triggerSubmitSolution} className="waves-effect waves-light btn-large modal-action modal-close">Okay</a>
                        </div>
                    </div>
                </div>
                <div id="piece-found" className="modal piece-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img src="/ressources/puzzle.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Ups!</h1>
                            <p>You have already submitted this solution or a rotation of it.</p>
                            <a href="#!" className="waves-effect waves-light btn-large modal-action modal-close">Got
                                it</a>
                        </div>
                    </div>
                </div>
                <div id="no-piece" className="modal piece-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img src="/ressources/oval.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Sorry!</h1>
                            <p>There are no pieces in the grid.</p>
                            <a href="#!" className="waves-effect waves-light btn-large modal-action modal-close">Got
                                it</a>
                        </div>
                    </div>
                </div>

                <div className="header">
                    <div className="left-area">
                        <h1>Practical Test</h1>
                        <h4>Pieces Pallete</h4>
                    </div>
                    <div className="right-area">
                        <h2>Try to form squares with the pieces provided in the Pieces Pallete</h2>
                        <div className="clock-container">
                            <div id="main">
                                <div id="countdown"></div>
                                <svg viewBox="0 0 63.66 63.66" id="timer">
                                    <circle id="circle-base" cx="50%" cy="50%" r="25%"/>
                                    <circle id="circle-fill" cx="50%" cy="50%" r="25%"/>
                                    Sorry, your browser does not support inline SVG.
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="module-area">
                    <div className="wrapper">
                        <div id="button-nav-bar">
                        <a id="submit-button" className="waves-effect waves-light btn-large"
                           onMouseDown={this.submitSolution}>Submit</a>
                        <a id="p-finish-button" className="waves-effect waves-light btn-large"
                           onMouseDown={this.onSubmitPopup}>Finish</a>
                        </div>
                    </div>
                    <div className="module-footer">
                        <div className="footer-left">
                            {/*<div className="btn-group btn-group-md">
                                <button className="btn btn-success" id="start-button"><i
                                    className="fa fa-play"></i> Start
                                </button>
                                <button className="btn btn-warning" id="pause-button"><i
                                    className="fa fa-pause"></i> Pause
                                </button>
                                <button className="btn btn-danger" id="reset-button">Reset</button>
                                <a onClick={this.postSolutions}
                                   className="waves-effect waves-light btn-large modal-action modal-close">Paddle!</a>
                            </div>*/}
                        </div>
                        <div className="footer-right">
                            <h4>Solutions</h4>
                            <div className="slider">
                                <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                    </div>
                                    <div className="swiper-button-next"></div>
                                    <div className="swiper-button-prev"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <a className="waves-effect waves-light btn-small impressum-button modal-trigger"
                   onClick={this.openImpressum}>i</a>
                <img className="background" src="/ressources/background_s.svg"></img>
            </div>
        );
    }
}

export default PracticalTest;
