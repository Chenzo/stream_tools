
import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.scss";
import MicCircle from "./components/MicCircle";
//import AudioAnalyser from "./components/AudioAnalyser";
import VideoOutput from "./components/VideoOutput";
import mrChenzo from "./images/comodore_chenzo.jpg";
import HeadBar from "./components/HeadBar";
import InstallButton from "./components/InstallButton";


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      Volume: 0,
      audio: null,
      video: null,
      captureStream: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleVideoClick = this.handleVideoClick.bind(this);
    this.handleScreenClick = this.handleScreenClick.bind(this);
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

  async startCapture(displayMediaOptions) {
    let captureStream = null;
    console.log("here we are");
    try {
      captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    } catch(err) {
      console.error("Error: " + err);
    }
    //return captureStream;
    this.setState({ captureStream });
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

  handleScreenClick() {
    if (this.state.captureStream) {
      console.log("NO SCREEN");
    } else {
      console.log("GET SCREEN");
      this.startCapture();
      
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
          <button onClick={this.handleScreenClick}>
            {this.state.captureStream ? 'Screen On' : 'Screen Off'}
          </button>
          <InstallButton/>
        </div>

        <div className="avContainer">
          <div className="goldBG streamName"><div className="windlass">Mr<span>.</span> Chenzo</div></div>
          <div className="audioContainer">
          {this.state.audio ? <MicCircle audio={this.state.audio} /> : ''}
          {/* {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''} */}
          </div>
          <div className="audioContainer flipped">
          {this.state.audio ? <MicCircle audio={this.state.audio} /> : ''}
          {/* {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''} */}
          </div>
          <div className="videoContainer circleContainer">
            {this.state.video ? <VideoOutput video={this.state.video} /> : ''}
          </div>
          <div className="imageContainer circleContainer">
          <video width="250" autoPlay={true} muted={true} loop={true}>
            <source src="images/chenzo_headshot.webm"
                    type="video/webm" />
            </video>
            <img src={mrChenzo} alt="Mr Chenzo" className="mrChenzo"/>
          </div>
        </div>


        <header>
          <HeadBar />
        </header>


        {/*
        video here:
        <div className="">
            {this.state.captureStream ? <VideoOutput video={this.state.captureStream} /> : ''}
        </div>
        */}

      </div>
    );
  }
}

export default hot(module)(App);