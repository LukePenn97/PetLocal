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
    let queryPlus = '';
    if (req.body.minPrice) {
      queryPlus += ` WHERE price >= ${req.body.minPrice * 100}`;
    }
    if (req.body.maxPrice) {
      if (queryPlus) {
        queryPlus += ` AND price <= ${req.body.maxPrice * 100}`;
      }
      if (!queryPlus) {
        queryPlus += ` WHERE price <= ${req.body.maxPrice * 100}`;
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
    console.log('queryPlus:', queryPlus)
    queryString += queryPlus;
    console.log('queryString:', queryString)
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
