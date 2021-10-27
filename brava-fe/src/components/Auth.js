import React from 'react'
import { GoogleLogin } from 'react-google-login'
import axios from 'axios'

const Auth = () => {
  const responseGoogle = response => {
    const email = response.profileObj.email
    const name = response.profileObj.name
    const googleID = response.profileObj.googleID
    const token = response.tokenObj.id_token
    axios({
      method: 'post',
      url: 'login',
      baseURL: process.env.REACT_APP_API,
      data: {
        email: email,
        name: name,
        googleID: googleID,
      },
      headers: {
        Authorization: token,
      },
    })
    console.log({ email, name, googleID, token })
  }
  return (
    <GoogleLogin
      redirectUri="https://www.dev.hadzibrava.gudry.gg"
      clientId="99445133255-ger1ms05fsktnqshqvkdej19trra053j.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      theme="dark"
    />
  )
}

export default Auth
