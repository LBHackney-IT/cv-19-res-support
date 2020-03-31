"use strict";
const db = require("./db_connect");
const insertResidentRequests = require("./use-cases/InsertResidentRequests")({
  db
});

const retrieveResidentRequests = require("./use-cases/RetrieveResidentRequests")({
  db
});

const insertSupportVolunteerRecord = require("./use-cases/InsertSupportVolunteerRecord")({
  db
});

const retrieveSupportVolunteerRecords = require("./use-cases/RetrieveSupportVolunteerRecords")({
  db
});

const validator = require("./validators/request_validator");

module.exports.createResidentSupportRequest = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);
  let validationErrors = validator.validateResidentRequest(data);
  if (validationErrors.length == 0) {
    try {
      let res = insertResidentRequests(data);
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(res)
      });
    }
    catch(err)
    {
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: "Error retrieving data " + err
      });
    }
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
  let validationErrors = validator.validateResidentRequest(data);
  if (validationErrors.length == 0) {
    try {
      let res = insertSupportVolunteerRecord(data);
      callback(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: JSON.stringify(res)
      });
    }
    catch(err)
    {
      callback(null, {
        statusCode: err.statusCode || 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
        body: "Error retrieving data " + err
      });
    }
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
