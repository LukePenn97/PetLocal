const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("error", {
      message: 'you need to be logged in to view this page',
      redirect: '/login' });
  });

  return router;
};
