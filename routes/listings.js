const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log('in listings.js router');
    db.query(`SELECT * FROM listings;`)
      .then(data => {
        console.log('in listings.js .then');
        const listings = data.rows;
        res.json(listings);
      })
      .catch(err => {
        console.log('in listings.js catch');
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // get specific item
  router.get("/:id", (req, res) => {
    // console.log('in listings.js router');
    console.log('req.params.id: ', req.params.id);
    db.query(`SELECT * FROM listings
              JOIN users ON user_id = users.id
              WHERE listings.id = $1`,[req.params.id])
      .then(data => {
        console.log('data rows[0] for listing',data.rows[0]);
        const listings = data.rows[0];
        res.render("listing",{listings: listings});
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
