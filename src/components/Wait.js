import React, {Component} from "react";
import {hot} from "react-hot-loader";

class Wait extends Component {
    constructor(props) {
        super(props);
        this.vince = this.vince.bind(this);
    }

    vince() {
        console.log("vince vince vince");
    }

    render() {
        return (
            <div>v</div>
        );
    }
}



export default hot(module)(Wait);