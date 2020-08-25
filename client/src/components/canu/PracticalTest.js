// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import M from "materialize-css"; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import $ from 'jquery';
import 'material-icons';
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
import { withRouter } from "react-router-dom";
import "./PracticalTest.css";
import PracticalTestIntroduction from "./PracticalTestIntroduction";
import VideoPopup from "./VideoPopup";


class PracticalTest extends React.Component {
    constructor(props){
        super(props);
        this.submitSolution = this.submitSolution.bind(this);
        this.test = this.test.bind(this);
    }
    // storing link to tasks
    state = {
        link: `/${this.props.match.params.studyid}/canu/questionnaire`
    };
    componentDidMount() {
        let rootEl = $('.wrapper');
        let game = new Game();
        window.view = new View(game, rootEl);
        window.view.createShapes();
        //var submit = $("<a id=\"submit-button\" class=\"waves-effect waves-light btn-large\" onclick='{this.submitSolution()}'>Submit</a>");
        //rootEl.append(submit);
        //load audio files

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
        var timerID;
        var line = 100;
        var workTime = 240;
        //var workTime = 0;
        var running = false;
        var startTime;
        var minutes = workTime / 60;
        var seconds = 0;
        var tickCheck;
        //empty the timer circle on load
        document.getElementById('circle-fill').setAttributeNS(null, 'stroke-dasharray', "0 100");

        //set the default times display in minutes
        $('#work-box').text("Work: " + (workTime / 60) + " min");
        //$('#break-box').text("Break: " + (breakTime / 60) + " min");
        $('#countdown').text(workTime / 60 + ":00");

        //This function controls the clock display and ticking
        function countDown(num) {
            seconds -= num;
            //play a tick if the second will change
            if (Math.floor(seconds) !== tickCheck) {
                //ticking.play();
                tickCheck = Math.floor(seconds);
            }
            //roll over to the next minute
            if (seconds <= 0) {
                seconds = 59.9;
                minutes -= 1;
            }
            //prevent minutes from displaying -1
            if (minutes < 0) {
                minutes = 0;
            }
            //change the countdown text
            $('#countdown').text(minutes + ":" + ("0" + Math.floor(seconds)).slice(-2));
        }

        //This is the primary timing function that is called in setInterval()
        function timer() {
            var currentTime = new Date().getTime();
            //Time to work. Fill the circle.
            //Start the break countdown
            line -= (((currentTime - startTime) / 1000) / workTime) * 100;
            countDown((currentTime - startTime) / 1000);
            startTime = currentTime;
            //Keep the circle from underfilling, creates a visual glitch
            if (line < 0) {
                line = 0;
            }
            document.getElementById('circle-fill').setAttributeNS(null, 'stroke-dasharray', line + " 100");
        }

        //functions for the start, pause, and reset buttons
        $('#start-button').click(function () {
            if (!running) {
                $('#circle-fill').css('transition', 'stroke-dasharray 0.1s');
                startTime = new Date().getTime();
                timerID = setInterval(timer, 50);
                running = true;
            }
            $('#activity').addClass("animated rubberBand");
        });

        $('#pause-button').click(function () {
            running = false;
            clearInterval(timerID);
            $('#activity').removeClass("animated rubberBand");
        });

        $('#reset-button').click(function () {
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
        });
    }


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

    calculateUsefulness(grid) {
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
                var topIsEmpty,botIsEmpty,rightIsEmpty,leftIsEmpty = true;
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
                if(topIsEmpty+botIsEmpty === rightIsEmpty+leftIsEmpty){

                } else {
                    return grid.length - 1;
                }
            }
            if(leftIsEmpty && rightIsEmpty && botIsEmpty && topIsEmpty){
                maxSize-=2;
                posTop++;
                posLeft++;
                maxPosBottom--;
                maxPosRight--;

            } else {
                emptyCounter = this.calculateEmptyCounter(topIsEmpty,rightIsEmpty,botIsEmpty,leftIsEmpty);
                if (emptyCounter>=2) {
                    maxSize--;
                    break;
                }
                if (emptyCounter < 2) {
                    return emptyCounter;
                }
            }
            if(!(leftIsEmpty || rightIsEmpty || botIsEmpty || topIsEmpty)){
                return maxSize;
            }
        }
    }

    largestSquare(grid) {
        var cache = grid.clone();
        var result = 0;
        for (var i = 0; i < grid.length; i++) {
            for (var n = 0; n < grid[i].length; n++) {
                if(i===0 || n === 0){

                } else if(cache[i][n] > 0){
                    cache[i][n] = 1+ Math.min(cache[i-1][n],cache[i][n-1],cache[i-1][n-1]);
                }
                if(cache[i][n] > result){
                    result = cache[i][n];
                }
            }
        }
        return result;
    }
    calulateSize(topIsEmpty,rightIsEmpty,botIsEmpty,leftIsEmpty) {
        var counter = 0;
        if(topIsEmpty){
            counter++;
        }
        if(rightIsEmpty){
            counter++;
        }
        if(botIsEmpty){
            counter++;
        }
        if(leftIsEmpty){
            counter++;
        }
        return counter;
    }

    calculateUsefulnes(val) {
        return val;
    }

    test(){
    console.log("test");
    this.props.history.push(this.state.link);
    }


    render() {
        return (
            <div style={{height:"100%"}}>
                <PracticalTestIntroduction  />
                <div id="piece-found" className="modal piece-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img src="/ressources/puzzle.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Ups!</h1>
                            <p>You have already submitted this solution.</p>
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
                        <h2>Form a square with Pieces provided in the Puzzle Pallete</h2>
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
                        <a id="submit-button" className="waves-effect waves-light btn-large"
                           onClick={this.submitSolution} onMouseDown={this.submitSolution}>Submit</a>
                    </div>
                    <div className="module-footer">
                        <div className="footer-left">
                            <div className="btn-group btn-group-md">
                                <button className="btn btn-success" id="start-button"><i
                                    className="fa fa-play"></i> Start
                                </button>
                                <button className="btn btn-warning" id="pause-button"><i
                                    className="fa fa-pause"></i> Pause
                                </button>
                                <button className="btn btn-danger" id="reset-button">Reset</button>
                                <a onClick={this.test} className="waves-effect waves-light btn-large modal-action modal-close">Paddle!</a>
                            </div>
                        </div>
                        <div className="footer-right">
                            <h4>Timeline</h4>
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
                <img className="background" src="/ressources/background.svg"></img>
            </div>
    );
    }
    }

    export default PracticalTest;
