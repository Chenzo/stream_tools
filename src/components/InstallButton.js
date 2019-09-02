import React, {Component} from "react";
import {hot} from "react-hot-loader";

import "../scss/_InstallButton.scss";
import "../scss/_Buttons.scss";

class InstallButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            waitCount: 0,
        };


        this.handleInstallClick = this.handleInstallClick.bind(this);
    }

    componentDidMount() {
    }

    componentDidUpdate() {
    }


    handleInstallClick() {
        console.log("Trying to install");
        document.querySelector('#installBut').classList.remove("showme");
        // Show the modal add to home screen dialog
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choice) => {
        if (choice.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        // Clear the saved prompt since it can't be used again
        deferredPrompt = null;
        });
    }
    
    
    render() {
      return <div className="installBut btn btn-info" id="installBut" onClick={this.handleInstallClick}>
            <span>INSTALL</span>
        </div>;
    }
  }
  

  export default hot(module)(InstallButton);