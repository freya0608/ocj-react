/**_gsTransform
 * Created by admin on 2018/11/30.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import {resSingleton} from '../../tool/ResLoader'

export default class MapHtml extends React.Component {
	static defaultProps = {
		...Component.defaultProps
	}
	static propTypes = {
		x:PropTypes.number.isRequired,
		y:PropTypes.number.isRequired,
		w:PropTypes.number.isRequired,
		h:PropTypes.number.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			img:null
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		//this.handleClick = this.handleClick.bind(this);
		resSingleton.get("./res/mappng-min.png").then((img)=>{
			this.setState({
				img:img.img.src
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
	//componentDidUpdate(prevProps, prevState){}

	render() {
		return (
			<div className="mapBg">
				<div className="mapIn" style={{
					backgroundImage:`url(${this.state.img})`,
					transform:`translate3d(${this.props.x}px,${this.props.y}px,0)`,
					width:this.props.w,height:this.props.h
				}}>
				</div>
			</div>
		);
	}
}

