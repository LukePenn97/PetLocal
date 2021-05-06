const { request } = require('express');
const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render('search', {
      listings: null,
      user: req.user
    });
  });

  router.post("/", (req, res) => {
    const minPrice = req.body.min_price;
    const maxPrice = req.body.max_price;

    let queryString = `SELECT * FROM listings`;
    let queryPlus = '';

    if (minPrice) {
      queryPlus += ` WHERE price >= ${minPrice}`;
    }

    if (req.body.max_price) {
      if (queryPlus) {
        queryPlus += ` AND price <= ${maxPrice}`;
      }
      if (!queryPlus) {
        queryPlus += ` WHERE price <= ${maxPrice}`;
      }
    }

    if (req.body.keywords) {
      if (queryPlus) {
        queryPlus += ` AND (title LIKE '%${req.body.keywords}%' OR description LIKE '%${req.body.keywords}%')`;
      }
      if (!queryPlus) {
        queryPlus += ` WHERE (title LIKE '%${req.body.keywords}%' OR description LIKE '%${req.body.keywords}%')`;
      }
    }

    queryString += queryPlus;

    db.query(queryString)
      .then(data => {
        const listings = data.rows;
        res.json(listings);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
