import React, {Component} from "react";
import {hot} from "react-hot-loader";

import CircleCanvas from "./CircleCanvas.js";


class MicCircle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            audioData: new Uint8Array(0)
        };
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.audioContext = new (window.AudioContext ||
           window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.analyser.minDecibels = -90;
        this.analyser.maxDecibels = -10;
        this.analyser.smoothingTimeConstant = 0.85;
        this.analyser.fftSize = 256;
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.bufferLength = this.analyser.frequencyBinCount;
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);
        this.source.connect(this.analyser);
        this.rafId = requestAnimationFrame(this.tick);
        console.log(this.bufferLength);
    }

    tick() {
        this.analyser.getByteFrequencyData(this.dataArray);
        this.setState({ audioData: this.dataArray });
        this.rafId = requestAnimationFrame(this.tick);
    }
    
    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }
    
    render() {
        return <CircleCanvas audioData={this.state.audioData} />;
    }
}



export default hot(module)(MicCircle);
