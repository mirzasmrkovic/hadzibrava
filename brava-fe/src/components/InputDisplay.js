import React from 'react'

const InputDisplay = ({ currentLength }) => {
  const decideClass = index => {
    if (index === currentLength) return ' current-digit'
    else if (index < currentLength) return ' passed-digit'
    return ''
  }
  let digits = []
  for (let i = 0; i < process.env.REACT_APP_PASSWORD_LENGTH; i++) {
    digits.push(
      <span className={'display-digit' + decideClass(i)} key={i}></span>
    )
  }
  return <div id="input-display">{digits}</div>
}

export default InputDisplay
