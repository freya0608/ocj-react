/**_gsTransform
 * Created by admin on 2018/11/2.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import {Question,transformsizeToIphoneFor750} from '../tool/GetMapPoint'

// import arrow from '../res/arrow.png'
import Cartrans0 from '../konvacomponent/animate/Cartrans0'
import Cartrans1 from '../konvacomponent/animate/Cartrans1'
import Cartrans2 from '../konvacomponent/animate/Cartrans2'

class Ufo extends React.Component {
	static defaultProps = {
		...Component.defaultProps,
		x:0,
		y:0,
		moveCar:true,
		transback:false,
	}
	static propTypes = {
		x:PropTypes.number.isRequired,
		y:PropTypes.number.isRequired,
		moveCar:PropTypes.bool.isRequired,
		transback:PropTypes.bool.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			scale:1,
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);

	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.moveCar){
			return true
		}else{
			return false
		}
	}
	//组件将更新/新建
	// static getDerivedStateFromProps(nextProps, prevState){}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	// componentDidUpdate(nextProps, nextState){}

	render() {
		let CarTrans=null;
		switch (Question.carId){
			case 0:
				CarTrans=Cartrans0;
				break;
			case 1:
				CarTrans=Cartrans1;
				break;
			case 2:
				CarTrans=Cartrans2;
				break;
			default:
				CarTrans=Cartrans2;
				break;
		}
		return (
			<CarTrans notransxy={true} transback={this.props.transback}
				x={this.props.x+transformsizeToIphoneFor750(40)}
				y={this.props.y-transformsizeToIphoneFor750(25)}
			/>
		);
	}
}

export default Ufo;
