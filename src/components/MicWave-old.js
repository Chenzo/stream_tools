import React, {Component} from "react";
import {hot} from "react-hot-loader";
import "./Animation.js";








class MicWave extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  makeVals() {
    for (var i = 0; i < 200; i++) {
      var s = this.props.mic.mapSound(i, 200, 5, 100);
    }
  }

  drawThis() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.beginPath();       // Start a new path
    ctx.moveTo(30, 50);    // Move the pen to (30, 50)
    ctx.lineTo(150, 100);  // Draw a line to (150, 100)
    ctx.stroke();          // Render the path
  }

  componentDidMount() {
    /* const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();       // Start a new path
    ctx.moveTo(30, 50);    // Move the pen to (30, 50)
    ctx.lineTo(150, 100);  // Draw a line to (150, 100)
    ctx.stroke();   */
  }

  componentDidUpdate() {
    // Draws a square in the middle of the canvas rotated
    // around the centre by this.props.angle
    const { angle } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.save();
    ctx.beginPath();
    ctx.clearRect(0, 0, width, height);
    ctx.translate(width / 2, height / 2);
    ctx.rotate((angle * Math.PI) / 180);
    ctx.fillStyle = '#4397AC';
    ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
    ctx.restore();
  }

  render() {
    const vidID = this.props.mic.volume;
    return (
    <div>
        <div>Volume: {vidID}</div>
        <div>spec</div>
        <div>
          <canvas width="300" height="300" ref={this.canvasRef} />
        </div>
    </div>
    );
  }
}


export default hot(module)(MicWave);
