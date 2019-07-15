
import React, { Component} from "react";
import {hot} from "react-hot-loader";
import "./App.scss";
import MicWave from "./components/MicWave.js";

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      Mic: {},
      isToggleOn: false,
      Volume: 0
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));

    this.setState ({
      Mic: new this.Microphone(this)
    });
  }


  Microphone (rObj) {
    
    console.log("RAN HERE");
    var FFT_SIZE = 1024;
    this.spectrum = [];
    this.volume = this.vol = 0;
    this.peak_volume = 0;
    this.rObj = rObj;
    var self = this;
    var audioContext = new AudioContext();
    var SAMPLE_RATE = audioContext.sampleRate;
    
    // this is just a browser check to see
    // if it supports AudioContext and getUserMedia
    window.AudioContext = window.AudioContext ||  window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;

    init();

    function init () {

      console.log("INITIALIZED");
      try {
        startMic(new AudioContext());
        console.log("MIC!!");
      }
      catch (e) {
        console.error(e);
        alert('Web Audio API is not supported in this browser');
      }
    }

    function startMic (context) {
      navigator.getUserMedia({ audio: true }, processSound, error);
      function processSound (stream) {
        // analyser extracts frequency, waveform, etc.
        var analyser = context.createAnalyser();
        analyser.smoothingTimeConstant = 0.2;
        analyser.fftSize = FFT_SIZE;
        var node = context.createScriptProcessor(FFT_SIZE*2, 1, 1);
        node.onaudioprocess = function () {
          // bitcount returns array which is half the FFT_SIZE
          self.spectrum = new Uint8Array(analyser.frequencyBinCount);
          // getByteFrequencyData returns amplitude for each bin
          analyser.getByteFrequencyData(self.spectrum);
          // getByteTimeDomainData gets volumes over the sample time
          // analyser.getByteTimeDomainData(self.spectrum);
    
          self.vol = self.getRMS(self.spectrum);
          // get peak - a hack when our volumes are low
          if (self.vol > self.peak_volume) self.peak_volume = self.vol;
          self.volume = self.vol;
          self.rObj.setState ({
            Volume: self.volume
          });
        };
        var input = context.createMediaStreamSource(stream);
        input.connect(analyser);
        analyser.connect(node);
        node.connect(context.destination);
      }
      function error () {
        console.log(arguments);
      }
    }

    // A more accurate way to get overall volume
    this.getRMS = function (spectrum) {
    var rms = 0;
      for (var i = 0; i < spectrum.length; i++) {
        rms += spectrum[i] * spectrum[i];
      }
      rms /= spectrum.length;
      rms = Math.sqrt(rms);
      return rms;
    }


    return this;
  };


  componentDidMount() {
    var me = this;
    console.log("----- > MOUNTED. GET MIC");
    /* me.setState ({
      Mic: new me.Microphone()
    }); */
    
  }


  

  render(){
    return(
      <div className="App">
        <button onClick={this.handleClick}>
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
        <MicWave mic={this.state.Mic}/>
      </div>
    );
  }
}

export default hot(module)(App);