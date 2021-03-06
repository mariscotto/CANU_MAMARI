// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first
import {Trans, withTranslation } from 'react-i18next';
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
                            <img id="questionnaire-logo" src="/ressources/questionnaireLogo.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Questionnaire</h1>
                            <p>{this.props.t("questionnaire_infopopup")}</p>
                            <a href="#!" className="waves-effect waves-light btn-large modal-action modal-close">Okay</a>
                        </div>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default withTranslation()(QuestionnaireIntroduction);
