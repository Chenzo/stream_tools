import React, {Component} from "react";
import {hot} from "react-hot-loader";


class Waves extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            bgColor: "ff00ff"
        };

    }

    componentDidMount() {
        //this.buildList();
    }

    componentDidUpdate() {
        
    }

    componentWillUnmount() {
        
    }


    render() {
        var waveMovie =  <video width="1200" autoPlay={true} muted={true} loop={true}>
        <source 
          //src="images/smokeywater.mp4"
          //src="video/waterup.mp4"
          //type="video/mp4" />
          src="video/waterup.webm"
          type="video/webm" />
      </video> 

      return waveMovie;
    }
  }
  

  export default hot(module)(Waves);