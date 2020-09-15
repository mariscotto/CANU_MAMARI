// Study Landing Page Component

import React from "react";
import {Link, withRouter} from "react-router-dom";
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import $ from 'jquery';
import 'material-icons';

/*"fsevents": "^2.1.3",*/
import "./Questionnaire.css";
import QuestionnaireIntroduction from "./QuestionnaireIntroduction";
import axios from "axios";
import Impressum from "./Impressum";
import M from "materialize-css";


class Questionnaire extends React.Component {
    // storing link to tasks
    constructor(props) {
        super(props);
        this.onChangeAge = this.onChangeAge.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.onChangeCreativeSkills = this.onChangeCreativeSkills.bind(this);
        this.onChangeCreativeTest = this.onChangeCreativeTest.bind(this);
        this.onChangeEducationGrade = this.onChangeEducationGrade.bind(this);
        this.onChangeJobArea = this.onChangeJobArea.bind(this);
        this.onChangePersonalityAdjectives = this.onChangePersonalityAdjectives.bind(this);
        this.onSubmit = this.onSubmit.bind(this);


        this.state = {
            link: `/${this.props.match.params.studyid}/${
                this.props.match.params.groupid
            }/canu/congratz`,
            age: "",
            gender: "",
            creative_test: "",
            creative_skills: "",
            education_grade: "",
            job_area: "",
            personality_adjectives: []
        };
    }

    value = 0;
    transitionEnd = 'webkitTransitionEnd transitionend';

    componentDidMount() {
        this.formReset();
        this.setupFloatLabels();
        this.setupClickHandlers();
    }

    /*Database Methods*/
    postQuestionnaireData() {

    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onChangeAge(e) {
        this.setState({
            age: e.target.value
        })
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        })
    }

    onChangeCreativeTest(e) {
        this.setState({
            creative_test: e.target.value
        })
    }

    onChangeCreativeSkills(e) {
        this.setState({
            creative_skills: e.target.value
        })
    }

    onChangeEducationGrade(e) {
        this.setState({
            education_grade: e.target.value
        })
    }

    onChangeJobArea(e) {
        this.setState({
            job_area: e.target.value
        })
    }

    onChangePersonalityAdjectives (e){
        if (e.target.checked) {
            this.setState({
                personality_adjectives: [...this.state.personality_adjectives, e.target.value]
            })
        } else {
            this.setState({personality_adjectives: this.state.personality_adjectives.filter(adjective => adjective !== e.target.value)})
        }
    };
//          this.state.age === "" || this.state.gender === "" ? $('.validation-field').html("Please fill in all fields."): ('.validation-field').html("");
    onValidateForm(step){
        switch (step) {
            case 1:
                if(this.state.age === "" || this.state.gender === "" || !document.getElementById('age').checkValidity()){
                    return false;
                }
                break;
            case 2:
                if(this.state.education_grade === "") {
                    return false;
                }
                break;
            case 3:
                if(this.state.job_area === ""){
                    return false;
                }
                break;
            case 4:
                if(this.state.creative_test === "" || this.state.creative_skills === ""){
                    return false;
                }
                break;
            case 5:
                if(this.state.personality_adjectives.length === 0){
                    return false;
                }
                break;
        }
        return true;
    }
    onSubmit(e){
        //to={this.state.link}
        const questionnaire = {
            age: this.state.age,
            gender: this.state.gender,
            creative_test: this.state.creative_test,
            creative_skills: this.state.creative_skills,
            education_grade: this.state.education_grade,
            job_area: this.state.job_area,
            personality_adjectives: this.deepCloneArray(this.state.personality_adjectives),
        };
        axios.post(`/api/Questionnaire/${this.props.match.params.studyid}`, questionnaire)
            .then(res => {
                console.log(res.data);
                this.props.history.push(this.state.link);
            })
            .catch(err => {
                console.log(err.response);
            });

    }

    onSubmitPopup(){
        var elem = document.getElementById('questionnaire-finish');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
    }
    /*Form Navigation*/

    /*Resets the form back to the default state.*/
    formReset() {
        this.value = 0;
        $('progress').val(this.value);
        $('form input').not('button').val('').removeClass('hasInput');
        $('.js-form-step').removeClass('left leaving');
        $('.js-form-step').not('.js-form-step[data-step="1"]').addClass('hidden waiting');
        $('.js-form-step[data-step="1"]').removeClass('hidden');
        $('.form-progress-indicator').not('.one').removeClass('active');

        /* $animContainer.css({
             'paddingBottom': $('.js-form-step[data-step="1"]').height() + 'px'
         });*/

        console.warn('Form reset.');
        return false;
    }

    /*Resets the form back to the default state.*/
    formBack($currentForm) {

        var currentFormStep = parseInt($currentForm.attr('data-step')) || false;
        var $nextForm = $('.js-form-step[data-step="' + (currentFormStep - 1) + '"]');

        console.log('Current step is ' + currentFormStep);
        console.log('The next form is # ' + $nextForm.attr('data-step'));

        $('body').addClass('freeze');

        // Ensure top of form is in view
        $('html, body').animate({
            scrollTop: $('progress').offset().top
        }, 'fast');

        // Hide current form fields
        $currentForm.addClass('leaving');
        setTimeout(() => {
            $currentForm.addClass('hidden');
        }, 500);

        // Animate container to height of form
        /*$animContainer.css({
            'paddingBottom': $nextForm.height() + 'px'
        });*/

        // Show next form fields
        $('.js-form-step').removeClass('left leaving');
        $('.js-form-step').not('.js-form-step[data-step="' + (currentFormStep - 1) + '"]').addClass('hidden waiting');

        $nextForm.removeClass('hidden')
            .addClass('coming')
            .one(this.transitionEnd, () => {
                $nextForm.removeClass('coming waiting');
            });

        // Increment value (based on 4 steps 0 - 100)
        this.value -= 25;

        // Reset if we've reached the end
        $(document.getElementsByClassName("form-progress-indicator")[currentFormStep - 1])
            .removeClass('active');

        // Set progress bar to the next value
        $('progress').val(this.value);

        // Update hidden progress descriptor (for a11y)
        $('.js-form-progress-completion').html($('progress').val() + '% complete');

        $('body').removeClass('freeze');

       /* if (currentFormStep === 5) {
            $('#questionnaire').css("visibility", "visible");
            $('#personality').css("visibility", "hidden");
        }*/
        return false;
    }

    /*Sets up the click handlers on the form. Next/reset.*/
    setupClickHandlers() {
        var self = this;
        // Show next form on continue click
        $('.next-button').on('click', function (event) {
            event.preventDefault();
            var $currentForm = $(this).parents('.js-form-step');
            var currentFormStep = parseInt($currentForm.attr('data-step')) || false;
            if(self.onValidateForm(currentFormStep)){
                $('.validation-field').html("");
                self.showNextForm($currentForm);
            }else{
                $('.validation-field').html("Please fill in all fields correctly.");
            }
        });

        // Reset form on reset button click
        $('.back-button').on('click', function (event) {
            event.preventDefault();
            var $currentForm = $(this).parents('.js-form-step');
            var currentFormStep = parseInt($currentForm.attr('data-step')) || false;
            $('.validation-field').html("");
            self.formBack($currentForm);
        });

        return false;
    }

    /*
      Shows the next form.
      @param - Node - The current form.
     */
    showNextForm($currentForm) {
        var currentFormStep = parseInt($currentForm.attr('data-step')) || false;
        var $nextForm = $('.js-form-step[data-step="' + (currentFormStep + 1) + '"]');

        console.log('Current step is ' + currentFormStep);
        console.log('The next form is # ' + $nextForm.attr('data-step'));

        //$body.addClass('freeze');

        // Ensure top of form is in view
        /*$('html, body').animate({
            scrollTop: $progressBar.offset().top
        }, 'fast');*/

        // Hide current form fields
        $currentForm.addClass('leaving');
        setTimeout(() => {
            $currentForm.addClass('hidden');
        }, 300);

        // Animate container to height of form
        /* $animContainer.css({
             'paddingBottom': $nextForm.height() + 'px'
         });*/

        // Show next form fields
        setTimeout(() => {
            $nextForm.removeClass('hidden')
                .addClass('coming')
                .one(this.transitionEnd, () => {
                    $nextForm.removeClass('coming waiting');
                });
        }, 400);

        // Increment value (based on 4 steps 0 - 100)
        this.value += 25;

        // Reset if we've reached the end
        $('.form-progress')
            .find('.form-progress-indicator.active')
            .next('.form-progress-indicator')
            .addClass('active');

        // Set progress bar to the next value
        $('progress').val(this.value);

        // Update hidden progress descriptor (for a11y)
        $('.js-form-progress-completion').html($('progress').val() + '% complete');

        //$body.removeClass('freeze');

       /* if (currentFormStep === 4) {
            $('#questionnaire').css("visibility", "hidden");
            $('#personality').css("visibility", "visible");
        }*/
        return false;
    }

    /*Sets up and handles the float labels on the inputs.*/
    setupFloatLabels() {
        // Check the inputs to see if we should keep the label floating or not
        $('form input').not('button').on('blur', () => {

            // Different validation for different inputs
            switch (this.tagName) {
                case 'SELECT':
                    if (this.value > 0) {
                        this.className = 'hasInput';
                    } else {
                        this.className = '';
                    }
                    break;

                case 'INPUT':
                    if (this.value !== '') {
                        this.className = 'hasInput';
                    } else {
                        this.className = '';
                    }
                    break;

                default:
                    break;
            }
        });

        return false;
    }

    openImpressum(){
        var elem = document.getElementById('impressum');
        var instance = M.Modal.init(elem,{dismissible:false});
        instance.open();
    }
    deepCloneArray(arr) {
        //  return arr.map(row => row.slice(0));
        return JSON.parse(JSON.stringify(arr));
    }
// e-mail
/*<div className="row">
<div className="col s12">
<div className="input-field inline">
<div className="section-title">E-mail</div>
<input id="email_inline" type="email" className="validate"
value={this.state.email} onChange={this.onChangeEmail}></input>
<span className="helper-text">if you are interested in receiving your test score, feel free to add a e-mail address here.</span>
</div>
</div>
</div>*/

    render() {
        return (
            <div>
                <Impressum/>
                <QuestionnaireIntroduction/>
                <div id="questionnaire-finish" className="modal practical-info">
                    <div className="modal-content">
                        <div className="piece-container">
                            <img id="lifeguard-logo" src="/ressources/lifeguardLogo.svg"></img>
                        </div>
                        <div className="text-container">
                            <h1>Finish</h1>
                            <p>Are you done with the Questionnaire?</p>
                            <div className="popup-footer">
                            <a onClick={this.onSubmit}
                               className="waves-effect waves-light btn-large">Yes</a>
                            <a href="#!" className="waves-effect waves-light btn-large modal-action modal-close">No</a>
                        </div>
                        </div>
                    </div>
                </div>
                {/*<div id="personality" className="info-box">
                    <img id="list-icon" src="/ressources/personality.svg"></img>
                    <h1>Personality</h1>
                    <p id="info-text">To define your personality, check the adjectives that fit to you
                        best - multiple items can be selected.</p>
                    <a onClick={this.onSubmit}
                       className="waves-effect waves-light btn-large modal-action modal-close">Paddle!</a>
                </div>*/}
                <div id="questionnaire" className="info-box">
                    <img id="personality-icon" src="/ressources/questionnaireLogo.svg"></img>
                    <h1>Questionnaire</h1>
                    <p id="info-text">These questions are used for statistical analysis and interpretation</p>
                    {/*<a onClick={this.onSubmit}
                       className="waves-effect waves-light btn-large modal-action modal-close">Paddle!</a>*/}
                </div>
                <div id="content-area">
                    <div className="form-progress">
                        <progress className="form-progress-bar" min="0" max="100" value="0" step="33"
                                  aria-labelledby="form-progress-completion"/>
                        <div className="form-progress-indicator one active"></div>
                        <div className="form-progress-indicator two"/>
                        <div className="form-progress-indicator three"></div>
                        <div className="form-progress-indicator four"></div>
                        <div className="form-progress-indicator five"></div>
                        <p id="form-progress-completion" className="js-form-progress-completion sr-only"
                           aria-live="polite">0% complete</p>
                    </div>
                    <div className="animation-container">
                        <div className="form-step js-form-step" data-step="1">
                            <div id="header">
                                <h2>Please answer the following questions</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="input-field col s3">
                                        <div className="section-title">Age</div>
                                        <input placeholder="" id="age" type="number" className="validate"
                                               value={this.state.age} onChange={this.onChangeAge}></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <div className="section-title">Gender</div>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={"Male"}
                                                       onChange={this.onChangeGender}/>
                                                <span>Male</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={"Female"}
                                                       onChange={this.onChangeGender}/>
                                                <span>Female</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={"Diverse"}
                                                       onChange={this.onChangeGender}/>
                                                <span>Diverse</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="animation-footer">
                            <div className="validation-field"></div>
                            <a className="waves-effect waves-light btn-large next-button">next</a>
                            </div>
                        </div>
                        <div className="form-step js-form-step waiting hidden" data-step="2">

                            <div id="header">
                                <h2>What is your highest level of school degree?</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="col s12">
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group2" type="radio"
                                                       value={"Less than high school degree"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>Less than high school degree (Haupt- oder Realschulabschluss)</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group2" type="radio"
                                                       value={"High school degree or equivalent"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>High school degree or equivalent (Abitur)</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group2" type="radio"
                                                       value={"Some college but no degree"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>Bachelor degree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group2" type="radio"
                                                       value={"Associate degree"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>Master degree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group2" type="radio"
                                                       value={"Bachelor degree"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>Graduate degree (Diplom)</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="animation-footer">
                                <div className="validation-field"></div>
                            <a className="waves-effect waves-light btn-large next-button">next</a>
                            <a className="waves-effect waves-light btn-large back-button">back</a>
                            </div>
                        </div>
                        <div className="form-step js-form-step waiting hidden" data-step="3">
                            <div id="header">
                                <h2>In which area would you position your studies/training/job?</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="col s12">
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Architecture and Forestry"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>Agriculture and Forestry</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Social Science"} onChange={this.onChangeJobArea}/>
                                                <span>Social Sciences</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Computer Science & Mathematics"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>Computer Science & Mathematics</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Media & Communication"} onChange={this.onChangeJobArea}/>
                                                <span>Media & Communication</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Art, Design & Music"} onChange={this.onChangeJobArea}/>
                                                <span>Art, Design & Music</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Natural Sciences"} onChange={this.onChangeJobArea}/>
                                                <span>Medicine & Healthcare</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Natural Sciences"} onChange={this.onChangeJobArea}/>
                                                <span>Natural Sciences</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Linguistics and cultural studies"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>Linguistics and cultural studies</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Technology & Engineering"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>Technology & Engineering</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Economy & Law"} onChange={this.onChangeJobArea}/>
                                                <span>Economy & Law</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Administration"} onChange={this.onChangeJobArea}/>
                                                <span>Administration</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Administration"} onChange={this.onChangeJobArea}/>
                                                <span>Other</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="animation-footer">
                                <div className="validation-field"></div>
                            <a className="waves-effect waves-light btn-large next-button">next</a>
                            <a className="waves-effect waves-light btn-large back-button">back</a>
                            </div>
                        </div>
                        <div className="form-step js-form-step hidden" data-step="4">
                            <div id="header">
                                <h2>Please answer the following questions</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="col s12">
                                        <div className="section-title">I felt that I needed to be creative to solve the practical task well</div>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group0" type="radio" value={0}
                                                       onChange={this.onChangeCreativeTest}/>
                                                <span>Strongly Agree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group0" type="radio" value={1}
                                                       onChange={this.onChangeCreativeTest}/>
                                                <span>Agree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group0" type="radio" value={2}
                                                       onChange={this.onChangeCreativeTest}/>
                                                <span>Undecided</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group0" type="radio" value={3}
                                                       onChange={this.onChangeCreativeTest}/>
                                                <span>Disagree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group0" type="radio" value={4}
                                                       onChange={this.onChangeCreativeTest}/>
                                                <span>Strongly Disagree</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <div className="section-title">How would you rate your creative skills?
                                        </div>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={0}
                                                       onChange={this.onChangeCreativeSkills}/>
                                                <span>Excellent</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={1}
                                                       onChange={this.onChangeCreativeSkills}/>
                                                <span>Good</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={2}
                                                       onChange={this.onChangeCreativeSkills}/>
                                                <span>Fair</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={3}
                                                       onChange={this.onChangeCreativeSkills}/>
                                                <span>Poor</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={4}
                                                       onChange={this.onChangeCreativeSkills}/>
                                                <span>Very Poor</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="animation-footer">
                                <div className="validation-field"></div>
                                <a className="waves-effect waves-light btn-large next-button">next</a>
                                <a className="waves-effect waves-light btn-large back-button">back</a>
                            </div>
                        </div>
                        <div className="form-step js-form-step waiting hidden" data-step="5">
                            <div id="header">
                                <h2>Please indicate which of the following adjectives best describe yourself.
                                    Check all that apply.</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="col s4">
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Capable"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Capable</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Artificial"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Artificial</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Clever"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Clever</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Cautious"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Cautious</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Confident"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Confident</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Egotistical"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Egotistical</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Commonplace"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Commonplace</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Humorous"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Humorous</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Conservative"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Conservative</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Individualistic"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Individualistic</span>
                                            </label>
                                        </p>
                                    </div>
                                    <div className="col s4">
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Conventional"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Conventional</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Informal"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Informal</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Dissatisfied"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Dissatisfied</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Insightful"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Insightful</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Suspicious"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Suspicious</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Honest"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Honest</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Intelligent</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Well-mannered"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Well-mannered</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Wide interests"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Wide interests</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Inventive"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Inventive</span>
                                            </label>
                                        </p>
                                    </div>
                                    <div className="col s4">
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Original"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Original</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Narrow interests"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Narrow interests</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Reflective"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Reflective</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Sincere"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Sincere</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Resourceful</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Self-confident"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Self-confident</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Sexy"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Sexy</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Submissive"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Submissive</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Snobbish"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Snobbish</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Unconventional"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Unconventional</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="animation-footer">
                                <div className="validation-field"/>
                            <a className="waves-effect waves-light btn-large back-button">back</a>
                            <a id="finish-button" onClick={this.onSubmitPopup}
                                  className="waves-effect waves-light btn-large">finish</a>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="waves-effect waves-light btn-small impressum-button modal-trigger" onClick={this.openImpressum}>i</a>
                <img className="background" src="/ressources/background_s.svg"></img>
            </div>
        );
    }
}

export default Questionnaire;
