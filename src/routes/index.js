require('dotenv').config();

const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const User = require("../models/user");
const Necessity = require("../models/necessity");

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = app => {

  router.get('/', (req, res) => {
    res.render("home");
  });
  
  router.get('/login', (req, res) => {
    res.render("login");
  });

  router.post('/login', urlencodedParser, (req, res) => {
    const correo =  req.body.correo;
    const password = req.body.contra;

    User.findOne({email: correo}, (err, foundUser) =>{
      if(err){
        console.log(err);
      } else{
        if(foundUser){
          if(foundUser.password === password){
            console.log("redirigiendo");
            res.redirect("/admin");
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

  router.post('/contacto', urlencodedParser, (req, res)=>{

    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: process.env.serverEmail,
          pass: process.env.serverPassword
      }
  });

  var mailOptions = {
    from: process.env.serverEmail,
    to: process.env.serverEmail,
    subject: "Nuevo Correo",
    text: "¡Alguien se puso en contacto! Su nombre es" + name + " con correo " + email + " y dejo el mensaje: " + message
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
        res.redirect("/contacto");
    }
});


  });
  
  router.get('/necesidades', async (req, res) => {

    const necessities = await Necessity.find({});

    var size = necessities.length;

    if(necessities){
      res.render("needs",{
        necessities: necessities,
        size:size
      });
    }

  });
  
  router.get('/donativo', (req, res) => {
    res.render("donation");
  });

  router.get('/admin', (req, res) =>{
    res.render("admin");
  });

  router.post('/rnecessity', urlencodedParser , async (req, res)=>{
    
    const name = req.body.name;
    const price = req.body.price;
    const descr = req.body.descr;

    const necessity = new Necessity({
      name: name, 
      description: descr,
      price: price
    });

    await necessity.save(function(err){
      if(!err){
        console.log("necesidad registrada");
        res.redirect("/admin");
      }else if(err){
        console.log(err);
      }
    });

  });

  router.post('/mnecessity', urlencodedParser , async (req, res)=>{
    
    const name = req.body.name;
    const price = req.body.price;
    const descr = req.body.descr;

    try {
      await Necessity.updateOne({name: name}, {
        price: price,
        description: descr
      });

      res.redirect('/admin');
      
    } catch (error) {
      console.log(error);
    }

  });

  router.post('/dnecessity', urlencodedParser , async (req, res)=>{

    const name = req.body.name;

    try {
      await Necessity.findOneAndDelete({name:name}, {useFindAndModify: false});
      res.redirect('/admin');
    } catch (error) {
      console.log(error);
    }

  });

  router.post('', (req, res)=>{

  });

  router.post('', (req, res)=>{

  });

  router.use((req, res, next) => {
    res.status(404).render("error404")
  });

  app.use(router);

}