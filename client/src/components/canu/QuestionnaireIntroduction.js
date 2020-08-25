// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first

import "./QuestionnaireIntroduction.css";
import M from "materialize-css";

class QuestionnaireIntroduction extends React.Component {
    // storing link to tasks

    componentDidMount() {
        var elem = document.getElementById('questionnaire-introduction');
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
                <div id="questionnaire-introduction" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img src="/ressources/adventurer.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Questionnaire</h1>
                            <p>You have completed the Practical Test, in the following section a questionaire and a personality test will be served for you.</p>
                            <a href="#!" className="waves-effect waves-light btn-large modal-action modal-close">Okay</a>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default QuestionnaireIntroduction;
