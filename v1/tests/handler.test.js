const data = "x";
const response = 1;
const db = {
  getAll: jest.fn(() => {
    return Promise.resolve(data);
  }),
  insert: jest.fn(() => {
    return Promise.resolve(response);
  })
};
const healthCheckStatus = {
  status: "Success"
}

describe("getResidentSupportRequests", () => {
  it("it can get resident requests", () => {
    const retrieveResidentRequests = require("../../v1/use-cases/RetrieveResidentRequests")(
      { db }
    );
    retrieveResidentRequests();
    expect(db.getAll).toReturn();
  });
});

describe("getHealthCheckHandler", () => {
  it("it can give a health check status", () => {
    const healthCheckHandler = require("../../handler");
    let res = null;
    healthCheckHandler.status(null, null, (inf, resp) => { res = resp});
    expect(res.body).toContain("Success");
    expect(res.statusCode).toEqual(200);
  });

  it("it can return a health check error", () => {
    const healthCheckHandler = require("../../handler");
    let res = null;
    healthCheckHandler.error(null, null, (inf, resp) => { res = resp});
    expect(res.body).toContain("Expected Error Thrown!");
    expect(res.statusCode).toEqual(500);
  });
});
