/**_gsTransform
 * Created by admin on 2018/11/8.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import {TweenMax,Linear} from "gsap";
import PropTypes from 'prop-types';
import {transformsizeToIphoneFor750} from '../../tool/GetMapPoint'
import {Sprite} from 'react-konva'
import {resSingleton} from '../../tool/ResLoader'

const animations={
	"default": [
		1, 1, 126, 86,
		129, 1, 126, 86,
		257, 1, 126, 86,
		385, 1, 126, 86,
		513, 1, 126, 86,
		641, 1, 126, 86,
		769, 1, 126, 86,
		897, 1, 126, 86,
		1025, 1, 126, 86,
		1153, 1, 126, 86,
		1281, 1, 126, 86,
		1409, 1, 126, 86,
		1537, 1, 126, 86,
		1665, 1, 126, 86,
		1793, 1, 126, 86,
		1921, 1, 126, 86,
		1, 89, 126, 86,
		129, 89, 126, 86,
		257, 89, 126, 86,
		385, 89, 126, 86,
		513, 89, 126, 86,
		641, 89, 126, 86,
		769, 89, 126, 86,
		897, 89, 126, 86,
		1025, 89, 126, 86,
		1153, 89, 126, 86,
		1281, 89, 126, 86,
		1409, 89, 126, 86,
		1537, 89, 126, 86,
		1665, 89, 126, 86,
		1793, 89, 126, 86,
		1921, 89, 126, 86,
		1, 177, 126, 86,
		129, 177, 126, 86,
		257, 177, 126, 86,
		385, 177, 126, 86,
		513, 177, 126, 86,
		641, 177, 126, 86,
		769, 177, 126, 86,
		897, 177, 126, 86,
		1025, 177, 126, 86,
		1153, 177, 126, 86,
		1281, 177, 126, 86,
		1409, 177, 126, 86,
		1537, 177, 126, 86,
		1665, 177, 126, 86,
		1793, 177, 126, 86,
		1921, 177, 126, 86,
		1, 265, 126, 86,
		129, 265, 126, 86,
		257, 265, 126, 86,
		385, 265, 126, 86,
		513, 265, 126, 86,
		641, 265, 126, 86,
		769, 265, 126, 86,
		897, 265, 126, 86,
		1025, 265, 126, 86,
		1153, 265, 126, 86,
		1281, 265, 126, 86,
		1409, 265, 126, 86,
		1537, 265, 126, 86,
		1665, 265, 126, 86,
		1793, 265, 126, 86,
		1921, 265, 126, 86,
		1, 353, 126, 86,
		129, 353, 126, 86,
		257, 353, 126, 86,
		385, 353, 126, 86,
		513, 353, 126, 86,
		641, 353, 126, 86,
		769, 353, 126, 86,
		897, 353, 126, 86,
		1025, 353, 126, 86,
		1153, 353, 126, 86,
		1281, 353, 126, 86,
		1409, 353, 126, 86,
		1537, 353, 126, 86,
		1665, 353, 126, 86,
		1793, 353, 126, 86,
		1921, 353, 126, 86,
		1, 441, 126, 86,
		129, 441, 126, 86,
		257, 441, 126, 86,
		385, 441, 126, 86,
		513, 441, 126, 86,
		641, 441, 126, 86,
		769, 441, 126, 86,
		897, 441, 126, 86,
		1025, 441, 126, 86,
		1153, 441, 126, 86,
		1281, 441, 126, 86,
		1409, 441, 126, 86,
		1537, 441, 126, 86,
		1665, 441, 126, 86,
		1793, 441, 126, 86,
		1921, 441, 126, 86,
		1, 529, 126, 86,
		129, 529, 126, 86,
		257, 529, 126, 86,
		385, 529, 126, 86,
		513, 529, 126, 86,
		641, 529, 126, 86,
		769, 529, 126, 86,
		897, 529, 126, 86,
		1025, 529, 126, 86,
		1153, 529, 126, 86,
		1281, 529, 126, 86,
		1409, 529, 126, 86,
		1537, 529, 126, 86,
		1665, 529, 126, 86,
		1793, 529, 126, 86,
		1921, 529, 126, 86,
		1, 617, 126, 86,
		129, 617, 126, 86,
		257, 617, 126, 86,
		385, 617, 126, 86,
		513, 617, 126, 86,
		641, 617, 126, 86,
		769, 617, 126, 86,
		897, 617, 126, 86,
		1025, 617, 126, 86,
		1153, 617, 126, 86,
		1281, 617, 126, 86,
		1409, 617, 126, 86,
		1537, 617, 126, 86,
		1665, 617, 126, 86
	]
}
export default class extends React.PureComponent {
	static defaultProps = {
		...Component.defaultProps,
		nowPlayId:0,
	}
	static propTypes = {
		nowPlayId:PropTypes.number.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			id:2,
			x:transformsizeToIphoneFor750(2900),
			y:transformsizeToIphoneFor750(1800),
			width:1,
			height:1,
			zIndex:91,
			scale:1,
			animation:"default",
			image:null,
		}
		this.dom = React.createRef()
		//事件绑定在es6中用于自定义事件props事件不适用
		resSingleton.get("./res/effect/peoplemove.png").then((img)=>{
			let widthsmp=transformsizeToIphoneFor750(126)
			let heightsmp=transformsizeToIphoneFor750(86)
			this.setState({
				image:img.img,
				width:widthsmp,
				height:heightsmp,
				scale:widthsmp/126*.8
			})

		})
	}

	//组件加载完毕
	componentDidMount() {
		this.dom.current.setZIndex(this.state.zIndex)
	}

	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	// static getDerivedStateFromProps(nextProps, prevState){}

	//组件将要卸载
	// componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	componentDidUpdate(nextProps, nextState){
		if(this.props.nowPlayId===this.state.id){
			let frame={f:0}
			this.dom.current.opacity(1)
			TweenMax.to(frame,(animations.default.length/4-1)/24,{f:animations.default.length/4-1,roundProps:"f",ease:Linear.easeNone,onUpdate:()=>{
				this.dom.current.frameIndex(frame.f)
			},onComplete:()=>{
				this.dom.current.frameIndex(frame.f)
				this.dom.current.opacity(0)
			}})
		}
	}

	render() {
		return (
			<Sprite
				offsetX={this.state.width/2}
				offsetY={this.state.height/2}
				scaleX={this.state.scale}
				scaleY={this.state.scale}
				fill={"rgba(0,0,0,0"}
				x={this.state.x}
				y={this.state.y}
				animation={this.state.animation}
				animations={animations}
				image={this.state.image}
				frameRate={24}
				ref={this.dom}/>
		);
	}
}

