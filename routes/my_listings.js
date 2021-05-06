const express = require('express');
const router  = express.Router();

// const id = 2;

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.session.user_id;

    return db
      .query(`
        SELECT *
        FROM listings
        WHERE user_id = ${userId}
        ORDER BY date_posted DESC;
      `)
      .then(queryResult => {
        const listings = queryResult.rows;
        return res.render("my_listings", {
          listings: listings,
          user: req.user
        });
      })
      .catch(err => {
        return res.render("error", {
          message: 'There was an error retrieving your listings, please try again...', redirect: '/my_listings'
        });
      });
  });
  return router;
};
