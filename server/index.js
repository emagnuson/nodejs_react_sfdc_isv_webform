const httpClient = require('request');
const express = require('express');  //middleware
const path = require('path');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const url = require('url');
const bodyParser = require('body-parser'); //parses request into a json body object

//heroku environmental variables
const username = process.env.SALESFORCE_USERNAME;
const password = process.env.SALESFORCE_PASSWORD;
const securityToken = process.env.SALESFORCE_SECURITY_TOKEN;
const PORT = process.env.PORT || 5000;
const templateId = process.env.TRIALFORCE_TEMPLATE_ID;
const envhub = new boolean(TRUE);

if (!securityToken) { missing("SALESFORCE_SECURITY_TOKEN"); }
if (!username) { missing("SALESFORCE_USERNAME"); }
if (!password) { missing("SALESFORCE_PASSWORD"); }
if (!templateId) { missing("TRIALFORCE_TEMPLATE_ID"); }

// Multi-process to utilize all CPU cores.
if (cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {

  //create express app
  const app = express();

  //exit if any of the environmental variables are missing
  global.exit = function exit(code, msg) { console.log(`ERROR: ${msg}`); process.exit(code || 1); }
  global.missing = function missing(variable) { exit(1, `${variable} environment variable required.`); }

  //create the connection to the salesforce TMO org
  let { org, force } = require('./salesforce');


  app.listen(PORT, function () {
    console.error(`Node cluster worker ${process.pid}: listening on port ${PORT}`);
  });

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));


  //Parses the text as JSON and exposes the resulting object on request.body
  app.use(bodyParser.json());

  //Parse the text as URL encoded data and expose the resulting object on request.body
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  // Create a Trial endpoint.
  app.post('/newtrial', function(req, res) {

    //Authenticate into the Salesforce org.
    console.log("*** Attempting Salesforce authentication...");
    org.authenticate({ username, password, securityToken }, (err) => {
        if (err) {
            console.error("*** Salesforce authentication error:");
            console.error(err);
            process.exit(1);
        } else {
            console.log("*** Salesforce authentication successful.");
            console.log("- Instance URL: %s", org.oauth.instance_url);
            // console.log("- OAuth Token: %s", org.oauth.access_token);
            org.authenticated = true;

            //if the body of the request sent from react is empty or null, exit
            if (!req.body) {
              res.status(400).send('Missing Trial Information.');
              console.log('error: missing trial param');
              return;
            }

            //create an sobject container in nforce to insert the SignupRequest record
            let trial = force.createSObject('SignupRequest');
            trial.set('FirstName', req.body.firstName);
            trial.set('LastName', req.body.lastName);
            trial.set('SignupEmail', req.body.email);
            trial.set('Company', req.body.company);
            //trial.set('Phone', req.body.phone);
            trial.set('Username', req.body.uname);
            trial.set('Country', req.body.countryCode);
            //trial.set('ContactPreference', req.body.prefValue);
            //trial.set('PhonePreference', req.body.phoneValue);
            trial.set('TemplateId', templateId);
            trial.set('ShouldConnectToEnvHub', envhub);

            trial.set('PreferredLanguage', req.body.langCode);

            //perform the insert of the trial record into the SignupRequest object
            org.insert({ sobject: trial }, (err) => {
              if(err) {
                 console.error(err);
                 process.exit(1);
                 res.status(400).send(JSON.stringify({"data":err}));
              }
              else {
                 console.log('Trial Inserted');
                 res.status(200).send(JSON.stringify({"data":"Success"}));
              }
            })
            
        }
                
    });
    

  });


  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });
  

}
