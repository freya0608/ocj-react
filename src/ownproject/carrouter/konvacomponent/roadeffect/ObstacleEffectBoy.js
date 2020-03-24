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
1, 1, 110, 110,
1, 113, 110, 110,
1, 225, 110, 110,
1, 337, 110, 110,
113, 1, 110, 110,
113, 113, 110, 110,
113, 225, 110, 110,
113, 337, 110, 110,
225, 1, 110, 110,
225, 113, 110, 110,
225, 225, 110, 110,
225, 337, 110, 110,
337, 1, 110, 110,
337, 113, 110, 110,
337, 225, 110, 110,
337, 337, 110, 110,
449, 1, 110, 110,
449, 113, 110, 110,
449, 225, 110, 110,
449, 337, 110, 110,
561, 1, 110, 110,
561, 113, 110, 110,
561, 225, 110, 110,
561, 337, 110, 110,
673, 1, 110, 110,
673, 113, 110, 110,
673, 225, 110, 110,
673, 337, 110, 110,
785, 1, 110, 110,
785, 113, 110, 110,
785, 225, 110, 110,
785, 337, 110, 110,
897, 1, 110, 110,
897, 113, 110, 110,
897, 225, 110, 110,
897, 337, 110, 110,
1009, 1, 110, 110,
1009, 113, 110, 110,
1009, 225, 110, 110,
1009, 337, 110, 110
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
			id:3,
			x:transformsizeToIphoneFor750(3280),
			y:transformsizeToIphoneFor750(2170),
			width:1,
			height:1,
			zIndex:90,
			scale:1,
			animation:"default",
			image:null,
		}
		this.dom = React.createRef()
		//事件绑定在es6中用于自定义事件props事件不适用
		resSingleton.get("./res/move/boy.png").then((img)=>{
			let widthsmp=transformsizeToIphoneFor750(110)
			let heightsmp=transformsizeToIphoneFor750(110)
			this.setState({
				image:img.img,
				width:widthsmp,
				height:heightsmp,
				scale:widthsmp/110,
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
			TweenMax.to(frame,(animations.default.length/4-1)/12,{f:animations.default.length/4-1,roundProps:"f",ease:Linear.easeNone,onUpdate:()=>{
				this.dom.current.frameIndex(frame.f)
			},onComplete:()=>{
				this.dom.current.frameIndex(frame.f)
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

