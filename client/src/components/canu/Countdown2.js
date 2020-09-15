// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first

import "./Countdown2.css";
import M from "materialize-css";
import PracticalTest from "./PracticalTest";

class Countdown2 extends React.Component {
    constructor(props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.runAnimation = this.runAnimation.bind(this);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    // storing link to tasks
    componentDidMount() {
        let self = this;
        this.runAnimation();

        /*function resetDOM() {
            counter.classList.remove('hide');
            finalMessage.classList.remove('show');

            nums.forEach(num => {
                num.classList.value = '';
            });

            nums[0].classList.add('in');
        }*/

    }


    runAnimation() {
        const nums = document.querySelectorAll('.nums span');
        const counter = document.querySelector('.counter');
        const finalMessage = document.querySelector('.final');
        const repl = document.getElementById('replay');
        nums.forEach((num, idx) => {
            const penultimate = nums.length - 1;
            num.addEventListener('animationend', (e) => {
                if (e.animationName === 'goIn' && idx !== penultimate) {
                    num.classList.remove('in');
                    num.classList.add('out');
                } else if (e.animationName === 'goOut' && num.nextElementSibling) {
                    num.nextElementSibling.classList.add('in');
                } else {
                    counter.classList.add('hide');
                    finalMessage.classList.add('show');
                    setTimeout(() => {
                        var elem = document.getElementById('countdown-popup');
                        var instance = M.Modal.init(elem, {dismissible: false});
                        instance.close();
                        if(this.props.motivated) {
                            this.onSubmitForm();
                        }
                    });
                }
            });
        });
    }
    onSubmitForm() {
        this.props.practicalTest.startClock();
    }
    /*startClock(){
        if (!running) {
            $('#circle-fill').css('transition', 'stroke-dasharray 0.1s');
            startTime = new Date().getTime();
            timerID = setInterval(timer, 90);
            running = true;
        }
        $('#activity').addClass("animated rubberBand");
    }*/
    render() {
        return (
            <div>
                <div id="countdown-popup" className="modal practical-info">
                    <div className="modal-content">
                <div className="counter">
                    <div className="nums">
                        <span className="in">3</span>
                        <span>2</span>
                        <span>1</span>
                        <span>0</span>
                    </div>
                    <h4 className="countdown-text">Get Ready</h4>
                </div>
                <div className="final">
                    <h1 className="countdown-text">GO</h1>
                </div>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default Countdown2;
