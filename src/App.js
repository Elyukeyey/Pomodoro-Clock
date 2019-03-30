import React, { Component } from 'react';
import './App.css';

// time = 1500
// var minutes = Math.floor(time / 60);
// var seconds = time - minutes * 60;
/*
function fancyTimeFormat(time)
{   
    // Hours, minutes and seconds
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";

    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
*/
const sessions = [
  {
    name: "session",
    iniLen: 1500,
    len: 0,
  },
  {
    name: "break",
    iniLen: 300,
    len: 0
  }
]
class Timer extends Component {
  render() {
    return (
      <div className="text-center">
        <div id={`${this.props.name}-label`} className="text-center text-white label"><h4>{this.props.name} length</h4></div>
        <div className="center text-center text-white"><h4>{this.props.iniLen/60}:00</h4></div>
        {
          // napisat funkcijo handleMinus, handlePlus za odštevanje in seštevanje minut
          // plafon je props.sessionLen pa props.breakLen
        }
        <button className="left" onClick={this.handleMinus} id={`${this.props.name}-decrement`}><i className="fas fa-minus"></i></button>
        <button className="right" onClick={this.handlePlus} id={`${this.props.name}-increment`}><i className="fas fa-plus"></i></button>
      </div>
    )
  }
}

class Counter extends Component {
  render() {
    return(
      <div id="" className="text-center counter-round">
        <svg height="350" width="350">
          <circle cx="175" cy="175" r="173" stroke="gray" stroke-width="3" fill="none" z-position="3" />
        </svg>
        <div id="timer-label" className="text-white font-weight-bold"><h2>Session</h2></div>
        <div id="time-left" className="text-white font-weight-bold"><h2>25:00</h2></div>
      </div>
    )
  }
}

class Pomodoro extends Component {
  state = {
    sessions: sessions,
    maxSession: 60,
    maxBreak: 60,
  }
  render() {
    return (
      <div className="main container">
        <div className="grid">
          {this.state.sessions.map(e => (
          <Timer key={`key-${e.name}`} name={e.name} iniLen={e.iniLen}/>
          
          ))}
        </div>
        <Counter  />
      </div>
    );
  }
}

export default Pomodoro;
