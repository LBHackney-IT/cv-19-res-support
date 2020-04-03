"use strict";
const db = require("./db_connect");
const insertResidentRequests = require("./v1/use-cases/InsertResidentRequests")({
  db
});

const retrieveResidentRequests = require("./v1/use-cases/RetrieveResidentRequests")({
  db
});

const insertSupportVolunteerRecord = require("./v1/use-cases/InsertSupportVolunteerRecord")({
  db
});

const retrieveSupportVolunteerRecords = require("./v1/use-cases/RetrieveSupportVolunteerRecords")({
  db
});

const validator = require("./v1/validators/request_validator");

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
