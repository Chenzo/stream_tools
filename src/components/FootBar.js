import React, {Component} from "react";
import {hot} from "react-hot-loader";

import "../scss/_Footbar.scss";


class Footbar extends React.Component {
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
      return <footer>
          <div className="latest windlass">
              Lastest Follower: <span>Some Guy</span>
          </div>
      </footer>;
    }
  }
  

  export default hot(module)(Footbar);