// Tasks Component for handling individual study sequence

import React from 'react';
import { withRouter } from "react-router";

import axios from 'axios';
import NewWordsController from './NewWordsController';

import BlocksController from './BlocksController';

class Tasks extends React.Component {
    state = {
        counter: 0,
        tasks: []
    }

    componentDidMount() {

        // get study and group specific tasks
        axios.get(`/api/solution/${this.props.match.params.studyid}/${this.props.match.params.groupid}`)
            .then(res => {
                this.setState({
                    tasks: res.data,
                });
            })
            .catch(err => {
                console.log(err);
            })

    }

    // method to be passed to child components to externally update tasks counter
    incrementCounter = () => {
        // this.props.incrementSequenceCounter();

        this.setState({
            counter: this.state.counter + 1
        })
    }

    blocksFinished = () => {

        const newWordsCounter = this.state.tasks.map(task => task.task_type).indexOf('Neue_Wörter')
        console.log(newWordsCounter);

        if (newWordsCounter !== -1) {
            this.setState({
                counter: newWordsCounter
            })
        }
        else {
            this.props.incrementSequenceCounter()
        }


    }

    render() {
        console.log(this.props)
        if (this.state.tasks.length === 0) {
            return <div></div>
        }
        else {
            if (this.state.tasks[this.state.counter].task_type === 'Tetris') {
                // return <Blocks counter={this.state.counter} total={this.state.tasks.length} tasks={this.state.tasks} incrementCounter={this.incrementCounter} incrementSequenceCounter={this.props.incrementSequenceCounter} index={this.props.index} />
                return <BlocksController counter={this.state.counter} total={this.state.tasks.length} tasks={this.state.tasks} blocksFinished={this.blocksFinished} incrementCounter={this.incrementCounter} incrementSequenceCounter={this.props.incrementSequenceCounter} index={this.props.index} />
            } else if (this.state.tasks[this.state.counter].task_type === 'Neue_Wörter') {
                // return <NewWords counter={this.state.counter} total={this.state.tasks.length} tasks={this.state.tasks} incrementCounter={this.incrementCounter} incrementSequenceCounter={this.props.incrementSequenceCounter} index={this.props.index} />
                return <NewWordsController counter={this.state.counter} total={this.state.tasks.length} tasks={this.state.tasks} incrementCounter={this.incrementCounter} incrementSequenceCounter={this.props.incrementSequenceCounter} index={this.props.index} />
            }
        }

    }
}

export default withRouter(Tasks);
