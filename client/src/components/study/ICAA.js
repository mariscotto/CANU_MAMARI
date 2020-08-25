// Questionnaire Component

import React from "react";
import axios from "axios";

import * as Survey from "survey-react";
import "survey-react/survey.css";

import "./Questionnaire.css";

import "react-step-progress-bar/styles.css";

class ICAA extends React.Component {
  state = {
    isCompleted: false,
    requiredQ: true,
    caInstructions: [],
    caScale: ["Nie", "1-2 Mal", "3-5 Mal", "6-10 Mal", "Mehr als 10 Mal"]
  };

  onCompleteComponent = survey => {
    this.setState({ isCompleted: true });

    console.log("completetriggered");
    // Änderung
    this.props.incrementSequenceCounter();
    console.log(survey.data);
    axios
      .post(`/api/ICAA`, survey.data)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  constructor() {
    super();
    const caInstructionStart =
      "Bitte kreuzen Sie für alle kreativen Aktivitäten aus dem Bereich ";
    const caInstructionEnd =
      " an, wie häufig Sie diese in den letzten 10 Jahren gemacht haben.";
    const caCategoryTitles = [
      "Literatur",
      "Musik",
      "Handarbeiten",
      "Kochen",
      "Sport",
      "bildende Kunst",
      "darstellende Kunst",
      "Technik & Naturwissenschaft"
    ];
    const caInstructions = [];
    for (var i = 0; i < 8; i++) {
      caInstructions.push(
        caInstructionStart + caCategoryTitles[i] + caInstructionEnd
      );
    }
    this.state.caInstructions = caInstructions;
  }

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
          name: "Kreative Aktivitäten",
          elements: [
            {
              type: "matrix",
              name: "literature",
              isAllRowRequired: this.state.requiredQ,
              title: {
                de: this.state.caInstructions[0]
              },
              columns: [
                {
                  value: "1",
                  text: {
                    de: this.state.caScale[0]
                  }
                },
                {
                  value: "2",
                  text: {
                    de: this.state.caScale[1]
                  }
                },
                {
                  value: "3",
                  text: {
                    de: this.state.caScale[2]
                  }
                },
                {
                  value: "4",
                  text: {
                    de: this.state.caScale[3]
                  }
                },
                {
                  value: "5",
                  text: {
                    de: this.state.caScale[4]
                  }
                }
              ],
              rows: [
                {
                  value: "short",
                  text: {
                    de: "ein kurzes Werk (Gedicht/Kurzgeschichte) geschrieben"
                  }
                },
                {
                  value: "long",
                  text: {
                    de: "ein langes Werk (Buch, Theaterstück) geschrieben"
                  }
                },
                {
                  value: "newspaper",
                  text: {
                    de: "einen Beitrag für eine Zeitung geschrieben"
                  }
                },
                {
                  value: "speech",
                  text: {
                    de: "eine originelle Rede entworfen"
                  }
                },
                {
                  value: "joke",
                  text: {
                    de: "einen Witz erfunden"
                  }
                },
                {
                  value: "blog",
                  text: {
                    de: "einen Blogeintrag geschrieben"
                  }
                }
              ]
            },
            {
              type: "matrix",
              name: "music",
              isAllRowRequired: this.state.requiredQ,
              title: {
                de: this.state.caInstructions[1]
              },
              columns: [
                {
                  value: "1",
                  text: {
                    de: this.state.caScale[0]
                  }
                },
                {
                  value: "2",
                  text: {
                    de: this.state.caScale[1]
                  }
                },
                {
                  value: "3",
                  text: {
                    de: this.state.caScale[2]
                  }
                },
                {
                  value: "4",
                  text: {
                    de: this.state.caScale[3]
                  }
                },
                {
                  value: "5",
                  text: {
                    de: this.state.caScale[4]
                  }
                }
              ],
              rows: [
                {
                  value: "own_piece",
                  text: {
                    de: "ein Musikstück geschrieben"
                  }
                },
                {
                  value: "interpreted_piece",
                  text: {
                    de: "ein Musikstück kreativ abgeändert/neu interpretiert"
                  }
                },
                {
                  value: "own_melodie",
                  text: {
                    de: "eine Melodie ausgedacht"
                  }
                },
                {
                  value: "own_rhythm",
                  text: {
                    de: "einen Rhythmus ausgedacht"
                  }
                },
                {
                  value: "synthesizer",
                  text: {
                    de: "Töne künstlich erzeugt (z.B. mit Synthesizer)"
                  }
                },
                {
                  value: "playlist",
                  text: {
                    de:
                      "eine Musikzusammenstellung erstellt (z.B. DJ, CD-Sampler)"
                  }
                }
              ]
            },
            {
              type: "matrix",
              name: "crafts",
              isAllRowRequired: this.state.requiredQ,
              title: {
                de: this.state.caInstructions[2]
              },
              columns: [
                {
                  value: "1",
                  text: {
                    de: this.state.caScale[0]
                  }
                },
                {
                  value: "2",
                  text: {
                    de: this.state.caScale[1]
                  }
                },
                {
                  value: "3",
                  text: {
                    de: this.state.caScale[2]
                  }
                },
                {
                  value: "4",
                  text: {
                    de: this.state.caScale[3]
                  }
                },
                {
                  value: "5",
                  text: {
                    de: this.state.caScale[4]
                  }
                }
              ],
              rows: [
                {
                  value: "created_object",
                  text: {
                    de: "einen Alltagsgegenstand gebastelt"
                  }
                },
                {
                  value: "enhanced_object",
                  text: {
                    de: "einen Alltagsgegenstand verschönert"
                  }
                },
                {
                  value: "gift",
                  text: {
                    de: "ein Geschenk gebastelt"
                  }
                },
                {
                  value: "decoration",
                  text: {
                    de: "originelle Dekoration gestaltet"
                  }
                },
                {
                  value: "planed_garden",
                  text: {
                    de: "einen Garten geplant"
                  }
                },
                {
                  value: "created_cloths",
                  text: {
                    de: "Kleidung entworfen oder genäht"
                  }
                }
              ]
            },
            {
              type: "matrix",
              name: "cooking",
              isAllRowRequired: this.state.requiredQ,
              title: {
                de: this.state.caInstructions[3]
              },
              columns: [
                {
                  value: "1",
                  text: {
                    de: this.state.caScale[0]
                  }
                },
                {
                  value: "2",
                  text: {
                    de: this.state.caScale[1]
                  }
                },
                {
                  value: "3",
                  text: {
                    de: this.state.caScale[2]
                  }
                },
                {
                  value: "4",
                  text: {
                    de: this.state.caScale[3]
                  }
                },
                {
                  value: "5",
                  text: {
                    de: this.state.caScale[4]
                  }
                }
              ],
              rows: [
                {
                  value: "own_dish",
                  text: {
                    de: "ein originelles Gericht gekocht"
                  }
                },
                {
                  value: "presentation",
                  text: {
                    de: "ein Gericht kreativ angerichtet"
                  }
                },
                {
                  value: "cake_decoration",
                  text: {
                    de: "Kekse/Torte kreativ verziert"
                  }
                },
                {
                  value: "food_sculpture",
                  text: {
                    de: "eine Skulptur aus Essen gemacht"
                  }
                },
                {
                  value: "recipe",
                  text: {
                    de: "ein eigenes Rezept erfunden"
                  }
                },
                {
                  value: "drink",
                  text: {
                    de: "ein neues Getränk/Cocktail kreiert"
                  }
                }
              ]
            },
            {
              type: "matrix",
              name: "sports",
              isAllRowRequired: this.state.requiredQ,
              title: {
                de: this.state.caInstructions[4]
              },
              columns: [
                {
                  value: "1",
                  text: {
                    de: this.state.caScale[0]
                  }
                },
                {
                  value: "2",
                  text: {
                    de: this.state.caScale[1]
                  }
                },
                {
                  value: "3",
                  text: {
                    de: this.state.caScale[2]
                  }
                },
                {
                  value: "4",
                  text: {
                    de: this.state.caScale[3]
                  }
                },
                {
                  value: "5",
                  text: {
                    de: this.state.caScale[4]
                  }
                }
              ],
              rows: [
                {
                  value: "special_skills",
                  text: {
                    de:
                      "Neue Tricks/Bewegungsabfolgen erfunden im Geschicklichkeitssport (z.B. Jonglieren)"
                  }
                },
                {
                  value: "wintersports",
                  text: {
                    de:
                      "neue Tricks/Bewegungsabfolgen erfunden im Wintersport (z.B. Schifahren, Snowboard)"
                  }
                },
                {
                  value: "summersports",
                  text: {
                    de:
                      "neue Tricks/Bewegungsabfolgen erfunden im Sommersport (z.B. Fahrrad, Skateboard)"
                  }
                },
                {
                  value: "martial_arts",
                  text: {
                    de:
                      "neue Tricks/Bewegungsabfolgen erfunden im Kampfsport (z.B. Karate, Judo)"
                  }
                },
                {
                  value: "others",
                  text: {
                    de:
                      "neue Tricks/Bewegungsabfolgen erfunden in anderen Sportbereichen"
                  }
                },
                {
                  value: "planed_training",
                  text: {
                    de: "ein abwechslungsreiches Sporttraining geplant"
                  }
                }
              ]
            },
            {
              type: "matrix",
              name: "fine_arts",
              isAllRowRequired: this.state.requiredQ,
              title: {
                de: this.state.caInstructions[5]
              },
              columns: [
                {
                  value: "1",
                  text: {
                    de: this.state.caScale[0]
                  }
                },
                {
                  value: "2",
                  text: {
                    de: this.state.caScale[1]
                  }
                },
                {
                  value: "3",
                  text: {
                    de: this.state.caScale[2]
                  }
                },
                {
                  value: "4",
                  text: {
                    de: this.state.caScale[3]
                  }
                },
                {
                  value: "5",
                  text: {
                    de: this.state.caScale[4]
                  }
                }
              ],
              rows: [
                {
                  value: "collage",
                  text: {
                    de: "eine Fotozusammenstellung oder Fotomontage gemacht"
                  }
                },
                {
                  value: "logo",
                  text: {
                    de: "ein Logo/Banner entworfen"
                  }
                },
                {
                  value: "building",
                  text: {
                    de: "ein Gebäude geplant"
                  }
                },
                {
                  value: "painting",
                  text: {
                    de: "ein Bild/eine Grafik ausgedacht und gemalt"
                  }
                },
                {
                  value: "sculpture",
                  text: {
                    de: "eine Skulptur entworfen"
                  }
                },
                {
                  value: "skatch_interior",
                  text: {
                    de:
                      "eine Skizze für Neugestaltung eines Innenraums angefertigt"
                  }
                }
              ]
            },
            {
              type: "matrix",
              name: "performing_arts",
              isAllRowRequired: this.state.requiredQ,
              title: {
                de: this.state.caInstructions[6]
              },
              columns: [
                {
                  value: "1",
                  text: {
                    de: this.state.caScale[0]
                  }
                },
                {
                  value: "2",
                  text: {
                    de: this.state.caScale[1]
                  }
                },
                {
                  value: "3",
                  text: {
                    de: this.state.caScale[2]
                  }
                },
                {
                  value: "4",
                  text: {
                    de: this.state.caScale[3]
                  }
                },
                {
                  value: "5",
                  text: {
                    de: this.state.caScale[4]
                  }
                }
              ],
              rows: [
                {
                  value: "theater_role",
                  text: {
                    de: "eine Rolle in einem Theater gespielt"
                  }
                },
                {
                  value: "puppet_theatre",
                  text: {
                    de: "ein Puppentheater/Kasperltheater aufgeführt"
                  }
                },
                {
                  value: "new_dance",
                  text: {
                    de: "einen neuen Tanz ausgedacht"
                  }
                },
                {
                  value: "interpreted_dance",
                  text: {
                    de: "einen Tanz neu interpretiert"
                  }
                },
                {
                  value: "video",
                  text: {
                    de: "einen Film/Video gemacht"
                  }
                },
                {
                  value: "animation",
                  text: {
                    de:
                      "eine Animation (z.B. Stop Motion, Trickfilm, etc.) gemacht"
                  }
                }
              ]
            },
            {
              type: "matrix",
              name: "science",
              isAllRowRequired: this.state.requiredQ,
              title: {
                de: this.state.caInstructions[7]
              },
              columns: [
                {
                  value: "1",
                  text: {
                    de: this.state.caScale[0]
                  }
                },
                {
                  value: "2",
                  text: {
                    de: this.state.caScale[1]
                  }
                },
                {
                  value: "3",
                  text: {
                    de: this.state.caScale[2]
                  }
                },
                {
                  value: "4",
                  text: {
                    de: this.state.caScale[3]
                  }
                },
                {
                  value: "5",
                  text: {
                    de: this.state.caScale[4]
                  }
                }
              ],
              rows: [
                {
                  value: "written_thesis",
                  text: {
                    de: "eine wissenschaftliche Arbeit geschrieben"
                  }
                },
                {
                  value: "own_theory",
                  text: {
                    de: "eine Theorie entwickelt um Phänomene zu erklären"
                  }
                },
                {
                  value: "technically_solved_problem",
                  text: {
                    de:
                      "ein praktisches Problem mit einem eigenen technischen Trick gelöst"
                  }
                },
                {
                  value: "own_construction",
                  text: {
                    de:
                      "etwas konstruiert, das wissenschaftliches Wissen erfordert"
                  }
                },
                {
                  value: "programming",
                  text: {
                    de: "Computerprogramm geschrieben"
                  }
                },
                {
                  value: "website",
                  text: {
                    de: "eine eigene Webseite erstellt"
                  }
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
          percent={((this.props.count + 1) / this.props.total + 3) * 100}
          filledBackground="linear-gradient(to right,rgb(255, 187, 153), rgb(255, 134, 73))"
        /> */}

        <div className="questionnaire-description">
          <div className="wrapper">
            <div className="task-heading">
              <span className="task-number-questionnaire">2</span>
              <h1 className="questionnaire-heading">Kreative Aktivitäten</h1>
            </div>
            <p className="questionnaire-task-description">
              Bitte beantworten Sie die folgenden Fragen.
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

    // var onCompleteComponent = this.state.isCompleted
    //   ? this.props.incrementSequenceCounter()
    //   // ? this.props.history.push("/post_questionnaire")
    //   : null;

    return (
      <div>
        {surveyRender}
        {/* {onCompleteComponent} */}

        {/* <Survey.Survey model={model} onComplete={this.onComplete} /> */}
      </div>
    );
  }
}

export default ICAA;
