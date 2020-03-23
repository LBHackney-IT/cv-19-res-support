const validate = (data) =>
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
exports.validate= validate;