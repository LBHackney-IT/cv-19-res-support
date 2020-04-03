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
exports.set_urgent_food_flag = set_urgent_food_flag;