//SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';

import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
//Fields array to customize Field tags to keep from bloating JSX
const FIELDS = [
    {label: 'Survey Title', name: 'title'},
    {label: 'Subject Line', name: 'subject'},
    {label: 'Email Body', name: 'body'},
    {label: 'Recipient List', name: 'emails'}
];

class SurveyForm extends Component {
    renderFields() {
        //iterate over our list of above defined FIELDS array with lodash
        // and for every object in there return a custom Redux form <Field /> 
        //with custom label and name properties
        return _.map(FIELDS, ({label, name}) => {
            return (
                <Field 
                    key={name} 
                    component={SurveyField} 
                    type="text" 
                    label={label} 
                    name={name}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                    </Link>
                    <button type="submit" className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}
//function that validates our form fields
//takes one argument:values object containing all the 
//different values coming from our form
//Redux-Form automatically matches up the errors you return
// to the different fields you are rendering
function validate(values) {
     const errors = {};
    //run our imported validateEmails function
     errors.emails = validateEmails(values.emails || '' );
    //for each name property in the FIELDS array
    //check if a value was provided, if not 
    //return an error message prompting an input value
     _.each(FIELDS, ({ name }) => {
         if (!values[name]) {
             errors[name] = 'You must provide a value'
         }
     });
 
     //if our errors object remains empty, proceed to submit
     return errors;
}

//reduxForm takes one single argument that
//contains options to customize form behavior
//only REQUIRES one option:: form.
//we can also pass the validate option and pass in a function
//that validates the fields every time the user submits the form
export default reduxForm({
    validate,
    form: 'surveyForm'
})(SurveyForm);