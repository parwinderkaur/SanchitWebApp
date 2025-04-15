const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  dateOfPost: Date,
  description: String,
  status: { type: Number, default: 1}
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
