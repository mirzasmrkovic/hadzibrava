const { crud } = require('../../utils/crud')
const { User } = require('./user.model')

module.exports.controllers = crud(User)
