import React from 'react';
import { withRouter } from "react-router";

import Blocks from './Blocks';
import BlocksInstruction from './BlocksInstruction'

class BlocksController extends React.Component {
    state = {
        subcounter: 1
    }

    // method to be passed to child components to externally update counter
    incrementSubcounter = () => {
        this.setState({
            subcounter: this.state.subcounter + 1
        })
    }

    renderSwitch() {
        const { subcounter } = this.state;

        switch (subcounter) {
            case 1:
                return (
                    <BlocksInstruction incrementSubcounter={this.incrementSubcounter} />
                )
            case 2:
                return (
                    <Blocks counter={this.props.counter} total={this.props.tasks.length} tasks={this.props.tasks} blocksFinished={this.props.blocksFinished} incrementCounter={this.props.incrementCounter} incrementSequenceCounter={this.props.incrementSequenceCounter} index={this.props.index} />
                )
        }
    }

    render() {

        return (
            <div>
                {this.renderSwitch()}
            </div>
        )
    }
}

export default withRouter(BlocksController);
