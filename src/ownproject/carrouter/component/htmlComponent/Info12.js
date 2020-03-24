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
import Chart from './componentsmll/Chart'
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
			playid:12,
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
		},300*17)
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
							<h1 style={styles} className="layerTitle_1">环保驾驶指数</h1>
						)}
					</Spring>
					<Spring delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<p style={styles} className="layerText">指数越高，代表驾驶越节油，百公里油耗越低</p>
						)}
					</Spring>

					<div className="layerLine"></div>
					<Spring delay={this.delayTime(2)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h2 style={styles} className="layerTitle_2">五线城市环保指数最高，开车更节油</h2>
						)}
					</Spring>
					<Histogram
						delaynum={3}
						numarray={[45,49,53,53,54]}
						stringarray={["一线","二线","三线","四线","五线"]}
						histogramarray={[
							'./res/html/h9/imgStrip_1.png',
							'./res/html/h12/imgStrip_2.png',
							'./res/html/h12/imgStrip_3.png',
							'./res/html/h12/imgStrip_4.png',
							'./res/html/h12/imgStrip_5.png',
						]}
						iconarray={['./res/html/h1/iconLevel_1.png',
							'./res/html/h1/iconLevel_2.png',
							'./res/html/h1/iconLevel_3.png',
							'./res/html/h1/iconLevel_4.png',
							'./res/html/h1/iconLevel_5.png']}/>
					<div className="layerLine"></div>
					<Spring delay={this.delayTime(8)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h2 style={styles} className="layerTitle_2">95后指数最高，节油水平技压群雄</h2>
						)}
					</Spring>
					<Chart delayTime={9} chartURL="./res/html/h12/imgListInfo.png" numURL="./res/html/h12/bgList.png"/>
				</div>
				<Spring delay={this.delayTime(11)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<div style={styles} className="maskTip"><img alt="" src="./res/html/h12/tencent.png" /></div>)}
				</Spring>
				<Spring delay={this.delayTime(10)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<div style={styles} className="righttip"><img alt="" src="./res/effect/envserver.png" /></div>)}
				</Spring>
				<Spring delay={this.delayTime(16)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<div style={styles}><ScrollTip weather="night" /></div>)}
				</Spring>
			</React.Fragment>
	);
	}
}
