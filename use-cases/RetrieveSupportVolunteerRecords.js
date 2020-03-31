module.exports = options => {
  const db = options.db;
  return (params) => {
    return db.getAll("public.support_volunteers", params)
        .then(res => {
          console.log("Response: "+ res);
          return res;
        })
        .catch(e => {
          console.log("Error: " + e);
          throw e });
  };
};