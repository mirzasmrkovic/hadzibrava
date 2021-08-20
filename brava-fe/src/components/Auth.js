import React, { useState } from 'react'
import Input from './Input'
import InputDisplay from './InputDisplay'

const Auth = () => {
  const [val, setValue] = useState('')
  return (
    <form
      id="password-form"
      onSubmit={e => {
        e.preventDefault()
      }}
    >
      <span id="psw-title">Upisite hadzi-sifru</span>
      <span id="psw-status"></span>
      <div id="display-wrapper">
        <InputDisplay currentLength={val.length - 1} />
        <Input val={val} setValue={setValue} />
      </div>
    </form>
  )
}

export default Auth
