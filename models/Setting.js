const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  bgColor:String,
  primaryColor: String,
  accentColor: String,
  textDarkColor: String,
  textLightColor: String,
  logoImage: String,
  email: String,
  number: String,
  address: String,
  instagramLink: String,
  whatsappLink: String,
  facebookLink: String,
  whatWeProvide: String,
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
