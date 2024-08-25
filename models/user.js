const mongoose = require('mongoose');

const foodiesauth = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  emailid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('foodiesauth', foodiesauth);
