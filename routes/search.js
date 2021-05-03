const { request } = require('express');
const express = require('express');
const router  = express.Router();
const id = 2;

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('search', { listings: null, user: req.user });
  });
  router.post("/", (req, res) => {
    console.log('req.body = ',req.body);
    let queryString = `SELECT * FROM listings`;
    if (req.body.minPrice && req.body.maxPrice) {
      queryString += ` WHERE price >= ${req.body.minPrice * 100} AND price <= ${req.body.maxPrice * 100}`;
    } else if (req.body.minPrice) {
      queryString += ` WHERE price >= ${req.body.minPrice * 100}`;
    } else if (req.body.maxPrice) {
      queryString += ` WHERE price <= ${req.body.maxPrice * 100}`;
    }
    db.query(queryString)
      .then(data => {
        const listings = data.rows;
        res.render("search", { listings: listings, user: request.user});
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
