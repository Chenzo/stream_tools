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
      return <div>
        <div className="headbar windlass top_bar "><span className="dropshadow_effect_1x tshadow" contentEditable="true">The Continuing Adventures of the Holy Bartender</span></div>
      </div>;
    }
  }
  

  export default hot(module)(HeadBar);