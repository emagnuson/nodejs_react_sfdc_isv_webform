import React, { Component } from 'react';
import logo from '../ExponentPartners_ExponentCaseManagement_mobile_2019-08-06.png';
import '../App.css';



class TrialHeader extends React.Component {


  render() {
  	

    return (
		<div className="App">
	            <header className="App-header">
	              <img src={logo} className="App-logo" alt="logo" />
	              <h1 className="App-title">Provision an ECM Demo Trial</h1>
	            </header>
	            <p className="App-intro">
	              	    <span>
	                      The Exponent Case Management demo trial is for 30 days and is only available to ECM partners and pre-authorized individuals. 	 
	                      By signing up for a trial, you agree to the {' '}<a href="https://www.exponentpartners.com/exponent-partners-terms/">Master License Subscription</a> and agree to share my details with Exponent Partners.
	                    </span>
	            </p>
	          </div>
	        );
		}
	}

export default TrialHeader;
