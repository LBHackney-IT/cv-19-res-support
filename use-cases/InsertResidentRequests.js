module.exports = options => {
  const db = options.db;
  return data => {
    db.insert("public.resident_requests", data)
      .then(res => {
        callback(null, {
          statusCode: 201,
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
          body: "Error creating request " + e
        });
      });
  };
};
