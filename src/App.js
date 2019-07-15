
import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.scss";
import MicCircle from "./components/MicCircle";
import AudioAnalyser from "./components/AudioAnalyser"

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      Volume: 0,
      audio: null
    };

    this.handleClick = this.handleClick.bind(this);
  }


  async getMicrophone() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
    this.setState({ audio });
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));

    if (this.state.audio) {
      this.stopMicrophone();
    } else {
      this.getMicrophone();
    } 
  }

  componentDidMount() {
    
  }

  render(){
    return(
      <div className="App">
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'Mic On' : 'Mic Off'}
        </button>
        {this.state.audio ? <MicCircle audio={this.state.audio} /> : ''}
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
      </div>
    );
  }
}

export default hot(module)(App);