// Dashboard, home component under /studies

import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import axios from 'axios';

import Overview from './Overview';
import StudyList from './StudyList';
import HeaderDashboard from './HeaderDashboard';


class Dashboard extends React.Component {

    state = {
        studies: []
    }

    componentDidMount() {
        // get all studies to pass as props to child components
        axios.get(`/api/study/${this.props.userID}`)
            .then(res => {
                this.setState({
                    studies: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Render Header, Overview and Studies Component
    render() {

        return (
            <div style={{ backgroundColor: "#F8F8F8", minHeight: "100vh" }}>
                <HeaderDashboard />
                <Overview studies={this.state.studies} />
                <StudyList studies={this.state.studies} />
            </div >
        )
    }
}

const mapStateToProps = state => ({
    userID: state.auth.user.id
});

export default withRouter(connect(mapStateToProps)(Dashboard));