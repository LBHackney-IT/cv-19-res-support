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

describe("getResidentSupportRequests", () => {
  it("it can get resident requests", () => {
    const retrieveResidentRequests = require("../use-cases/RetrieveResidentRequests")(
      { db }
    );
    retrieveResidentRequests();
    expect(db.getAll).toReturn();
  });
});

describe("createResidentSupportRequest", () => {
  it("it can insert resident requests", () => {
    const insertResidentRequests = require("../use-cases/InsertResidentRequests")(
        { db }
    );
    insertResidentRequests(data);
    expect(db.insert).toHaveBeenCalledWith(expect.anything(), data);
  });
});
