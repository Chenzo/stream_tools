import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";


ReactDOM.render(
    <div>
    <div id="notroot"></div> 
    </div>,
  document.getElementById('root')
);


ReactDOM.render(<App />, document.getElementById("notroot"));

