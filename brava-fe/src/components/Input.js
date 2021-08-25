import React from 'react'

const Input = ({ val, setValue, handleSubmit }) => {
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
