import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'

const Btn = props => {
  const [loading, setLoading] = useState()
  const [success, setSuccess] = useState()
  const [fail, setFail] = useState()

  const handleClick = () => {
    if (loading) return
    else {
      setLoading(true)
      setFail(false)
      setSuccess(false)
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
      headers: {
        psw: props.password,
      },
    })
      .then(() => {
        setLoading(false)
        setSuccess(true)
      })
      .catch(e => {
        setLoading(false)
        setSuccess(false)
        setFail(true)
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
        {loading && <img alt="loading" src="./icons/loader.svg" />}
        {success && <img alt="success" src="./icons/success.svg" />}
        {fail && <img alt="failed" src="./icons/fail.svg" />}
      </span>
    </button>
  )
}

const Buttons = () => {
  const history = useHistory()
  const location = useLocation()
  if (!location.state) history.push('/')
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
              password={location.state.password}
            />
          )
        })}
    </>
  )
}

export default Buttons
