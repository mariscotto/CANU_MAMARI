// End Page Component after finishing all tasks

import React from "react";

import "./Finish.css";

import Header from "../layout/Header";
import Confetti from "react-confetti";

const Finish = () => {
  return (
    <div>
      <Confetti />
      <Header />
      <div className="finished-text-wrapper">
        <h2 className="finished-text">Vielen Dank für Ihre Teilnahme!</h2>
      </div>
    </div>
  );
};

export default Finish;
