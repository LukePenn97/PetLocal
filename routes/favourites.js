const express = require('express');
const router = express.Router();

const id = 2;

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`
    SELECT *
    FROM favourites
    JOIN listings ON listings.id = favourites.listing_id
    JOIN users ON favourites.user_id = users.id
    WHERE favourites.user_id = ${id};
    `)
      .then(data => {
        const favourites = data.rows;
        res.render("favourites", {favourites: favourites});
      })
      .catch((err) => {
        return err.message;
      });
  });
  return router;
};
