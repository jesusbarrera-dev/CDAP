module.exports = app => {

  //settings
  app.set('port', process.env.PORT || 3000);

  return app;
}