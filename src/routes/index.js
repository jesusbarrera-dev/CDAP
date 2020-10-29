const express = require('express');
const router = express.Router();

module.exports = app => {
  router.get('/', (req, res) => {
    res.send("Index page");
  });

  router.get('/contact', (req, res) => {
    res.render('./views/layouts/contact');
  });
}