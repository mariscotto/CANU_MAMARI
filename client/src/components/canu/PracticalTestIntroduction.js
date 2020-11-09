// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import {Trans, withTranslation } from 'react-i18next';
import "./PracticalTestIntroduction.css";

import Header from "../layout/Header";
import M from "materialize-css";
import $ from "jquery";
import './practicalTest/material-walkthrough.js'; // Import the package globaly
import '@essetwide/material-walkthrough/dist/material-walkthrough.css';
import VideoPopup from "./VideoPopup";
import Countdown2 from "./Countdown2"; // Import the style

class PracticalTestIntroduction extends React.Component {
    constructor(props) {
        super(props);
        this.startIntro = this.startIntro.bind(this);
        this.openStartIntro = this.openStartIntro.bind(this);
        this.setStartTime = this.setStartTime.bind(this);
    }

    // storing link to tasks
    /*state = {
        link: `/${this.props.match.params.studyid}/canu/active`
    };*/

    componentDidMount() {
        var elem = document.getElementById('pFirstIntro');
        var instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
    }

    openSecIntro() {
        var elem2 = document.getElementById('pFirstIntro');
        var instance2 = M.Modal.init(elem2, {dismissible: false});
        instance2.close();
        var elem = document.getElementById('pSecIntro');
        var instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
    }

    startIntro() {
        var self = this;
        var elem = document.getElementById('pSecIntro');
        var instance = M.Modal.init(elem, {dismissible: false});
        instance.close();
        $.walk([ // Passing the walk points to the function
            {
                target: '#pieces-pallet', // The target as a selector
                color: '#003333', // Bg color
                content: this.props.t("practicaltest_walkthrough1"),
                acceptText: 'Ok!' // Accept text displayed in the button The Pieces Pallet stores all the puzzle pieces. Extended functionality such as resizing and turning can only be used when pieces are in this area
            },
            {
                target: '.group', // It works also with js pure and jquery elements!
                color: '#336666', // All css color values can be setted here!,
                content: this.props.t("practicaltest_walkthrough2"), // YES, YOU CAN put Html code in the content!,
                acceptText: 'Perfect!'
            },
            {
                target: '#submit-button',
                color: '#003333',
                content: this.props.t("practicaltest_walkthrough3"),
                acceptText: 'Alright!'
            },
            {
                target: '.slider',
                color: '#336666',
                content: this.props.t("practicaltest_walkthrough4"),
                acceptText: 'Got it!'
            },
            {
                target: '#p-finish-button',
                color: '#003333',
                content: this.props.t("practicaltest_walkthrough5"),
                acceptText: 'Okay!'
            }

            /* {
                 target: '#start_btn',
                 color: '#2196F3',
                 content: "In case you missed something out, the lifebuoy stops the time and gives you a short explanation again",
                 acceptText: 'Okay!'
             }*/
        ], () => {
            if (self.props.motivated) {
                var elem2 = document.getElementById('pClockIntro');
                var instance2 = M.Modal.init(elem2, {dismissible: false});
                instance2.open();
            } else {
                var elem = document.getElementById('pThirdIntro');
                var instance = M.Modal.init(elem, {dismissible: false});
                instance.open();
            }
        });
    }

    startVideo() {
        var elem2 = document.getElementById('pThirdIntroMotivated');
        var instance2 = M.Modal.init(elem2, {dismissible: false});
        instance2.close();
        var elem = document.getElementById('video-container');
        var instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
        var vid = document.getElementById("video");
        vid.play();
    }

    openStartIntro() {
        var elem2 = document.getElementById('pThirdIntro');
        var instance2 = M.Modal.init(elem2, {dismissible: false});
        instance2.close();
        if (this.props.motivated) {
            var elem = document.getElementById('start-popup');
            var instance = M.Modal.init(elem, {dismissible: false});
            instance.open();
        } else {
            var elem = document.getElementById('start-popup-not');
            var instance = M.Modal.init(elem, {dismissible: false});
            instance.open();
        }
    }

    openStartIntroMotivated() {
        var elem2 = document.getElementById('pThirdIntroMotivated');
        var instance2 = M.Modal.init(elem2, {dismissible: false});
        instance2.close();
        var elem = document.getElementById('start-popup');
        var instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
    }

    openThirdIntroMotivated() {
        var elem2 = document.getElementById('pClockIntro');
        var instance2 = M.Modal.init(elem2, {dismissible: false});
        instance2.close();
        var elem = document.getElementById('pThirdIntroMotivated');
        var instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
    }

    setStartTime(){
        this.props.practicalTest.setStartTime();
    }
    startCountdown() {
        var elem2 = document.getElementById('start-popup');
        var instance2 = M.Modal.init(elem2, {dismissible: false});
        instance2.close();
        var elem = document.getElementById('countdown-popup');
        var instance = M.Modal.init(elem, {dismissible: false});
        instance.open();
    }

    render() {
        return (
            <div>
                <VideoPopup/>
                <div id="pFirstIntro" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img id="practical-test-logo" src="/ressources/practicalTestLogo.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Puzzle Task</h1>
                            <p>{this.props.t("practicaltest_info1")}</p>
                            <a href="#!" onMouseDown={this.openSecIntro}
                               className="waves-effect waves-light btn-large modal-action modal-close">Next</a>
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
                            <p>{this.props.t("practicaltest_info2")}</p>
                            <a href="#!" onMouseDown={this.startIntro}
                               className="waves-effect waves-light btn-large modal-action modal-close">Start
                                Walkthrough</a>
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
                            <p>{this.props.t("practicaltest_info3")}</p>
                            <a href="#!" onMouseDown={this.openThirdIntroMotivated}
                               className="waves-effect waves-light btn-large modal-action modal-close">Okay</a>
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
                            <p>{this.props.t("practicaltest_info4")}</p>
                            <a href="#!" onMouseDown={this.openStartIntro}
                               className="waves-effect waves-light btn-large modal-action modal-close">Let's go</a>
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
                            <p>{this.props.t("practicaltest_info4motivated")}</p>
                            <a href="#!"  onMouseDown={this.openStartIntroMotivated}
                               className="waves-effect waves-light btn-large modal-action modal-close">Let's go</a>
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
                            <p>{this.props.t("practicaltest_info5")}</p>
                            <a id="start-practical-test" onMouseDown={this.startCountdown}
                               className="waves-effect waves-light btn-large modal-action modal-close">Start</a>
                        </div>
                    </div>
                </div>
                <div id="start-popup-not" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img id="fire" src="/ressources/fire.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Ready!</h1>
                            <p>{this.props.t("practicaltest_info5")}</p>
                            <a id="start-practical-test" href="#!" onMouseDown={this.setStartTime}
                               className="waves-effect waves-light btn-large modal-action modal-close">Start</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withTranslation()(PracticalTestIntroduction);
