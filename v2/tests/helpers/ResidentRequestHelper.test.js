const helper = require("../../helpers/ResidentRequestHelpers");
const testDataString = `{
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
    "any_help_available" : true,
    "days_worth_of_food" : 3,
    "number_of_people_in_house" : 2,
    "struggling_to_pay_for_food" : false,
    "is_pharmacist_able_to_deliver" : false,
    "name_address_pharmacist" : "Test",
    "details_about_the_precription" : "Test",
    "consent_to_share_details" : true,
    "i_am_concerned_of" : "Test",
    "anything_else" : "Test",
    "dob_day" : "20",
    "dob_month" : "01",
    "dob_year" : "2007",
    "date_recorded": "2020-03-22 14:42:25.156"
}`;

describe("validateResidentRequest", () => {
    it("sets the urgent_food flag to false if days_worth_of_food is less than 2", () => {
        let testData = JSON.parse(testDataString);
        testData.days_worth_of_food = 1;
        let data = helper.set_urgent_food_flag(testData);
        expect(data.urgent_food).toEqual(true);
    });
    it("sets the urgent_food flag to false if days_worth_of_food is less than 2", () => {
        let testData = JSON.parse(testDataString);
        testData.days_worth_of_food = 7;
        let data = helper.set_urgent_food_flag(testData);
        expect(data.urgent_food).toEqual(false);
    });
});