import React, {Component} from "react";
import {hot} from "react-hot-loader";

import RaggedPaper from "./RaggedPaper";
import "../scss/_Crew.scss";


class Crew extends React.Component {
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
        var spaceHTML =  <div></div>;

        if (this.props.members.length > 0) {
            spaceHTML = <div className="crew_space">
            {/* <RaggedPaper thecontent={this.state.thecontent}/> */}
            <RaggedPaper thecontent={
                    <div className="theCrew windlass">
                    <h2>Crew:</h2>
                    {this.props.members.map((member, index) => (
                        <div className="crewMate" key={index}>{member}</div>
                    ))}
                    </div>
                    }/>
            </div>

        }

      return spaceHTML;
    }
  }
  

  export default hot(module)(Crew);