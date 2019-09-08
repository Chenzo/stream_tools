
import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.scss";
import MicCircle from "./components/MicCircle";
//import AudioAnalyser from "./components/AudioAnalyser";
import VideoOutput from "./components/VideoOutput";
import mrChenzo from "./images/comodore_chenzo.jpg";
import HeadBar from "./components/HeadBar";
import InstallButton from "./components/InstallButton";
import FullscreenButton from "./components/FullscreenButton";
import Crew from "./components/Crew";
import TwitchJS from 'twitch-js';
import configData from './config.js'; 
import FootBar from "./components/FootBar";


class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      Volume: 0,
      audio: null,
      video: null,
      hideCont: false,
      captureStream: null,
      crew: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleVideoClick = this.handleVideoClick.bind(this);
    this.handleScreenClick = this.handleScreenClick.bind(this);
    this.handleHideControls = this.handleHideControls.bind(this);
    this.testButtonAction = this.testButtonAction.bind(this);
    this.initTwitch();
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


  handleHideControls() {
    console.log("wooo");
    this.setState(state => ({
      hideCont: !state.hideCont
    }));
    console.log(this.state.hideCont);
  }



  addCrew(crewmemeber) {
    const crewArray = this.state.crew;
    if (!crewArray.includes(crewmemeber)) {
      crewArray.push(crewmemeber);
      this.setState({ crew: crewArray  });
    }
  }

  testButtonAction() {
    console.log("boops!");
    this.addCrew("Vince");
    //this.setState({ crew: ["UntrueHero", "THProfessor"]  });
  }
  




  initTwitch() {
    console.log('Activating Twitch');
    const options = {
      channels: ["#chenzorama"],
      connection: {
        secure: true
      },
      identity: {
        username: "chenzorama",
        password: configData.OAUTH
      }
    };

    const client = new TwitchJS.client(options);

    client.on('chat', (channel, userstate, message, self) => {
      console
        .log(`Message "${message}" received from ${userstate['display-name']}`);

        //console.log(userstate);



      // Do not repond if the message is from the connected identity.
      if (self) return;

      
      if (options.identity && message.substring(0, 8) === '!addcrew') {
        if (userstate['display-name'] == "Chenzorama") {
          const crewname = message.substr(9);//.split(" ")[0];
          this.addCrew(crewname);
          client.say(channel, crewname + ' add as crewmember!');
        } 
      }

      if (options.identity && message === '!command') {
        // If an identity was provided, respond in channel with message.
        client.say(channel, 'Hello world!');
      }

      
    });

    client.on('join', function(channel, username, self) {
      //User Detected
      console.log(username + " has joined the party"+ " | isSelf: " + self);
    });


    client.on('part', function(channel, username, self) {
      //User Left
      console.log(username + " has left the building" + " | isSelf: " + self);
    });

    // Finally, connect to the channel
    client.connect();

    console.log('---Twitch Activated');
  }








  render(){
    const micOnClass = this.state.isToggleOn ? 'btn-success active' : 'btn-default ';
    const vidOnClass = this.state.video ? 'btn-success active' : 'btn-default ';
    const controlHideClass = this.state.hideCont ? 'small' : '';
    return(
      <div className="App">
        <div className={`controls test ${controlHideClass}`}>
          <div className="minibutton" onClick={this.handleHideControls}></div>
          <button onClick={this.handleClick} className={`btn ${micOnClass}`}>
            {this.state.isToggleOn ? 'Mic On' : 'Mic Off'}
          </button>
          <button onClick={this.handleVideoClick} className={`btn ${vidOnClass}`}>
            {this.state.video ? 'Vid On' : 'Vid Off'}
          </button>
          {/* 
          <button onClick={this.handleScreenClick} className="btn btn-default">
            {this.state.captureStream ? 'Screen On' : 'Screen Off'}
          </button>
          */}

          <button onClick={this.testButtonAction} className="btn btn-default">
            TEST 
          </button>
          
          <FullscreenButton/>
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
            <source src="video/chenzo_headshot.mp4"
                    type="video/mp4" />
            </video>
            {/* <img src={mrChenzo} alt="Mr Chenzo" className="mrChenzo"/> */}
          </div>
        </div>

        <Crew members={this.state.crew} ref={window.crew}/>

        <header>
          <HeadBar />
        </header>


        <FootBar/>

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