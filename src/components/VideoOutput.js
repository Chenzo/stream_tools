import React, {Component} from "react";
import {hot} from "react-hot-loader";


class VideoOutput extends Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidMount() {
        const videoObj = this.videoRef.current;
        console.log("video component mount");
        console.log(this.props.video);
        window.stream = this.props.video;
        videoObj.srcObject = this.props.video;
        videoObj.play();
        console.log(videoObj);
    }

    render() {
        return <video id="myVid" ref={this.videoRef}></video>;
    }
}

export default VideoOutput;