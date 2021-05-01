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
        console.log('in listings.js catch')
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};