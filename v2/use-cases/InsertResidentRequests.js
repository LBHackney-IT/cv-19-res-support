module.exports = options => {
  const db = options.db;
  const helper = options.helper;
  return data => {
    console.log("Adding resident request");
    data = helper.set_urgent_food_flag(data);
    data = helper.set_urgent_medicines_flag(data);
    return db.insert("public.ineedhelp_resident_support", data)
        .then(res => {
          console.log("SUCCESS: "+ res);
          return res;
        })
        .catch(e => {
          console.log("ERROR: " + e);
          throw e });
  };
};