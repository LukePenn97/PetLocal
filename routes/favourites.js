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
      .then((queryResult) => {
        const favourites = queryResult.rows;
        res.render("favourites", {
          favourites: favourites,
          user: req.user
        });
      })
      .catch((err) => {
        return res.render("error", {
          message: 'An error occured while retrieving your favourties, please try again', redirect: '/favourites'
        });
      });
  });

  router.get("/:id", (req, res) => {

    db.query(`
      SELECT id FROM favourites
      WHERE EXISTS(
        SELECT * FROM favourites 
        WHERE user_id = $1
        AND listing_id = $2
        )`,
      [id,req.params.id]).then((val) => {
        console.log("Favourite exists: ", val.rows[0]);
        if (!val.rows[0]) {
          console.log('add to favourites')
          db.query(`INSERT INTO favourites (
            user_id,
            listing_id) VALUES ($1, $2)`,
          [id,req.params.id])

        } else {
          console.log('delete from favourites');
          db.query(`DELETE FROM favourites
          WHERE user_id = $1
          AND listing_id = $2`,[id,req.params.id])
        }
        
    }).catch((err) => console.log(err)).then(() => res.redirect('back'));
  });
  return router;
};
