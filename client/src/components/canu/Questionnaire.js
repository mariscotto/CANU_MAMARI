// Study Landing Page Component

import React from "react";
import {Link} from "react-router-dom";
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import $ from 'jquery';
import 'material-icons';

/*"fsevents": "^2.1.3",*/
import "./Questionnaire.css";
import QuestionnaireIntroduction from "./QuestionnaireIntroduction";


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


        this.state = {
            link: `/${this.props.match.params.studyid}/canu/apm`,
            email: "",
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

        if (currentFormStep === 5) {
            $('#questionnaire').css("visibility", "visible");
            $('#personality').css("visibility", "hidden");
        }
        return false;
    }

    /*Sets up the click handlers on the form. Next/reset.*/
    setupClickHandlers() {
        var self = this;
        // Show next form on continue click
        $('.next-button').on('click', function (event) {
            event.preventDefault();
            var $currentForm = $(this).parents('.js-form-step');
            self.showNextForm($currentForm);
        });

        // Reset form on reset button click
        $('.back-button').on('click', function (event) {
            event.preventDefault();
            var $currentForm = $(this).parents('.js-form-step');
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

        if (currentFormStep === 4) {
            $('#questionnaire').css("visibility", "hidden");
            $('#personality').css("visibility", "visible");
        }
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


    render() {
        return (
            <div>
                <QuestionnaireIntroduction/>
                <div id="personality" className="info-box">
                    <img id="list-icon" src="/ressources/personality.svg"></img>
                    <h1>Personality</h1>
                    <p id="info-text">To define your personality, check the adjectives that fit to you
                        best - multiple items can be selected.</p>
                </div>
                <div id="questionnaire" className="info-box">
                    <img id="personality-icon" src="/ressources/questionnaire.svg"></img>
                    <h1>Questionnaire</h1>
                    <p id="info-text">The Questionnaire helps to set up a demographic overview of the study</p>
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
                                <h2>Please fill in your details</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="col s12">
                                        <div className="input-field inline">
                                            <div className="section-title">E-mail</div>
                                            <input id="email_inline" type="email" className="validate"
                                                   value={this.state.email} onChange={this.onChangeEmail}></input>
                                            <span className="helper-text">if you are interested in receiving your test score, feel free to add a e-mail address here.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
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
                            <div className="validation-field"></div>
                            <a className="waves-effect waves-light btn-large next-button">next</a>
                        </div>
                        <div className="form-step js-form-step hidden" data-step="2">
                            <div id="header">
                                <h2>Please fill in your details</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="col s12">
                                        <div className="section-title">I think that the Pracitcal Test was assessing my
                                            creativity
                                        </div>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={0}
                                                       onChange={this.onChangeCreativeTest}/>
                                                <span>Strongly Agree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={1}
                                                       onChange={this.onChangeCreativeTest}/>
                                                <span>Agree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={2}
                                                       onChange={this.onChangeCreativeTest}/>
                                                <span>Undecided</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={3}
                                                       onChange={this.onChangeCreativeTest}/>
                                                <span>Disagree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={4}
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
                            <div className="validation-field"></div>
                            <a className="waves-effect waves-light btn-large next-button">next</a>
                            <a className="waves-effect waves-light btn-large back-button">back</a>
                        </div>
                        <div className="form-step js-form-step waiting hidden" data-step="3">

                            <div id="header">
                                <h2>What is your highest level of school degree?</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="col s12">
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Less than high school degree"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>Less than high school degree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"High school degree or equivalent"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>High school degree or equivalent</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Some college but no degree"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>Some college but no degree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Associate degree"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>Associate degree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Bachelor degree"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>Bachelor degree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Graduate degree"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>Graduate degree</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <a className="waves-effect waves-light btn-large next-button">next<i
                                className="material-icons right">arrow_forward</i></a>
                            <a className="waves-effect waves-light btn-large back-button">back</a>
                        </div>
                        <div className="form-step js-form-step waiting hidden" data-step="4">
                            <div id="header">
                                <h2>In which area would you position your studies/training/job?</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="col s12">
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Architecture and Forestry"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>Agriculture and Forestry</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Social Science"} onChange={this.onChangeJobArea}/>
                                                <span>Social Sciences</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Computer Science & Mathematics"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>Computer Science & Mathematics</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Media & Communication"} onChange={this.onChangeJobArea}/>
                                                <span>Media & Communication</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Art, Design & Music"} onChange={this.onChangeJobArea}/>
                                                <span>Art, Design & Music</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Natural Sciences"} onChange={this.onChangeJobArea}/>
                                                <span>Natural Sciences</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Linguistics and cultural studies"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>Linguistics and cultural studies</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Technology & Engineering"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>Technology & Engineering</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Economy & Law"} onChange={this.onChangeJobArea}/>
                                                <span>Economy & Law</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"
                                                       value={"Administration"} onChange={this.onChangeJobArea}/>
                                                <span>Administration</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <a className="waves-effect waves-light btn-large next-button">next</a>
                            <a className="waves-effect waves-light btn-large back-button">back</a>
                        </div>
                        <div className="form-step js-form-step waiting hidden" data-step="5">
                            <div id="header">
                                <h2>What adjectives describe you?</h2>
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
                                                <input type="checkbox" className="filled-in" value={"Clever"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Clever</span>
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
                                                <input type="checkbox" className="filled-in" value={"Egoistical"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Egoistical</span>
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
                                                <input type="checkbox" className="filled-in" value={"Individualistic"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Individualistic</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Informal"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Informal</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Insightful"}
                                                       onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Insightful</span>
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
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Interest wide</span>
                                            </label>
                                        </p>
                                    </div>
                                    <div className="col s4">
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Inventive</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Original</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Reflective</span>
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
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Self-confident</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Sexy</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Snobbish</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Unconventional</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Artificial</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Cautious</span>
                                            </label>
                                        </p>
                                    </div>
                                    <div className="col s4">
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Conventional</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Conservative</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Dissatisfied</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Honest</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Interests narrow</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Mannerly</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Sincere</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Submissive</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input type="checkbox" className="filled-in" value={"Intelligent"} onChange={this.onChangePersonalityAdjectives}/>
                                                <span>Suspicious</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <a className="waves-effect waves-light btn-large back-button">back</a>
                            <Link to={this.state.link} id="finish-button"
                                  className="waves-effect waves-light btn-large">finish</Link>
                        </div>
                    </div>
                </div>
                <img className="background" src="/ressources/background.svg"></img>
            </div>
        );
    }
}

export default Questionnaire;
