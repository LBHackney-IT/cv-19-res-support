module.exports = options => {
  const db = options.db;
  const helper = options.helper;
  return data => {
    console.log("Adding resident request");
    data = helper.set_urgent_food_flag(data);
    return db.insert("public.Ineedhelp_resident_support", data)
        .then(res => {
          console.log("Response: "+ res);
          return res;
        })
        .catch(e => {
          console.log("Error: " + e);
          throw e });
  };
};
