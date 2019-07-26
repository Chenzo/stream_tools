import React, {Component} from "react";
import {hot} from "react-hot-loader";

import "../scss/_HeadBar.scss";

class HeadBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            waitCount: 0,
        };
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }


    
    
    render() {
      return <div className="headbar torn_2">THIS IS JUST A TEST</div>;
    }
  }
  

  export default hot(module)(HeadBar);