/**_gsTransform
 * Created by admin on 2018/11/16.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import './layer.css'
import {Spring,animated} from 'react-spring'
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
			playid:3,
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
		},300*18)
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
							<animated.h1 style={styles} className="layerTitle_1">亲子指数</animated.h1>
						)}
					</Spring>
					<Spring native delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<animated.p style={styles} className="layerText txMarBottom">指数越高，代表车主去学校、亲子乐园等场所频次越高</animated.p>
						)}
					</Spring>
					<div className="layerLine"></div>
					<Spring native delay={this.delayTime(2)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<animated.h2 style={styles} className="layerTitle_2">一线城市亲子指数最高</animated.h2>
						)}
					</Spring>
					<Histogram
						delaynum={3}
						numarray={[50,48,48,48,49]}
						stringarray={["一线","二线","三线","四线","五线"]}
						histogramarray={[
							'./res/html/h3/imgStrip_1.png',
							'./res/html/h3/imgStrip_2.png',
							'./res/html/h3/imgStrip_3.png',
							'./res/html/h3/imgStrip_4.png',
							'./res/html/h3/imgStrip_5.png',
						]}
						iconarray={['./res/html/h1/iconLevel_1.png',
							'./res/html/h1/iconLevel_2.png',
							'./res/html/h1/iconLevel_3.png',
							'./res/html/h1/iconLevel_4.png',
							'./res/html/h1/iconLevel_5.png']}/>
					<div className="layerLine"></div>
					<Spring native delay={this.delayTime(8)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<animated.h2 style={styles} className="layerTitle_2">女性车主亲子指数更高，更经常接送孩子</animated.h2>
						)}
					</Spring>
					<Histogram
						delaynum={9}
						isBig={true}
						numarray={[48,50]}
						stringarray={["男性车主","女性车主"]}
						histogramarray={[
							'./res/html/h3/imgStrip_6.png',
							'./res/html/h3/imgStrip_7.png',
						]}
						rightImage="./res/html/h3/imgStrip.png"
						rightImageClass="stripListImg_1"
						iconarray={[
							'',
							'',
						]}/>
				</div>
				<Spring native delay={this.delayTime(12)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<animated.div style={styles} className="maskTip"><img alt="" src="./res/html/h3/tencent.png" /></animated.div>)}
				</Spring>
				<Spring native delay={this.delayTime(17)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<animated.div style={styles}><ScrollTip /></animated.div>)}
				</Spring>
			</React.Fragment>
		);
	}
}
