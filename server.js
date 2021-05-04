// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');
const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

// Middleware
const authMiddleware = require("./authMiddleware");

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const homeRoutes = require("./routes/home");
const listingsRoutes = require("./routes/listings");
const searchRoutes = require("./routes/search");
const newItemRoutes = require("./routes/new_item");
const favouritesRoutes = require("./routes/favourites");
const myListingsRoutes = require("./routes/my_listings");
const loginRoutes = require("./routes/login");
const errorRoutes = require("./routes/error");
const logoutRoutes = require("./routes/logout");

console.log('in server.js');

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/listings", authMiddleware(db), listingsRoutes(db));
app.use("/search", authMiddleware(db), searchRoutes(db));
app.use("/new_item", authMiddleware(db), newItemRoutes(db));
app.use("/favourites", authMiddleware(db), favouritesRoutes(db));
app.use("/my_listings", authMiddleware(db), myListingsRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/error", errorRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/", homeRoutes(db));
// Note: mount other resources here, using the same pattern above


// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
