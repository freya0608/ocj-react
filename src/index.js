import React from 'react';
import ReactDOM from 'react-dom';
import './ocj/ocjcomponent/style.css'
import App from './ocj/ocjpage/membership/App'
// import App from './ocj/ocjpage/test/ShareDiv'
//import Page404 from './ocj/ocjpage/page404/Page404';
//import { HashRouter as Router, Route,Switch } from "react-router-dom";
// import Routers from "./ocj/ocjpage/tvlivecontrol/Routers";
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <App/>, document.getElementById('root'));
// ReactDOM.render(<Index/>, document.getElementById('root'));
serviceWorker.unregister();







