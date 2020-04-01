module.exports = options => {
  const db = options.db;
  return data => {
    console.log("Adding resident request");
    return db.insert("public.resident_requests", data)
        .then(res => {
          console.log("Response: "+ res);
          return res;
        })
        .catch(e => {
          console.log("Error: " + e);
          throw e });
  };
};
