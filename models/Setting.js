const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  primaryColor: String,
  secondaryColor: String,
  tertiaryColor: String,
  textColor: String,
  logoImage: String,
  accentColor: String,
  textDarkColor: String,
  textLightColor: String,
  email: String,
  number: String,
  address: String,
  instagramLink: String,
  whatsappLink: String,
  facebookLink: String,
  whatWeProvide: String,
}, { timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);
