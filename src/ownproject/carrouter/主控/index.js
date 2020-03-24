import React from 'react';
import ReactDOM from 'react-dom';
import './ocj/ocjcomponent/style.css'
import Index from './ownproject/carrouter/index'
import * as serviceWorker from './serviceWorker';

// import 'core-js/es7/'; import 'core-js/es6/';

ReactDOM.render(
	<Index/>, document.getElementById('root'));
serviceWorker.unregister();
