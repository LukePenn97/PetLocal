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
<<<<<<< HEAD
    db.query(`SELECT * FROM listings
              JOIN users ON user_id = users.id
              WHERE listings.id = $1`,[req.params.id])
      .then(data => {
        console.log('data rows[0] for listing',data.rows[0]);
        const listings = data.rows[0];
        res.render("listing",{listings: listings});
=======

    db.query(`
    SELECT *
    FROM listings
    WHERE id = ${req.params.id};
    `)
      .then((queryResults) => {
        const listings = queryResults.rows[0];
        res.render("listing",{ listings: listings, user: req.user});
>>>>>>> 1bd0a70e078b612aad11a08ee217b3cf448a62fd
      })
      .catch((err) => {
        return res.render("error", {
          message: 'An error occured while retrieving the listings, please try again', redirect: '/'
        });
      });
  });
  return router;
};
