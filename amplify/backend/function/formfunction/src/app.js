/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/


/* Amplify Params - DO NOT EDIT
  ENV
  REGION
  STORAGE_FORMTABLE_ARN
  STORAGE_FORMTABLE_NAME
  STORAGE_FORMTABLE_STREAMARN
Amplify Params - DO NOT EDIT */

const express = require('express')
const bodyParser = require('body-parser')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });
const iot = new AWS.Iot({ region: 'us-east-1' });
function id() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

app.post('/contact', function (req, res) {
  console.log(req);
  /*
  var params = {
    TableName: process.env.STORAGE_FORMTABLE_NAME,
    Item: {
      id: id(),
      min: req.body.min,
      max: req.body.max,
      date: req.body.date,
      type: req.body.type
    }
  }
/*
  var params = {
    TableName: process.env.STORAGE_FORMTABLE_NAME,
    Key: {
      'id': 'us3d5n1trzl1xvw8xq',
    },
    UpdateExpression: 'set con = :r',
    ExpressionAttributeValues: {
      ':r': "40",
    },
  }
*/

  /*
   docClient.put(params, function (err, data) {
      if (err) res.json({ err })
      else res.json({ success: 'Updated successfully!' })
    })*/
    var fname = "";
    var rname = "";
    var sqlStatement = "";
    if(req.body.type == "temp"){
      fname = 'arn:aws:lambda:us-east-1:138581057382:function:get_data_temperature';
      rname = 'temp_notification';
      sqlStatement = 'SELECT deviceID, temp, "' + req.body.min + '" as min_temp , "' + req.body.max + '" as max_temp FROM "esp8266/pub" where temp <"' + req.body.min + '" or temp >"' + req.body.max + '"';
    } else if(req.body.type == "oxygen") {
      fname = 'arn:aws:lambda:us-east-1:138581057382:function:get_data_oxygen';
      rname = 'oxygen_notification';
      sqlStatement = 'SELECT deviceID, do, "' + req.body.min + '" as min_do , "' + req.body.max + '" as max_do FROM "esp8266/pub" where do <"' + req.body.min + '" or do >"' + req.body.max + '"';
    }

  var params = {
    ruleName: rname, /* required */
    topicRulePayload: { /* required */
      sql: sqlStatement, /* required */

      actions: [{
        lambda: {
          functionArn: fname /* required */
        }
      }],

    }
  };

  iot.replaceTopicRule(params, function (err, data) {
    if (err) res.json({ err })
    else res.json({ success: 'Updated successfully!' })
  });
  //iot.replaceTopicRule(params).promise();

});

app.get('/contact', function (req, res) {
  res.json({ success: 'Updated successfully!' });
});


app.listen(3000, function () {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
