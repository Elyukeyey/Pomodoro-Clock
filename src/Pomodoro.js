import React, { Component } from 'react';
import SetTimer from './components/SetTimer';
import Counter from './components/Counter';
import './Core.css';

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
    session: true,  // session or brake switch
    duration: 0, // Countdown timer value
    max: 3600, // max 60 min
    min: 60, // min 1 min
    action: false // animation & increase/decrease time
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
      duration: (!this.state.action) ? newArr[0].iniLen : this.state.duration
    });
  }
  decr = (e) => {
    const [s, b] = this.state.sessions;
    (s.name === e.target.value) ? this.takeOne(s) : this.takeOne(b); 
    const newArr = [s, b];
    this.setState({ 
      sessions: newArr,
      duration: (!this.state.action) ? newArr[0].iniLen : this.state.duration
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
  renderTime = (time) => { // make fancy time 5:11 -> 05:11
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
  }
  timerAction = (e) => {
    let time;
    let i;
    (e.target !== undefined) ? i = e.target.value : i = e;
    switch(i) {
      case 'play':
        this.setState({
          action: true
        });
        if(this.intervalID === 0) {
          this.intervalID = setInterval(() => {
            if (this.state.duration > 0) {
              time = this.state.duration - 1;
              this.setState({ duration: time });
            } else {
              this.audio.current.play();
              this.clearTime();
              this.makeSwitch();
              this.timerAction('play');
            }
          }, 1000);
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
