// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first
import {Trans, withTranslation } from 'react-i18next';
import "./APMInfo.css";
import M from "materialize-css";

class APMInfo extends React.Component {
    // storing link to tasks
    constructor(props){
        super(props);
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div id="apm-info" className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4>Instruction</h4>
                        </div>
                        <div className="text-container">
                            <Trans><p>{this.props.t("apm_popup")}</p></Trans>
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

    export default withTranslation()(APMInfo);
