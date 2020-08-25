// Login Component

import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";

import Header from '../layout/Header';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import "./Auth.css";

class Login extends Component {

  state = {
    email: "",
    password: "",
    showPassword: false,
    errors: {}
  }


  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard

    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/studies");
    }
  }

  componentWillReceiveProps(nextProps) {
    // push user to dashboard when they login

    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/studies");
    }

    // if errors, update state with errors
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  // update state on user input
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // give data to redux action on submit to handle login
  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  // password visibility
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };


  render() {
    const { errors } = this.state;

    return (

      <React.Fragment>
        <Header />

        <div className="auth-container" style={{ marginTop: "2rem" }}>
          <div className="row">
            <div className="col s8 offset-s2">
              <Link to="/" className="back-home-button">
                ←  Back to home
            </Link>
              <div className="col s12">
                <h4>
                  Welcome back.
              </h4>
                <h6>Login below</h6>

              </div>
              <form noValidate onSubmit={this.onSubmit}>

                <FormControl className="input-control-container" style={{ margin: "10px 0 10px 0" }}>
                  <InputLabel htmlFor="component-simple">E-Mail</InputLabel>
                  <Input style={{ fontSize: "1.3rem" }} autoFocus className="auth-input" value={this.state.email} onChange={this.onChange} id="email" type="email" />
                  <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                </FormControl>

                <FormControl className="input-control-container" style={{ margin: "10px 0 10px 0" }}>
                  <InputLabel htmlFor="component-simple">Password</InputLabel>
                  <Input style={{ fontSize: "1.3rem" }} className="auth-input" value={this.state.password} onChange={this.onChange} id="password" type={this.state.showPassword ? 'text' : 'password'} endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  } />
                  <span className="red-text">
                    {errors.password}
                    {errors.passwordincorrect}
                  </span>
                </FormControl>

                <div className="col s12">
                  <button
                    type="submit"
                    className="button"
                  >
                    Log In
                </button>
                  <p className="grey-text text-darken-1">
                    Don't have an account? <Link to="/signup" className="register-link">Sign up</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

      </React.Fragment>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});


export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
