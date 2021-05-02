const express = require('express');
const router  = express.Router();
const id = 2;

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('search', {listings: null})
  });
  router.post("/", (req, res) => {
    console.log('req.body = ',req.body);
    let queryString = `SELECT * FROM listings`;
    if (req.body.minPrice || req.body.maxPrice) {
      queryString += ` WHERE price`;
      if (req.body.minPrice) {
        queryString += ` >= ${req.body.minPrice * 100}`;
      }
      if (req.body.maxPrice) {
        queryString += ` <= ${req.body.maxPrice * 100}`;
      }
    }
    db.query(queryString)
      .then(data => {
        const listings = data.rows;
        res.render("search", {listings: listings});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
