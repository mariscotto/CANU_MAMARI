// Study Component

import React from 'react';

import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import axios from 'axios';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Lock, LockOpen } from '@material-ui/icons';
import { Tooltip as TooltipMUI } from '@material-ui/core';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import './Study.css';

import Plot from 'react-plotly.js';

import HeaderDashboard from './HeaderDashboard';
import DeleteStudy from './DeleteStudy';
import EditStudy from './EditStudy';

import Tooltip from 'react-tooltip-lite';
import { GooSpinner } from "react-spinners-kit";
import { CSVLink } from "react-csv";


class Study extends React.Component {
    constructor(props){
        super(props);
        this.updateNovelty = this.updateNovelty.bind(this);
    }
    state = {
        study_name: '',
        study_description: '',
        tasks: [],
        blocks_count: 0,
        newWords_count: 0,
        groups: [],
        study_open: false,
        participants_count: '',
        date: '',
        study_link: [],
        solutions: [],

        isLoading: true,
        isUpdated: false,

        open: false,
        download: [],
        downloadSolution: []
    }

    componentDidMount() {

        // fetch specific study data
        axios.get(`/api/study/${this.props.userID}/` + this.props.match.params.id)
            .then(res => {
                console.log(res.data);

                this.setState({
                    study_name: res.data.study_name,
                    study_description: res.data.description,
                    groups: res.data.groups,
                    study_open: res.data.open,
                    participants_count: res.data.groups.reduce((a, b) => a + (b['participants_count'] || 0), 0),
                    date: new Date(res.data.createdAt).toLocaleDateString(),
                    study_link: res.data.study_link,
                    solutions: res.data.solutions,

                    isLoading: false
                });
            })
            .catch(err => {
                console.log(err);
            })


        // Fetch csv download data
        axios.get(`/api/study/${this.props.userID}/${this.props.match.params.id}/download`)
            .then(res => {
                this.setState({
                    download: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
        // Fetch csv download data solution
        axios.get(`/api/study/${this.props.userID}/${this.props.match.params.id}/downloadSolutions`)
            .then(res => {
                this.setState({
                    downloadSolution: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    // Update view when state has changed
    componentDidUpdate(prevProps, prevState) {

        if (prevState.isUpdated !== this.state.isUpdated || prevProps.match.params.id !== this.props.match.params.id) {
            axios.get(`/api/study/${this.props.userID}/` + this.props.match.params.id)
                .then(res => {
                    this.setState({
                        study_name: res.data.study_name,
                        study_description: res.data.description,
                        groups: res.data.groups,
                        study_open: res.data.open,
                        participants_count: res.data.groups.reduce((a, b) => a + (b['participants_count'] || 0), 0),
                        date: new Date(res.data.createdAt).toLocaleDateString(),
                        study_link: res.data.study_link,
                        solutions: res.data.solutions,
                        isLoading: false
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    // Method to be passed to child component to update state externally
    updateView = () => {
        this.setState({
            isUpdated: !this.state.isUpdated
        })
    }

    // open & close dialog for closing study
    handleClickOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    updateNovelty(){
        axios.post('/api/solutionCanu/updateNovelty', null)
            .then(res => {
                console.log(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }
    // handle close study click
    handleCloseStudy = (e) => {
        e.preventDefault();

        // put request to mark study as closed
        axios.put(`/api/study/${this.props.userID}/` + this.props.match.params.id + '/close')
            .then(res => {

                // update view after closing study
                this.setState({
                    isUpdated: !this.state.isUpdated
                })

            })
            .catch(err => {
                console.log(err.response);
            });

        this.setState({ open: false });

    }


    render() {

        // rows for results table
        const rows = [];

        this.state.groups.map((group, index) => {
            let row = { group_name: group.group_name, participants: group.participants_count, usefulness_mean: group.usefulness_mean, novelty_mean: group.novelty_mean, creativity_mean: group.creative_mean }
            rows.push(row);

        })


        Array(this.state.solutions.length).fill();

        // sort solutions array for data extraction
        const sortedSolutionsArray = this.state.solutions.sort(function (a, b) {
            return b.group.localeCompare(a.group);
        })


        const yNovelty = [];
        const yUsefulness = [];

        const xGroups = [];

        sortedSolutionsArray.map((solution, index) => {
            xGroups.push(solution.group_name);
        });

        sortedSolutionsArray.map((solution, index) => {
            yNovelty.push(solution.solution.novelty_score);
            yUsefulness.push(solution.solution.usefulness_score);
        });

        // data configured for boxplot
        const trace1 = {
            y: yNovelty,
            x: xGroups,
            name: 'Novelty',
            marker: { color: 'rgb(214,12,140)' },
            type: 'box',
            boxmean: 'sd'
        };

        const trace2 = {
            y: yUsefulness,
            x: xGroups,
            name: 'Usefulness',
            marker: { color: 'rgb(0,128,128)' },
            type: 'box',
            boxmean: 'sd'
        };

        const graphData = [trace1, trace2];

        const graphlayout = {
            width: 600,
            height: 450,
            title: 'Box Plot',
            yaxis: {
                title: 'Creativity Score',
                zeroline: true,
                range: [0, 1]
            },
            boxmode: 'group'
        };

        return (

            <React.Fragment>

                <HeaderDashboard />

                <div style={{ paddingTop: "60px", paddingLeft: "300px", minHeight: "100vh", backgroundColor: "#F8F8F8" }}>

                    {!this.state.isLoading ? (
                        <React.Fragment>
                            <div className="back-btn">
                                <Link to="/studies" className="btn-flat waves-effect">
                                    ← BACK
                                </Link>
                            </div>

                            <div className="study-top-container">
                                <h2>{this.state.study_name}</h2>
                                {this.state.study_open ?
                                    (<div className="valign-center">
                                        <TooltipMUI title="Close Study" placement="top">
                                            <button className="lock-btn" onClick={this.handleClickOpen}>
                                                <LockOpen style={{ fill: '#FFA54D' }} />
                                            </button>
                                        </TooltipMUI>

                                        <Dialog
                                            open={this.state.open}
                                            onClose={this.handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle style={{ fontFamily: "Work Sans" }} id="alert-dialog-title">{"Close study?"}</DialogTitle>
                                            <DialogContent>
                                                <DialogContentText style={{ fontFamily: "Work Sans, sans serif" }} id="alert-dialog-description">
                                                    No new participants will be able to enter
                                                    the study after closing.
                                                </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button style={{ fontFamily: "Work Sans", fontWeight: "600" }} onClick={this.handleClose} color="primary">
                                                    Cancel
                                                </Button>
                                                <Button style={{ fontFamily: "Work Sans", fontWeight: "600" }} onClick={this.handleCloseStudy} color="primary" autoFocus>
                                                    Close Study
                                                </Button>
                                            </DialogActions>
                                        </Dialog>

                                        <span>Study Open</span>
                                    </div>)

                                    : (<div className="valign-center">
                                        <Lock style={{ fill: '#3100FF', marginRight: '0.5rem' }} />
                                        <span>Study Closed</span>
                                    </div>)}

                                <div className="right-btn-group">
                                    <div>
                                        {(this.state.participants_count === 0) ? (
                                            <TooltipMUI title="No download possible due to no data" placement="top">
                                                <button id="download-btn-greyed">
                                                    <svg style={{ fill: "white" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M14.7928932,11.5 L11.6464466,8.35355339 C11.4511845,8.15829124 11.4511845,7.84170876 11.6464466,7.64644661 C11.8417088,7.45118446 12.1582912,7.45118446 12.3535534,7.64644661 L16.3535534,11.6464466 C16.5488155,11.8417088 16.5488155,12.1582912 16.3535534,12.3535534 L12.3535534,16.3535534 C12.1582912,16.5488155 11.8417088,16.5488155 11.6464466,16.3535534 C11.4511845,16.1582912 11.4511845,15.8417088 11.6464466,15.6464466 L14.7928932,12.5 L4,12.5 C3.72385763,12.5 3.5,12.2761424 3.5,12 C3.5,11.7238576 3.72385763,11.5 4,11.5 L14.7928932,11.5 Z M16,4.5 C15.7238576,4.5 15.5,4.27614237 15.5,4 C15.5,3.72385763 15.7238576,3.5 16,3.5 L19,3.5 C20.3807119,3.5 21.5,4.61928813 21.5,6 L21.5,18 C21.5,19.3807119 20.3807119,20.5 19,20.5 L16,20.5 C15.7238576,20.5 15.5,20.2761424 15.5,20 C15.5,19.7238576 15.7238576,19.5 16,19.5 L19,19.5 C19.8284271,19.5 20.5,18.8284271 20.5,18 L20.5,6 C20.5,5.17157288 19.8284271,4.5 19,4.5 L16,4.5 Z" transform="rotate(90 12.5 12)" />
                                                    </svg>
                                                </button>
                                            </TooltipMUI>
                                        ) : (
                                                <CSVLink data={this.state.download}>
                                                    <TooltipMUI title="Download .csv" placement="top">
                                                        <button id="download-btn">
                                                            <svg style={{ fill: "white" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                                <path d="M14.7928932,11.5 L11.6464466,8.35355339 C11.4511845,8.15829124 11.4511845,7.84170876 11.6464466,7.64644661 C11.8417088,7.45118446 12.1582912,7.45118446 12.3535534,7.64644661 L16.3535534,11.6464466 C16.5488155,11.8417088 16.5488155,12.1582912 16.3535534,12.3535534 L12.3535534,16.3535534 C12.1582912,16.5488155 11.8417088,16.5488155 11.6464466,16.3535534 C11.4511845,16.1582912 11.4511845,15.8417088 11.6464466,15.6464466 L14.7928932,12.5 L4,12.5 C3.72385763,12.5 3.5,12.2761424 3.5,12 C3.5,11.7238576 3.72385763,11.5 4,11.5 L14.7928932,11.5 Z M16,4.5 C15.7238576,4.5 15.5,4.27614237 15.5,4 C15.5,3.72385763 15.7238576,3.5 16,3.5 L19,3.5 C20.3807119,3.5 21.5,4.61928813 21.5,6 L21.5,18 C21.5,19.3807119 20.3807119,20.5 19,20.5 L16,20.5 C15.7238576,20.5 15.5,20.2761424 15.5,20 C15.5,19.7238576 15.7238576,19.5 16,19.5 L19,19.5 C19.8284271,19.5 20.5,18.8284271 20.5,18 L20.5,6 C20.5,5.17157288 19.8284271,4.5 19,4.5 L16,4.5 Z" transform="rotate(90 12.5 12)" />
                                                            </svg>
                                                        </button>
                                                    </TooltipMUI>
                                                </CSVLink>

                                            )}
                                        {/* <CSVLink data={this.state.download}>
                                            <TooltipMUI title="Download .csv" placement="top">
                                                <button id="download-btn">
                                                    <svg style={{ fill: "white" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M14.7928932,11.5 L11.6464466,8.35355339 C11.4511845,8.15829124 11.4511845,7.84170876 11.6464466,7.64644661 C11.8417088,7.45118446 12.1582912,7.45118446 12.3535534,7.64644661 L16.3535534,11.6464466 C16.5488155,11.8417088 16.5488155,12.1582912 16.3535534,12.3535534 L12.3535534,16.3535534 C12.1582912,16.5488155 11.8417088,16.5488155 11.6464466,16.3535534 C11.4511845,16.1582912 11.4511845,15.8417088 11.6464466,15.6464466 L14.7928932,12.5 L4,12.5 C3.72385763,12.5 3.5,12.2761424 3.5,12 C3.5,11.7238576 3.72385763,11.5 4,11.5 L14.7928932,11.5 Z M16,4.5 C15.7238576,4.5 15.5,4.27614237 15.5,4 C15.5,3.72385763 15.7238576,3.5 16,3.5 L19,3.5 C20.3807119,3.5 21.5,4.61928813 21.5,6 L21.5,18 C21.5,19.3807119 20.3807119,20.5 19,20.5 L16,20.5 C15.7238576,20.5 15.5,20.2761424 15.5,20 C15.5,19.7238576 15.7238576,19.5 16,19.5 L19,19.5 C19.8284271,19.5 20.5,18.8284271 20.5,18 L20.5,6 C20.5,5.17157288 19.8284271,4.5 19,4.5 L16,4.5 Z" transform="rotate(90 12.5 12)" />
                                                    </svg>
                                                </button>
                                            </TooltipMUI>
                                        </CSVLink> */}

                                    </div>
                                    <div>
                                        {(this.state.participants_count === 0) ? (
                                            <TooltipMUI title="No download possible due to no data" placement="top">
                                                <button id="download-btn-greyed">
                                                    <svg style={{ fill: "white" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M14.7928932,11.5 L11.6464466,8.35355339 C11.4511845,8.15829124 11.4511845,7.84170876 11.6464466,7.64644661 C11.8417088,7.45118446 12.1582912,7.45118446 12.3535534,7.64644661 L16.3535534,11.6464466 C16.5488155,11.8417088 16.5488155,12.1582912 16.3535534,12.3535534 L12.3535534,16.3535534 C12.1582912,16.5488155 11.8417088,16.5488155 11.6464466,16.3535534 C11.4511845,16.1582912 11.4511845,15.8417088 11.6464466,15.6464466 L14.7928932,12.5 L4,12.5 C3.72385763,12.5 3.5,12.2761424 3.5,12 C3.5,11.7238576 3.72385763,11.5 4,11.5 L14.7928932,11.5 Z M16,4.5 C15.7238576,4.5 15.5,4.27614237 15.5,4 C15.5,3.72385763 15.7238576,3.5 16,3.5 L19,3.5 C20.3807119,3.5 21.5,4.61928813 21.5,6 L21.5,18 C21.5,19.3807119 20.3807119,20.5 19,20.5 L16,20.5 C15.7238576,20.5 15.5,20.2761424 15.5,20 C15.5,19.7238576 15.7238576,19.5 16,19.5 L19,19.5 C19.8284271,19.5 20.5,18.8284271 20.5,18 L20.5,6 C20.5,5.17157288 19.8284271,4.5 19,4.5 L16,4.5 Z" transform="rotate(90 12.5 12)" />
                                                    </svg>
                                                </button>
                                            </TooltipMUI>
                                        ) : (
                                            <CSVLink data={this.state.downloadSolution}>
                                                <TooltipMUI title="Download .csv" placement="top">
                                                    <button id="download-btn">
                                                        <svg style={{ fill: "white" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                            <path d="M14.7928932,11.5 L11.6464466,8.35355339 C11.4511845,8.15829124 11.4511845,7.84170876 11.6464466,7.64644661 C11.8417088,7.45118446 12.1582912,7.45118446 12.3535534,7.64644661 L16.3535534,11.6464466 C16.5488155,11.8417088 16.5488155,12.1582912 16.3535534,12.3535534 L12.3535534,16.3535534 C12.1582912,16.5488155 11.8417088,16.5488155 11.6464466,16.3535534 C11.4511845,16.1582912 11.4511845,15.8417088 11.6464466,15.6464466 L14.7928932,12.5 L4,12.5 C3.72385763,12.5 3.5,12.2761424 3.5,12 C3.5,11.7238576 3.72385763,11.5 4,11.5 L14.7928932,11.5 Z M16,4.5 C15.7238576,4.5 15.5,4.27614237 15.5,4 C15.5,3.72385763 15.7238576,3.5 16,3.5 L19,3.5 C20.3807119,3.5 21.5,4.61928813 21.5,6 L21.5,18 C21.5,19.3807119 20.3807119,20.5 19,20.5 L16,20.5 C15.7238576,20.5 15.5,20.2761424 15.5,20 C15.5,19.7238576 15.7238576,19.5 16,19.5 L19,19.5 C19.8284271,19.5 20.5,18.8284271 20.5,18 L20.5,6 C20.5,5.17157288 19.8284271,4.5 19,4.5 L16,4.5 Z" transform="rotate(90 12.5 12)" />
                                                        </svg>
                                                    </button>
                                                </TooltipMUI>
                                            </CSVLink>

                                        )}
                                        {/* <CSVLink data={this.state.download}>
                                            <TooltipMUI title="Download .csv" placement="top">
                                                <button id="download-btn">
                                                    <svg style={{ fill: "white" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                        <path d="M14.7928932,11.5 L11.6464466,8.35355339 C11.4511845,8.15829124 11.4511845,7.84170876 11.6464466,7.64644661 C11.8417088,7.45118446 12.1582912,7.45118446 12.3535534,7.64644661 L16.3535534,11.6464466 C16.5488155,11.8417088 16.5488155,12.1582912 16.3535534,12.3535534 L12.3535534,16.3535534 C12.1582912,16.5488155 11.8417088,16.5488155 11.6464466,16.3535534 C11.4511845,16.1582912 11.4511845,15.8417088 11.6464466,15.6464466 L14.7928932,12.5 L4,12.5 C3.72385763,12.5 3.5,12.2761424 3.5,12 C3.5,11.7238576 3.72385763,11.5 4,11.5 L14.7928932,11.5 Z M16,4.5 C15.7238576,4.5 15.5,4.27614237 15.5,4 C15.5,3.72385763 15.7238576,3.5 16,3.5 L19,3.5 C20.3807119,3.5 21.5,4.61928813 21.5,6 L21.5,18 C21.5,19.3807119 20.3807119,20.5 19,20.5 L16,20.5 C15.7238576,20.5 15.5,20.2761424 15.5,20 C15.5,19.7238576 15.7238576,19.5 16,19.5 L19,19.5 C19.8284271,19.5 20.5,18.8284271 20.5,18 L20.5,6 C20.5,5.17157288 19.8284271,4.5 19,4.5 L16,4.5 Z" transform="rotate(90 12.5 12)" />
                                                    </svg>
                                                </button>
                                            </TooltipMUI>
                                        </CSVLink> */}

                                    </div>
                                    <div>
                                        <EditStudy
                                            study_name={this.state.study_name}
                                            study_description={this.state.study_description}
                                            blocks_count={this.state.blocks_count}
                                            newWords_count={this.state.newWords_count}
                                            groups={this.state.groups}
                                            studyID={this.props.match.params.id}
                                            participants_count={this.state.participants_count}
                                            action={this.updateView} />
                                    </div>
                                    <div>
                                        <DeleteStudy
                                            studyID={this.props.match.params.id}
                                            action={this.updateView} />

                                    </div>
                                    <div>
                                        <button id="update-btn" onClick={this.updateNovelty}>
                                            <span>Update Novelty</span>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <Grid container direction="row"
                                justify="space-around"
                                alignItems="flex-start"
                                spacing={40}
                                style={{ marginBottom: "0" }}>
                                <Grid item xs={4}>

                                    <div id="study-description-card">
                                        <h3 className="card-heading">DESCRIPTION</h3>
                                        <p>{this.state.study_description}</p>
                                    </div>





                                    {this.state.study_open ? (
                                        <div id="study-group-links">
                                            <h3 className="card-heading">STUDY LINKS</h3>
                                            <p>Share the links below with the appropriate test groups.</p>
                                            {this.state.study_link.map((link, index) => (
                                                <React.Fragment key={index}>
                                                    <h3 key={index}>{this.state.groups[index].group_name}:</h3>
                                                    <div className="link-wrapper">
                                                        <textarea readOnly onChange={this.onChange} rows={2} cols={30} value={link} />
                                                        <Tooltip
                                                            content="COPIED TO CLIPBOARD!"
                                                            className="target"
                                                            tipContentClassName=""
                                                            eventOn="onClick"
                                                            eventOff="onMouseOut"
                                                            useHover={false}
                                                            padding="15px"
                                                        >
                                                            <CopyToClipboard onCopy={this.onCopy} text={link}>
                                                                <button className="copy-btn">
                                                                    <span>COPY</span>
                                                                    <svg style={{ fill: "#0580ED" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                                                        <path d="M12.1509114,11.8471512 C11.9561803,11.6513594 11.9570402,11.3347781 12.152832,11.140047 C12.3486238,10.9453159 12.6652051,10.9461758 12.8599362,11.1419675 C14.1569415,12.4460376 14.1552178,14.5533998 12.856081,15.8553464 L10.688307,18.0278091 C9.3951468,19.3237661 7.29827736,19.3325453 5.99431094,18.0474618 C4.69149253,16.763155 4.67648972,14.6664 5.96047544,13.3639073 L8.14392596,11.1489854 C8.33778599,10.9523311 8.65436038,10.9500659 8.85101464,11.143926 C9.0476689,11.337786 9.04993407,11.6543604 8.85607404,11.8510146 L6.67262352,14.0659366 C5.77635786,14.9751207 5.78683033,16.4387269 6.69601444,17.3349926 C7.60857323,18.2343365 9.07566605,18.2281941 9.98043674,17.3214665 L12.1482108,15.1490039 C13.0582922,14.2369541 13.0594996,12.7606885 12.1509114,11.8471512 Z M11.6878673,12.1529632 C11.8825984,12.3487549 11.8817385,12.6653363 11.6859467,12.8600673 C11.4901549,13.0547984 11.1735736,13.0539386 10.9788425,12.8581468 C9.6815949,11.553833 9.68192903,9.44650437 10.9795902,8.14260207 L13.0682259,6.04392106 C14.4153605,4.69030749 16.5980987,4.66396082 17.9775134,5.98466366 C18.0231051,6.02831479 18.0674283,6.07327174 18.1104279,6.11947844 C19.3455559,7.44672946 19.2708754,9.52394808 17.9436244,10.7590761 L15.679401,12.8661422 C15.4772494,13.0542628 15.1608713,13.0428883 14.9727508,12.8407366 C14.7846303,12.638585 14.7960047,12.3222069 14.9981564,12.1340864 L17.2623797,10.0270203 C18.1853275,9.16813328 18.237259,7.72367084 17.378372,6.80072308 C17.3484709,6.76859174 17.3176493,6.73732944 17.2859456,6.70697519 C16.3000074,5.76300139 14.7398929,5.7818327 13.777027,6.74932948 L11.6883913,8.84801049 C10.7789081,9.76186788 10.7786739,11.2388174 11.6878673,12.1529632 Z" />
                                                                    </svg>
                                                                </button>
                                                            </CopyToClipboard>
                                                        </Tooltip>
                                                    </div>
                                                </React.Fragment>)
                                            )}

                                        </div>
                                    ) : (
                                            <div className="groups-study-closed">
                                                <h3 className="card-heading">GROUPS</h3>
                                                {this.state.groups.map((group, index) => (
                                                    <div key={index}><h4 style={{ display: "inline-block", margin: "1rem 0" }}>{group.group_name}:</h4> {group.participants_count} Participants</div>
                                                ))}
                                            </div>
                                        )}


                                </Grid>
                                <Grid item xs={8} style={{ paddingRight: "50px" }}>
                                    <Grid container direction="row"
                                        justify="space-between"
                                        alignItems="flex-start">
                                        <Grid item xs={6}>
                                            <div className="study-results">
                                                <h3 className="card-heading">RESULTS</h3>
                                                {(this.state.participants_count !== 0) ? (
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Group</TableCell>
                                                                <TableCell align="right">Participants</TableCell>
                                                                <TableCell align="right">Usefulness Mean</TableCell>
                                                                <TableCell align="right">Novelty Mean</TableCell>
                                                                <TableCell align="right">Creativity Score</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {rows.map((row, i) => (
                                                                <TableRow key={i}>
                                                                    <TableCell component="th" scope="row">
                                                                        {row.group_name}
                                                                    </TableCell>
                                                                    <TableCell align="right">{row.participants}</TableCell>
                                                                    <TableCell align="right">{row.usefulness_mean}</TableCell>
                                                                    <TableCell align="right">{row.novelty_mean}</TableCell>
                                                                    <TableCell align="right">{row.creativity_mean}</TableCell>

                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                ) : (<p> No entries yet </p>)}
                                            </div>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <div className="study-graph">
                                                <h3 className="card-heading">GRAPH</h3>
                                                {(this.state.participants_count !== 0) ? (
                                                    <Plot
                                                        data={graphData}
                                                        layout={graphlayout}
                                                    />) : (<p>No entries yet</p>)}
                                            </div>
                                        </Grid>

                                    </Grid>

                                </Grid>
                            </Grid>


                        </React.Fragment>) : (<div style={{ position: "fixed", width: "70%", height: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <GooSpinner
                                size={100}
                                color="#FFE748"
                                loading={this.state.isloading} />
                        </div>

                        )}

                </div>

            </React.Fragment>

        )
    }
}

const mapStateToProps = state => ({
    userID: state.auth.user.id
});

export default withRouter(connect(mapStateToProps)(Study));
