// Study Landing Page Component

import React from "react";
import { Link } from "react-router-dom";

import "./Landing.css";

import Header from "../layout/Header";

class LandingStudy extends React.Component {
  // storing link to tasks
  state = {
    link: `/${this.props.match.params.studyid}/${
      this.props.match.params.groupid
    }/active`
  };

  render() {
    return (
      <div>
        <Header />
        <div className="home-content">
          <div className="right">
            <p>
              Sehr geehrte Teilnehmerin, sehr geehrter Teilnehmer,
              <br />
              <br />
              vielen Dank, dass Sie diese Forschungsarbeit unterstützen möchten!
              Diese Studie wird im Rahmen eines interdisziplinären Projekts vom
              Lehrstuhl für Ergonomie an der Technischen Universität München
              durchgeführt. Projektverantwortlicher ist Herr Lorenz Prasch,
              M.Sc.
              <br />
              <br />
              Gegenstand dieser Studie ist ein neu entwickeltes Messinstrument
              in der Kreativitätsforschung. Anhand verschiedener Aufgabentypen
              wird ein Kreativitätsscore bestimmt. Zusätzlich werden weitere
              individuelle Eigenschaften abgefragt.
              <br />
              <br />
              <span>
                Bitte beachten Sie, dass diese Studie nicht für die Durchführung
                mit einem Smartphone oder Tablet geeignet ist.&nbsp;
              </span>
              Nutzen Sie einen PC oder einen Laptop. Bitte lesen Sie sich jede
              Frage bzw. jede Aufgabenstellung in Ruhe durch und beantworten Sie
              diese. Für einige Aufgaben ist eine maximale Bearbeitungsdauer
              vorgegeben. Die Datenerhebung gilt ausschließlich der Evaluation
              des Messinstruments. Sie als Proband können nichts falsch machen.
              Die Bearbeitung der Studie wird ca. 25 Minuten in Anspruch nehmen.
              <br />
              <br />
              Unter den Teilnehmenden werden Amazon-Gutscheine im Wert von 3 x
              50 € sowie 5 x 10 € verlost.
              <br />
              <br />
              Die Ergebnisse und Daten dieser Studie werden für
              wissenschaftliche Veröffentlichungen herangezogen. Die Angaben der
              einzelnen Teilnehmer werden in pseudonymisierter Form
              ausschließlich am Lehrstuhl für Ergonomie der Technischen
              Universität München analysiert, gemäß der gesetzlichen
              Bestimmungen vertraulich behandelt und anonym ausgewertet. Durch
              die anonymisierte Form der Daten lassen Ergebnisse oder
              individuelle Antworten keinerlei Rückschlüsse auf Sie als
              Einzelperson zu. Mittels eines individuellen Codes, den Sie später
              im Verlauf des Versuchs erstellen, können Sie den Lehrstuhl
              jederzeit kontaktieren und eine Löschung Ihrer Daten verlangen.
              Ihre Angaben werden im Rahmen der Richtlinien zur Sicherung guter
              wissenschaftlicher Praxis für mindestens zehn Jahre archiviert.
              <br />
              <br />
              Mit Ihrer Teilnahme stimmen Sie der Erhebung und Verarbeitung
              Ihrer persönlichen Daten im Sinne der hier bereitgestellten
              Informationen zu.
              <br />
              <br />
              Wenden Sie sich bei Fragen oder Anmerkungen gerne an Lorenz Prasch
              (lorenz.prasch@tum.de).
              <br />
              <br />
              Technische Universität München:
              <br />
              Lehrstuhl für Ergonomie
            </p>
            <div className="btn-container">
              <Link to={this.state.link} className="btn">
                Start
              </Link>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingStudy;
