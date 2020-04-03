"use strict";
const db = require("./db_connect");
const helper = require("./v2/helpers/ResidentRequestHelpers");
const insertResidentRequests = require("./v2/use-cases/InsertResidentRequests")({
  db,
  helper
});

const retrieveResidentRequests = require("./v2/use-cases/RetrieveResidentRequests")({
  db
});

const validator = require("./v2/validators/request_validator");

module.exports.createResidentSupportRequest = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  let validationErrors = validator.validateResidentRequest(data);
  if (validationErrors.length == 0) {
    insertResidentRequests(data)
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
      .catch(err => {
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: "Error retrieving data " + err
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

module.exports.getResidentSupportRequests = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  retrieveResidentRequests()
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
      .catch(err => {
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: "Error retrieving data " + err
        });
      });
};

module.exports.createSupportVolunteerRecord = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  let validationErrors = validator.validateSupportRecord(data);
  if (validationErrors.length == 0) {
  insertSupportVolunteerRecord(data)
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
        .catch(err => {
          callback(null, {
            statusCode: err.statusCode || 500,
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true
            },
            body: "Error retrieving data " + err
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
  retrieveSupportVolunteerRecords()
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
      .catch(err => {
        callback(null, {
          statusCode: err.statusCode || 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: "Error retrieving data " + err
        });
      });
};
