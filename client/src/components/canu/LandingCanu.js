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
                            <img id="mountain-header" src="/ressources/background_s.svg"></img>
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
                                This study is part of a master thesis of the TUM Chair of Ergonomics. The subject of this study is a newly developed measuring instrument in creativity research. On the basis of different evaluation methods, a creativity tool will be analyzed. The following test will take approximately <strong>30</strong> minutes and can be performed either on <strong>PC or Tablet devices</strong>.<br/><br/>
                                Your participation in the study is <strong>voluntary</strong>. If you do not wish to participate or if you later withdraw your consent, you will not suffer any disadvantages.
                                Please read through each task at your leisure and answer them. The data collection is exclusively for evaluation purposes of the measuring instrument. You as a test person <strong>can do nothing wrong</strong>.
                                <br/></p>
                                <h5>Motivation</h5>
                            <p>Thanks to intelligent technologies, many activities can already be performed by machines today. People are increasingly being assigned the role of innovation drivers, therefore the goal for companies should be to build up a creative environment and support creative performances. The aim of this work is to <strong>develop an instrument for measuring creativity</strong> at the workplace - the effect of different working environments on creativity shall be examined in an experiment.
                            </p>
                            <h5>Procedure</h5>
                            <p>Your participation in the study is terminated after a <strong>single appointment</strong>. The study takes place completely <strong>online</strong>.
                                During the experiment, you are asked to fulfill <strong>3 parts</strong>. Firstly, a <strong>Puzzle Task</strong> will be given, where you have to puzzle a certain shape to given instructions. Secondly, a <strong>test for conclusive thinking</strong>, the Raven’s APM will be presented. Lastly, a <strong>questionnaire</strong> will be served to fill in. Including the instructions, a total time expenditure of approx. <strong>30 minutes</strong> can be expected.
                            </p>
                            <h5>Data Security</h5>
                            <p>In this study the TUM Chair of Ergonomics is responsible for data processing. The legal basis for the processing of your data is your consent.<br/><br/>
                                The data collected from you consists exclusively of the answers you give to the questions in this online study. A collected, anonymized data set is stored in the not publicly accessible database of the test procedure and then transferred in anonymized form to the evaluation of scientific studies.<br/><br/>
                            Your personal data will only be used within the scope of this study. No data directly identifying you as a person will be collected or processed.<br/>
                                Your data will be stored by the Chair of Ergonomics in the archive of the Leibniz Rechenzentrum. The data is stored in compliance with the Privacy policy in anonymous form. Your data will be deleted after expiry of the statutory deletion periods (in agreement with the principles of good scientific practice after ten years).<br/><br/>
                                Consent to the processing of your data is voluntary, you can withdraw your consent at any time. You have the right to receive information about the data concerning you, also in Form of a free copy. You can also request the correction or request deletion of your data. In these cases, please contact the chair for ergonomics:</p>
                            <p>
                                Datenschutzbeauftragte der TU München<br/>
                                E-Mail: beauftragter@datenschutz.tum.de<br/>
                                Technische Universität München<br/>
                                Arcisstr. 21<br/>
                                80333 München<br/>
                            </p>
                            <p>or</p>
                            <p>
                            Bayerischer Landesbeauftragter für den Datenschutz<br/>
                            Postanschrift: Postfach 22 12 19, 80502 München<br/>
                            Hausanschrift: Wagmüllerstr. 18, 80538 München<br/>
                            E-Mail: poststelle@datenschutz-bayern.de.<br/>
                            Landesamt für Datenschutzaufsicht<br/>
                            Promenade 27<br/>
                            91522 Ansbach<br/>
                            Tel.: 0981/53-1300<br/>
                            Fax: 0981/53-981300<br/>
                            E-Mail: poststelle@lda.bayern.de.<br/>
                            </p>
                            <h5>Declaration of informed consent</h5>
                            <p>I have been informed about the study by the investigators. I have received and read the written information and consent form for the above-mentioned study.
                                I was informed in detail about the purpose and the course of the study, the risks of participation and my rights and obligations. I had the opportunity to ask questions.
                                These were answered satisfactorily and completely. It was pointed out to me that my participation is voluntary, and I have the right to withdraw my consent at any time without giving reasons and without incurring any disadvantages.
                                I hereby agree to participate in the above-mentioned study and to the data processing as described in the respective section.</p>
                            <p>Please contact jonas.bender@tum.de with any questions or comments.<br/><br/> Technical University
                            of Munich,<br/> Chair of Ergonomics</p>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <Link to={this.state.link} className="waves-effect waves-light btn-large modal-action modal-close">Accept and Start</Link>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default LandingCanu;
