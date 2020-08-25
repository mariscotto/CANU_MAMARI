// Modal component for editing existing study

import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Tooltip from '@material-ui/core/Tooltip';

import axios from 'axios';

class EditStudy extends React.Component {

    state = {
        open: false,
        study_name: this.props.study_name,
        study_description: this.props.study_description,
        blocks_count: this.props.blocks_count,
        newWords_count: this.props.newWords_count,
        group_count: this.props.groups.length,
        groups: this.props.groups
    }


    // Change text fields based on user input
    onChangeStudyName = (e) => {
        this.setState({ study_name: e.target.value });
    };

    onChangeStudyDescription = (e) => {
        this.setState({ study_description: e.target.value });
    };

    onChangeBlocksCount = (e) => {
        this.setState({ blocks_count: e.target.value });
    };

    onChangeNewWordsCount = (e) => {
        this.setState({ newWords_count: e.target.value });
    };

    // Change group count and create new group objects in groups based on group count
    onChangeGroupCount = (e) => {
        let groupCount = this.state.group_count;

        this.state.groups.splice(e.target.value, this.state.groups.length);

        for (groupCount; groupCount < e.target.value; groupCount++) {
            this.setState(prevState => ({
                groups: [...prevState.groups, { group_name: '' }]
            }));
        }

        this.setState({ group_count: e.target.value });
    };

    // Change specific group name based on user input
    onChangeGroupName(i, e) {
        let groups = [...this.state.groups];
        groups[i].group_name = e.target.value;
        this.setState({ groups });
    }

    // create input fields based on group count
    createGroupInputFields() {
        let groupInputFields = [];
        for (let i = 0; i < this.state.group_count; i++) {
            groupInputFields.push(<TextField
                margin="dense"
                key={i}
                id="Group Name"
                label={"Group Name " + (i + 1)}
                type="text"
                variant="outlined"
                value={this.state.groups[i].group_name || ''}
                onChange={this.onChangeGroupName.bind(this, i)}
                fullWidth
            />);
        }
        return <div>{groupInputFields}</div>;
    }


    // Opening & closing modal
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    // Handling submit of changed study
    handleEditSubmit = (e) => {
        e.preventDefault();

        const editedStudy = {
            study_name: this.state.study_name,
            description: this.state.study_description,
            Tetris_count: this.state.blocks_count,
            Neue_Wörter_count: this.state.newWords_count,

            groups: this.state.groups
        }

        // put request to change study data on server
        axios.put(`/api/study/${this.props.userID}/` + this.props.studyID, editedStudy)
            .then(res => {
                console.log(res);
                this.props.action();
            })
            .catch(err => {
                console.log(err.response);
            });

        this.setState({ open: false });

    }

    render() {

        return (
            <div>
                {(this.props.participants_count === 0) ? (
                    <Tooltip title="Edit Study" placement="top">
                        <button id="edit-study-btn" onClick={this.handleClickOpen}>
                            <svg style={{ fill: "white" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <path d="M7.29289322,18 L18.7928932,6.5 L16.5,4.20710678 L5,15.7071068 L5,18 L7.29289322,18 Z M4,18.5 L4,15.5 C4,15.3673918 4.05267842,15.2402148 4.14644661,15.1464466 L16.1464466,3.14644661 C16.3417088,2.95118446 16.6582912,2.95118446 16.8535534,3.14644661 L19.8535534,6.14644661 C20.0488155,6.34170876 20.0488155,6.65829124 19.8535534,6.85355339 L7.85355339,18.8535534 C7.7597852,18.9473216 7.63260824,19 7.5,19 L4.5,19 C4.22385763,19 4,18.7761424 4,18.5 Z M4.5,21 C4.22385763,21 4,20.7761424 4,20.5 C4,20.2238576 4.22385763,20 4.5,20 L14.5069431,20 C14.7830855,20 15.0069431,20.2238576 15.0069431,20.5 C15.0069431,20.7761424 14.7830855,21 14.5069431,21 L4.5,21 Z" />
                            </svg>
                        </button>
                    </Tooltip>
                ) : (
                        <Tooltip title="Study has begun. No editing is possible." placement="top">
                            <button id="edit-study-btn-greyed">
                                <svg style={{ fill: "white" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M7.29289322,18 L18.7928932,6.5 L16.5,4.20710678 L5,15.7071068 L5,18 L7.29289322,18 Z M4,18.5 L4,15.5 C4,15.3673918 4.05267842,15.2402148 4.14644661,15.1464466 L16.1464466,3.14644661 C16.3417088,2.95118446 16.6582912,2.95118446 16.8535534,3.14644661 L19.8535534,6.14644661 C20.0488155,6.34170876 20.0488155,6.65829124 19.8535534,6.85355339 L7.85355339,18.8535534 C7.7597852,18.9473216 7.63260824,19 7.5,19 L4.5,19 C4.22385763,19 4,18.7761424 4,18.5 Z M4.5,21 C4.22385763,21 4,20.7761424 4,20.5 C4,20.2238576 4.22385763,20 4.5,20 L14.5069431,20 C14.7830855,20 15.0069431,20.2238576 15.0069431,20.5 C15.0069431,20.7761424 14.7830855,21 14.5069431,21 L4.5,21 Z" />
                                </svg>
                            </button>
                        </Tooltip>

                    )}
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit study</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="study-name"
                                label="Name"
                                type="text"
                                variant="outlined"
                                value={this.state.study_name}
                                onChange={this.onChangeStudyName}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="study-description"
                                label="Description"
                                multiline={true}
                                rows={4}
                                rowsMax={4}
                                type="text"
                                variant="outlined"
                                value={this.state.study_description}
                                onChange={this.onChangeStudyDescription}
                                fullWidth
                            />
                            <DialogContentText style={{ marginTop: 10, marginBottom: 10 }}>
                                Select the number of tasks
                            </DialogContentText>
                            <Grid container spacing={24} justify="flex-start" alignItems="center">
                                <Grid item xs={3}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="41">
                                        <g data-name="Tetromino Icon Yellow" fill="#ffe748" stroke="#000" strokeLinejoin="round" strokeWidth="3">
                                            <g data-name="Rechteck 12">
                                                <path stroke="none" d="M19 19h22v22H19z" />
                                                <path fill="none" d="M20.5 20.5h19v19h-19z" />
                                            </g>
                                            <g data-name="Rechteck 13">
                                                <path stroke="none" d="M0 19h22v22H0z" />
                                                <path fill="none" d="M1.5 20.5h19v19h-19z" />
                                            </g>
                                            <g data-name="Rechteck 14">
                                                <path stroke="none" d="M38 19h22v22H38z" />
                                                <path fill="none" d="M39.5 20.5h19v19h-19z" />
                                            </g>
                                            <g data-name="Rechteck 15">
                                                <path stroke="none" d="M19 0h22v22H19z" />
                                                <path fill="none" d="M20.5 1.5h19v19h-19z" />
                                            </g>
                                        </g>
                                    </svg>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="dense"
                                        id="blocks-task-number"
                                        label="Blocks"
                                        type="number"
                                        variant="outlined"
                                        value={this.state.blocks_count}
                                        onChange={this.onChangeBlocksCount}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <Grid container spacing={24} justify="flex-start" alignItems="center">
                                <Grid item xs={3}>
                                    <svg data-name="New Words Icon" xmlns="http://www.w3.org/2000/svg" width="69.469" height="18.389">
                                        <g data-name="Rechteck 122" fill="#fff" stroke="#000" strokeLinejoin="round" strokeWidth="1.4">
                                            <path stroke="none" d="M0 0h18.389v18.389H0z" />
                                            <path fill="none" d="M.7.7h16.989v16.989H.7z" />
                                        </g>
                                        <g data-name="Rechteck 123" fill="#fff" stroke="#000" strokeLinejoin="round" strokeWidth="1.4">
                                            <path stroke="none" d="M17.367 0h18.389v18.389H17.367z" />
                                            <path fill="none" d="M18.067.7h16.989v16.989H18.067z" />
                                        </g>
                                        <g data-name="Rechteck 124" fill="#fff" stroke="#000" strokeLinejoin="round" strokeWidth="1.4">
                                            <path stroke="none" d="M34.735 0h18.389v18.389H34.735z" />
                                            <path fill="none" d="M35.435.7h16.989v16.989H35.435z" />
                                        </g>
                                        <g data-name="Rechteck 125" fill="#fff" stroke="#000" strokeLinejoin="round" strokeWidth="1.4">
                                            <path stroke="none" d="M51.081 0H69.47v18.389H51.081z" />
                                            <path fill="none" d="M51.781.7H68.77v16.989H51.781z" />
                                        </g>
                                        <text data-name="W O R D" transform="translate(5.086 14)" fontSize="14" fontFamily="IBMPlexMono-Bold, IBM Plex Mono" fontWeight="700" letterSpacing=".01em">
                                            <tspan x="0" y="0">W O R D</tspan>
                                        </text>
                                    </svg>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="dense"
                                        id="words-task-number"
                                        label="New Words"
                                        type="number"
                                        variant="outlined"
                                        value={this.state.newWords_count}
                                        onChange={this.onChangeNewWordsCount}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>

                            <DialogContentText style={{ marginTop: 10, marginBottom: 10 }}>
                                Select the number of test groups
                            </DialogContentText>

                            <Grid container spacing={24} justify="flex-start" alignItems="center">
                                <Grid item xs={3}>
                                    <GroupIcon style={{ fontSize: 45 }} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        margin="dense"
                                        id="group-number"
                                        label="Groups"
                                        type="number"
                                        variant="outlined"
                                        value={this.state.group_count}
                                        onChange={this.onChangeGroupCount}
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            {this.createGroupInputFields()}

                        </form>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleEditSubmit} variant="contained" color="primary">
                            Edit
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    userID: state.auth.user.id
});

export default connect(
    mapStateToProps
)(withRouter(EditStudy));