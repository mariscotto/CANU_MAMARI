// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
// It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import M from "materialize-css";

/*"fsevents": "^2.1.3",*/
import "./Landing.css";


import Header from "../layout/Header";
import $ from "jquery";
import Game from "./practicalTest/game";
import View from "./practicalTest/view";
import DSGVO from "./DSGVO";

class LandingCanu extends React.Component {
    // storing link to tasks
    state = {
        link: `/${this.props.match.params.studyid}/${
            this.props.match.params.groupid
        }/canu/dsgvo`
    };
    componentDidMount() {
        var elem = document.getElementById('modal1');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
        /*<a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>
        <div className="btn-container">
            <Link to={this.state.link} className="btn">
            Start
            </Link>
        <br />
        </div>*/
    }
    openDSGVO(){
        var elem = document.getElementById('privacy-policy');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
    }
    render() {
        return (
            <div>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <img id="mountain-header" src="/ressources/background.svg"></img>
                        </div>
                        <div className="text-container">
                            {/*<h4>Hello participant,</h4>
                            <p>Welcome to the CANU test - thank you for supporting this research!<br/><br/> This study is
                                part of a master thesis of the TUM Chair of Ergonomics. The Subject of this study is
                                a newly developed measuring instrument in creativity research. On the basis of different evaluation methods,
                                a creativity tool will be analyzed. The following test will take approximately 30 minutes can be performed either on PC or Tablet device.<br/><br/>
                                Please read through each task at your leisure and answer them.
                                The data collection is exclusively for evaluation
                                purposes of the measuring instrument. You as a test person can do nothing wrong.
                                <br/><br/> The results and data of this study will be used
                                for scientific publications. The data of the individual participants will be registered in
                                pseudonymised form and will be used exclusively at the Chair of Ergonomics. The analysis will be
                                treated according to legal and confidential regulations. The data allows no conclusions about you as a single person. Via a generated code, a
                                deletion of the data can be initiated at any time. Your details will be treated in accordance with
                                the guidelines for securing good scientific practice for at least ten years.<br/><br/> With your
                                participation you agree to the collection and processing of data.<br/><br/> Please contact
                                Lorenz Prasch
                                with any questions or comments (lorenz.prasch@tum.de).<br/><br/> Technical University
                                of
                                Munich:<br/> Chair of Ergonomics
                            </p>*/}
                            <h4>Hello participant,</h4>
                            <p>Welcome to the CANU test - thank you for supporting this research!<br/><br/>
                                This study is part of a master thesis of the TUM Chair of Ergonomics. The subject of this study is a newly developed measuring instrument in creativity research. On the basis of different evaluation methods, a creativity tool will be analyzed. The following test can be performed either on <strong>PC or Tablet device</strong>.<br/><br/>
                                Your participation in the study is <strong>voluntary</strong>. If you do not wish to participate or if you later withdraw your consent, you will not suffer any disadvantages.
                                Please read through each task at your leisure and answer them. The data collection is exclusively for evaluation purposes of the measuring instrument. You as a test person <strong>can do nothing wrong</strong>.<br/></p>
                                <h5>Motivation</h5>
                            <p>Thanks to intelligent technologies, many activities can already be performed by machines today. People are increasingly being assigned the role of innovation drivers, therefore the goal for companies should be to build up a creative environment and support creative performances. The aim of this work is to <strong>develop an instrument for measuring creativity</strong> at the workplace - the effect of different working environments on creativity shall be examined in an experiment.
                            </p>
                            <h5>Procedure</h5>
                            <p>Your participation in the study is terminated after a <strong>single appointment</strong>. The study takes place completely <strong>online</strong>.
                                During the experiment, you are asked to fulfill <strong>3 parts</strong>. Firstly, a <strong>practical test</strong> will be given, where you have to puzzle a certain shape to given instructions. Secondly, a <strong>test for conclusive thinking</strong>, the Raven’s APM will be presented. Lastly, a <strong>questionnaire</strong> will be served to fill in. Including the instructions, a total time expenditure of approx. <strong>30 minutes</strong> can be expected.
                            </p>
                            <p>Please contact jonas.bender@tum.de with any questions or comments.<br/><br/> Technical University
                            of Munich,<br/> Chair of Ergonomics</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Link to={this.state.link} className="waves-effect waves-light btn-large modal-action modal-close">Start</Link>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default LandingCanu;
