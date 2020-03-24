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
			playid:16,
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
				<div className="layerBox layerBlack">
					<Spring delay={this.delayTime(0)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h1 style={styles} className="layerTitle_1">恋家指数</h1>
						)}
					</Spring>
					<Spring delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<p style={styles} className="layerText">指数越高，代表车主晚间回固定地点的频次越高</p>
						)}
					</Spring>

					<div className="layerLine"></div>
					<Spring delay={this.delayTime(2)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h2 style={styles} className="layerTitle_2">城市很大，家很温暖，一线城市恋家指数最高</h2>
						)}
					</Spring>
					<Histogram
						delaynum={3}
						numarray={[58,51,48,47,47]}
						stringarray={["一线","二线","三线","四线","五线"]}
						histogramarray={[
							'./res/html/h16/imgStrip_1.png',
							'./res/html/h16/imgStrip_2.png',
							'./res/html/h16/imgStrip_3.png',
							'./res/html/h16/imgStrip_4.png',
							'./res/html/h16/imgStrip_5.png',
						]}
						iconarray={['./res/html/h1/iconLevel_1.png',
							'./res/html/h1/iconLevel_2.png',
							'./res/html/h1/iconLevel_3.png',
							'./res/html/h1/iconLevel_4.png',
							'./res/html/h1/iconLevel_5.png']}/>
					<div className="layerLine"></div>
					<Spring delay={this.delayTime(8)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h2 style={styles} className="layerTitle_2">雪佛兰恋家指数最高，高于平均水平7%</h2>
						)}
					</Spring>
					<Histogram
						delaynum={9}
						isSmall={true}
						numarray={[51,59,54]}
						stringarray={["别克","雪佛兰","凯迪拉克"]}
						histogramarray={[
							'./res/html/h16/imgStrip_6.png',
							'./res/html/h16/imgStrip_7.png',
							'./res/html/h16/imgStrip_8.png',
						]}
						rightImage="./res/html/h16/imgStrip.png"
						rightImageClass="stripListImg_7"
						iconarray={[
							'./res/html/h5/iconLevel_1.png',
							'./res/html/h5/iconLevel_3.png',
							'./res/html/h5/iconLevel_2.png',
						]}/>
				</div>
				<Spring delay={this.delayTime(12)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<div style={styles} className="maskTip"><img alt="" src="./res/html/h16/tencent.png" /></div>)}
				</Spring>
				<Spring delay={this.delayTime(17)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<div style={styles}><ScrollTip weather="night" /></div>)}
				</Spring>
			</React.Fragment>

	);
	}
}
