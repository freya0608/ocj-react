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
import Histogram from './componentsmll/Histogram'
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
			playid:14,
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
		},300*16)
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
				<div className="layerBox layerBlack">
					<Spring delay={this.delayTime(0)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h1 style={styles} className="layerTitle_1">深夜活力指数</h1>
						)}
					</Spring>
					<Spring delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<p style={styles} className="layerText">指数越高，代表车主深夜驾驶频次越高</p>
						)}
					</Spring>

					<div className="layerLine"></div>
					<Spring delay={this.delayTime(2)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h2 style={styles} className="layerTitle_2">一线城指数最高，夜生活更丰富</h2>
						)}
					</Spring>
					<Histogram
						delaynum={3}
						numarray={[52,50,48,49,50]}
						stringarray={["一线","二线","三线","四线","五线"]}
						histogramarray={[
							'./res/html/h14/imgStrip_1.png',
							'./res/html/h14/imgStrip_2.png',
							'./res/html/h14/imgStrip_3.png',
							'./res/html/h14/imgStrip_4.png',
							'./res/html/h14/imgStrip_5.png',
						]}
						iconarray={['./res/html/h1/iconLevel_1.png',
							'./res/html/h1/iconLevel_2.png',
							'./res/html/h1/iconLevel_3.png',
							'./res/html/h1/iconLevel_4.png',
							'./res/html/h1/iconLevel_5.png']}/>
					<div className="layerLine"></div>
					<Spring delay={this.delayTime(8)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h2 style={styles} className="layerTitle_2">狮子座里夜行侠更多</h2>
						)}
					</Spring>
					<Spring delay={this.delayTime(9)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<p className="layerText" style={{fontSize:"0.7rem",opacity:styles.opacity}}>前五名分别是狮子、双子、处女座、双鱼座、巨蟹座</p>
						)}
					</Spring>
					<Histogram
						delaynum={10}
						numarray={[48,52,46,44,44]}
						stringarray={["双子","狮子","处女","双鱼","巨蟹"]}
						histogramarray={[
							'./res/html/h14/imgStrip_6.png',
							'./res/html/h14/imgStrip_7.png',
							'./res/html/h14/imgStrip_8.png',
							'./res/html/h14/imgStrip_9.png',
							'./res/html/h14/imgStrip_10.png',
						]}
						rightImageClass="stripListImg_6"
						rightImage="./res/html/h14/imgStrip.png"
						parclass="stripListSmallest"
						iconarray={[
							'./res/html/h14/iconLevel_1.png',
							'./res/html/h14/iconLevel_2.png',
							'./res/html/h14/iconLevel_3.png',
							'./res/html/h14/iconLevel_4.png',
							'./res/html/h14/iconLevel_5.png']}/>
				</div>
				<Spring delay={this.delayTime(15)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<div style={styles}><ScrollTip weather="night" /></div>)}
				</Spring>
			</React.Fragment>
	);
	}
}
