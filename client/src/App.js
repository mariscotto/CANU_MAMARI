// Main App Component

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import ScrollToTop from "./components/layout/ScrollToTop";

import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Study from "./components/dashboard/Study";

import Finish from "./components/study/Finish";
import LandingStudy from "./components/study/LandingStudy";

import VideoPopup from "./components/canu/VideoPopup.js";
import LandingCanu from "./components/canu/LandingCanu";
import practicalTestIntro from "./components/canu/PracticalTestIntroduction";
import PracticalTest from "./components/canu/PracticalTest";
import Questionnaire from "./components/canu/Questionnaire";


import StudySequence from "./components/study/StudySequence";
import Post_Questionaire from "./components/study/Post_Questionnaire";
import APM from "./components/study/APM";
import ICAA from "./components/study/ICAA";

import "./App.css";
import SidebarDashboard from "./components/dashboard/SidebarDashboard";
import Walkthrough from "./components/canu/Walkthrough";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // console.log(decoded);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">

            <ScrollToTop />
            {/* Dashboard Routes */}

            <Route exact path="/" component={Landing} />

            <Route path="/login" component={Login} />
            <Route path="/signup" component={Register} />

            <Route path="/studies" component={SidebarDashboard} />
            <Route exact path="/studies" component={Dashboard} />

            <Switch>
              <Route path="/studies/:id" component={Study} />
              <Route exact path="/:studyid/:groupid" component={LandingStudy} />


              <Route exact path="/:studyid/canu/video" component={VideoPopup} />
              <Route exact path="/:studyid/canu/practicalTestIntro" component={practicalTestIntro} />
              <Route exact path="/:studyid/canu/walkthrough" component={Walkthrough} />
            </Switch>

            {/* Study Routes */}
            <Route exact path="/:studyid/canu/intro" component={LandingCanu} />
            <Route path="/:studyid/canu/practicalTest" component={PracticalTest} />
            <Route path="/:studyid/canu/questionnaire" component={Questionnaire} />
            <Route path="/:studyid/canu/apm" component={APM} />

            <Route path="/:studyid/:groupid/active" component={StudySequence} />

            <Route path="/finished" component={Finish} />
            <Route path="/post_questionnaire" component={Post_Questionaire} />
            <Route path="/apm" component={APM} />
            <Route path="/icaa" component={ICAA} />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
