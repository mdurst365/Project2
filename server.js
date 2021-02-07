// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================

/* exported variableName */
var dotenv = require('dotenv').config();
var express = require("express");
var passport = require("./config/passport");

// Sets up the Express App
// =============================================================
var app = express();
var exphbs = require("express-handlebars");
const session = require("express-session");

// Config Handlebars
// =============================================================
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main", handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set("view engine", "handlebars");

// Static directory
app.use(express.static("public"));
app.use(session({
  secret: "session secret", resave: true, saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
// =============================================================
require("./controllers/player-controller.js")(app);
require("./controllers/user-controller.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
