// Study Landing Page Component

import React from "react";
import {Link, withRouter} from "react-router-dom";
import 'materialize-css'; // It installs the JS asset only
import 'materialize-css/dist/css/materialize.min.css';
import $ from 'jquery';
import 'material-icons';
import {Trans, withTranslation } from 'react-i18next';

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
        // this.onChangeCreativeSkills = this.onChangeCreativeSkills.bind(this);
        // this.onChangeCreativeTest = this.onChangeCreativeTest.bind(this);
        this.onChangeEducationGrade = this.onChangeEducationGrade.bind(this);
        this.onChangeJobArea = this.onChangeJobArea.bind(this);
        // this.onChangePersonalityAdjectives = this.onChangePersonalityAdjectives.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.changeLanguage = this.changeLanguage.bind(this);
        this.onChangeVP_Code = this.onChangeVP_Code.bind(this);

        this.state = {
            link: `/${this.props.match.params.studyid}/${
                this.props.match.params.groupid
            }/canu/congratz`,
            age: "",
            gender: "",
            // creative_test: "",
            // creative_skills: "",
            education_grade: "",
            job_area: "",
            vp_code: ""
            // personality_adjectives: []
        };
    }

    value = 0;
    transitionEnd = 'webkitTransitionEnd transitionend';

    componentDidMount() {
        this.formReset();
        this.setupFloatLabels();
        this.setupClickHandlers();
        if(this.props.i18n.language === "de"){
            $(".language-switch input").prop("checked", true);
        }
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

    onChangeVP_Code(e) {
        this.setState({
            vp_code: e.target.value
        })
    }

    // onChangePersonalityAdjectives (e){
    //     if (e.target.checked) {
    //         this.setState({
    //             personality_adjectives: [...this.state.personality_adjectives, e.target.value]
    //         })
    //     } else {
    //         this.setState({personality_adjectives: this.state.personality_adjectives.filter(adjective => adjective !== e.target.value)})
    //     }
    // };
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
                if(this.state.vp_code === ""){
                    return false;
                }
                break;
            // case 4:
            //     if(this.state.creative_test === "" || this.state.creative_skills === ""){
            //         return false;
            //     }
            //     break;
            // case 5:
            //     if(this.state.personality_adjectives.length === 0){
            //         return false;
            //     }
            //     break;
        }
        return true;
    }
    onSubmit(e){
        //to={this.state.link}
        const questionnaire = {
            age: this.state.age,
            gender: this.state.gender,
            // creative_test: this.state.creative_test,
            // creative_skills: this.state.creative_skills,
            education_grade: this.state.education_grade,
            job_area: this.state.job_area,
            vp_code: this.state.vp_code,
            // personality_adjectives: this.deepCloneArray(this.state.personality_adjectives),
            study:this.props.match.params.studyid
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
    changeLanguage(e){
        e.currentTarget.checked ? this.props.i18n.changeLanguage("de"):this.props.i18n.changeLanguage("en");
    }

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
                            <p>{this.props.t("questionnaire_finish")}</p>
                            <div className="popup-footer">
                            <a onClick={this.onSubmit}
                               className="waves-effect waves-light btn-large finishpopup-button">Yes</a>
                            <a href="#!" className="waves-effect waves-light btn-large finishpopup-button modal-action modal-close second-button">No</a>
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
                    <p id="info-text">{this.props.t("questionnaire_info")}</p>
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
                                <h2>{this.props.t("questionnairep1_header")}</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="input-field col s3">
                                        <div className="section-title">{this.props.t("questionnairep1_question1")}</div>
                                        <input placeholder="" id="age" type="number" className="validate"
                                               value={this.state.age} onChange={this.onChangeAge}></input>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col s12">
                                        <div className="section-title">{this.props.t("questionnairep1_question2")}</div>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={"Male"}
                                                       onChange={this.onChangeGender}/>
                                                <span>{this.props.t("questionnairep1_selection21")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={"Female"}
                                                       onChange={this.onChangeGender}/>
                                                <span>{this.props.t("questionnairep1_selection22")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group1" type="radio" value={"Diverse"}
                                                       onChange={this.onChangeGender}/>
                                                <span>{this.props.t("questionnairep1_selection23")}</span>
                                            </label>
                                        </p>
                                    </div>
                                </div>
                                <div className="row">
                                  <div class="col s12">
                                      <div className="section-title">{this.props.t("questionnairep1_question3")}</div>
                                        <p>
                                            <label>
                                                <input placeholder="" id="vp_code" type="text" className="validate"
                                                  value={this.state.vp_code} onChange={this.onChangeVP_Code}></input>
                                            </label>
                                            <span class="helper-text" data-error="wrong" data-success="right">Bitte geben Sie Ihren persönlichen Code ein. <br/>Der Code besteht aus <strong>6 Zeichen</strong>:<br/>Den beiden Tagesziffern des Geburtstages Ihrer Mutter, z.B. <strong>06</strong>.02.96<br/>Die ersten beiden Buchstaben des Vornamens Ihrer Mutter, z.B. <strong>AN</strong>NA<br/>Die letzten beiden Buchstaben Ihres Nachnamens, z.B. MÜLL<strong>ER</strong>
                                            </span>
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
                                <h2>{this.props.t("questionnairep2_header")}</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="col s12">
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group2" type="radio"
                                                       value={"Less than high school degree (Haupt- oder Realschulabschluss)"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>{this.props.t("questionnairep2_selection11")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group2" type="radio"
                                                       value={"High school degree or equivalent (Abitur)"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>{this.props.t("questionnairep2_selection12")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group2" type="radio"
                                                       value={"Bachelor's degree"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>{this.props.t("questionnairep2_selection13")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group2" type="radio"
                                                       value={"Master's degree"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>{this.props.t("questionnairep2_selection14")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group2" type="radio"
                                                       value={"Graduate degree (Diplom)"}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>{this.props.t("questionnairep2_selection15")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group2" type="radio"
                                                       value={"Ph.D."}
                                                       onChange={this.onChangeEducationGrade}/>
                                                <span>{this.props.t("questionnairep2_selection16")}</span>
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
                                <h2>{this.props.t("questionnairep3_header")}</h2>
                            </div>
                            <div id="form">
                                <div className="row">
                                    <div className="col s12">
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Agriculture and Forestry"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection11")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Social Science"} onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection12")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Computer Science & Mathematics"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection13")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Media & Communication"} onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection14")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Art, Design & Music"} onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection15")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Medicine & Healthcare"} onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection16")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Natural Sciences"} onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection17")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Linguistics and cultural studies"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection18")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Technology & Engineering"}
                                                       onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection19")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Economy & Law"} onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection110")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Administration"} onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection111")}</span>
                                            </label>
                                        </p>
                                        <p>
                                            <label>
                                                <input className="with-gap" name="group3" type="radio"
                                                       value={"Other"} onChange={this.onChangeJobArea}/>
                                                <span>{this.props.t("questionnairep3_selection112")}</span>
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

                    </div>
                </div>
                <div className="language-switch switch">
                    <label>
                        EN
                        <input type="checkbox" onClick={this.changeLanguage}></input>
                        <span className="lever"></span>
                        DE
                    </label>
                </div>
                <a className="waves-effect waves-light btn-small impressum-button modal-trigger" onClick={this.openImpressum}>i</a>
                <img className="background" src="/ressources/background_s.svg"></img>

            </div>
        );
    }
}

export default withTranslation()(Questionnaire);
