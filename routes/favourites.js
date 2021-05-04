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
