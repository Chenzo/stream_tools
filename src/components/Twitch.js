import React, {Component} from "react";
import {hot} from "react-hot-loader";
import TwitchJS from 'twitch-js';
import configData from './config.js';

class Twitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { angle: 0 };
  }

  componentDidMount() {
    
  }

  componentWillUnmount() {

  }

  render() {
    return <Canvas angle={this.state.angle} />;
  }
}

export default hot(module)(Twitch);
