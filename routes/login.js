const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
// const saltRounds = 10;

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login", { user: req.user });
  });


  router.post("/", (req, res) => {
    console.log('req.body: ', req.body);
    console.log('email: ', req.body.email);
    console.log('password: ', req.body.password);

    return db
      .query(`
        SELECT *
        FROM users
        WHERE email = '${req.body.email}'`)
      .then((queryResult) => {
        if (queryResult.rows.length === 0) {
          console.log('hit error route');
          return res.redirect("/error"); // user not found;
        }

        const user = queryResult.rows[0];
        console.log('user pass: ', user.password);

        bcrypt.compare(req.body.password, user.password, function(err) {
          if (err) {
            return res.redirect("/error"); // password incorrect
          }

          console.log('req.session.user_id: ', req.session.user_id);

          req.session.user_id = user.id;
          return res.redirect("/");
        });
      })
      .catch((err) => {
        console.log('err: ', err);
        return res.redirect("/error"); // error occured during login
      });
  });

  return router;
};
