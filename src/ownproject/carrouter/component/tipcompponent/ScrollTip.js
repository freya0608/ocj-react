/**_gsTransform
 * Created by admin on 2018/11/26.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
// import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import '../../style.css'

export default class ScrollTip extends React.PureComponent {
	static defaultProps = {
		...Component.defaultProps,
		weather:"light",
	}
	static propTypes = {
		weather:PropTypes.string.isRequired,

	}

	constructor(props) {
		super(props)
		this.state = {}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		//this.handleClick = this.handleClick.bind(this);
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
	}

	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	//static getDerivedStateFromProps(nextProps, prevState){}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	// getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	// componentDidUpdate(prevProps, prevState){}

	render() {
		let img;
		if(this.props.weather==="night"){
			img=(<img alt="" src="./res/scrollup.png" />)
		}else{
			img=(<img alt="" src="./res/scrolluplight.png" />)
		}
		return (
			<div ref={this.dom} className="scrollTip">
				{img}
			</div>
		);
	}
}

