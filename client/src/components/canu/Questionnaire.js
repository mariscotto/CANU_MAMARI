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
    state = {
        link: `/${this.props.match.params.studyid}/canu/apm`
    };
    value = 0;
    transitionEnd = 'webkitTransitionEnd transitionend';

    componentDidMount() {
        this.formReset();
        this.setupFloatLabels();
        this.setupClickHandlers();
    }

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
        $(document.getElementsByClassName("form-progress-indicator")[currentFormStep-1])
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
                                            <input id="email_inline" type="email" className="validate"></input>
                                            <span className="helper-text">if you are interested in receiving your test score, feel free to add a e-mail address here.</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s6">
                                        <div className="section-title">Age</div>
                                        <input placeholder="" id="age" type="number" className="validate"></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <div className="section-title">Gender</div>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Male</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Female</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
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
                                            <div className="section-title">I think that the Pracitcal Test was assessing my creativity</div>
                                            <p>
                                                <label>
                                                    <input className="with-gap" name="group1" type="radio"/>
                                                    <span>Strongly Agree</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input className="with-gap" name="group1" type="radio"/>
                                                    <span>Agree</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input className="with-gap" name="group1" type="radio"/>
                                                    <span>Undecided</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input className="with-gap" name="group1" type="radio"/>
                                                    <span>Disagree</span>
                                                </label>
                                            </p>
                                            <p>
                                                <label>
                                                    <input className="with-gap" name="group1" type="radio"/>
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
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Excellent</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Good</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Fair</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Poor</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
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
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Less than high school degree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>High school degree or equivalent</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Some college but no degree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Associate degree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Bachelor degree</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
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
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Agriculture and forestry</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Social Sciences</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Computer Science & Mathematics</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Media & Communication</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Art, Design & Music</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Natural Sciences</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Linguistics and cultural studies</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Technology & Engineering</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
                                                <span>Economy & Law</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio"/>
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
                                                <input className="with-gap" type="radio"/>
                                                <span>Capable</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Clever</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Confident</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Egoistical</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Humorous</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Individualistic</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Informal</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Insightful</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Intelligent</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Interest wide</span>
                                            </label>
                                        </p>
                                    </div>
                                    <div className="col s4">
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Inventive</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Original</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Reflective</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Resourceful</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Self-confident</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Sexy</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Snobbish</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Unconventional</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Artificial</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Cautious</span>
                                            </label>
                                        </p>
                                    </div>
                                    <div className="col s4">
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Conventional</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Conservative</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Dissatisfied</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Honest</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Interests narrow</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Mannerly</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Sincere</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
                                                <span>Submissive</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" type="radio"/>
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
