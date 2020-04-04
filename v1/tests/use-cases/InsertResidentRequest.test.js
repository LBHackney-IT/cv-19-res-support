const response = 1;
const testData = '{}';
const db = {
    insert: jest.fn((data, params) => {
        if(params == undefined)
        {
            return Promise.reject("Error!");
        }
        else
        {
            return Promise.resolve(response);
        }
    })
};
const insertResidentRequests = require("../../use-cases/InsertResidentRequests.js")(
    { db }
);
describe("createResidentSupportRequest", () => {
    it("can call the database insert function", () => {
        insertResidentRequests(testData);
        expect(db.insert).toHaveBeenCalledWith("public.resident_requests", testData);
    });
    it("returns the expected response from the database insert", async () => {
        let resp = await insertResidentRequests(testData);
        expect(resp).toBe(response);
    });
    it("throws an error if the database insert fails", async () => {
        expect(insertResidentRequests()).rejects.toEqual("Error!");
    });
});
