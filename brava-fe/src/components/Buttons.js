import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'

const Btn = ({ handleButtonsState, buttonsState, ...props }) => {
  // ButtonState:  [...[0: loading, 1: success, 2: fail]]
  const handleClick = () => {
    if (buttonsState[props.index][0]) return
    else {
      handleButtonsState(props.index, 0)
    }

    const timeout = 4000
    const CancelToken = axios.CancelToken
    let cancel
    setTimeout(() => cancel(), timeout)

    axios({
      method: 'post',
      url: props.path,
      baseURL: process.env.REACT_APP_API,
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c
      }),
    })
      .then(() => {
        handleButtonsState(props.index, 1)
      })
      .catch(e => {
        handleButtonsState(props.index, 2)
      })
  }
  return (
    <button id={props.btnID} className="links" onClick={handleClick}>
      <span className="info-display">
        <img alt={props.descText} src={'./icons/' + props.name + '.svg'} />
        <p>{props.titleText}</p>
        <h3>{props.descText}</h3>
      </span>
      <span className="state-display">
        {buttonsState[props.index][0] && (
          <img alt="loading" src="./icons/loader.svg" />
        )}
        {buttonsState[props.index][1] && (
          <img alt="success" src="./icons/success.svg" />
        )}
        {buttonsState[props.index][2] && (
          <img alt="failed" src="./icons/fail.svg" />
        )}
      </span>
    </button>
  )
}

const Buttons = () => {
  const history = useHistory()
  const location = useLocation()
  useEffect(() => {
    if (!location.state) history.push('/')
  }, [location, history])

  const [buttonsState, setButtonState] = useState([
    // [0: loading, 1: success, 2: fail]
    [false, false, false],
    [false, false, false],
    [false, false, false],
  ])

  const handleButtonsState = (index, state) => {
    setButtonState(
      buttonsState.map((btnElem, i) => {
        if (i !== index) {
          return btnElem.map(() => {
            return false
          })
        } else {
          return btnElem.map((stElem, j) => {
            if (state === j) return true
            else return false
          })
        }
      })
    )
  }
  return (
    <>
      {location.state?.buttons &&
        location.state.buttons.map((element, i) => {
          return (
            <Btn
              name={element.name}
              titleText={element.titleText}
              descText={element.descText}
              btnID={element.btnID}
              path={element.path}
              key={i}
              index={i}
              handleButtonsState={handleButtonsState}
              buttonsState={buttonsState}
              password={location.state.password}
            />
          )
        })}
    </>
  )
}

export default Buttons
