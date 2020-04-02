const validator = require("../../validators/request_validator");
const valid_resident_request_string = `{
    "first_name" : "Mello",
    "last_name" : "Testing",
    "house_name_or_number" : "11",
    "address_first_line" : "Cassland Road",
    "address_second_line" : "Hackney",
    "address_third_line" : "",
    "postcode" : "E5 3BD",
    "uprn" : "100005462",
    "contact_telephone_number" : "0208 542 7412",
    "contact_mobile_number" : "07945 215 954",
    "vulnerable_resident" : true,
    "over_70" : false,
    "under_70_with_health_condition" : true,
    "pregnant" : false,
    "practical_support_needed" : false,
    "financial_support_needed" : true,
    "emotional_support_needed" : true,
    "other_support" : true,
    "other_support_details" : "Initial test.",
    "other_resident_support" : "Initial test details.",
    "resident_support_circumstances" : "This virus is horrible",
    "consent_to_share_details" : true,
    "self_isolating_suspected_symptoms" : true,
    "self_isolating_household_symptoms" : true,
    "self_isolating_vulnerable_household" : true,
    "children_claim_free_school_meals" : true,
    "children_do_not_claim_free_school_meals" : false,
    "date_time_recorded" : "2020-03-22 14:42:25.156",
    "dob_day" : "20",
    "dob_month" : "01",
    "dob_year" : "2007"
}`;

const valid_support_volunteer_record = `{
    "first_name": "Another Test",
    "last_name": "Test Last Name",
    "email_address": "test-name@hackney.gov.uk",
    "contact_telephone_number": "01245 654 367",
    "wards": "['daubeny', 'cazanove', 'stoke']",
    "availability": "['Monday','Tuesday','Wednesday']",
    "age": true,
    "gender": "Male",
    "other_gender": null,
    "health_accessibility_needs": true,
    "health_accessibility_needs_details":"Testing",
    "languages": "'English','French'",
    "other_language": "Spanish",
    "volunteering_experience": "['Hackney','Hackney2']",
    "volunteering_experience_other": "Somewhere else",
    "dbs": "Yes",
    "dbs_number": "12345678",
    "dbs_issue_date": "19 March, 2018",
    "location": "Hackney",
    "currently_volunteering": true,
    "volunteering_organisation": "Hackney",
    "driving": "Odd days",
    "additional_skills": "['walking','running','exercise']",
    "other_skill": "Singing and dancing",
    "consent_to_share_details": true,
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
            "first_name" : "Mello",
            "last_name" : "Testing",
            "house_name_or_number" : "11",
            "children_claim_free_school_meals" : true,
            "children_do_not_claim_free_school_meals" : false,
            "date_time_recorded" : "2020-03-22 14:42:25.156"
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

    it("can return an error array item for if address_first_line is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.address_first_line = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('At least the first line of the address must be supplied');
    });

    it("can return an error array item for if postcode is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.postcode = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Post code must be provided');
    });

    it("can return an error array item for if both contact_telephone_number and contact_mobile_number are not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.contact_telephone_number = null;
        data.contact_mobile_number = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('At least one contact number must be provided');
    });

    it("can return an error array item for if vulnerable_resident is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.vulnerable_resident = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Please specify whether or not the resident is in a vulnerable group');
    });

    it("can return an error array item for if vulnerable_resident is not provided in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.vulnerable_resident = null;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('Please specify whether or not the resident is in a vulnerable group');
    });

    it("can return an error array item for if over_70 and under_70_with_health_condition are both selected in the request", () => {
        let data = JSON.parse(valid_resident_request_string);
        data.under_70_with_health_condition = true;
        data.over_70 = true;
        let validationResponse = validator.validateResidentRequest(data);
        expect(validationResponse).toContain('A resident cannot be over 70 and under 70 at the same time');
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



});

describe("validateVolunteerSupportRecord", () => {
    it("can return an empty error array if the number of fields in the request is valid", () => {
        let data = JSON.parse(valid_support_volunteer_record);
        let validationResponse = validator.validateSupportRecord(data);
        expect(validationResponse).toEqual([]);
    });

    it("can return an error array item for if the number of fields in the request is invalid", () => {
        const invalid_support_record = `{
            "first_name" : "Mello",
            "last_name" : "Testing",
            "house_name_or_number" : "11",
            "address_first_line" : "Cassland Road",
            "address_second_line" : "Hackney"
        }`;
        let data = JSON.parse(invalid_support_record);
        let validationResponse = validator.validateSupportRecord(data);
        expect(validationResponse).toContain('All items must be supplied in the request');
    });

    it("can return an error array item for if first_name is not provided in the request", () => {
        let data = JSON.parse(valid_support_volunteer_record);
        data.first_name = null;
        let validationResponse = validator.validateSupportRecord(data);
        expect(validationResponse).toContain('First name must be provided');
    });

    it("can return an error array item for if last_name is not provided in the request", () => {
        let data = JSON.parse(valid_support_volunteer_record);
        data.last_name = null;
        let validationResponse = validator.validateSupportRecord(data);
        expect(validationResponse).toContain('Last name must be provided');
    });

    it("can return an error array item for if email_address is not provided in the request", () => {
        let data = JSON.parse(valid_support_volunteer_record);
        data.email_address = null;
        let validationResponse = validator.validateSupportRecord(data);
        expect(validationResponse).toContain('Email address must be provided');
    });

    it("can return an error array item for if contact_telephone_number is not provided in the request", () => {
        let data = JSON.parse(valid_support_volunteer_record);
        data.contact_telephone_number = null;
        let validationResponse = validator.validateSupportRecord(data);
        expect(validationResponse).toContain('A contact number must be provided');
    });

    it("can return an error array item for if wards is not provided in the request", () => {
        let data = JSON.parse(valid_support_volunteer_record);
        data.wards = null;
        let validationResponse = validator.validateSupportRecord(data);
        expect(validationResponse).toContain('Wards must be provided');
    });

    it("can return an error array item for if health_accessibility_needs is not provided in the request", () => {
        let data = JSON.parse(valid_support_volunteer_record);
        data.health_accessibility_needs = null;
        let validationResponse = validator.validateSupportRecord(data);
        expect(validationResponse).toContain('Please specify health accessiblity needs');
    });

    it("can return an error array item for if wards is not provided in the request", () => {
        let data = JSON.parse(valid_support_volunteer_record);
        data.wards = null;
        let validationResponse = validator.validateSupportRecord(data);
        expect(validationResponse).toContain('Wards must be provided');
    });
});