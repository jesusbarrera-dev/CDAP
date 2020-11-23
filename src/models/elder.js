const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const ElderSchema = new Schema({
  name: { type: String },
  age: { type: Number },
  gender: { type: String },
  birthday: { type: Date },
});

module.exports = mongoose.model('Elder', ElderSchema);