const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');
// const passportLocalMongoose = require("passport-local-mongoose");


const userSchema = new Schema({
  email: {type: String},
  password: {type: String}
});

// userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('users', userSchema);