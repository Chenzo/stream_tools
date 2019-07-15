import React, {Component} from "react";
import {hot} from "react-hot-loader";

class MicWave extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const vidID = this.props.mic.volume;
    return (
    <div>
        Volume: {vidID}
    </div>
    );
  }
}


export default hot(module)(MicWave);
