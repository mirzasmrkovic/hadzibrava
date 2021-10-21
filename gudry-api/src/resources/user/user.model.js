const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: String,
  googleID: String,
})

module.exports.User = mongoose.model('User', userSchema)
