'use strict'

module.exports.auth = async event => {
  const { buttons } = require('./buttons.json')
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Headers': 'content-type,psw',
    },
    body: JSON.stringify({
      buttons: [...buttons],
    }),
  }
}

module.exports.open = async event => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Headers': 'content-type,psw',
        },
      })
    }, 2000)
  })
}

module.exports.close = async event => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Headers': 'content-type,psw',
        },
      })
    }, 2000)
  })
}

module.exports.intercom = async event => {
  return await new Promise(resolve => {
    setTimeout(() => {
      resolve({
        statusCode: 403,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Request-Headers': 'content-type,psw',
        },
      })
    }, 2000)
  })
}
