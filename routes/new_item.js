const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("new_item");
  });

  const addNewListing = function(listing) {
    console.log('listing: ', listing);
    return db
      .query(`
    INSERT INTO listings (user_id,
      price,
      image_url,
      title,
      description,
      date_posted)
    VALUES ($1, $2, $3, $4, $5, $6)
    `,
      [listing.userId,
        listing.price,
        listing.image_url,
        listing.title,
        listing.description,
        new Date().toDateString()])
      .then((res) => {
        console.log('res.rows in new listing: ', res);
        return res.rows[0];
      })
      .catch((err) => {
        return err.message;
      });
  };

  router.post("/", (req, res) => {
    console.log('title: ', req.body.title);
    console.log('desc: ', req.body.description);
    console.log('img_url: ', req.body.image_url);
    console.log('price: ', req.body.price);

    if (!req.body.price || !req.body.image_url || !req.body.title || !req.body.description) {
      return res.status(400).json({ message: "invalid req params"});
    }

    const userId = req.user.id;
    console.log(req.body);
    addNewListing({...req.body, userId})
      .then(() => {
        res.redirect('/');
      })
      .catch(err => {
        console.log('new listing post route: ERROR');
        res.send(err);
      });


  });
  return router;
};
