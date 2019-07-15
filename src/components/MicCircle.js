import React, {Component} from "react";
import {hot} from "react-hot-loader";
import Canvas from "./Canvas.js";



class MicCircle extends React.Component {
    constructor(props) {
        super(props);
        this.state = { angle: 0 };
        this.updateAnimationState = this.updateAnimationState.bind(this);
    }

    componentDidMount() {
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rAF);
    }

    updateAnimationState() {
        this.setState(prevState => ({ angle: prevState.angle + 1 }));
        this.rAF = requestAnimationFrame(this.updateAnimationState);
    }

    render() {
        const vidID = this.props.mic.volume;
        return (
        <div>
            <div>Volume: {vidID}</div>
            <div>
            <Canvas angle={this.state.angle} />
            </div>
        </div>
        );
    }
}



export default hot(module)(MicCircle);
