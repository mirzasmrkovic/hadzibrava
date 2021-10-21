'use strict'
const mongoose = require('mongoose')
const dbURI = process.env.MONGO_URI
let connection = null

module.exports.connect = async () => {
  try {
    if (connection === null) {
      connection = await mongoose.connect(dbURI, {
        serverSelectionTimeoutMS: 5000,
      })
    }
    return connection
  } catch (error) {
    console.error(error)
    return error
  }
}
