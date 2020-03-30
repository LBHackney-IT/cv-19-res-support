module.exports = options => {
  const db = options.db;
  return data => {
    return db.insert("public.resident_requests", data)
        .then(res => res)
        .catch(e => e);
  };
};
