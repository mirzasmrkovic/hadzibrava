'use strict'
const { controllers } = require('./user.controller')
const { connect } = require('../../utils/db')

// user/getOne
module.exports.getOne = async (event, context) => {
  const response = {}
  context.callbackWaitsForEmptyEventLoop = false

  try {
    await connect()
    const query = JSON.parse(event.body)
    const user = await controllers.getOne(query)
    response.statusCode = 200
    response.body = JSON.stringify({ data: user })
  } catch (error) {
    console.error(error)
    response.statusCode = 500
  }

  return response
}

// user/getAll
module.exports.getAll = async (event, context) => {
  const response = {}
  context.callbackWaitsForEmptyEventLoop = false

  try {
    await connect()
    const allUsers = await controllers.getAll()
    response.statusCode = 200
    response.body = JSON.stringify({ data: allUsers })
  } catch (error) {
    console.error(error)
    response.statusCode = 500
  }

  return response
}

// user/create
module.exports.create = async (event, context) => {
  const response = {}
  context.callbackWaitsForEmptyEventLoop = false

  try {
    await connect()
    console.log(event.body)
    const user = await controllers.createOne(JSON.parse(event.body))
    response.statusCode = 201
    response.body = JSON.stringify({ data: user })
  } catch (error) {
    console.error(error)
    response.statusCode = 500
  }

  return response
}
