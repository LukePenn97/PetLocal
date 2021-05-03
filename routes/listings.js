const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    // console.log('in listings.js router');

    db.query(`SELECT * FROM listings;`)
      .then(data => {
        // console.log('in listings.js .then');
        const listings = data.rows;
        res.json(listings);
      })
      .catch(err => {
        // console.log('in listings.js catch');
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // get specific item
  router.get("/:id", (req, res) => {
    // console.log('in listings.js router');
    console.log('req.params.id: ', req.params.id);

    db.query(`
    SELECT *
    FROM listings
    WHERE id = ${req.params.id};
    `)
      .then(data => {
        // console.log('in listings.js .then');
        const listings = data.rows[0];
        res.render("listing",{ listings: listings, user: req.user});
      })
      .catch(err => {
        // console.log('in listings.js catch');
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
