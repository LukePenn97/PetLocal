const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    res.render("login");
  });


  return router;
};



/*
const saltRounds = 10;
const plainTextPass = 'password';
bcrypt.hash(plainTextPass, saltRounds, function(err, hash) {
  console.log(hash);
});

const bcrypt = require('bcrypt');
const plainTextPass = 'password';
const hash = '$2b$10$910/CnuljHbKg0t6YOWmE.oZGPaEFnk5FRvZKeD1.hMMzYbE.bwi6';
bcrypt.compare(plainTextPass, hash, function(err, result) {
  console.log(result);
});
*/
