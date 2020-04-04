const validator = require("../../validators/request_validator");
const valid_resident_request_string = `{
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
    "days_worth_of_medicines" : 3,
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
    "date_time_recorded": "2020-03-22 14:42:25.156"
}`;
describe("validateResidentRequest", () => {
    it("can return an empty error array if the number of fields in the request is valid", () => {
        let data = JSON.parse(valid_resident_request_string);
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toEqual([]);
    });
    it("can return an error array item for if the number of fields in the request is invalid", () => {
        const invalid_resident_request_string = `{
            "is_on_behalf" : true,
            "on_behalf_first_name" : "Mello",
            "on_behalf_last_name" : "Mello",
            "on_behalf_email_address" : "Mello",
            "on_behalf_contact_number" : "Mello",
            "relationship_with_resident" : "Mello",
            "first_name" : "Mello"
        }`;
        let data = JSON.parse(invalid_resident_request_string);
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('All items must be supplied in the request');
    });
    it("can return an error array item for if first_name is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.first_name = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('First name must be provided');
    });
    it("can return an error array item for if last_name is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.last_name = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Last name must be provided');
    });
    it("can return an error array item for if contact_telephone_number is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.contact_telephone_number = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Contact telephone number must be provided');
    });
    it("can return an error array item for if email_address is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.email_address = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Email address must be provided');
    });
    it("can return an error array item for if dob_day is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.dob_day = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Please specify the day of the date of birth');
    });
    it("can return an error array item for if dob_month is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.dob_month = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Please specify the month of the date of birth');
    });
    it("can return an error array item for if dob_year is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.dob_year = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Please specify the year of the date of birth');
    });
    it("can return an error array item for if uprn is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.uprn = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('UPRN must be provided');
    });
    it("can return an error array item for if gp_surgery_details is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.gp_surgery_details = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('GP surgery details must be provided');
    });
    it("can return an error array item for if number_of_people_in_house is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.number_of_people_in_house = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Number of people in the house must be provided');
    });
    it("can return an error array item for if days_worth_of_food is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.days_worth_of_food = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Days worth of food must be provided');
    });
    it("can return an error array item for if days_worth_of_medicines is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.days_worth_of_medicines = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Days worth of medicines must be provided');
    });
    it("can return an error array item for if is_on_behalf is selected and on_behalf_first_name is not specified", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.is_on_behalf = true;
        data.on_behalf_first_name = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('If you are completing this form on behalf of someone you must provide a first name');
    })
    it("can return an error array item for if is_on_behalf is selected and on_behalf_last_name is not specified", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.is_on_behalf = true;
        data.on_behalf_last_name = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('If you are completing this form on behalf of someone you must provide a last name');
    })
    it("can return an error array item for if is_on_behalf is selected and on_behalf_email_address is not specified", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.is_on_behalf = true;
        data.on_behalf_email_address = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('If you are completing this form on behalf of someone you must provide an email address');
    })
    it("can return an error array item for if is_on_behalf is selected and on_behalf_contact_number is not specified", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.is_on_behalf = true;
        data.on_behalf_contact_number = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('If you are completing this form on behalf of someone you must provide a contact number');
    })
});