const set_urgent_food_flag = (data) =>
{
    if(data != undefined) {
        if (data.days_worth_of_food < 2) {
            data.urgent_food = true
        } else {
            data.urgent_food = false
        }
    }
    return data;
}


const set_urgent_medicines_flag = (data) =>
{
    if(data != undefined) {
        if(data.days_worth_of_medicines == null || data.days_worth_of_medicines == undefined)
        {
            data.urgent_medicines = false
        }
        else if (data.days_worth_of_medicines< 2) {
            data.urgent_medicines = true
        } else {
            data.urgent_medicines = false
        }
    }
    return data;
}

exports.set_urgent_medicines_flag = set_urgent_medicines_flag;
exports.set_urgent_food_flag = set_urgent_food_flag;