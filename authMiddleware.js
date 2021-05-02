module.exports = (db) => {
  const authMiddleware = (request, response, next) => {
    const userId = request.session.user_id;

    if (!userId) { // checking if userId is valid
      return response.redirect("error");
    }

    return db.query(`
    SELECT *
    FROM users
    WHERE users.id = '${userId}';
    `)
      .then((queryResult) => {
        if (queryResult.length === 0) { // checking if userId exists
          return response.redirect("error");
        }

        request.user = queryResult.rows[0]; // forwarding results to next route
        next(); // moving onto next route
      })
      .catch((err) => {
        console.log(err);
        return response.redirect("error");
      });
  };

  return authMiddleware;
};
