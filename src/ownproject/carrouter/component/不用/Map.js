/**
 * Created by admin on 2018/11/1.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import maps from '../../res/map.png'
// import {Motion, spring} from 'react-motion';

class Map extends React.Component {
	static defaultProps = {
		...Component.defaultProps,
		x:0,
		y:0,
		mapwidth:1,
		mapheight:1,
		time:.5,
	}
	static propTypes = {
		x:PropTypes.number.isRequired,
		y:PropTypes.number.isRequired,
		mapwidth:PropTypes.number.isRequired,
		mapheight:PropTypes.number.isRequired,
		time:PropTypes.number,
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
		TweenMax.set(this.dom.current,{x:this.props.x,y:this.props.y,z:0.01})
	}

	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	//static getDerivedStateFromProps(nextProps, prevState){}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	componentDidUpdate(nextProps, nextState){
		let desc=Math.sqrt(Math.pow((this.props.x-this.dom.current._gsTransform.x),2),Math.pow(this.props.y-this.dom.current._gsTransform.y),2)
		TweenMax.to(this.dom.current,Math.max(desc/100,.5),{x:this.props.x,y:this.props.y})
	}
	render() {
		return (
			<div
				style={{width:this.props.mapwidth,height:this.props.mapheight}}
				className="maps"
				ref={this.dom}>
				<img src={maps} alt="" />
				{this.props.children}
			</div>
		);
	}
}

/*
 * <Motion
 style={{
 x:spring(this.props.x),
 y:spring(this.props.y),
 }}>
 {styles=>(<div
 style={{width:widths,transform:`translate3d(${styles.x}px,${styles.y}px,0)`}}
 className="maps"
 ref={this.dom}>
 <img src={maps} alt="" />
 {this.props.children}
 </div>)}
 </Motion>
 * */
export default Map;
