'use strict'
const axios = require('axios')

// const clientId = process.env.OAUTH_ID
// const clientSecret = process.env.OAUTH_SECRET

const clientId = process.env.CREDENTIAL_CLIENT_ID
const clientSecret = process.env.CREDENTIAL_CLIENT_SECRET

// /clientID
module.exports.clientID = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({ clientId }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Headers': 'content-type,psw',
    },
  }
}

// /oauth2callback
module.exports.handleOAuth2 = async event => {
  const tokenResponse = await axios({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: JSON.stringify({
      // code: req.query.code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: 'https://www.dev.hadzibrava.gudry.gg/oauth2callback',
      grant_type: 'authorization_code',
    }),
  })
  const tokenJson = await tokenResponse.json()
  const userInfo = await getUserInfo(tokenJson.access_token)

  // res.redirect(
  //   `https://www.dev.hadzibrava.gudry.gg?${Object.keys(userInfo)
  //     .map(key => `${key}=${encodeURIComponent(userInfo[key])}`)
  //     .join('&')}`
  // )
  return {
    statusCode: 200,
    body: JSON.stringify({ clientId }),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Request-Headers': 'content-type,psw',
    },
  }
}

async function getUserInfo(accessToken) {
  const response = await axios({
    method: 'POST',
    url: `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const json = await response.json()
  return json
}

module.exports.verify = async token => {
  const { OAuth2Client } = require('google-auth-library')
  const client = new OAuth2Client(clientId, clientSecret)
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  })
  const payload = ticket.getPayload()
  console.log(payload)
  return payload
  const userid = payload['sub']
}
