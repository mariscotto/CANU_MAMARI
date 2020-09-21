// Questionnaire Component

import React from "react";
import axios from "axios";
import * as Survey from "survey-react";
import "survey-react/survey.css";

import "./APM.css";

import "react-step-progress-bar/styles.css";
import M from "materialize-css";
import APMInfo from "./APMInfo";
import Impressum from "./Impressum";

class APM extends React.Component {
  constructor(props){
    super(props);
    this.onCompleteComponent = this.onCompleteComponent.bind(this);
  }
  state = {
    link:`/${this.props.match.params.studyid}/${
        this.props.match.params.groupid
    }/canu/questionnaire`,
    isCompleted: false,
    requiredQ: true
  };

  onCompleteComponent = survey => {
    this.setState({ isCompleted: true });

    console.log("completetriggered");
    //Änderung
    //this.props.incrementSequenceCounter();

    axios
      .post(`/api/APM`, survey.data)
      .then(res => {
        console.log(res.data);
        this.props.history.push(this.state.link)
      })
      .catch(err => {
        console.log(err.response);
        this.props.history.push(this.state.link)
      });

  };
  openInfo(){
    var elem = document.getElementById('apm-info');
    var instance = M.Modal.init(elem,{dismissible:false});
    instance.open();
  }
  openImpressum() {
    var elem = document.getElementById('impressum');
    var instance = M.Modal.init(elem, {dismissible: false});
    instance.open();
  }
  render() {
    // var model = new Survey.Model(this.json);

    //console.log(this.props.count + 1, this.props.total);

    /*var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
    defaultThemeColors["$main-color"] = "#336666";
    defaultThemeColors["$main-hover-color"] = "#669999";
    Survey.StylesManager.applyTheme();*/

    let json = {
      locale: "en",
      pages: [
        {
          name: "Schlussfolgerndes Denken_Instruktionen",
          elements: [
            {
              type: "html",
              name: "info_APM_Instruktion",
              html: {
                en:
                  "The following task is a <b>test of perception and logical thinking</b>. An example problem will be used to show you how the test works.<br>The upper part consists of a pattern from which a part is cut off. Look at the pattern and think about how the part must look like, fits the pattern in both <b>horizontal</b> and <b>vertical</b> direction. Select the correct one from the eight options below. Only one of these parts forms a correct answer.<br><br><img src='/images/Item_1.png' width='400' alt='Beispielaufgabe' align='middle'/><br><br>When looking at the example above, it becomes clear that answer option <b>number 4</b> offers the correct solution for both directions (vertical and horizontal).<br><br>You will notice that the following <b>twelve problems</b> are of varying degrees of difficulty and that the same method should always be used to solve both simple and difficult problems.<b> You have as much time as you want to work on the problems -</b> Remember that the accuracy is what counts. Problems are solved one by one and it is not possible to go back to the beginning of the task. Once you have decided on an answer option, click on it."
              }
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_1",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                  "<img src='/images/Item_1_0.png' width='400' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                  "Once you have decided on an answer option, select it and then click on 'Next'."
            },
            {
              type: "imagepicker",
              name: "APM_1",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_1_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_1_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_1_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_1_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_1_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_1_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_1_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_1_8.png"
                }
              ]
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_2",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                  "<img src='/images/Item_2_0.png' width='400' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                  "Once you have decided on an answer option, select it and then click on 'Next'."
            },
        {
              type: "imagepicker",
              name: "APM_2",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_2_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_2_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_2_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_2_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_2_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_2_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_2_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_2_8.png"
                }
              ]
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_3",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                  "<img src='/images/Item_3_0.png' width='400' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                  "Once you have decided on an answer option, select it and then click on 'Next'."
            },
            {
              type: "imagepicker",
              name: "APM_3",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_3_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_3_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_3_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_3_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_3_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_3_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_3_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_3_8.png"
                }
              ]
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_4",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                  "<img src='/images/Item_4_0.png' width='400' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                  "Once you have decided on an answer option, select it and then click on 'Next'."
            },
            {
              type: "imagepicker",
              name: "APM_4",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_4_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_4_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_4_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_4_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_4_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_4_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_4_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_4_8.png"
                }
              ]
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_5",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                  "<img src='/images/Item_5_0.png' width='400' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                  "Once you have decided on an answer option, select it and then click on 'Next'."
            },
            {
              type: "imagepicker",
              name: "APM_5",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_5_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_5_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_5_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_5_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_5_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_5_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_5_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_5_8.png"
                }
              ]
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_6",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                  "<img src='/images/Item_6_0.png' width='400' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                  "Once you have decided on an answer option, select it and then click on 'Next'."
            },
            {
              type: "imagepicker",
              name: "APM_6",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_6_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_6_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_6_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_6_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_6_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_6_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_6_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_6_8.png"
                }
              ]
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_7",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                "<img src='/images/Item_7_0.png' width='400' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                "Once you have decided on an answer option, select it and then click on 'Next'."
            },
            {
              type: "imagepicker",
              name: "APM_7",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_7_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_7_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_7_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_7_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_7_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_7_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_7_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_7_8.png"
                }
              ]
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_8",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                "<img src='/images/Item_8_0.png' width='500' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                "Once you have decided on an answer option, select it and then click on 'Next'."
            },
            {
              type: "imagepicker",
              name: "APM_8",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_8_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_8_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_8_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_8_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_8_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_8_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_8_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_8_8.png"
                }
              ]
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_9",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                "<img src='/images/Item_9_0.png' width='500' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                "Once you have decided on an answer option, select it and then click on 'Next'."
            },
            {
              type: "imagepicker",
              name: "APM_9",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_9_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_9_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_9_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_9_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_9_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_9_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_9_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_9_8.png"
                }
              ]
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_10",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                "<img src='/images/Item_10_0.png' width='500' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                "Once you have decided on an answer option, select it and then click on 'Next'."
            },
            {
              type: "imagepicker",
              name: "APM_10",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_10_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_10_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_10_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_10_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_10_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_10_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_10_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_10_8.png"
                }
              ]
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_11",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                "<img src='/images/Item_11_0.png' width='500' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                "Once you have decided on an answer option, select it and then click on 'Next'."
            },
            {
              type: "imagepicker",
              name: "APM_11",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_11_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_11_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_11_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_11_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_11_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_11_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_11_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_11_8.png"
                }
              ]
            }
          ]
        },
        {
          name: "Schlussfolgerndes Denken_12",
          elements: [
            {
              type: "html",
              name: "info_Item",
              html:
                "<img src='/images/Item_12_0.png' width='500' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                "Once you have decided on an answer option, select it and then click on 'Next'."
            },
            {
              type: "imagepicker",
              name: "APM_12",
              title: {
                en: " "
              },
              isRequired: this.state.requiredQ,
              colCount: 4,
              choices: [
                {
                  value: "1",
                  imageLink: "/images/Item_12_1.png"
                },
                {
                  value: "2",
                  imageLink: "/images/Item_12_2.png"
                },
                {
                  value: "3",
                  imageLink: "/images/Item_12_3.png"
                },
                {
                  value: "4",
                  imageLink: "/images/Item_12_4.png"
                },
                {
                  value: "5",
                  imageLink: "/images/Item_12_5.png"
                },
                {
                  value: "6",
                  imageLink: "/images/Item_12_6.png"
                },
                {
                  value: "7",
                  imageLink: "/images/Item_12_7.png"
                },
                {
                  value: "8",
                  imageLink: "/images/Item_12_8.png"
                }
              ]
            }
          ]
        }
      ],
      showPrevButton: false,
      showQuestionNumbers: "off",
      pageNextText: {
        en: "Next"
      },
      completeText: {
        en: "Next"
      },
      requiredText: ""
    };

    var surveyRender = !this.state.isCompleted ? (
        <div style={{height: "100%"}}>
          <Impressum/>
          <APMInfo/>
        <div className="questionnaire-description">
          <div className="apm-wrapper">
            <div className="task-heading">
              <h1 className="questionnaire-heading">
                Conclusive thinking
              </h1>
            </div>
            <p className="questionnaire-task-description">
              Please solve the following task.
            </p>
            <a className="waves-effect waves-light btn-small info-button modal-trigger"
               onClick={this.openInfo}>?</a>
            <a className="waves-effect waves-light btn-small impressum-button modal-trigger"
               onClick={this.openImpressum}>i</a>
          </div>
        </div>
        <Survey.Survey
        json={json}
      showCompletedPage={false}
      onComplete={this.onCompleteComponent}
      />
      </div>
    ) : null;

    // var onCompleteComponent = this.state.isCompleted ? (
    //   this.props.incrementSequenceCounter()
    //   // <Tasks tasks={this.props.tasks} />
    // ) : null;

    return (
      <div style={{height: "100%"}}>
        {surveyRender}
        {/* {onCompleteComponent} */}

        {/* <Survey.Survey model={model} onComplete={this.onComplete} /> */}
      </div>
    );
  }
}

export default APM;
