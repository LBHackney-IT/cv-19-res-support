module.exports = options => {
  const db = options.db;
  return (params) => {
    console.log("Retrieving resident requests");
    return db.getAll("public.ineedhelp_resident_support", params)
        .then(res => {
          console.log("Response: "+ res);
          return res;
        })
        .catch(e => {
          console.log("Error: " + e);
          throw e });
  };
};