// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";

import "./PracticalTestIntroduction.css";

import Header from "../layout/Header";
import M from "materialize-css";
import $ from "jquery";
import './practicalTest/material-walkthrough.js'; // Import the package globaly
import '@essetwide/material-walkthrough/dist/material-walkthrough.css';
import VideoPopup from "./VideoPopup";
import Countdown2 from "./Countdown2"; // Import the style

class PracticalTestIntroduction extends React.Component {
    constructor(props){
        super(props);
        this.startIntro = this.startIntro.bind(this);
    }
    // storing link to tasks
    /*state = {
        link: `/${this.props.match.params.studyid}/canu/active`
    };*/

    componentDidMount() {
        var elem = document.getElementById('pFirstIntro');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
    }

    openSecIntro(){
        var elem2 = document.getElementById('pFirstIntro');
        var instance2 = M.Modal.init(elem2,{dismissible:false});
        instance2.close();
        var elem = document.getElementById('pSecIntro');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
    }

    startIntro() {
        var self = this;
        var elem = document.getElementById('pSecIntro');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.close();
        $.walk([ // Passing the walk points to the function
            {
                target: '#pieces-pallet', // The target as a selector
                color: '#003333', // Bg color
                content: 'Choose the puzzle pieces you need here. You can resize or rotate them only in this area',
                acceptText: 'Ok!' // Accept text displayed in the button The Pieces Pallet stores all the puzzle pieces. Extended functionality such as resizing and turning can only be used when pieces are in this area
            },
            {
                target: '.group', // It works also with js pure and jquery elements!
                color: '#669999', // All css color values can be setted here!,
                content: 'Drag and drop the puzzle pieces in this area to form solutions here.', // YES, YOU CAN put Html code in the content!,
                acceptText: 'Perfect!'
            },
            {
                target: '#submit-button',
                color: '#003333',
                content: 'Submit your solution with this button.',
                acceptText: 'Alright!'
            },
            {
                target: '.slider',
                color: '#669999',
                content: 'Submitted Solutions are added here.',
                acceptText: 'Got it!'
            },
            {
                target: '#p-finish-button',
                color: '#003333',
                content: 'The Puzzle Task can be finished with this button.',
                acceptText: 'Okay!'
            }

           /* {
                target: '#start_btn',
                color: '#2196F3',
                content: "In case you missed something out, the lifebuoy stops the time and gives you a short explanation again",
                acceptText: 'Okay!'
            }*/
        ],() => {
            if(self.props.motivated){
                var elem2 = document.getElementById('pClockIntro');
                var instance2 = M.Modal.init(elem2,{dismissible:false});
                instance2.open();
            } else {
                var elem = document.getElementById('pThirdIntro');
                var instance = M.Modal.init(elem, {dismissible: false});
                instance.open();
            }
        });
    }

    startVideo(){
        var elem2 = document.getElementById('pThirdIntroMotivated');
        var instance2 = M.Modal.init(elem2,{dismissible:false});
        instance2.close();
        var elem = document.getElementById('video-container');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
        var vid = document.getElementById("video");
        vid.play();
    }

    openStartIntro(){
        var elem2 = document.getElementById('pThirdIntro');
        var instance2 = M.Modal.init(elem2,{dismissible:false});
        instance2.close();
        var elem = document.getElementById('start-popup');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
    }
    openThirdIntroMotivated(){
        var elem2 = document.getElementById('pClockIntro');
        var instance2 = M.Modal.init(elem2,{dismissible:false});
        instance2.close();
        var elem = document.getElementById('pThirdIntroMotivated');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
    }
    startCountdown(){
        var elem2 = document.getElementById('start-popup');
        var instance2 = M.Modal.init(elem2,{dismissible:false});
        instance2.close();
        var elem = document.getElementById('countdown-popup');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
    }
    render() {
        return (
            <div>
                <VideoPopup />
                <div id="pFirstIntro" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img id="practical-test-logo" src="/ressources/practicalTestLogo.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Puzzle Task</h1>
                            <p>The CANU Puzzle Task will be the main tool to assess your capability of generating new ideas.
                                In the following task, you will try to form a square with the provided puzzle pieces.</p>
                            <a href="#!" onMouseDown={this.openSecIntro} className="waves-effect waves-light btn-large modal-action modal-close">Next</a>
                        </div>
                    </div>
                </div>
                <div id="pSecIntro" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img id="walkthrough" src="/ressources/walkthrough.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Walkthrough</h1>
                            <p>To explain the interface and the task in more depth, let's do a virtual walkthrough.</p>
                            <a href="#" onMouseDown={this.startIntro} className="waves-effect waves-light btn-large modal-action modal-close">Start Walkthrough</a>
                        </div>
                    </div>
                </div>
                <div id="pClockIntro" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img id="clock-logo" src="/ressources/clock.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Time</h1>
                            <p>A time limit of 12 minutes is set for this Puzzle Task. A timer on the top right corner will let you keep track of it.</p>
                            <a href="#" onMouseDown={this.openThirdIntroMotivated} className="waves-effect waves-light btn-large modal-action modal-close">Okay</a>
                        </div>
                    </div>
                </div>
                <div id="pThirdIntro" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img src="/ressources/solution.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Solutions</h1>
                            <p>Your goal is to find as many creative ways as possible to build a square with the puzzle pieces.</p>
                            <a href="#" onMouseDown={this.openStartIntro} className="waves-effect waves-light btn-large modal-action modal-close">Let's go</a>
                        </div>
                    </div>
                </div>
                <div id="pThirdIntroMotivated" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img src="/ressources/solution.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Solutions</h1>
                            <p>Your goal is to find as many creative ways as possible to build a square with the puzzle pieces. To boost your creativity, a small video will be played beforehand.</p>
                            <a href="#" onMouseDown={this.startVideo} className="waves-effect waves-light btn-large modal-action modal-close">Let's go</a>
                        </div>
                    </div>
                </div>
                <div id="start-popup" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img id="fire" src="/ressources/fire.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Ready!</h1>
                            <p>You are set to get creative - if you are ready, hit start.</p>
                            <a id="start-practical-test" onMouseDown={this.startCountdown} className="waves-effect waves-light btn-large modal-action modal-close">Start</a>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default PracticalTestIntroduction;
