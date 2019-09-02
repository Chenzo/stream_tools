import React, {Component} from "react";
import {hot} from "react-hot-loader";

import "../scss/_FullscreenButton.scss";
import "../scss/_Buttons.scss";

class FullscreenButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            waitCount: 0,
        };


        this.handleFSClick = this.handleFSClick.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }


    handleFSClick() {
        console.log("go fullscreen!!");
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen(); 
          }
        }
    }
    
    
    render() {
      return <div className="fullscreenButt btn btn-info" id="fullscreenButt" onClick={this.handleFSClick}>
            <span>FS</span>
        </div>;
    }
  }
  

  export default hot(module)(FullscreenButton);