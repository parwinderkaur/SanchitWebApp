const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  title: String,
    description: String,
    status: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Faq', faqSchema);
