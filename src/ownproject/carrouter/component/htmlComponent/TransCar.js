/**_gsTransform
 * Created by admin on 2018/11/16.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import './layer.css'
import {Spring} from 'react-spring'
import {screenwidth,screenheight,Question} from '../../tool/GetMapPoint'
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
			playid:6,
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e){
		e.preventDefault();
		Question.ismove=true;
		if(Question.carStep===this.state.playid){
			window.playsound("trans")
			this.props.clickCallback&&this.props.clickCallback("transform")
		}
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
		setTimeout(()=>{
			Question.ismove=false;
			if(Question.carStep>this.state.playid){
				Question.cannextstep=true;
			}else{
				Question.cannextstep=false;
			}
		},300*4)
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
			<div className="fullmaskhtml" style={{width:screenwidth,height:screenheight}} onClick={this.handleClick}>
				<div className="layerBox">
					<Spring delay={this.delayTime(0)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h1 style={styles} className="layerTitle_1 smallsize">不远的将来，自动驾驶汽车的普及将改变人们的生活方式</h1>
						)}
					</Spring>
					<div className="layerLine"></div>
					<Spring delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h1 style={styles} className="layerTitle_2">预计2025年可完全实现自动驾驶的商业化</h1>
						)}
					</Spring>
					<Spring delay={this.delayTime(2)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<div style={styles} className="showImgBox"><img alt="" src="./res/html/h6/imgShow.png"/></div>
						)}
					</Spring>
					<Spring delay={this.delayTime(3)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h1 style={styles} className="layerTitle_2">
								到2040年，全球的自动驾驶汽车销售总量预计将达到约3300万辆，中国有望成为全球最大的自动驾驶汽车市场
								<p>——IHS Markit</p>
							</h1>
						)}
					</Spring>
				</div>
				{
					Question.carStep>this.state.playid&&(
						<Spring delay={this.delayTime(4)} from={{opacity:0}} to={{opacity:1}}>
							{styles=>(<div style={styles}><ScrollTip /></div>)}
						</Spring>
					)
				}
			</div>
		);
	}
}
