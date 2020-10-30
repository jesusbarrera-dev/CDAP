module.exports = app => {
  app.get('/contacto', (req, res) => {
    res.render("contact");
  });

}