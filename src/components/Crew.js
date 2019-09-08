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

        this.thecontent = <div className="theCrew windlass">
            <div className="crewMate">UntrueHero</div>
            <div className="crewMate">TNProfessor</div>
        </div>;
    }

    componentDidMount() {
        
    }

    componentDidUpdate() {
        
    }

    componentWillUnmount() {
        
    }

    
    render() {
      return <div className="crew_space">
            <h2 className="windlass">Crew:</h2>
            <RaggedPaper thecontent={this.thecontent}/>
        </div>;
    }
  }
  

  export default hot(module)(Crew);