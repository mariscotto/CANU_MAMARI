import React from "react";

import Tasks from "./Tasks";
import APM from "./APM";
import ICAA from "./ICAA";
import PostQuestionnaire from "./Post_Questionnaire";

import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

class StudySequence extends React.Component {
  state = {
    count: 1,
    shuffledArray: []
  };

  constructor() {
    super();

    const componentArray = [
      // {
      //   type: Tasks,
      //   props: {
      //     tasks: this.state.tasks,
      //     incrementSequenceCounter: this.incrementSequenceCounter,
      //     count: this.state.count
      //   }
      // },
      // // {
      // //   type: APM,
      // //   props: {
      // //     incrementSequenceCounter: this.incrementSequenceCounter,
      // //     count: this.state.count
      // //   }
      // // },
      // {
      //   type: ICAA,
      //   props: {
      //     incrementSequenceCounter: this.incrementSequenceCounter,
      //     count: this.state.count
      //   }
      // }
    ];

    const shuffledArray = this.shuffle(componentArray);

    this.state.shuffledArray = shuffledArray.map(
      (componentConstructor, index) =>
        React.createElement(componentConstructor.type, {
          ...componentConstructor.props,
          index
        })
    );
  }

  incrementSequenceCounter = () => {
    this.setState({
      count: this.state.count + 1
    });
  };

  shuffle(arr) {
    var i, j, temp;
    for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  }

  renderSwitch() {
    const { count } = this.state;
    console.log(this.state.shuffledArray);

    switch (count) {
      case 1:
        return (
          <Tasks
            tasks={this.state.tasks}
            incrementSequenceCounter={this.incrementSequenceCounter}
            count={this.state.count}
          />
        );
      case 2:
        return (
          <ICAA
            incrementSequenceCounter={this.incrementSequenceCounter}
            count={this.state.count}
          />
        );
      case 3:
        return (
          <APM
            incrementSequenceCounter={this.incrementSequenceCounter}
            count={this.state.count}
          />
        );
      case 4:
        return (
          <PostQuestionnaire
            incrementSequenceCounter={this.incrementSequenceCounter}
          />
        );
      case 5:
        this.props.history.push("/finished");
    }
  }

  render() {
    return (
      <div>
        <ProgressBar
          percent={(this.state.count / 5) * 100}
          filledBackground="linear-gradient(to right, rgb(255, 187, 153), rgb(255, 134, 73))"
        />
        {this.renderSwitch()}
      </div>
    );

    // return (

    //   <APM
    //     incrementSequenceCounter={this.incrementSequenceCounter}
    //     count={this.state.count}
    //     total={this.state.tasks.length + 4}
    //     tasks={this.state.tasks}
    //   />
    // );
  }
}

export default StudySequence;
