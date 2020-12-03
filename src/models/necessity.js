const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const NecessitySchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
});

module.exports = mongoose.model('Necessity', NecessitySchema);