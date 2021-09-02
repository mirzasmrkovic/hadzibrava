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
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve({ statusCode: 200 })
    }, 2000)
  })
}

module.exports.close = async event => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve({ statusCode: 200 })
    }, 2000)
  })
}

module.exports.intercom = async event => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve({ statusCode: 403 })
    }, 2000)
  })
}
