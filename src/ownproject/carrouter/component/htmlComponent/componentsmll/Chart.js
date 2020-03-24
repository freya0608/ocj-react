/**_gsTransform
 * Created by admin on 2018/11/26.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import {Spring,animated} from 'react-spring'
import '../layer.css'
export default class Chart extends React.PureComponent {
	static defaultProps = {
		...Component.defaultProps,
	}
	static propTypes = {
		delayTime:PropTypes.number.isRequired,
		numURL:PropTypes.string.isRequired,
		chartURL:PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		//this.handleClick = this.handleClick.bind(this);
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
	delayTime=(i)=>{
		return i*300+500;
	}

	render() {
		return (
			<div className="listImgBox">
				<Spring native delay={this.delayTime(this.props.delayTime)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(
						<animated.div style={styles} className="listBg">
							<img alt="" src={this.props.numURL}/>
						</animated.div>
					)}
				</Spring>
				<Spring native delay={this.delayTime(this.props.delayTime+1)} from={{x:101,y:-101}} to={{x:0,y:0}}>
					{({x,y})=>(
						<div className="listImg listImgPos_1">
							<animated.div style={{transform:y.interpolate(y=>(`translate3d(${y}%,0,0)`))}} className="maskToCover">
								<animated.img style={{transform:x.interpolate(x=>(`translate3d(${x}%,0,0)`))}} alt="" src={this.props.chartURL}/>
							</animated.div>
						</div>
					)}
				</Spring>
			</div>
		);
	}
}

