const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  userName: String,
    description: String,
    status: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Testimonial', testimonialSchema);
