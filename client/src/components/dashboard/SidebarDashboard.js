// Sidebar Component for navigation between studies, could be updated with other elements in the future

import React, { Component } from "react";
import { Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import SvgIcon from '@material-ui/core/SvgIcon';
import Divider from '@material-ui/core/Divider';

import axios from 'axios';

import './SidebarDashboard.css';

class SidebarDashboard extends Component {

    state = {
        studies: [],
        open: false
    }

    componentDidMount() {

        // fetch studies based on logged in user id
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

    // Expand, close list on click
    handleClick = () => {
        this.setState(state => ({ open: !state.open }));
    };


    render() {
        return (
            <div>
                <div id="sidebar-dashboard">
                    <List>
                        <ListItem button onClick={this.handleClick}>
                            <ListItemIcon style={{ marginRight: "8px" }}>{
                                <SvgIcon>
                                    <path d="M21.9 20.8H2c-.8 0-1.5-.7-1.5-1.5V4.7c0-.8.7-1.5 1.5-1.5h19.9c.8 0 1.5.7 1.5 1.5v14.6c0 .8-.6 1.5-1.5 1.5zM.9 5.9h22" fill="none" stroke="#000" strokeMiterlimit="10" />
                                    <path fill="none" stroke="#000" strokeLinecap="round" strokeMiterlimit="10" d="M9.2 17.7L14 8.1" />
                                    <circle cx="2.7" cy="4.5" r=".4" />
                                    <circle cx="4.2" cy="4.5" r=".4" />
                                    <circle cx="5.7" cy="4.5" r=".4" />
                                    <path d="M3 16.5c-.1-.1-.2-.3-.2-.5s0-.3.1-.5L5 10.7c.1-.2.3-.3.5-.3s.4.1.5.3l2.1 4.8c.1.2.1.3.1.5s-.1.4-.2.5c-.1.1-.3.2-.5.3L6.8 15H4.3l-.8 1.8c-.2-.1-.3-.2-.5-.3zM5.5 12l-.8 2.1h1.8M15.1 16.5c-.1-.1-.2-.2-.2-.4v-5.3c0-.1.1-.3.2-.3.1-.1.2-.1.4-.1h2.4c.6 0 1 .2 1.3.5.3.3.5.7.5 1.3 0 .3-.1.5-.2.7-.1.2-.3.4-.6.5.3.1.6.3.8.5.2.2.3.5.3.9s-.1.7-.2 1c-.2.3-.4.5-.7.6-.3.2-.6.2-1 .2h-2.6c-.2.1-.3 0-.4-.1zm2.8-3.4c.2 0 .4-.1.6-.3.2-.2.2-.4.2-.6 0-.3-.1-.5-.2-.6-.1-.2-.3-.2-.6-.2H16v1.8h1.9zm.1 2.6c.3 0 .5-.1.6-.2.2-.2.2-.4.2-.7 0-.3-.1-.5-.2-.7-.1 0-.3-.1-.6-.1h-2v1.8h2z" />
                                </SvgIcon>
                            }</ListItemIcon>
                            <ListItemText disableTypography primary="Studies" />
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {this.state.studies.map((study, index) => (
                                    <Collapse key={index} in={this.state.open} timeout="auto" unmountOnExit>
                                        <List component="div" disablePadding>
                                            <Link to={'/studies/' + study.study._id}>
                                                <ListItem button>
                                                    <ListItemText disableTypography inset primary={study.study.study_name} />
                                                </ListItem>
                                            </Link>
                                        </List>
                                    </Collapse>
                                ))}

                            </List>
                        </Collapse>
                        <Divider />
                    </List>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userID: state.auth.user.id
});

export default withRouter(connect(mapStateToProps)(SidebarDashboard));