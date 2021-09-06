'use strict'

const { default: axios } = require('axios')

const isCorrectPassword = event => {
  const headers = event?.headers
  const password = headers?.psw

  if (password === process.env.API_PASSWORD) {
    return true
  } else {
    return false
  }
}

module.exports.auth = async event => {
  if (isCorrectPassword(event)) {
    const { buttons } = require('./buttons.json')
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Headers': 'content-type,psw',
      },
      body: JSON.stringify({
        buttons: [...buttons],
      }),
    }
    return response
  } else {
    const response = {
      statusCode: 403,
    }
    return response
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}

const hadzibrava = async (event, action) => {
  const api = process.env.API_HOST
  const path = process.env.API_ENDPOINT + action
  if (isCorrectPassword(event)) {
    await axios({
      method: 'post',
      url: api + path,
    })
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Request-Headers': 'content-type,psw',
      },
    }
  } else {
    return {
      statusCode: 403,
    }
  }
}

module.exports.open = async event => {
  return await hadzibrava(event, 'd=o')
}

module.exports.close = async event => {
  return await hadzibrava(event, 'd=c')
}

module.exports.intercom = async event => {
  return await hadzibrava(event, 'i=o')
}
