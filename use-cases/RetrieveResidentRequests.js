module.exports = options => {
  const db = options.db;
  return () => {
    db.getAll("public.resident_requests")
      .then(res => {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: JSON.stringify(res)
        });
      })
      .catch(e => {
        callback(null, {
          statusCode: e.statusCode || 500,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true
          },
          body: "Error retrieving data " + e
        });
      });
  };
};
