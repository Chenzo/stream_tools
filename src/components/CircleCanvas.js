import React, {Component} from "react";
import {hot} from "react-hot-loader";


class CircleCanvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.radius = 100;
        this.num_items = 40;
        this.particles = [];
        this.width = 500;
        this.height = 500;
        this.waitCount = 0;
    
        this.makeAngles = this.makeAngles.bind(this);

        this.state = { 
            waitCount: 0,
            counting: true
        };

        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        this.makeAngles();
    }

    componentDidUpdate() {
        cancelAnimationFrame(this.rafId);
        this.rafId = requestAnimationFrame(this.tick);
        
        //this.tick();
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
    }


    tick() {
        
        const {audioData} = this.props;
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;

        //if (this.waitCount > 4) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var iCount = 0;
            for (const [i, s] of audioData.entries()) {
                //console.log("VINCE VINCE");
                iCount++;
                var p = this.particles[i];
                var vol = (s < 120) ? s : 121;
                var ss = Math.abs(vol / 2 );

                //console.log("vol: " + ss);

                //var ss = mapSound(s, this.num_items, 5, 100);
                // map to greyscale
                //ctx.strokeStyle = rgb(map(i, 0, num_items, 0, 255));

                if (typeof p != "undefined") {
                    var x2 = width/2 + Math.cos(p.angle) * (ss + this.radius);
                    var y2 = height/2 + Math.sin(p.angle) * (ss + this.radius);
                    ctx.beginPath();
                    //ctx.strokeStyle = "rgb(" + ss + ", " + ss + ", " + ss + ")";

                    //var gradient = ctx.createLinearGradient(0, 0, 400, 0);
                    var gradient = ctx.createRadialGradient(250,250,20, 250,250,175);


                    gradient.addColorStop("0", "#0e2b28");
                    gradient.addColorStop("0.5", "#0e2b28");
                    gradient.addColorStop("1.0", "#267e81"); 

                    ctx.strokeStyle = gradient;

                    //ctx.strokeStyle = "#13252c";
                    ctx.lineWidth = 6;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(x2, y2);
                    ctx.stroke();
                }
            } 
            //this.waitCount = 0;
        //}

        //this.waitCount++;

        this.rafId = requestAnimationFrame(this.tick);
    }

    

    makeAngles() {
        function radians(deg) {return deg*Math.PI/180;};

        function distributeAngles(me, total) {
            return me/total * 180 - 90;
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
  

  export default hot(module)(CircleCanvas);