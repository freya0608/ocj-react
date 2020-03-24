/**_gsTransform
 * Created by admin on 2018/12/5.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import {TweenLite,TimelineMax,Linear} from "gsap";
//import PropTypes from 'prop-types';
import {Image} from 'react-konva'
import {transformsizeToIphoneFor750} from '../../tool/GetMapPoint'
import {resSingleton} from '../../tool/ResLoader'
export default class NxCar extends React.Component {
	static defaultProps = {
		...Component.defaultProps
	}
	static propTypes = {}

	constructor(props) {
		super(props)
		this.state = {
			image:null,
			width:1,
			height:1,
			opacity:0,
			x:3872,
			y:7533,
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		//this.handleClick = this.handleClick.bind(this);
		resSingleton.get("./res/effect/nxcar.png").then((img)=>{
			let widthsmp=transformsizeToIphoneFor750(img.width)/3
			let heightsmp=transformsizeToIphoneFor750(img.height)/3
			this.setState({
				image:img.img,
				width:widthsmp,
				height:heightsmp,
			})
		})
	}
	getduration(targetx,nowx,targety,nowy){
		return Number(Math.sqrt(Math.pow((targetx-nowx),2),Math.pow(targety-nowy),2)*.5/100).toFixed(3)
	}
	//组件加载完毕
	componentDidMount() {
		console.log("nxcar")
		//this.dom.root=ReactDOM.findDOMNode(this);
		//,roundProps:['opacity','x','y']
		let car={opacity:this.state.opacity,x:this.state.x,y:this.state.y};
		setTimeout(()=>{
			let tl = new TimelineMax({repeat:-1});
			tl.add(
				TweenLite.to(car,this.getduration(3872,3419,7533,7263),{opacity:1,x:3419,y:7263,ease:Linear.easeNone,onUpdate:()=>{
					this.setState(car)
				},onComplete:()=>{
					this.setState(car)
				}})
			)
			tl.add(
				TweenLite.to(car,this.getduration(3419,785,7263,5751),{x:390,y:5518,ease:Linear.easeNone,onUpdate:()=>{
					this.setState(car)
				},onComplete:()=>{
					this.setState(car)
				}})
			)
			/*tl.add(
				TweenLite.to(car,this.getduration(785,404,5751,5523),{opacity:0,x:404,y:5523,ease:Linear.easeNone,onUpdate:()=>{
					this.setState(car)
				},onComplete:()=>{
					this.setState(car)
				}})
			)*/
		},30000)
	}

	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	//static getDerivedStateFromProps(nextProps, prevState){}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	//componentDidUpdate(prevProps, prevState){}

	render() {
		return (
			<Image
				ref={this.dom}
				image={this.state.image}
				width={this.state.width}
				height={this.state.height}
			  opacity={this.state.opacity}
			  x={transformsizeToIphoneFor750(this.state.x)}
			  y={transformsizeToIphoneFor750(this.state.y)}
			/>
		);
	}
}

