import React, { Component } from 'react';
import './App.css';

class SetTimer extends Component {
  render() {
    return (
      <div className="text-center">
        <div id={`${this.props.name}-label`} className="text-center text-white label"><h4>{this.props.name} length</h4></div>
        <div className="center text-center text-white"><h4>{this.props.iniLen/60}:00</h4></div>
        <button className="left" onClick={this.props.decr} id={`${this.props.name}-decrement`} value={this.props.name}><i className="fas fa-minus"></i></button>
        <button className="right" onClick={this.props.incr} id={`${this.props.name}-increment`} value={this.props.name}><i className="fas fa-plus"></i></button>
      </div>
    )
  }
}

class Counter extends Component {
  render() {
    return(
      <div id="" className="text-center counter-round">
        <div id="" className={`counter-circle${(this.props.action===true)? ' glowing' : ''}`}>
          <div id="" className="centered-pos">
            <div className="text-white font-weight-bold"><h2 id="timer-label">{(this.props.session) ? this.props.sessions[0].name : this.props.sessions[1].name }</h2></div>
            <div className="text-white font-weight-bold"><h2 id="time-left">{this.props.renderTime(this.props.duration)}</h2></div>
          </div>
        </div>
        <div className="topmar">
          {/*<button className="round" value="play" onClick={this.props.timerAction} id="start_stop"><i className="fas fa-play"></i></button>*/}
          <button className="round" value={(this.props.action) ? 'pause' : 'play'} onClick={this.props.timerAction} id="start_stop">{
            (this.props.action)? <i className="fas fa-pause"></i> : <i className="fas fa-play"></i>  
            }</button>
          <button className="round" onClick={this.props.timerAction}><i className="fas fa-sync-alt"></i></button>
          {/*<button className="round" value="pause" onClick={this.props.timerAction}><i className="fas fa-pause"></i></button>*/}
        </div>
      </div>
    )
  }
}

class Pomodoro extends Component {
  state = {
    sessions: [
      {
        name: "session",
        iniLen: 1500,
      },
      {
        name: "break",
        iniLen: 300,
      }
    ],
    //name: 'session',
    session: true,  // session or brake switch
    duration: 0, // basis for countdown
    max: 3600, // max
    min: 60, // min
    action: false // animation
  }
  intervalID = 0;
  audio = React.createRef();
// set Session and Break values //
  addOne = (val) => {
    const { iniLen } = val;
    let newLen = (iniLen < this.state.max) ? iniLen + 60 : iniLen;
    val.iniLen = newLen;
  }
  takeOne = (val) => {
    const { iniLen } = val;
    let newLen = (iniLen > this.state.min) ? iniLen - 60 : iniLen;
    val.iniLen = newLen;
  }

  incr = (e) => {
    const [s, b] = this.state.sessions;
    (s.name === e.target.value) ? this.addOne(s) : this.addOne(b); 
    const newArr = [s, b];
    this.setState({ 
      sessions: newArr,
      duration: (s.name === e.target.value && this.state.session) ? newArr[0].iniLen : this.state.duration
    });
  }
  decr = (e) => {
    const [s, b] = this.state.sessions;
    (s.name === e.target.value) ? this.takeOne(s) : this.takeOne(b); 
    const newArr = [s, b];
    this.setState({ 
      sessions: newArr,
      duration: (this.state.session) ? newArr[0].iniLen : newArr[1].iniLen
    });

  }
// Time operations
  clearTime = () => {
    window.clearInterval(this.intervalID);
    this.intervalID = 0;
    this.setState({
      action:false
    });
  }
  renderTime = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
  }
  playTime = () => {

  }
  timerAction = (e) => {
    let time;
    let i;
    (e.target !== undefined) ? i = e.target.value : i = e;
    switch(i) {
      case 'play':
      if(this.intervalID === 0) {
        this.intervalID = setInterval(() => {
          if (this.state.duration > 0) {
          time = this.state.duration - 1;
          this.setState({ duration: time
          });
          } else {
            this.audio.current.play();
            this.clearTime();
            this.makeSwitch();
            this.timerAction('play');
          }
        }, 1000);
        this.setState({
          action: true
        });
      }
      break;
      case 'pause':
        this.clearTime();
      break;
      default:
        this.audio.current.load();
        if(this.intervalID !== 0) {
          this.clearTime();
        }
        const newArr = [...this.state.sessions];
        newArr[0].iniLen = 1500;
        newArr[1].iniLen = 300;
        this.setState({ sessions: newArr, session: true, duration: 1500 });    
    }
  }
// Switch logic
makeSwitch = () => {
  this.setState({session: !this.state.session});
  (this.state.session) ? this.setState({duration: this.state.sessions[0].iniLen}) : this.setState({duration: this.state.sessions[1].iniLen});
}
componentDidMount() {
  this.setState({duration: this.state.sessions[0].iniLen});
}
  render() {
    return (
      <div className="main container">
        <div className="grid">
          {this.state.sessions.map(e => (
          <SetTimer 
            key={`key-${e.name}`} 
            name={e.name} 
            iniLen={e.iniLen}
            renderTime={this.renderTime}
            play={this.state.action}
            incr={this.incr}
            decr={this.decr}
            />))}
        </div>
        <Counter  
          name={this.state.name}
          duration={this.state.duration} 
          renderTime={this.renderTime}
          timerAction={this.timerAction}
          action={this.state.action}
          sessions={this.state.sessions}
          session={this.state.session}
          />
          <audio id="beep" preload="auto" src="https://bit.ly/2Wxu3Rf" ref={this.audio} />
      </div>
    );
  }
}

export default Pomodoro;
