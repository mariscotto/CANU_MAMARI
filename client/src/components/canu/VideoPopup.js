// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first

import "./VideoPopup.css";
import M from "materialize-css";
import Countdown2 from "./Countdown2";

class VideoPopup extends React.Component {
    // storing link to tasks

    componentDidMount() {
        var vid = document.getElementById("video");
        vid.onended = function() {
            var elem = document.getElementById('video-container');
            var instance = M.Modal.init(elem,{dismissible:false});
            instance.close();
            var elem = document.getElementById('start-popup');
            var instance = M.Modal.init(elem,{dismissible:false});
            instance.open();
        };
    }
    startCountdown(){
        var elem = document.getElementById('countdown-popup');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
    }
    /*startVideo(){
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
        onMouseDown={this.startVideo}
    }*/

    render() {
        return (
            <div>
                <div id="video-container" className="modal">
                    <div className="modal-content">
                        <video id="video" controls={true}>
                            <source src="/ressources/motivation.mp4" type="video/mp4"></source>
                        </video>
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
                            <a id="start-practical-test" onClick={this.startCountdown} className="waves-effect waves-light btn-large modal-action modal-close">Start</a>
                        </div>
                    </div>
                </div>
                <Countdown2 />
            </div>
    );
    }
    }

    export default VideoPopup;
