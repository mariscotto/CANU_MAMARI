// Modal component for creating new study

import React from 'react';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import GroupIcon from '@material-ui/icons/Group';

import axios from 'axios';

class CreateStudy extends React.Component {
    state = {
        open: false,
        study_name: '',
        study_description: '',
        blocks_count: '',
        newWords_count: '',
        groups: [{ group_name: '' }],
        group_count: 1
    }

    // Change group count value
    onChangeGroupCount = (e) => {
        let groupCount = this.state.group_count;

        this.state.groups.splice(e.target.value, this.state.groups.length);

        for (groupCount; groupCount < e.target.value; groupCount++) {
            // create new group object in groups based on group count value
            this.setState(prevState => ({
                groups: [...prevState.groups, { group_name: '' }]
            }));

        }

        // update group count value
        this.setState({ group_count: e.target.value });
    };

    // Change group name based on user input
    onChangeGroupName(i, e) {
        // copy old state
        let groups = [...this.state.groups];

        groups[i].group_name = e.target.value;

        this.setState({ groups });
    }

    // Create input fields based on group count in state
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

    // Updating state with text field user input
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


    // Submitting form
    handleSubmit = (e) => {
        e.preventDefault();

        // Creating study object based on state
        const newStudy = {
            study_name: this.state.study_name,
            description: this.state.study_description,
            Tetris_count: this.state.blocks_count,
            Neue_Wörter_count: this.state.newWords_count,
            groups: this.state.groups
        }


        // Post request with logged in user id and created study object
        axios.post(`/api/study/${this.props.userID}`, newStudy)
            .then(res => {
                this.props.action();
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response)
            });

        // Resetting state
        this.setState({
            open: false,
            study_name: '',
            study_description: '',
            blocks_count: '',
            newWords_count: '',
            group_count: 1,
            groups: [{ group_name: '' }],
        })
    };

    // Opening & Closing Modal
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        return (
            <div className="createStudyButton">
                <button id="create-study-btn" onClick={this.handleClickOpen}>
                    <span>Create Study</span>
                    <svg style={{ fill: "white" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M13,12 L16.5,12 C16.7761424,12 17,12.2238576 17,12.5 C17,12.7761424 16.7761424,13 16.5,13 L13,13 L13,16.5 C13,16.7761424 12.7761424,17 12.5,17 C12.2238576,17 12,16.7761424 12,16.5 L12,13 L8.5,13 C8.22385763,13 8,12.7761424 8,12.5 C8,12.2238576 8.22385763,12 8.5,12 L12,12 L12,8.5 C12,8.22385763 12.2238576,8 12.5,8 C12.7761424,8 13,8.22385763 13,8.5 L13,12 Z M3,5.5 C3,4.11928813 4.11928813,3 5.5,3 L19.5,3 C20.8807119,3 22,4.11928813 22,5.5 L22,19.5 C22,20.8807119 20.8807119,22 19.5,22 L5.5,22 C4.11928813,22 3,20.8807119 3,19.5 L3,5.5 Z M4,5.5 L4,19.5 C4,20.3284271 4.67157288,21 5.5,21 L19.5,21 C20.3284271,21 21,20.3284271 21,19.5 L21,5.5 C21,4.67157288 20.3284271,4 19.5,4 L5.5,4 C4.67157288,4 4,4.67157288 4,5.5 Z" />
                    </svg>
                </button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Create a new study</DialogTitle>
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
                        <Button onClick={this.handleSubmit} variant="contained" color="primary">
                            Create
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    userID: state.auth.user.id
});

export default connect(
    mapStateToProps
)(withRouter(CreateStudy));
