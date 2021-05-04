const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // get homepage
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

  // get listing by id
  router.get("/:id", (req, res) => {
    console.log('req.params.id: ', req.params.id);

    db.query(`
    SELECT *
    FROM listings
    JOIN users ON users.id = listings.user_id
    WHERE listings.id = ${req.params.id};
    `)
      .then((queryResults) => {
        const listings = queryResults.rows[0];
        res.render("listing",{
          listings: listings,
          user: req.user
        });
      })
      .catch((err) => {
        return res.render("error", {
          message: 'An error occured while retrieving the listings, please try again', redirect: '/'
        });
      });
  });

  // get listing by id to edit
  router.get("/:id/edit_listing", (req, res) => {

    const listingId = req.params.id;

    db.query(`
    SELECT *
    FROM listings
    WHERE listings.id = ${listingId};
    `)
      .then((queryResults) => {
        const listing = queryResults.rows[0];
        res.render("edit_listing",{
          listing: listing,
          user: req.user
        });
      })
      .catch((err) => {
        return res.render("error", {
          message: 'An error occured while retrieving the listing, please try again', redirect: '/'
        });
      });
  });


  // edit a listing
  router.post("/:id/edit_listing", (req, res) => {

    const userId = req.user.id;

    // function to query an edit
    const editListing = function(listing) {

      const listingId = req.params.id;

      return db.query(`
      UPDATE listings
      SET price = $1,
          image_url = $2,
          title = $3,
          description = $4
      WHERE listings.id = ${listingId}
      AND listings.user_id = ${userId}
      RETURNING *;
    `,[
        listing.price,
        listing.image_url,
        listing.title,
        listing.description
      ])
        .then((queryResult) => {
          console.log('res.rows in edit: ', queryResult.rows[0]);

          return queryResult.rows[0];
        })
        .catch((err) => {
          return res.render("error", {
            message: 'an error occured while attempting to update your lsiting',
            redirect: '/:id/edit_listing'
          });
        });
    };

    if (!req.body.price || !req.body.image_url || !req.body.title || !req.body.description) {
      return res.render("error", {
        message: 'missing fields, please try again with all required fields filled out', redirect: 'listings/:id/listing'
      });
    }

    editListing({...req.body, userId})
      .then(() => {
        return res.redirect('/');
      })
      .catch((err) => {
        return res.render("error", {
          message: 'there was an error while editing your listing, pease try again...', redirect: '/:id/listing'
        });
      });

  });


  return router;
};
