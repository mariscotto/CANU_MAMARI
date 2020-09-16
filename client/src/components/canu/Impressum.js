// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first

import "./Impressum.css";
import M from "materialize-css";

class Impressum extends React.Component {
    // storing link to tasks

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div id="impressum" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Imprint & Data Security</h4>
                        </div>
                        <div className="text-container">
                            <h5><strong>Imprint</strong></h5>
                            <a href="https://www.mw.tum.de/lfe/impressum/" target="_blank">Visit TUM/Imprint</a>
                            <h5><strong>Data Security</strong></h5>
                            <a href="https://www.mw.tum.de/lfe/datenschutz/" target="_blank">Visit TUM/Data_Security</a>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="waves-effect waves-light btn-large modal-action modal-close">Close</a>
                    </div>
                </div>
            </div>
    );
    }
    }

    export default Impressum;
