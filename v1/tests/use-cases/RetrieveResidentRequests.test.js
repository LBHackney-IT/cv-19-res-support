const responseData = '{"name" : "Sam"}';
const db = {
    getAll: jest.fn((data, params) => {
        if(params == "ErrorTest")
        {
            return Promise.reject("Error!");
        }
        else
        {
            return Promise.resolve(responseData);
        }
    })
};
const retrieveResidentRequests = require("../../use-cases/RetrieveResidentRequests.js")(
    { db }
);
describe("getResidentSupportRequest", () => {
    it("can call the database getAll function", () => {
        retrieveResidentRequests();
        expect(db.getAll).toHaveBeenCalledWith("public.resident_requests",undefined);
    });
    it("returns the expected response from the database getAll", async () => {
        let resp = await retrieveResidentRequests();
        expect(resp).toBe(responseData);
    });
    it("throws an error if the database getAll fails", async () => {
        expect(retrieveResidentRequests("ErrorTest")).rejects.toEqual("Error!");
    });
});
