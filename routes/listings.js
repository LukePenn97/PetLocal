const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    return db
      .query(`
        SELECT *
        FROM listings;
      `)
      .then((queryResults) => {
        const listings = queryResults.rows;
        res.json(listings);
      })
      .catch((err) => {
        return res.render("error", {
          message: 'An error occured while retrieving the listings, please try again', redirect: '/'
        });
      });
  });

  // get specific item
  router.get("/:id", (req, res) => {
    console.log('req.params.id: ', req.params.id);

    db.query(`
    SELECT *
    FROM listings
    WHERE id = ${req.params.id};
    `)
      .then((queryResults) => {
        const listings = queryResults.rows[0];
        res.render("listing",{ listings: listings, user: req.user});
      })
      .catch((err) => {
        return res.render("error", {
          message: 'An error occured while retrieving the listings, please try again', redirect: '/'
        });
      });
  });
  return router;
};