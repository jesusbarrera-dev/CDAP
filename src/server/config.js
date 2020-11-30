const path = require('path');
const ejs = require('ejs');
const express = require('express');
const session = require('express-session');
const passport = require("passport");


const routes = require('../routes/index.js');

module.exports = app => {

  //settings
  app.set('port', process.env.PORT || 3001);
  app.set('views', path.join(__dirname, '../views'));
  app.set('view engine', 'ejs');

  //static files
  app.use('/public', express.static(path.join(__dirname, '../public')));

  //sessions
  app.use(session({
    secret:"123",
    resave: false,
    saveUninitialized: false
}));

  // app.use(passport.initialize());
  // app.use(passport.session());

  
  //routes
  routes(app);

  return app;
}