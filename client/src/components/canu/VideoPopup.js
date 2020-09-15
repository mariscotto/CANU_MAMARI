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
            var elem2 = document.getElementById('video-container');
            var instance2 = M.Modal.init(elem2,{dismissible:false});
            instance2.close();
            var elem = document.getElementById('start-popup');
            var instance = M.Modal.init(elem,{dismissible:false});
            instance.open();
        };
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
            </div>
    );
    }
    }

    export default VideoPopup;
