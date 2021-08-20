import React from 'react'
// import axios from 'axios'

const HIButton = props => {
  return (
    <button>
      <span id={props.btnID} className="info-display">
        <img alt={props.descText} src={'./icons/' + props.name + '.svg'} />
        <p>{props.titleText}</p>
        <h3>{}</h3>
      </span>
      <span className="state-display"></span>
    </button>
  )
}

export default HIButton
