const validateResidentRequest = (data) =>
{
    var errors = [];
    if(Object.keys(data).length < 28)
    {
        errors.push('All items must be supplied in the request');
    }
    if(data.first_name == null || data.first_name == ""){
        errors.push('First name must be provided');
    }
    if(data.last_name == null || data.last_name == ""){
        errors.push('Last name must be provided');
    }
    if(data.address_first_line  == null || data.address_first_line == ""){
        errors.push('At least the first line of the address must be supplied');
    }
    if(data.postcode == null || data.postcode == ""){
        errors.push('Post code must be provided');
    }
    if((data.contact_telephone_number == null || data.contact_telephone_number == "") && (data.contact_mobile_number == null || data.contact_mobile_number == "")){
        errors.push('At least one contact number must be provided');
    }
    if(data.vulnerable_resident == null){
        errors.push('Please specify whether or not the resident is in a vulnerable group');
    }
    if(data.over_70 == true && data.under_70_with_health_condition == true){
        errors.push('A resident cannot be over 70 and under 70 at the same time');
    }
    return errors;
}

const validateSupportRecord = (data) =>
{
    var errors = [];
    if(Object.keys(data).length < 26)
    {
        errors.push('All items must be supplied in the request');
    }
    if(data.first_name == null || data.first_name == ""){
        errors.push('First name must be provided');
    }
    if(data.last_name == null || data.last_name == ""){
        errors.push('Last name must be provided');
    }
    if(data.email_address == null || data.email_address == ""){
        errors.push('Email address must be provided');
    }
    if(data.contact_telephone_number == null || data.contact_telephone_number == ""){
        errors.push('A contact number must be provided');
    }
    if(data.wards == null || data.wards == ""){
        errors.push('Wards must be provided');
    }
    if(data.age == null || data.age == ""){
        errors.push('Age must be provided');
    }
    if(data.health_accessibility_needs == null ){
        errors.push('Please specify health accessiblity needs');
    }
}

exports.validateSupportRecord = validateSupportRecord;
exports.validateResidentRequest = validateResidentRequest;