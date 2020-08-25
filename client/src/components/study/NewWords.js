// New Words Task Component

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./NewWords.css";

// import Countdown from 'react-countdown-now';
import Countdown from "./Countdown";

import axios from "axios";

class NewWords extends Component {
  constructor(props) {
    super(props);
    this.countdownElement = React.createRef();
  }

  state = {
    tasks: [],
    counter: 0,
    total: 0,
    taskID: "",

    words: [],

    allowedChars: [""],
    charGreyed: [],
    charGreyedFull: [],

    values: [""],

    shake: false
  };

  // get specific tasks
  getData() {
    let { counter } = this.props;

    axios
      .get(
        `/api/solution/${this.props.match.params.studyid}/${
          this.props.match.params.groupid
        }`
      )
      .then(res => {
        this.setState({
          tasks: res.data
        });

        this.setData(counter);
        // console.log(this.state);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // load and set new configuration based on counter
  setData(counter) {
    let words = this.props.tasks[counter].task.map(word => word.toUpperCase());
    let taskID = this.props.tasks[counter]._id;
    this.setState({
      words: words,
      allowedChars: words,
      charGreyed: new Array(words.join("").split("").length).fill(false),
      charGreyedFull: new Array(words.join("").split("").length).fill(false),
      total: this.state.tasks.length,
      taskID: taskID
    });
  }

  // initial component loading
  componentDidMount() {
    this.setData(this.props.counter);
    // this.props.setTimeout(this.handleNext, 10000);

    // setTimeout(() => {
    //   console.log("triggered1")
    //   this.timeNext()
    // }, 10000);
  }

  // update view on counter change
  componentDidUpdate(prevProps) {
    if (this.props.counter !== prevProps.counter) {
      this.setData(this.props.counter);

      // setTimeout(() => {
      //   console.log("triggered")
      //   this.timeNext()
      // }, 10000);
    }
  }

  // display words based on state
  renderWords() {
    let count = -1;
    return this.state.words.map((word, i) => {
      return (
        <ul key={i}>
          {word.split("").map((char, j) => {
            count++;
            return (
              <li
                key={count}
                className={
                  this.state.charGreyed[count] ? "char char-used" : "char"
                }
              >
                {char}
              </li>
            );
          })}
        </ul>
      );
    });
  }

  // create input fields and buttons
  createUI() {
    return this.state.values.map((el, i) => (
      <div
        key={i}
        className={
          this.state.shake
            ? "input-btn-container shake-anim"
            : "input-btn-container"
        }
      >
        <input
          type="text"
          autoFocus
          value={el || ""}
          onKeyPress={this.handleKeyPress.bind(this, i)}
          onChange={this.handleChange.bind(this, i)}
        />
        <button type="button" className="add-btn" onClick={this.addClick}>
          <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 11v-11h1v11h11v1h-11v11h-1v-11h-11v-1h11z" />
          </svg>
        </button>
        {/* <input type='button' value='remove' onClick={this.removeClick.bind(this, i)}/> */}
      </div>
    ));
  }

  // update values in state based on user input, greying out used characters
  handleChange(i, event) {
    let values = [...this.state.values];
    values[i] = event.target.value.toUpperCase();

    this.setState({
      values: values
    });

    // converting arrays
    const fullChars = this.state.words.join("").split("");
    const usedChars = values.join("").split("");

    const copy = [...usedChars];

    let allowedChars = [];

    for (let i = 0; i < fullChars.length; i++) {
      let index = copy.indexOf(fullChars[i]);
      if (index === -1) {
        allowedChars.push(fullChars[i]);
      } else copy.splice(index, 1);
    }

    this.setState({
      allowedChars: allowedChars
    });

    // helper function to get nth index of a character that exists multiple times
    Array.prototype.nthIndexOf = function(e, n) {
      var index = -1;
      for (var i = 0, len = this.length; i < len; i++) {
        if (i in this && e === this[i] && !--n) {
          index = i;
          break;
        }
      }
      return index;
    };

    // helper function to count number of characters in specific array
    function countInArray(array, what) {
      return array.filter(item => item === what).length;
    }

    const charGreyedCopy = [...this.state.charGreyedFull];
    const mappedChars = [];

    // iterating over used characters and updating greyed out character array
    usedChars.forEach(char => {
      let charIndex;
      let count = countInArray(mappedChars, char);

      if (!mappedChars.includes(char)) {
        charIndex = fullChars.indexOf(char);
      } else {
        charIndex = fullChars.nthIndexOf(char, count + 1);
      }

      mappedChars.push(char);

      charGreyedCopy[charIndex] = true;
    });

    this.setState({ charGreyed: charGreyedCopy });
  }

  // Deciding if letter is allowed or not. If not, don't display letter
  handleKeyPress(i, event) {
    let regex = new RegExp("[" + this.state.allowedChars.join("") + "]", "i");

    if (event.key == "Enter") {
      this.addClick();
    }

    if (!regex.test(event.key.toUpperCase())) {
      this.setState({ shake: !this.state.shake });
      event.preventDefault();
    }
  }

  // Adding new empty input value to value array on click
  addClick = e => {
    // this.setState(prevState => ({ values: ['', ...prevState.values] }))
    this.setState(prevState => ({ values: [...prevState.values, ""] }));
  };

  timeNext = () => {
    // create solution object based on current state
    const solutionObject = {
      solution: this.state.values.join().toLowerCase(),
      unused: this.state.allowedChars.join(" ").toLowerCase(),
      task: this.state.taskID
    };

    // post new solution to server
    axios
      .post(
        `/api/solution/${this.props.match.params.studyid}/${
          this.props.match.params.groupid
        }`,
        solutionObject
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });

    let { counter, total } = this.props;

    // push to end page if all tasks are completed
    if (counter === total - 1) {
      // this.props.history.push("/icaa");
      this.props.incrementSequenceCounter();
    } else {
      this.props.incrementCounter();

      // reset input values
      this.setState({
        values: [""]
      });
    }
  };

  handleNext = e => {
    e.preventDefault();

    // create solution object based on current state
    const solutionObject = {
      solution: this.state.values.join().toLowerCase(),
      unused: this.state.allowedChars.join().toLowerCase(),
      task: this.state.taskID
    };

    // post new solution to server
    axios
      .post(
        `/api/solution/${this.props.match.params.studyid}/${
          this.props.match.params.groupid
        }`,
        solutionObject
      )
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });

    let { counter, total } = this.props;

    // push to end page if all tasks are completed
    if (counter === total - 1) {
      // this.props.history.push("/icaa");
      this.props.incrementSequenceCounter();
    } else {
      this.countdownElement.current.resetCountdown();
      this.props.incrementCounter();

      // reset input values
      this.setState({
        values: [""]
      });
    }
  };

  render() {
    console.log(this.props.counter + 1, this.props.total + 1);
    return (
      <div>
        {/* <ProgressBar
          percent={((this.props.counter + 2) / (this.props.total + 4)) * 100}
          filledBackground="linear-gradient(to right, rgb(255, 187, 153), rgb(255, 134, 73))"
        /> */}
        <div className="newWords">
          <div className="newWords-description">
            <div className="wrapper">
              <div className="task-heading">
                <span className="task-number-newWords">1</span>
                <h1 className="newWords-heading">Neue Wörter</h1>
              </div>
              <p className="newWords-task-description">
                Versuchen Sie, so viele Buchstaben wie möglich zu nutzen und
                dabei deutsche Wörter zu bilden, die möglich sind, aber nicht
                jedem einfallen.
                <br />
                Tippen Sie die Wörter mit Ihrer <span>Tastatur</span> ein und
                fügen Sie neue Wörter mit dem <span>'+'-Icon</span> hinzu.
              </p>
            </div>
            <Countdown
              timer={180}
              timeNext={this.timeNext}
              ref={this.countdownElement}
            />
            {/* <Countdown
              date={Date.now() + 10000}
              renderer={this.renderer}
            /> */}
          </div>

          <div className="container-newWords">
            <div className="word-container">{this.renderWords()}</div>
            <div className="input-container">
              <form>
                {this.createUI()}
                {this.props.counter === this.props.total - 1 ? (
                  <button
                    type="button"
                    className="next-btn"
                    disabled={this.state.values.every(el => el.length === 0)}
                    onClick={this.handleNext}
                  >
                    Aufgabe abschließen
                  </button>
                ) : (
                  <button
                    type="button"
                    className="next-btn"
                    disabled={this.state.values.every(el => el.length === 0)}
                    onClick={this.handleNext}
                  >
                    Nächste Aufgabe
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(NewWords);
