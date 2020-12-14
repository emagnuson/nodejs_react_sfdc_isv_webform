import React, { Component } from 'react';
import logo from '../logosalesforce.svg';
import '../App.css';



class TrialHeader extends React.Component {


  render() {
  	

    return (
		<div className="App">
	            <header className="App-header">
	              <img src={logo} className="App-logo" alt="logo" />
	              <h1 className="App-title">Request a Salesforce Trial</h1>
	            </header>
	            <p className="App-intro">
	              	    <span>
	                      Register now and for thirty days you'll have full access to all the features and capabilities 
	                      that make salesforce.com the world's most popular CRM.  

	                      By signing up for a trial, you agree to the {' '}<a href="javascript:void(0)">Master License Subscription</a> and agree to share my details with Salesforce.com
	                    </span>
	            </p>
	          </div>
	        );
		}
	}

export default TrialHeader;
