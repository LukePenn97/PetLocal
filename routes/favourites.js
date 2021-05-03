const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    const userId = req.user.id;

    db.query(`
    SELECT *
    FROM favourites
    JOIN listings ON listings.id = favourites.listing_id
    JOIN users ON favourites.user_id = users.id
    WHERE favourites.user_id = ${userId}
    ORDER BY favourites.id DESC;
    `)
      .then(data => {
        const favourites = data.rows;
        res.render("favourites", { favourites: favourites, user: req.user });
      })
      .catch((err) => {
        return err.message;
      });
  });
  return router;
};
