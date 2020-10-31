const express = require('express');
const router = express.Router();

module.exports = app => {


  app.get('/contacto', (req, res) => {
    res.render("contact");
  });

  app.get('/SobreNosotros', (req, res) => {
    res.render("aboutUs");
  });

  app.get('/', (req, res) => {
    res.render("indexu");
  });

  app.use((req, res, next) => {
    res.status(404).render("error404")
  });

  router.get('/contact', (req, res) => {
    res.render('./views/layouts/contact');
  });
}