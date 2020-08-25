import React from "react";
import "./Instructions.css";
import Header from "../layout/Header";

class BlocksInstruction extends React.Component {
  handleNext = e => {
    e.preventDefault();
    this.props.incrementSubcounter();
  };

  render() {
    return (
      <div>
        <Header />
        <div className="home-content">
          <div className="right">
            <p>
              <span2>
                Bitte lesen Sie die folgenden Instruktionen gründlich. Während
                der Bearbeitung der Aufgaben haben Sie keine Möglichkeiten
                zurückzuspringen.
              </span2>
              <br />
              <br />
              In dem folgenden Abschnitt besteht die Aufgabe darin, die rechts
              dargestellte, dunkelgraue Fläche mit den grünen Elementen links
              möglichst vollständig auszufüllen. Sie können die Elemente
              beliebig auf der Fläche anordnen.{" "}
              <span>
                Ziel der Aufgabe ist es, möglichst die gesamte Fläche mit den
                Elementen zu bedecken. Jedes Element steht mehrfach zur
                Verfügung, wird mittels Drag-and-drop in die gewünschte Position
                verschoben und kann mittels rechtem Mausklick rotiert
                werden.&nbsp;
              </span>
              Es ist möglich, die Elemente so zu platzieren, dass sie über die
              Fläche hinausragen, wodurch jedoch die Qualität der Lösung
              reduziert wird. Bei der Positionierung ist keine Überlappung mit
              anderen Elementen zulässig.
              <br />
              <br />
              Insgesamt werden Sie vier Aufgaben mit jeweils unterschiedlich
              geformten Flächen bearbeiten. Für jede Aufgabe haben Sie drei
              Minuten Zeit, danach gilt sie als beendet.{" "}
              <span>
                Versuchen Sie, die vorgegebene Fläche so vollständig wie möglich
                mit den vorgegebenen Elementen zu füllen und dabei Muster zu
                bilden, die nicht jedem einfallen
              </span>
              . Sofern Sie die Aufgabe vor dem Ablauf der drei Minuten beendet
              haben, erreichen Sie die nächste Aufgabe über den Button “Nächste
              Aufgabe”. Sobald die drei Minuten abgelaufen sind, wird die
              nächste Aufgabe automatisch gestartet.
              <br />
              <br />
              Um Sie mit der Aufgabenstellung vertraut zu machen, ist unten ein
              kurzes Erklärvideo eingebunden.
              <br />
              <br />
              <video
                src="/videos/Blocks_SC.mp4"
                type="video/mp4"
                width="700"
                autobuffer
                controls
              />
              <br />
              <br />
              Klicken Sie auf <span>Start</span>, um die erste Aufgabe zu
              beginnen.
              <button className="start-btn" onClick={this.handleNext}>
                Start
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default BlocksInstruction;
