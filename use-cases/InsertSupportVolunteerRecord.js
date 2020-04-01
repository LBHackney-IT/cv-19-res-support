module.exports = options => {
  const db = options.db;
  return data => {
    console.log("Adding volunteer support record");
    return db.insert("public.support_volunteers", data)
        .then(res => {
          console.log("Response: "+ res);
          return res;
        })
        .catch(e => {
          console.log("Error: " + e);
          throw e });
  };
};
