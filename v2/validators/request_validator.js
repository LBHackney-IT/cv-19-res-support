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
    if(data.uprn == null || data.uprn == ""){
        errors.push('UPRN must be provided');
    }
    if(data.email_address == null || data.email_address == ""){
        errors.push('Email address must be provided');
    }
    if(data.contact_telephone_number == null || data.contact_telephone_number == ""){
        errors.push('Contact telephone number must be provided');
    }
    if(data.days_worth_of_food == null || data.days_worth_of_food == ""){
        errors.push('Days worth of food must be provided');
    }
    if(data.number_of_people_in_house == null || data.number_of_people_in_house == ""){
        errors.push('Number of people in the house must be provided');
    }
    if(data.gp_surgery_details == null || data.gp_surgery_details == ""){
        errors.push('GP surgery details must be provided');
    }
    if(data.is_on_behalf == true)
    {
        if(data.on_behalf_first_name  == null || data.on_behalf_first_name == "")
        {
            errors.push('If you are completing this form on behalf of someone you must provide a first name');
        }
        if(data.on_behalf_last_name  == null || data.on_behalf_last_name == "")
        {
            errors.push('If you are completing this form on behalf of someone you must provide a last name');
        }
        if(data.on_behalf_email_address  == null || data.on_behalf_email_address == "")
        {
            errors.push('If you are completing this form on behalf of someone you must provide an email address');
        }
        if(data.on_behalf_contact_number  == null || data.on_behalf_contact_number == "")
        {
            errors.push('If you are completing this form on behalf of someone you must provide a contact number');
        }
    }
    if(data.dob_day == null || data.dob_day == "")
    {
        errors.push('Please specify the day of the date of birth');
    }
    if(data.dob_month == null || data.dob_month == "")
    {
        errors.push('Please specify the month of the date of birth');
    }
    if(data.dob_year == null || data.dob_year == "")
    {
        errors.push('Please specify the year of the date of birth');
    }
    return errors;
}

exports.validateResidentRequest = validateResidentRequest;