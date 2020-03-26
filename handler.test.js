describe("createResidentSupportRequest", () => {
  it("it can insert resident requests", () => {
    const data = "x";

    const db = {
      insert: jest.fn()
    };
    const insertResidentRequests = require("./use-cases/InsertResidentRequests")(
      { db }
    );

    await insertResidentRequests(data);

    expect(db.insert).toHaveBeenCalledWith(expect.anything(), data);
  });
});
