const response = 1;
const testData = `{
    "is_on_behalf" : true,
    "on_behalf_first_name" : "Mello",
    "on_behalf_last_name" : "Mello",
    "on_behalf_email_address" : "Mello",
    "on_behalf_contact_number" : "Mello",
    "relationship_with_resident" : "Mello",
    "first_name" : "Mello",
    "last_name" : "Testing",
    "address_first_line" : "11 Cassland Road",
    "address_second_line" : "Hackney",
    "address_third_line" : "",
    "postcode" : "E5 3BD",
    "uprn" : "100005462",
    "contact_telephone_number" : "0208 542 7412",
    "email_address" : "test@test.com",
    "ward" : "Clissold",
    "gp_surgery_details" : "Test",
    "days_worth_of_food" : 3,
    "number_of_people_in_house" : 2,
    "struggling_to_pay_for_food" : false,
    "is_pharmacist_able_to_deliver" : false,
    "name_address_pharmacist" : "Test",
    "details_about_the_precription" : "Test",
    "consent_to_share_details" : true,
    "i_am_concerned_of" : "Test",
    "anything_else" : "Test",
    "dob_date" : "20",
    "dob_month" : "01",
    "dob_year" : "2007",
    "date_time_recorded": "2020-03-22 14:42:25.156"
}`;
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
const helper = {
    set_urgent_food_flag: jest.fn((data) => {
        return data;
    }),
    set_urgent_medicines_flag: jest.fn((data) => {
        return data;
    })
};
const insertResidentRequests = require("../../use-cases/InsertResidentRequests.js")(
    { db, helper }
);
describe("createResidentSupportRequest", () => {
    it("can call the database insert function", () => {
        insertResidentRequests(testData);
        expect(db.insert).toHaveBeenCalledWith("public.ineedhelp_resident_support", testData);
    });
    it("can call the set_urgent_food_flag function", () => {
        insertResidentRequests(JSON.stringify(testData));
        expect(helper.set_urgent_food_flag).toHaveBeenCalledWith(JSON.stringify(testData));
    });
    it("returns the expected response from the database insert", async () => {
        let resp = await insertResidentRequests(testData);
        expect(resp).toBe(response);
    });
    it("throws an error if the database insert fails", async () => {
        expect(insertResidentRequests()).rejects.toEqual("Error!");
    });
});
