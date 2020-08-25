import React, { Component } from 'react';

import "./Countdown.css";

class Countdown extends Component {

    state = {
        timer: this.props.timer,
    }

    resetCountdown = () => {
        this.setState({ timer: this.props.timer });
    }

    decrementTimeRemaining = () => {
        if (this.state.timer > 0) {
            this.setState({
                timer: this.state.timer - 1
            });
        } else {
            this.setState({ timer: this.props.timer });
            this.props.timeNext();
        }
    };

    decrement = () => {
        this.intervalID = setInterval(() => {
            this.decrementTimeRemaining();
        }, 1000);
    }

    componentDidMount() {
        this.decrement()
    }

    componentWillUnmount = () => {

        clearInterval(this.intervalID);
    }

    render() {
        return (
            <div className="countdown-timer">
                {/* <div className="countdown-timer__circle">
                    <svg>
                        <circle
                            r="24"
                            cx="26"
                            cy="26"
                            style={{
                                animation: `countdown-animation ${this.props
                                    .timer}s linear`
                            }}
                        />
                    </svg>
                </div> */}
                <div className="countdown-timer__text">
                    {this.state.timer}s
            </div>
            </div>
        )
    }
}

export default Countdown;