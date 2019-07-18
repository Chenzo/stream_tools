
import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.scss";
import MicCircle from "./components/MicCircle";
import AudioAnalyser from "./components/AudioAnalyser";
import VideoOutput from "./components/VideoOutput";
import mrChenzo from "./images/comodore_chenzo.jpg";


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      Volume: 0,
      audio: null,
      video: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleVideoClick = this.handleVideoClick.bind(this);
  }


  async getVideo() {
    const video = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });
    this.setState({ video });
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

  stopVideo() {
    this.state.video.getTracks().forEach(track => track.stop());
    this.setState({ video: null });
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


  handleVideoClick() {
    if (this.state.video) {
      this.stopVideo();
    } else {
      this.getVideo();
    } 
  }

  render(){
    return(
      <div className="App">
        <div className="controls">
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? 'Mic On' : 'Mic Off'}
          </button>
          <button onClick={this.handleVideoClick}>
            {this.state.video ? 'Vid On' : 'Vid Off'}
          </button>
        </div>

        <div className="avContainer">
          <div className="goldBG streamName"><div className="windlass">Mr<span>.</span> Chenzo</div></div>
          <div className="audioContainer">
          {this.state.audio ? <MicCircle audio={this.state.audio} /> : ''}
          {/* {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''} */}
          </div>
          <div className="videoContainer circleContainer">
            {this.state.video ? <VideoOutput video={this.state.video} /> : ''}
          </div>
          <div className="imageContainer circleContainer">
            <img src={mrChenzo} alt="Mr Chenzo" className="mrChenzo"/>
          </div>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);