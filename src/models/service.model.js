const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the service schema
const serviceSchema = new Schema({
  name: String,
  price: Number,
  sobTitle: String
});

// Define the category schema
const categorySchema = new Schema({
  id: String,
  name: String,
  service: [serviceSchema]
});

// Define the main schema
const mainSchema = new Schema({
  id: String,
  name: String,
  description: [String],
  Categories: [categorySchema]
});

// Create and export the mongoose model
module.exports = mongoose.model("Service", mainSchema);
