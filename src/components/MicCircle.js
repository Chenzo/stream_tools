import React, {Component} from "react";
import {hot} from "react-hot-loader";
import Canvas from "./Canvas.js";


class CircleCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.radius = 100;
        this.num_items = 150;
        this.particles = [];
        this.width = 500;
        this.height = 500;
    
        this.makeAngles = this.makeAngles.bind(this);
    }

    componentDidMount() {
        this.makeAngles();
    }

    componentDidUpdate() {
        //const {angle} = this.props.angle;
        const {audioData} = this.props;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;


        ctx.clearRect(0, 0, canvas.width, canvas.height);
        //console.log(audioData);
       for (const [i, s] of audioData.entries()) {
            //console.log("VINCE VINCE");
            var p = this.particles[i];
            var ss = Math.abs(s - 120);
            //console.log(s)
            //var ss = mapSound(s, this.num_items, 5, 100);
            // map to greyscale
            //ctx.strokeStyle = rgb(map(i, 0, num_items, 0, 255));

            if (typeof p != "undefined") {
            var x2 = width/2 + Math.cos(p.angle) * (ss + this.radius);
            var y2 = height/2 + Math.sin(p.angle) * (ss + this.radius);
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
            //ctx.line(p.x, p.y, x2, y2);
    }  
    }

    

    makeAngles() {
        function radians(deg) {return deg*Math.PI/180;};

        function distributeAngles(me, total) {
            return me/total * 360;
        }

        for (var i = 0; i < this.num_items; i++) {
            var angle = radians(distributeAngles(i, this.num_items));
            this.particles[i] = {
                x: this.width/2 + Math.cos(angle) * this.radius,
                y: this.height/2 + Math.sin(angle) * this.radius,
                angle: angle
            }
        }
    }
    
    
    render() {
      return <canvas width="500" height="500" ref={this.canvasRef}></canvas>;
    }
  }
  



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
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);
        this.source.connect(this.analyser);
        this.rafId = requestAnimationFrame(this.tick);
    }

    tick() {
        this.analyser.getByteTimeDomainData(this.dataArray);
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
