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
    return db
      .query(`
        SELECT *
        FROM users
        WHERE email = '${req.body.email}'
      `)
      .then((queryResult) => {
        if (queryResult.rows.length === 0) {
          return res.render("error", {
            message: 'No user found, please login',
            redirect: '/login'
          });
        }

        const user = queryResult.rows[0];

        bcrypt.compare(req.body.password, user.password, function(err, result) {
          if (result !== true) {
            return res.render("error", {
              message: 'Password is incorrect, please try again',
              redirect: '/login'
            });
          }

          req.session.user_id = user.id;
          return res.redirect("/");
        });
      })
      .catch((err) => {
        return res.render("error", {
          message: 'An error occured during login, please try again',
          redirect: '/login'
        });
      });
  });

  return router;
};
