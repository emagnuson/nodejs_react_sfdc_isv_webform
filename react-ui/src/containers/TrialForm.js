import React, { Component } from 'react';

//Lightning Design System React Components
import { Button, IconSettings, Input, Combobox } from '@salesforce/design-system-react';
import '../App.css';

//below imports is the data to populate the comboboxes
import {COUNTRIES} from '../data/combodata';
import {PTYPES} from '../data/combodata';
import {CPREFS} from '../data/combodata';
import {LANGUAGES} from '../data/combodata';

//JS object to hold the form information and pass between components.
import {Trial} from './Trial';



//Form component to capture the trial information
class TrialForm extends React.Component {

  //initialize all the variables and the event functions in state 	
  constructor(props) {
    super(props);

    this.state = {

      firstName: {value:'', message:''},
	  lastName: {value:'', message:''},
	  email: {value:'', message:''},
	  company: {value:'', message:''},
	  //phone: {value:'', message:''},
          subdomain: {value:'', message:''},
	  uname: {value:'', message:''},
	  countryCode: '',
	  prefValue: '',
	  //phoneValue: '',
	  subdomainValue: '',
	  langCode: '',
	  countryCodeError: '',
	  //phoneValueError: '',
	  subdomainValueError: '',  
	  prefValueError: '',
	  langCodeError: '',

    };


    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  //called when input is entered into a field by the onChange event
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    //set the state with the value passed in from the onChange method
    var state = this.state;
    state[name].value = value;
    state[name].message = '';

    this.setState(state);


  }

  //submits the form data to the handlesubmit function in App.js
  handleSubmit(event){
    event.preventDefault();

    var state = this.state;
    var val = true;


    Object.keys(state).map(key => {
    	//validation check on input fields (checks to see if they are empty)
    	if(state[key].value === ''){
    		state[key].message = 'This is a required field.';
    		val = false;
    	}
    	//validation checks on the comboboxes (checks to see if any are empty)
    	if (key === 'subdomainValue' || key === 'prefValue' || key === 'countryCode' || key === 'langCode'){
    		if (state[key] === '') {
    			var m = key+'Error';
    			state[m] = 'This is a required field.';
    			val = false;
    		}
    	}
    });


    this.setState(state);

    //if the validation boolean is true - then submit the trail form info to node, if not, exit and alert the user
    if (val) {

    	//create a trial js object to pass to the nodejs app
    	let myTrial = new Trial(this.state.firstName.value, 
    							this.state.lastName.value, 
    						    this.state.email.value, 
    							this.state.company.value, 
    							//this.state.phone.value, 
    							this.state.subdomain.value, 
    							this.state.uname.value, 
    							this.state.countryCode, 
    							this.state.prefValue, 
    							//this.state.phoneValue,
							this.state.subdomainValue,
    							this.state.langCode);

    	if (!myTrial){
    		return;
    	}

    	//bind the trial object to the button in App.js
    	this.props.onExecuteQuery({newTrial: myTrial});
    	
    } else {
    	console.log('validation error');
	}

  }

  //renders the elements on the screen
  render() {
  	
  	var {firstName, lastName, email, company, subdomain, uname} = this.state;

    return (
		<div>
	            <IconSettings iconPath="/icons">
	              <div>
	                <form onSubmit={this.handleSubmit}>
	                  <section className="slds-p-around--large">
	                    <div className="slds-grid slds-gutters">
	                      <div className="slds-col">
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="firstName"
	                            label="First Name"
	                            required
	                            name="firstName"
	                            type="text"
	                            errorText={firstName.message}
	                            value={firstName.value}
	                            onChange={this.handleInputChange}
	                          />
	                        </div>
	    			<div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="lastName"
	                            label="Last Name"
	                            required
	                            name="lastName"
	                            type="text"
	                            errorText={lastName.message}
	                            value={lastName.value}
	                            onChange={this.handleInputChange}
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="email"
	                            label="Email"
	                            required
	                            name="email"
	                            type="email"
	                            errorText={email.message}
	                            value={email.value}
	                            onChange={this.handleInputChange}
	                          />
	                        </div>
	                        //<div className="slds-form-element slds-m-bottom--large">
	                          //<Input
	                            //id="phone"
	                            //label="Phone"
	                            //required
	                            //name="phone"
	                            //errorText={phone.message}
	                            //value={phone.value}
	                            //type="tel"
	                            //onChange={this.handleInputChange}
	                          ///>
	                        //</div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="company"
	                            label="Company"
	                            required
	                            name="company"
	                            type="text"
	                            errorText={company.message}
	                            value={company.value}
	                            onChange={this.handleInputChange}
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="uname"
	                            label="Please enter a username of your choice in the form of an email"
	                            required
	                            name="uname"
	                            type="text"
	                            errorText={uname.message}
	                            value={uname.value}
	                            onChange={this.handleInputChange}
	                            placeholder="example: sara@trial.user or mike@my.trial"
	                          />
	                        </div>
	                      </div>                
	                      <div className="slds-col">
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Input
	                            id="subdomain"
	                            label="Subdomain"
	                            required
	                            name="subdomain"
	                            errorText={subdomain.message}
	                            value={subdomain.value}
	                            type="tel"
	                            onChange={this.handleInputChange}
	                          />
	    			</div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Combobox
	                            id="contactPrefs"
	                            events={{
	                              onSelect: (event, data) => {
	                                if (this.props.action) {
	                                  this.props.action('onSelect')(
	                                    event,
	                                    ...Object.keys(data).map((key) => data[key])
	                                  );
	                                } else if (console) {
	                                  console.log('onSelect', event, data);
	                                }
	                                this.setState({
	                                  prefValue: data.selection[0].id,
	                                  prefSelection: data.selection,
	                                  prefValueError: '',
	                                });
	                              },
	                            }}
	                            labels={{
	                              label: 'Contact Preference',
	                            }}
	                            options={CPREFS}
	                            errorText={this.state.prefValueError}
	                            selection={this.state.prefSelection}
	                            value={this.state.prefValue}
	                            variant="readonly"
	                            required
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Combobox
	                            id="phoneType"
	                            events={{
	                              onSelect: (event, data) => {
	                                if (this.props.action) {
	                                  this.props.action('onSelect')(
	                                    event,
	                                    ...Object.keys(data).map((key) => data[key])
	                                  );
	                                } else if (console) {
	                                  console.log('onSelect', event, data);
	                                }
	                                this.setState({
	                                  phoneValue: data.selection[0].id,
	                                  phoneSelection: data.selection,
	                                  phoneValueError:'',
	                                });
	                              },
	                            }}
	                            labels={{
	                              label: 'Phone Type',
	                            }}
	                            options={PTYPES}
	                            selection={this.state.phoneSelection}
	                            value={this.state.phoneValue}
	                            variant="readonly"
	                            errorText={this.state.phoneValueError}
	                            required
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Combobox
	                            id="country"
	                            events={{
	                              onSelect: (event, data) => {
	                                if (this.props.action) {
	                                  this.props.action('onSelect')(
	                                    event,
	                                    ...Object.keys(data).map((key) => data[key])
	                                  );
	                                } else if (console) {
	                                  console.log('onSelect', data);
	                                }
	                                this.setState({
	                                  countryValue: data.selection[0].label,
	                                  countrySelection: data.selection,
	                                  countryCode: data.selection[0].id,
	                                  countryCodeError: '',
	                                });
	                              },
	                            }}
	                            labels={{
	                              label: 'Country',
	                            }}
	                            options={COUNTRIES}
	                            selection={this.state.countrySelection}
	                            value={this.state.countryValue}
	                            variant="readonly"
	                            errorText={this.state.countryCodeError}
	                            required
	                          />
	                        </div>
	                        <div className="slds-form-element slds-m-bottom--large">
	                          <Combobox
	                            id="language"
	                            events={{
	                              onSelect: (event, data) => {
	                                if (this.props.action) {
	                                  this.props.action('onSelect')(
	                                    event,
	                                    ...Object.keys(data).map((key) => data[key])
	                                  );
	                                } else if (console) {
	                                  console.log('onSelect', event, data);
	                                }
	                                this.setState({
	                                  langValue: data.selection[0].label,
	                                  langSelection: data.selection,
	                                  langCode: data.selection[0].id,
	                                  langCodeError:'',
	                                });
	                              },
	                            }}
	                            labels={{
	                              label: 'Preferred Language',
	                            }}
	                            options={LANGUAGES}
	                            selection={this.state.langSelection}
	                            value={this.state.langValue}
	                            variant="readonly"
	                            errorText={this.state.langCodeError}
	                            required
	                          />
	                        </div>
	                      </div>
	                    </div>  
	                    <div align="right">
	                    	<Button label="Submit" variant="brand" type="submit" onClick={this.handleSubmit.bind(this)}></Button> 
	                    </div> 
	                  </section>
	                </form>
	              </div>
	            </IconSettings>
	          </div>
	        );
		}
	}

export default TrialForm;
