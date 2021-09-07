import React from 'react'
import { GoogleLogin } from 'react-google-login'

const Auth = () => {
  const responseGoogle = response => {
    console.log(response)
  }
  return (
    <GoogleLogin
      clientId="99445133255-ger1ms05fsktnqshqvkdej19trra053j.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      theme="dark"
    />
  )
}

export default Auth
