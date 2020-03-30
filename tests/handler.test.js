const data = "x";
const db = {
  getAll: jest.fn(() => {
    return Promise.resolve();
  }),
  insert: jest.fn(() => {
    return Promise.resolve(data);
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
