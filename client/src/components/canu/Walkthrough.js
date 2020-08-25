// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first
import './practicalTest/material-walkthrough.js'; // Import the package globaly
import '@essetwide/material-walkthrough/dist/material-walkthrough.css'; // Import the style

import "./Landing.css";

import Header from "../layout/Header";

class Walkthrough extends React.Component {
    // storing link to tasks
    state = {
        link: `/${this.props.match.params.studyid}/canu/active`
    };
   startIntro() {
        $.walk([ // Passing the walk points to the function
            {
                target: '#pieces-area', // The target as a selector
                color: '#f44336', // Bg color
                content: 'The Pieces Pallet stores all the puzzle pieces.\nExtended functionality such as resizing and turning can only be used when pieces are in this area',
                acceptText: 'Ay!' // Accept text displayed in the button
            },
            {
                target: document.getElementById('github_corner'), // It works also with js pure and jquery elements!
                color: 'rgb(100, 206, 170)', // All css color values can be setted here!,
                content: 'Puzzle pieces can be dragged in the this area and solutions can be formed here', // YES, YOU CAN put Html code in the content!,
                acceptText: 'Oh nice!'
            },
            {
                target: '#download_fab',
                color: 'rgb(244, 67, 54)',
                content: 'Finished Solutions can be submitted by this button.',
                acceptText: 'Alright!'
            },
            {
                target: '#start_btn',
                color: '#2196F3',
                content: 'Submitted Solutions and their rotations are added to this timeline. Rotated Solutions are already hend in to save time.',
                acceptText: 'Got it!'
            },

            {
                target: '#start_btn',
                color: '#2196F3',
                content: "In case you missed something out, the lifebuoy stops the time and gives you a short explanation again",
                acceptText: 'Okay!'
            }
        ]);
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <h2 className="col">Material Walkthrough</h2>
                    </div>
                    <div className="row center-align valign-wrapper">
                        <div className="col s12">
                            <button id="start_btn" onClick={this.startIntro} className="btn blue darken-1 waves-effect waves-light">
                                Test Here!
                            </button>
                        </div>
                    </div>
                </div>
                <a target="blank" href="https://github.com/essetwide/material-walkthrough" className="github-corner"
                   aria-label="View source on Github">
                    <svg id="github_corner" width="80" height="80" viewBox="0 0 250 250"
                         aria-hidden="true">
                        <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
                        <path
                            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                            fill="currentColor" className="octo-arm"></path>
                        <path
                            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                            fill="currentColor" className="octo-body"></path>
                    </svg>
                </a>
                <a id="download_fab" className="btn-floating btn-large waves-effect waves-light red fixed-bottom"
                   href="https://github.com/essetwide/material-walkthrough/archive/master.zip"><i
                    className="material-icons">file_download</i></a>
            </div>
    );
    }
    }

    export default Walkthrough;
