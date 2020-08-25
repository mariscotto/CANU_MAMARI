// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first

import "./Countdown2.css";
import M from "materialize-css";

class Countdown2 extends React.Component {
    // storing link to tasks
    componentDidMount() {
        const nums = document.querySelectorAll('.nums span');
        const counter = document.querySelector('.counter');
        const finalMessage = document.querySelector('.final');
        const repl = document.getElementById('replay');

        runAnimation();

        function resetDOM() {
            counter.classList.remove('hide');
            finalMessage.classList.remove('show');

            nums.forEach(num => {
                num.classList.value = '';
            });

            nums[0].classList.add('in');
        }

        function runAnimation() {
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
                        setTimeout(()=>{
                            var elem = document.getElementById('countdown-popup');
                            var instance = M.Modal.init(elem,{dismissible:false});
                            instance.close();
                        }, 1000);
                    }
                });
            });
        }
    }

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
