/**_gsTransform
 * Created by admin on 2018/11/16.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import './layer.css'
import {Spring,animated,interpolate} from 'react-spring'
import {Question} from '../../tool/GetMapPoint'
import ScrollTip from  '../tipcompponent/ScrollTip'


export default class extends React.Component {
	static defaultProps = {
		...Component.defaultProps
	}
	static propTypes = {
		clickCallback:PropTypes.func
	}

	constructor(props) {
		super(props)
		this.state = {
			playid:4,
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		e.preventDefault();
		this.props.clickCallback&&this.props.clickCallback("transform")
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
		setTimeout(()=>{
			Question.ismove=false;
			Question.cannextstep=true;
		},300*8)
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.showId===this.state.playid){
			return true;
		}else {
			return false;
		}
	}
	//组件将更新/新建
	delayTime=(i)=>{
		return i*300+500;
	}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	//componentDidUpdate(nextProps, nextState){}

	render() {
		return (
			<React.Fragment>
				<div className="layerBox">
					<Spring native delay={this.delayTime(0)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<animated.h1 style={styles} className="layerTitle_1 smallsize">在中国，出行是共享经济发展最为活跃的领域之一</animated.h1>
						)}
					</Spring>
					<div className="layerLine"></div>
					<Spring native delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<animated.h2 style={styles} className="layerTitle_2">年轻人越来越接受共享出行的生活方式</animated.h2>
						)}
					</Spring>

					<div className="jigsaw">
						<Spring native delay={this.delayTime(2)} from={{x:-20,y:-20,opacity:0}}
						        to={{x:0,
							        y:0,
							        opacity:1}}>
							{({x,y,opacity})=>(
								<animated.div style={{
									opacity:opacity,
									transform:interpolate([x,y],(x,y)=>`translate3d(${x}%,${y}%,0)`)
								}} className="jigsaw_1">
									<img alt="" src="./res/html/h4/imgHand_1.png"/>
								</animated.div>
							)}
						</Spring>
						<Spring native delay={this.delayTime(3)} from={{x:20,y:-20,opacity:0}}
						        to={{x:0,
							        y:0,
							        opacity:1}}>
							{({x,y,opacity})=>(
								<animated.div style={{
									opacity:opacity,
									transform:interpolate([x,y],(x,y)=>`translate3d(${x}%,${y}%,0)`)
								}} className="jigsaw_2">
									<img alt="" src="./res/html/h4/imgHand_2.png"/>
								</animated.div>
							)}
						</Spring>
						<Spring native delay={this.delayTime(4)} from={{x:-20,y:20,opacity:0}}
						        to={{x:0,
							        y:0,
							        opacity:1}}>
							{({x,y,opacity})=>(
								<animated.div style={{
									opacity:opacity,
									transform:interpolate([x,y],(x,y)=>`translate3d(${x}%,${y}%,0)`)
								}} className="jigsaw_3">
									<img alt="" src="./res/html/h4/imgHand_3.png"/>
								</animated.div>
							)}
						</Spring>
						<Spring native delay={this.delayTime(5)} from={{x:20,y:20,opacity:0}}
						        to={{x:0,
							        y:0,
							        opacity:1}}>
							{({x,y,opacity})=>(
								<animated.div style={{
									opacity:opacity,
									transform:interpolate([x,y],(x,y)=>`translate3d(${x}%,${y}%,0)`)
								}} className="jigsaw_4">
									<img alt="" src="./res/html/h4/imgHand_4.png"/>
								</animated.div>
							)}
						</Spring>
					</div>
					<Spring native delay={this.delayTime(6)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<animated.h2 style={styles} className="layerTitle_2 layerTitleSmall">
								车联用户既是网约车的使用者，也是共享车辆的提供者；他们使用共享出行类APP的倾向性更高<br/>
								<p>——《腾讯车联人群洞察》</p>
							</animated.h2>
						)}
					</Spring>
				</div>
				<Spring native delay={this.delayTime(7)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<animated.div style={styles}><ScrollTip /></animated.div>)}
				</Spring>
			</React.Fragment>
		);
	}
}
