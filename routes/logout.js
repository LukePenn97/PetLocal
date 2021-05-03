const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

module.exports = (db) => {
  router.post("/", (req, res) => {
    req.session = null;
    return res.redirect("/login");
  });

  return router;
};
