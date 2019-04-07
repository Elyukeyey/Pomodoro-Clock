import React from 'react'

function Counter(props) {
  return (
      <div id="" className="text-center counter-round">
        <div id="" className={`counter-circle${(props.action===true)? ' glowing' : ''}`}>
          <div id="" className="centered-pos">
            <div className="text-white font-weight-bold"><h2 id="timer-label">{(props.session) ? props.sessions[0].name : props.sessions[1].name }</h2></div>
            <div className="text-white font-weight-bold"><h2 id="time-left">{props.renderTime(props.duration)}</h2></div>
          </div>
        </div>
        <div className="topmar">
          <button className="round" value={(props.action) ? 'pause' : 'play'} onClick={props.timerAction} id="start_stop">{
            (props.action)? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>  
            }</button>
          <button className="round" onClick={props.timerAction} id="reset"><i className="fas fa-sync-alt"></i></button>
        </div>
      </div>
  )
}
export default Counter