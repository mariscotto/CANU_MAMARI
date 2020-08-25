// Questionnaire Component

import React from "react";
import axios from "axios";

import * as Survey from "survey-react";
import "survey-react/survey.css";

import "./Questionnaire.css";

import "react-step-progress-bar/styles.css";

class APM extends React.Component {
  state = {
    isCompleted: false,
    requiredQ: true
  };

  onCompleteComponent = survey => {
    this.setState({ isCompleted: true });

    console.log("completetriggered");
    //Änderung
    this.props.incrementSequenceCounter();

    axios
      .post(`/api/APM`, survey.data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    // var model = new Survey.Model(this.json);

    console.log(this.props.count + 1, this.props.total);

    var defaultThemeColors = Survey.StylesManager.ThemeColors["default"];
    defaultThemeColors["$main-color"] = "#3200ff";
    defaultThemeColors["$main-hover-color"] = "#f55000";
    Survey.StylesManager.applyTheme();

    let json = {
      locale: "de",
      pages: [
        {
          name: "Schlussfolgerndes Denken_Instruktionen",
          elements: [
            {
              type: "html",
              name: "info_APM_Instruktion",
              html: {
                de:
                  "Es handelt sich bei der folgenden Aufgabe um einen <b>Test der Wahrnehmung und des logischen Denkens</b>. Anhand eines Beispielproblems soll Ihnen gezeigt werden, wie der Test funktioniert.<br><br>Der obere Teil dieses Problems besteht aus einem Muster, aus dem ein Teil abgeschnitten ist. Betrachten Sie das Muster und überlegen Sie, wie das Teil aussehen muss, mit dem das Muster sowohl in <b>waagerechter</b> und <b>senkrechter</b> Richtung korrekt vervollständigt werden kann. Suchen Sie nun aus den acht unterhalb angeordneten Wahlmöglichkeiten die Korrekte heraus. Nur eines dieser Teile bildet eine vollständige richtige Antwort.<br><br><img src='/images/Item_1.png' width='400' alt='Beispielaufgabe' align='middle'/><br><br>Bei der Betrachtung jeder Reihe (waagerecht) und jeder Spalte (senkrecht) wird deutlich, dass Antwortmöglichkeit <b>Nummer 4</b> für beide Richtungen die korrekte Lösung bietet.<br><br>Sie werden feststellen, dass die <b>sechs Durchgänge</b> unterschiedlich schwer sind und, dass für die Lösung von einfachen und schwierigen Problemen gleichermaßen immer die gleiche Methode anzuwenden ist. <b>Zur Bearbeitung der Probleme steht Ihnen soviel Zeit zur Verfügung, wie Sie möchten.</b> Denken Sie daran, dass es auf die Genauigkeit des Arbeitens ankommt. Die Lösung der Probleme erfolgt der Reihe nach und es ist nicht möglich, an den Anfang der Aufgabe zurückzuspringen. Sobald Sie sich für eine Antwortmöglichkeit entschieden haben, klicken Sie auf diese. Sie erreichen den ersten Durchgang über den Button <b>'Weiter'</b>."
              }
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
                "<img src='/images/Item_7_0.png' width='500' alt='Test Item 1' align='middle'/>"
            },
            {
              type: "html",
              name: "info_Anweisung",
              html:
                "Sobald Sie sich für eine Antwortmöglichkeit entschieden haben, klicken Sie auf diese. Klicken Sie anschließend auf 'Weiter'"
            },
            {
              type: "imagepicker",
              name: "APM_7",
              title: {
                de: " "
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
                "Sobald Sie sich für eine Antwortmöglichkeit entschieden haben, klicken Sie auf diese. Klicken Sie anschließend auf 'Weiter'"
            },
            {
              type: "imagepicker",
              name: "APM_8",
              title: {
                de: " "
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
                "Sobald Sie sich für eine Antwortmöglichkeit entschieden haben, klicken Sie auf diese. Klicken Sie anschließend auf 'Weiter'"
            },
            {
              type: "imagepicker",
              name: "APM_9",
              title: {
                de: " "
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
                "Sobald Sie sich für eine Antwortmöglichkeit entschieden haben, klicken Sie auf diese. Klicken Sie anschließend auf 'Weiter'"
            },
            {
              type: "imagepicker",
              name: "APM_10",
              title: {
                de: " "
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
                "Sobald Sie sich für eine Antwortmöglichkeit entschieden haben, klicken Sie auf diese. Klicken Sie anschließend auf 'Weiter'"
            },
            {
              type: "imagepicker",
              name: "APM_11",
              title: {
                de: " "
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
                "Sobald Sie sich für eine Antwortmöglichkeit entschieden haben, klicken Sie auf diese. Klicken Sie anschließend auf 'Weiter'"
            },
            {
              type: "imagepicker",
              name: "APM_12",
              title: {
                de: " "
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
        de: "Weiter"
      },
      completeText: {
        de: "Weiter"
      },
      requiredText: ""
    };

    var surveyRender = !this.state.isCompleted ? (
      <div>
        {/* <ProgressBar
          percent={((this.props.count + 1) / this.props.total) * 100}
          filledBackground="linear-gradient(to right,rgb(255, 187, 153), rgb(255, 134, 73))"
        /> */}

        <div className="questionnaire-description">
          <div className="wrapper">
            <div className="task-heading">
              <span className="task-number-questionnaire">3</span>
              <h1 className="questionnaire-heading">
                Schlussfolgerndes Denken
              </h1>
            </div>
            <p className="questionnaire-task-description">
              Bitte lösen Sie die folgende Aufgabe.
            </p>
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
      <div>
        {surveyRender}
        {/* {onCompleteComponent} */}

        {/* <Survey.Survey model={model} onComplete={this.onComplete} /> */}
      </div>
    );
  }
}

export default APM;
