const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {

    console.log('req.body error: ', req.body);

    res.render("error");
  });


  return router;
};
