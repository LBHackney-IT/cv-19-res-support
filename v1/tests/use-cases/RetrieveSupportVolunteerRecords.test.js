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
const retrieveSupportVolunteerRecords = require("../../use-cases/RetrieveSupportVolunteerRecords.js")(
    { db }
);
describe("getSupportVolunteerRecords", () => {
    it("can call the database getAll function", () => {
        retrieveSupportVolunteerRecords();
        expect(db.getAll).toHaveBeenCalledWith("public.support_volunteers",undefined);
    });
    it("returns the expected response from the database getAll", async () => {
        let resp = await retrieveSupportVolunteerRecords();
        expect(resp).toBe(responseData);
    });
    it("throws an error if the database getAll fails", async () => {
        expect(retrieveSupportVolunteerRecords("ErrorTest")).rejects.toEqual("Error!");
    });
});
