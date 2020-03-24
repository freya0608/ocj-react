/**_gsTransform
 * Created by admin on 2018/11/18.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
//import PropTypes from 'prop-types';
import {resSingleton} from '../tool/ResLoader'
import {transformsizeToIphoneFor750} from '../tool/GetMapPoint'
import {Image} from 'react-konva'


class MaskLayer extends React.PureComponent {
	static defaultProps = {
		...Component.defaultProps,
		imageurl:"./res/masklayer.png"
	}
	static propTypes = {}

	constructor(props) {
		super(props)
		this.state = {}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		//this.handleClick = this.handleClick.bind(this);
		this.state = {
			image:null,
			x:0,
			y:0,
			width:1,
			height:1,
		}
		resSingleton.get(this.props.imageurl).then((img)=>{
			let w=5690;
			let h=8046;
			let widthsmp=transformsizeToIphoneFor750(w)
			let heightsmp=transformsizeToIphoneFor750(h)
			this.setState({
				image:img.img,
				width:widthsmp,
				height:heightsmp,
			})
		})
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
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	//componentDidUpdate(nextProps, nextState){}

	render() {
		return (
			<Image
				fill={"rgba(255,255,255,0"}
				name="maskitem"
				width={this.state.width}
				height={this.state.height}
				image={this.state.image}
				ref={this.dom}/>
		);
	}
}

export default MaskLayer;
