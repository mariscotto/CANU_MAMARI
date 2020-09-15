import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';

import Grid from '@material-ui/core/Grid';

import CreateStudy from './CreateStudy';
import CreateStudy2 from './CreateStudy2';
import StudyCard from './StudyCard';


class StudyList extends React.Component {
    state = {
        studies: [],
        isUpdated: false
    }

    // set study data
    componentDidMount() {

        axios.get(`/api/study/${this.props.userID}`)
            .then(res => {
                this.setState({
                    studies: res.data,
                });
            })
            .catch(err => {
                console.log(err);

            })
    }

    // update view on state changes
    componentDidUpdate(prevProps, prevState) {
        if (prevState.isUpdated !== this.state.isUpdated) {

            axios.get(`/api/study/${this.props.userID}`)
                .then(res => {
                    console.log(res);
                    this.setState({
                        studies: res.data
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    // update page method for child components
    updateView = () => {
        this.setState({
            isUpdated: !this.state.isUpdated
        })
    }

    render() {

        return (
            <div style={{ marginLeft: "290px" }}>
                <Grid container alignItems="center" spacing={16} style={{ marginTop: "0.75rem" }}>
                    <Grid item>
                        <h2 className="study-name-heading">Studies</h2>
                    </Grid>
                    <Grid item>
                        <CreateStudy2 action={this.updateView} />
                    </Grid>

                </Grid>

                <Grid container direction="row"
                    justify="flex-start"
                    alignItems="flex-start">
                    {
                        this.state.studies.map((study, index) => (
                            <Grid key={index} item style={{ padding: "20px 80px 20px 0" }}>
                                <Link to={'/studies/' + study.study._id}>
                                    <StudyCard
                                        studyName={study.study.study_name}
                                        studyDate={new Date(study.study.createdAt).toLocaleDateString()}
                                        completedParticipants={study.participants_count}
                                        studyOpen={study.study.open} />
                                </Link>

                            </Grid>
                        ))}

                </Grid>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    userID: state.auth.user.id
});

export default connect(
    mapStateToProps
)(withRouter(StudyList));
