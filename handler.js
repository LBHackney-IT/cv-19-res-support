"use strict";
const db = require("./db_connect");
const insertResidentRequests = require("./use-cases/InsertResidentRequests")({
  db
});

const retrieveResidentRequests = require("./use-cases/RetrieveResidentRequests")({
  db
});

const validator = require("./request_validator");

module.exports.createResidentSupportRequest = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  let validationErrors = validator.validateResidentRequest(data);
  if (validationErrors.length == 0) {
    insertResidentRequests(data);
  } else {
    callback(null, {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(validationErrors)
    });
  }
};

module.exports.getResidentSupportRequests = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  retrieveResidentRequests();
};

module.exports.createSupportVolunteerRecord = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  let validationErrors = validator.validateSupportRecord(data);
  if (validationErrors.length == 0) {
    db.insert("public.support_volunteers", data)
      .then(res => {
        callback(null, {
          statusCode: 201,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(res)
        });
      })
      .catch(e => {
        callback(null, {
          statusCode: e.statusCode || 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: "Error creating volunteer record " + e
        });
      });
  } else {
    callback(null, {
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
      },
      body: JSON.stringify(validationErrors)
    });
  }
};

module.exports.getSupportVolunteerRecords = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  db.getAll("public.support_volunteers")
    .then(res => {
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(res)
      });
    })
    .catch(e => {
      callback(null, {
        statusCode: e.statusCode || 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: "Error retrieving data " + e
      });
    });
};
