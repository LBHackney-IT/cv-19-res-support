
describe("createResidentSupportRequest", () => {
  it("it can insert resident requests", async () => {
    const data = "x";
    const db = {
      insert: jest.fn(() => {
        return Promise.resolve(data);
      })
    };
    const insertResidentRequests = require("./use-cases/InsertResidentRequests")(
      { db }
    );
    insertResidentRequests(data);
    expect(db.insert).toHaveBeenCalledWith(expect.anything(), data);
  });
});
