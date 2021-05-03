const express = require('express');
const router  = express.Router();

// const id = 2;

module.exports = (db) => {
  router.get("/", (req, res) => {

    console.log('req.user: ', req.user);

    const userId = req.session.user_id;
    console.log('user: ', userId);

    return db
      .query(`
    SELECT *
    FROM listings
    WHERE user_id = ${userId}
    ORDER BY date_posted DESC;
    `)
      .then(queryResult => {
        const listings = queryResult.rows;
        return res.render("my_listings", {listings: listings});
      })
      .catch(err => {
        console.log('err: ', err);
        return res.redirect("/error");
      });
  });
  return router;
};
