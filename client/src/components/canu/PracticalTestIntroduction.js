// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";

import "./PracticalTestIntroduction.css";

import Header from "../layout/Header";
import M from "materialize-css";
import $ from "jquery";
import './practicalTest/material-walkthrough.js'; // Import the package globaly
import '@essetwide/material-walkthrough/dist/material-walkthrough.css';
import VideoPopup from "./VideoPopup"; // Import the style

class PracticalTestIntroduction extends React.Component {
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
        var elem = document.getElementById('pSecIntro');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
    }

    startIntro() {
        $.walk([ // Passing the walk points to the function
            {
                target: '#pieces-pallet', // The target as a selector
                color: '#003333', // Bg color
                content: 'The Pieces Pallet stores all the puzzle pieces.\nExtended functionality such as resizing and turning can only be used when pieces are in this area',
                acceptText: 'Ok!' // Accept text displayed in the button
            },
            {
                target: '.group', // It works also with js pure and jquery elements!
                color: '#669999', // All css color values can be setted here!,
                content: 'Puzzle pieces can be dragged in the this area and solutions can be formed here.', // YES, YOU CAN put Html code in the content!,
                acceptText: 'Perfect!'
            },
            {
                target: '#submit-button',
                color: '#336666',
                content: 'Finished Solutions can be submitted by this button.',
                acceptText: 'Alright!'
            },
            {
                target: '.slider',
                color: '#003333',
                content: 'Submitted Solutions and their rotations are added to this Slider. Rotated Solutions are already hend in to save time.',
                acceptText: 'Got it!'
            }

           /* {
                target: '#start_btn',
                color: '#2196F3',
                content: "In case you missed something out, the lifebuoy stops the time and gives you a short explanation again",
                acceptText: 'Okay!'
            }*/
        ],()=>{
            var elem = document.getElementById('pThirdIntro');
            var instance = M.Modal.init(elem,{dismissible:false});
            instance.open();
        });
    }

    startVideo(){
        var elem = document.getElementById('video-container');
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
                            <img src="/ressources/practicalTestLogo.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Practical Test</h1>
                            <p>The CANU practical test will be the main tool to assess your capability of generating new ideas.
                                In the following task, you will try to form a square with the provided puzzle pieces.</p>
                            <a href="#!" onClick={this.openSecIntro} className="waves-effect waves-light btn-large modal-action modal-close">Next</a>
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
                            <p>To explain the task some more, an interactive walkthrough is prepared here.</p>
                            <a href="#" onClick={this.startIntro} className="waves-effect waves-light btn-large modal-action modal-close">Start Walkthrough</a>
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
                            <p>Your goal is to find as many creative ways as possible to build a square with the puzzle pieces. To boost your creativity, a small video will be played beforehand.</p>
                            <a href="#" onClick={this.startVideo} className="waves-effect waves-light btn-large modal-action modal-close">Let's go</a>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default PracticalTestIntroduction;
