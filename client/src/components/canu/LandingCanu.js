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

class LandingCanu extends React.Component {
    // storing link to tasks
    state = {
        link: `/${this.props.match.params.studyid}/canu/practicalTest`
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
    render() {
        return (
            <div>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <img id="mountain-header" src="/ressources/background.svg"></img>
                        </div>
                        <div className="text-container">
                            <h4>Hello participant,</h4>
                            <p>Welcome to the CANU test - thank you for supporting this research!<br/><br/> This study is
                                part
                                of an
                                interdisciplinary project of the TUM Chair of Ergonomics. The Subject of this study is
                                a
                                newly
                                developed measuring instrument in creativity research. On the basis of different task types
                                a creativity tool will be evaluated. The following test will consist of 4 major parts and
                                will take approximately 25 minutes.<br/><br/>
                                This study can be performed either on PC or Tablet device.<br/><br/>
                                Please read through each task at your leisure and answer them.
                                The data collection is exclusively for evaluation
                                purposes of the measuring instrument. You as a test person can do nothing wrong.
                                <br/><br/> The results and data of this study will be used
                                for scientific publications. The data of the individual participants will be registered in
                                pseudonymised
                                form and will be used exclusively at the Chair of Ergonomics. The analysis will be
                                treated
                                according to legal and confidential regulations. The data allows no conclusions about you as a single person. Via a generated code, a
                                deletion of
                                the data can be initiated at any time. Your details will be treated in accordance with
                                the
                                guidelines for securing good scientific practice for at least ten years.<br/><br/> With your
                                participation you agree to the collection and processing of data.<br/><br/> Please contact
                                Lorenz Prasch
                                with any questions or comments<br/> (lorenz.prasch@tum.de).<br/><br/> Technical University
                                of
                                Munich:<br/> Chair of Ergonomics
                            </p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Link to={this.state.link} className="waves-effect waves-light btn-large modal-action modal-close">Paddle!</Link>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default LandingCanu;
