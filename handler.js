'use strict';
const db = require('./db_connect');
const validator = require('./request_validator');
module.exports.createResidentSupportRequest = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  let validationErrors = validator.validate(data);
  if(validationErrors.length == 0)
  {
    db.insert('public.resident_requests', data)
      .then(res => {
        callback(null,{
          statusCode: 201,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify(res)
        })
      })
      .catch(e => {
        callback(null,{
          statusCode: e.statusCode || 500,
          headers:{
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
          },
          body: "Error creating request " + e
        })
      })
  }
  else
  {
    callback(null,{
      statusCode: 400,
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify(validationErrors)
    })
  }
};

module.exports.getResidentSupportRequests = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getAll('public.resident_requests')
    .then(res =>{
      callback(null,{
        statusCode: 200,
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(res)
      })
    })
    .catch(e => {
      callback(null,{
        statusCode: e.statusCode || 500,
        headers:{
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: "Error retrieving data " + e
      })
    })
};
