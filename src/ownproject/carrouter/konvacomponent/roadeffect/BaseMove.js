/**_gsTransform
 * Created by admin on 2018/11/26.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import {Sprite} from 'react-konva'
import {resSingleton} from '../../tool/ResLoader'
import {transformsizeToIphoneFor750} from '../../tool/GetMapPoint'

export default class BaseMove extends React.Component {
	static defaultProps = {
		...Component.defaultProps,
		opacity:1,
		notransxy:false,
		transback:false,
	}
	static propTypes = {
		bgurl:PropTypes.string.isRequired,
		width:PropTypes.number.isRequired,
		height:PropTypes.number.isRequired,
		x:PropTypes.number.isRequired,
		y:PropTypes.number.isRequired,
		animations:PropTypes.object.isRequired,
		frameRate:PropTypes.number.isRequired,
		opacity:PropTypes.number.isRequired,
		scale:PropTypes.number,
		togoframe:PropTypes.number,
		notransxy:PropTypes.bool,
		transback:PropTypes.bool,
	}

	constructor(props) {
		super(props)
		this.state = {
			animation: "default",
			image:null,
			scale:1,
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		//this.handleClick = this.handleClick.bind(this);

		resSingleton.get(this.props.bgurl).then((img)=>{
			let widthsmp=transformsizeToIphoneFor750(img.width)
			this.setState({
				image:img.img,
				scale:this.props.scale?widthsmp/img.width*this.props.scale:widthsmp/img.width,//图片过大。缩小一倍
			})
		})
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
		if(!this.props.togoframe){
			this.dom.current.start()
		}else{
			let frame={f:0}
			TweenMax.to(frame,1.5,{f:this.props.togoframe,roundProps:"f",onUpdate:()=>{
				this.dom.current.frameIndex(frame.f)
			},onComplete:()=>{
				this.dom.current.frameIndex(frame.f)
			}})
		}

	}

	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	//static getDerivedStateFromProps(nextProps, prevState){}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	// componentDidUpdate(prevProps, prevState){}

	render() {
		return (
			<Sprite
				opacity={this.props.opacity}
				offsetX={this.props.width/2}
				offsetY={this.props.height/2}
				scaleX={this.state.scale}
				scaleY={this.state.scale}
				fill={"rgba(0,0,0,0"}
				x={this.props.notransxy?this.props.x:transformsizeToIphoneFor750(this.props.x)}
				y={this.props.notransxy?this.props.y:transformsizeToIphoneFor750(this.props.y)}
				animation={this.state.animation}
				animations={this.props.animations}
				image={this.state.image}
				frameRate={this.props.frameRate}
				ref={this.dom}/>
		);
	}
}

