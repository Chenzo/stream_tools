import React from "react";
import ReactDOM from "react-dom";
import loadable from '@loadable/component';

const App = loadable(() => import('./App'))
//import App from "./App.js";


ReactDOM.render(
    <div>
    <div id="notroot"></div> 
    </div>,
  document.getElementById('root')
);


ReactDOM.render(<App />, document.getElementById("notroot"));

