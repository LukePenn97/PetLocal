const express = require('express');
const router  = express.Router();

const id = 2;

module.exports = (db) => {
  router.get("/", (req, res) => {
    // console.log('in my_listings.js router');
    db.query(`SELECT * FROM listings WHERE user_id = ${id};`)
      .then(data => {
        // console.log('in my_listings.js .then');
        const listings = data.rows;
        res.render("my_listings",{listings: listings});
      })
      .catch(err => {
        // console.log('in my_listings.js catch');
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
