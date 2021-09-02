'use strict'

module.exports.auth = async event => {
  const { buttons } = require('./buttons.json')
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      buttons: [...buttons],
    }),
  }
  return response
}

module.exports.open = async event => {
  setTimeout(() => {
    return {
      status: 200,
    }
  }, 2000)
}

module.exports.close = async event => {
  setTimeout(() => {
    return {
      status: 200,
    }
  }, 2000)
}

module.exports.intercom = async event => {
  setTimeout(() => {
    return {
      status: 403,
    }
  }, 2000)
}
