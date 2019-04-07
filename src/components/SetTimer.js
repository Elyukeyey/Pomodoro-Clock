import React from 'react'

function SetTimer(props) {
  return (
      <div className="text-center">
        <div className="text-center text-white label"><h4 id={`${props.name}-label`}>{props.name} length</h4></div>
        <div className="center text-center text-white"><h4 id={`${props.name}-length`}>{props.iniLen/60}</h4></div>
        <button className="left" onClick={props.decr} id={`${props.name}-decrement`} value={props.name}><i className="fas fa-minus"></i></button>
        <button className="right" onClick={props.incr} id={`${props.name}-increment`} value={props.name}><i className="fas fa-plus"></i></button>
      </div>
  )
}

export default SetTimer
