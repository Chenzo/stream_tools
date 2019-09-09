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

        var lastFollow;
        if (this.props.followData.data) {
            var who = this.props.followData.data[0].from_name;
            lastFollow = <div>Lastest Follower: <span>{who}</span></div>
        }

        return <footer>
            <div className="latest windlass">
            {lastFollow}
            </div>
        </footer>;
    }
  }
  

  export default hot(module)(Footbar);