// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first

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
                        <p>The following task is a <b>test of perception and logical thinking</b>. The upper part consists of a pattern from which a part is cut off. Look at the pattern and think about how the part must look like, fits the pattern in both <b>horizontal</b> and <b>vertical</b> direction.
                            Select the correct one from the eight options below. Only one of these parts forms a correct answer.<br/><br/>You will notice that the following <b>twelve problems</b> are of varying degrees of difficulty and that the same method should always be used to solve both simple and difficult problems.<b>You have as much time as you want to work on the problems -</b> Remember that the accuracy is what counts. Problems are solved one by one and it is not possible to go back to the beginning of the task.
                                Once you have decided on an answer option, click on it.</p>
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

    export default APMInfo;
