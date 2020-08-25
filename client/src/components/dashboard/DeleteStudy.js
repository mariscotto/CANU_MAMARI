// Button and Dialog for Study Deletion

import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Tooltip from '@material-ui/core/Tooltip';

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import axios from 'axios';

class DeleteStudy extends React.Component {

    state = {
        open: false,
    }

    // Dialog open & Close
    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };


    handleDelete = (e) => {
        e.preventDefault();

        // delete request to server with user and study parameters
        axios.delete(`/api/study/${this.props.userID}/` + this.props.studyID)
            .then(res => {
                console.log(res);
                this.props.action();

            })
            .catch(err => {
                console.log(err.response);
            });

        // Push to dashboard component after study deletion
        this.props.history.push("/studies");


    }

    render() {

        return (
            <div>
                <Tooltip title="Delete Study" placement="top">
                    <button id="delete-study-btn" onClick={this.handleClickOpen}>
                        <svg style={{ fill: "white" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M19,6 L19,18.5 C19,19.8807119 17.8807119,21 16.5,21 L7.5,21 C6.11928813,21 5,19.8807119 5,18.5 L5,6 L4.5,6 C4.22385763,6 4,5.77614237 4,5.5 C4,5.22385763 4.22385763,5 4.5,5 L9,5 L9,4.5 C9,3.67157288 9.67157288,3 10.5,3 L13.5,3 C14.3284271,3 15,3.67157288 15,4.5 L15,5 L19.5,5 C19.7761424,5 20,5.22385763 20,5.5 C20,5.77614237 19.7761424,6 19.5,6 L19,6 Z M6,6 L6,18.5 C6,19.3284271 6.67157288,20 7.5,20 L16.5,20 C17.3284271,20 18,19.3284271 18,18.5 L18,6 L6,6 Z M14,5 L14,4.5 C14,4.22385763 13.7761424,4 13.5,4 L10.5,4 C10.2238576,4 10,4.22385763 10,4.5 L10,5 L14,5 Z M14,9.5 C14,9.22385763 14.2238576,9 14.5,9 C14.7761424,9 15,9.22385763 15,9.5 L15,16.5 C15,16.7761424 14.7761424,17 14.5,17 C14.2238576,17 14,16.7761424 14,16.5 L14,9.5 Z M9,9.5 C9,9.22385763 9.22385763,9 9.5,9 C9.77614237,9 10,9.22385763 10,9.5 L10,16.5 C10,16.7761424 9.77614237,17 9.5,17 C9.22385763,17 9,16.7761424 9,16.5 L9,9.5 Z" />
                        </svg>
                    </button>
                </Tooltip>

                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle style={{ fontFamily: "Work Sans" }} id="alert-dialog-title">{"Delete study?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{ fontFamily: "Work Sans, sans serif" }} id="alert-dialog-description">
                            All data related to this study will be deleted.
                         </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ fontFamily: "Work Sans", fontWeight: "600" }} onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button style={{ fontFamily: "Work Sans", fontWeight: "600" }} onClick={this.handleDelete} color="primary" autoFocus>
                            Delete
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
)(withRouter(DeleteStudy));