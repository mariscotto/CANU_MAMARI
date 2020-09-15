// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first

import "./Countdown.css";

class Countdown3 extends React.Component {
    // storing link to tasks
    state = {
        link: `/${this.props.match.params.studyid}/canu/active`
    };

    componentDidMount() {
            const elCountdown = document.getElementById('countdown-grid');
            if(!elCountdown) return;

            for (let x = 1; x <= 15; x ++) {
                for (let y = 1; y <= 9; y ++) {
                    const template = `<div class="x${x}-y${y}"></div>`;
                    elCountdown.insertAdjacentHTML('beforeend', template);
                }
            }

            function startCountDown() {
                let seconds = 3;
                const timer = setInterval(() => {
                    console.log(seconds);

                    setTimeout(() => {
                        elCountdown.classList = ['repaint'];
                    }, 1500)

                    elCountdown.classList = [];
                    elCountdown.classList.add(`number-${seconds}`);
                    seconds--;

                    if (seconds < 1)  {
                        seconds = 3;
                    }
                }, 3000);
            }

            startCountDown();
    }

    render() {
        return (
            <div>
                <div className="countdown">
                    <div id="countdown-grid" className="number-3"></div>
                </div>
            </div>
    );
    }
    }

    export default Countdown3;

