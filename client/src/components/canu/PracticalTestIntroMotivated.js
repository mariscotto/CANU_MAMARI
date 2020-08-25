// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import $ from 'jquery'; // Importing jQuery first


import Header from "../layout/Header";

class PracticalTestIntroMotivated extends React.Component {
    // storing link to tasks
    state = {
        link: `/${this.props.match.params.studyid}/canu/active`
    };
    render() {
        return (
            <div>
            </div>
    );
    }
    }

    export default PracticalTestIntroMotivated;
