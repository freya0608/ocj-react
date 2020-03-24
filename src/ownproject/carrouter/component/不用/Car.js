/**
 * Created by admin on 2018/10/30.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
// import {Motion, spring} from 'react-motion';
import "./Car.css"
import arrow from '../../res/arrow.png'

class Car extends React.Component {
	static defaultProps = {
		...Component.defaultProps,
		x:0,
		y:0,
		time:.5,
	}
	static propTypes = {
		x:PropTypes.number.isRequired,
		y:PropTypes.number.isRequired,
		time:PropTypes.number,
	}

	constructor(props) {
		super(props)
		this.state = {
			x:0,
			y:0,
			angle:0,
			oldangle:0,
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		// this.angle_diff = this.angle_diff.bind(this);
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
		TweenMax.set(this.dom.current,{x:this.state.x,y:this.state.y,z:0.01,rotation:this.state.angle})
	}

	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	static getDerivedStateFromProps(nextProps, prevState){
		let desc=Math.sqrt(Math.pow(nextProps.x-prevState.x, 2) + Math.pow(nextProps.y-prevState.y, 2))
		let angle=Math.atan2(nextProps.y-prevState.y,nextProps.x-prevState.x)*180/Math.PI;
		let angdif=prevState.angle+angle_diff(angle,prevState.angle)

		function angle_diff(a,b)
		{
			let d1, d2;
			let bbb=b%360;
			d1 = a-bbb;
			d2 = 360 - Math.abs(d1);
			if(d1 > 0){
				d2 *= -1.0;
			}
			if(Math.abs(d1) < Math.abs(d2)){
				return(d1);
			}else{
				return(d2);
			}
		}

		if(desc>10){
			return {
				...nextProps,
				angle:angdif,
			}
		}else{
			return null
		}
	}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	componentDidUpdate(nextProps, nextState){
		let desc=Math.sqrt(Math.pow((this.state.x-this.dom.current._gsTransform.x),2),Math.pow(this.state.y-this.dom.current._gsTransform.y),2)
		TweenMax.to(this.dom.current,Math.max(desc/100,.5),{x:this.state.x,y:this.state.y,rotation:this.state.angle})
	}
	//
	render() {
		return (
			<div className="car" ref={this.dom}><img alt="" src={arrow} /></div>
		);
	}
}
/*
* <Motion
 style={{
 x:spring(this.props.x),
 y:spring(this.props.y),
 angles:spring(this.state.angle),
 }}>
 {styles=>(<div className="car"
 style={{transform:`translate3d(${styles.x}px,${styles.y}px,0) rotate(${styles.angles}deg)`}}
 ref={this.dom}><img alt="" src={arrow} /></div>)}
 </Motion>
* */
export default Car;
