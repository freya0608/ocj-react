/**_gsTransform
 * Created by admin on 2018/11/8.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import {Image} from 'react-konva'
import PropTypes from 'prop-types';
import {transformsizeToIphoneFor750} from '../tool/GetMapPoint'
import {resSingleton} from '../tool/ResLoader'
class Obstacle extends React.PureComponent {
	static defaultProps = {
		...Component.defaultProps,
		img:null,
		x:0,
		y:0,
		zIndex:0,
	}
	static propTypes = {
		img:PropTypes.string.isRequired,
		x:PropTypes.number,
		y:PropTypes.number,
		zIndex:PropTypes.number,
	}

	constructor(props) {
		super(props)
		this.state = {
			"width":1,
			"height":1,
			"image":null,
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		//this.handleClick = this.handleClick.bind(this);

		resSingleton.get(this.props.img).then((img)=>{
			let widthsmp=transformsizeToIphoneFor750(img.width)
			let heightsmp=transformsizeToIphoneFor750(img.height)
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
		// console.log(123)
		this.dom.current.setZIndex(this.props.zIndex)
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
				image={this.state.image}
				width={this.state.width}
				height={this.state.height}
				x={transformsizeToIphoneFor750(this.props.x)}
				y={transformsizeToIphoneFor750(this.props.y)}
				ref={this.dom}/>
		);
	}
}

export default Obstacle;
