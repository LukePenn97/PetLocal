module.exports = (db) => {
  const authMiddleware = (request, response, next) => {
    const userId = request.session.user_id;

    if (!userId) { // checking if userId is valid
      return response.render("error", {
        message: 'You must be logged in to view this page',
        redirect: '/login'
      });
    }

    return db.query(`
    SELECT *
    FROM users
    WHERE users.id = '${userId}';
    `)
      .then((queryResult) => {
        if (queryResult.length === 0) { // checking if userId exists
          return response.render("error", {
            message: 'No user found, please login',
            redirect: '/login'
          });
        }

        request.user = queryResult.rows[0]; // forwarding results to next route
        next(); // moving onto next route
      })
      .catch((err) => {
        return response.render("error", {
          message: 'An error occured during login, please try again',
          redirect: '/login'
        });
      });
  };

  return authMiddleware;
};
