module.exports = app => {
  
  
  app.get('/contacto', (req, res) => {
    console.log(__dirname)
    res.render("contact");
  });
  
  app.get('/SobreNosotros', (req, res) => {
    res.render("aboutUs");
  });
  
  app.get('/', (req, res) => {
    res.render("indexu");
  });
  
  app.use((req, res,next) => {
    res.status(404).render("error404")
  });
}