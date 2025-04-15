const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  status: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Service', serviceSchema);