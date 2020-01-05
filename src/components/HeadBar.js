import React, {Component} from "react";
import {hot} from "react-hot-loader";

import Waves from "./Waves";

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
      return <div className="headbar">
        <div className="windlass top_bar top-clip">
          
        </div>
        <div className="innerBar top-clip windlass">
            <span className="dropshadow_effect_11x tshadow" contentEditable="true">The Continuing Tales from the Deck Of The Holy Bartender</span>
            {this.props.showWaves ? <Waves /> : ''}
          </div>
          <div className="seperator">
            <img src="images/pileofskulls.png" />
            <hr className="mid" />
        </div>
      </div>;
    }
  }
  

  export default hot(module)(HeadBar);