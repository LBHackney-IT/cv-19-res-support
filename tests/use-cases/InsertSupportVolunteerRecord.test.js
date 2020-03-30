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
const insertSupportVolunteerRecord = require("../../use-cases/InsertSupportVolunteerRecord.js")(
    { db }
);
describe("createVolunteerSupportRecord", () => {
    it("can call the database insert function", () => {
        insertSupportVolunteerRecord(testData);
        expect(db.insert).toHaveBeenCalledWith("public.support_volunteers", testData);
    });
    it("returns the expected response from the database insert", async () => {
        let resp = await insertSupportVolunteerRecord(testData);
        expect(resp).toBe(response);
    });
    it("throws an error if the database insert fails", async () => {
        expect(insertSupportVolunteerRecord()).rejects.toEqual("Error!");
    });
});
