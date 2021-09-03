import React, { useState } from 'react'
import Input from './Input'
import InputDisplay from './InputDisplay'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Auth = () => {
  const [val, setValue] = useState('')
  const history = useHistory()
  const APIPath = process.env.REACT_APP_API || 'http://localhost:4000/'
  const handleSubmit = (currentVal, setValue) => {
    const endpoint = 'auth'
    axios({
      method: 'post',
      url: endpoint,
      baseURL: APIPath,
      // headers: { psw: currentVal },
    })
      .then(res => {
        history.push({
          pathname: '/buttons',
          state: {
            buttons: res.data.buttons,
            // password: currentVal,
          },
        })
      })
      .catch(e => {
        setValue('')
        console.error(e)
      })
  }
  return (
    <form
      id="password-form"
      onSubmit={e => {
        e.preventDefault()
        setValue('')
      }}
    >
      <span id="psw-title">Upisite hadzi-sifru</span>
      <span id="psw-status"></span>
      <div id="display-wrapper">
        <InputDisplay currentLength={val.length - 1} />
        <Input val={val} setValue={setValue} handleSubmit={handleSubmit} />
      </div>
    </form>
  )
}

export default Auth
