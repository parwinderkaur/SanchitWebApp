const mongoose = require('mongoose');

const homeSectionSchema = new mongoose.Schema({
  title: String,
  paragraphNo: Number,
  description: String,
    image: String,
    status: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('HomeSection', homeSectionSchema);
