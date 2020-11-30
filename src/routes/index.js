const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
// const passport = require("passport");
const User = require("../models/user");

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// const login = require('../controllers/login');

//User
// passport.use(user.createStrategy());
// passport.serializeUser(user.serializeUser());
// passport.deserializeUser(user.deserializeUser());

module.exports = app => {

  router.get('/', (req, res) => {
    res.render("home");
  });
  
  router.get('/login', (req, res) => {
    res.render("login");
  });

  router.post('/login', urlencodedParser, (req, res) => {
    const correo =  req.body.correo;
    const password = req.body.password;

    User.findOne({email: correo}, (err, foundUser) =>{
      if(err){
        console.log(err);
      } else{
        if(foundUser){
          console.log("Encontro usuario");
          res.render("home");
          if(foundUser.password === password){
            console.log("redirigiendo");
            res.render("home");
          }
        }
      }
    });

  });

  router.get('/SobreNosotros', (req, res) => {
    res.render("aboutUs");
  });

  router.get('/contacto', (req, res) => {
    res.render("contact");
  });
  
  router.get('/necesidades', (req, res) => {
    res.render("needs");
  });
  
  router.get('/donativo', (req, res) => {
    res.render("donation");
  });

  router.use((req, res, next) => {
    res.status(404).render("error404")
  });

  app.use(router);

}