/**
 * Created by admin on 2018/10/30.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import Maps from './Map'
import Car from './Car'
class Controls extends React.Component {
	static defaultProps = {
		...Component.defaultProps,
		targetx:0,
		targety:0,
	}
	static propTypes = {
		targetx:PropTypes.number.isRequired,
		targety:PropTypes.number.isRequired,
	}

	static widthsmp=Math.floor(document.documentElement.clientWidth*5696/750)
	static heightsmp=Math.floor(8055*Controls.widthsmp/5696)

	constructor(props) {
		super(props)
		this.state = {
			x:0,
			y:0,
			mapx:0,
			mapy:0,
			mapwidth:Controls.widthsmp,
			mapheight:Controls.heightsmp,
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
	}

	 static mapxy(x,y){
		let screenwidth=document.documentElement.clientWidth;
		let screenheight=document.documentElement.clientHeight;
		let mapwidth=Controls.mapwidth;
		let mapheight=Controls.mapheight;
		let ob={x:0,y:0}
		if(x<screenwidth/2){
			ob.x=0;
		}else if(x>(mapwidth-screenwidth/2)){
			ob.x=(mapwidth-screenwidth)*-1;
		}else{
			ob.x=x*-1+screenwidth/2
		}
		if(y<screenheight/2){
			ob.y=0;
		}else if(y>(mapheight-screenheight/2)){
			ob.y=(mapheight-screenheight)*-1;
		}else{
			ob.y=y*-1+screenheight/2
		}
		return ob
	}

	// shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	static getDerivedStateFromProps(nextProps, prevState){
		let xcar=nextProps.targetx+prevState.mapx*-1;
		let ycar=nextProps.targety+prevState.mapy*-1;
		// let desc=Math.sqrt(Math.pow((xcar-this.state.x),2),Math.pow(ycar-this.state.y),2)
		let ob=Controls.mapxy(xcar,ycar)
		return {
			x:xcar,
			y:ycar,
			mapx:ob.x,
			mapy:ob.y,
			// time:Math.max(desc/100,.5),
		}
	}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	componentDidUpdate(nextProps, nextState){
		// this.moveto(this.props.targetx,this.props.targety)
	}

	render() {
		return (
			<div
				id="Controls"
				ref={this.dom}>
				<Maps
					mapwidth={this.state.mapwidth}
					mapheight={this.state.mapheight}
					x={this.state.mapx}
					y={this.state.mapy}>
					<Car x={this.state.x} y={this.state.y}></Car>
				</Maps>
			</div>
		);
	}
}

export default Controls;
