import React from 'react'
import axios from 'axios'
import HIButton from './Buttons'

const Input = ({ val, setValue }) => {
  const APIPath = process.env.REACT_APP_API || 'http://localhost:4000/'
  const handleSubmit = (currentVal, setValue) => {
    axios.defaults.headers.post['psw'] = currentVal
    const endpoint = 'auth'
    axios
      .post(APIPath + endpoint)
      .then(res => {
        // Remove the password input on correct psw input
        // const passwordForm = document.getElementById('password-form')
        // passwordForm.parentNode.removeChild(passwordForm)

        // Show buttons after removing
        const buttons = res.data.buttons
        for (let i = 0; i < buttons.length; i++) <HIButton />
      })
      .catch(e => {
        setValue('')
        console.error(e)
      })
  }

  return (
    <input
      value={val}
      onChange={e => {
        const currentVal = e.target.value
        setValue(currentVal)
        const maxLength = e.target.maxLength
        if (currentVal.length === maxLength) {
          handleSubmit(currentVal, setValue)
        }
      }}
      autoFocus
      type="number"
      maxLength={process.env.REACT_APP_PASSWORD_LENGTH || 6}
      name="pswInput"
      id="psw-input"
    />
  )
}

export default Input
