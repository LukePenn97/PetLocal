const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session.user_id;

    if (userId) {
      return db
        .query(`
          SELECT *
          FROM users
          WHERE users.id = '${userId}';
        `)
        .then((userQuery) => {
          const userRows = userQuery.rows[0];

          return db.query(`
            SELECT *
            FROM listings
            ORDER BY RANDOM()
            LIMIT 6;
          `)
            .then((queryResults) => {
              const listings = queryResults.rows;
              const user = userRows.id;

              return res.render("index", {
                listings: listings,
                user: user
              });
            })
            .catch((err) => {
              return res.render("error", {
                message: 'An error occured while retrieving the listings, please try again',
                redirect: '/'
              });
            });
        });
    }

    if (!userId) {
      return db
        .query(`
          SELECT *
          FROM listings
          ORDER BY listings.id DESC
          LIMIT 6;
       `)
        .then((queryResults) => {
          const listings = queryResults.rows;

          return res.render("index", {
            listings: listings,
            user: req.user
          });
        })
        .catch((err) => {
          return res.render("error", {
            message: 'An error occured while retrieving the listings, please try again',
            redirect: '/'
          });
        });
    }
  });

  return router;
};
