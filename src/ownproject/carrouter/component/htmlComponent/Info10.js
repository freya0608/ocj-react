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
			playid:10,
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
		},300*15)
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
							<h1 style={styles} className="layerTitle_1">驾驶里程指数</h1>
						)}
					</Spring>
					<Spring delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<p style={styles} className="layerText">指数越高，代表车主年化里程（年平均里程）越高</p>
						)}
					</Spring>
					<div className="layerLine"></div>
					<Spring delay={this.delayTime(2)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h2 style={styles} className="layerTitle_2">一二三四五线城市、指数PK</h2>
						)}
					</Spring>
					<Histogram
						delaynum={2}
						numarray={[50,51,50,51,48]}
						stringarray={["一线","二线","三线","四线","五线"]}
						histogramarray={[
							'./res/html/h10/imgStrip_1.png',
							'./res/html/h10/imgStrip_2.png',
							'./res/html/h10/imgStrip_3.png',
							'./res/html/h10/imgStrip_4.png',
							'./res/html/h10/imgStrip_5.png',
						]}
						iconarray={['./res/html/h1/iconLevel_1.png',
							'./res/html/h1/iconLevel_2.png',
							'./res/html/h1/iconLevel_3.png',
							'./res/html/h1/iconLevel_4.png',
							'./res/html/h1/iconLevel_5.png']}/>
					<div className="layerLine"></div>
					<Spring delay={this.delayTime(8)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h2 style={styles} className="layerTitle_2">MPV车主年化里程最高</h2>
						)}
					</Spring>
					<Histogram
						leftSpace={3}
						isSmall={true}
						delaynum={9}
						numarray={[50,66,50]}
						stringarray={["SUV","MPV","轿车"]}
						histogramarray={[
							'./res/html/h10/imgStrip_6.png',
							'./res/html/h10/imgStrip_7.png',
							'./res/html/h10/imgStrip_8.png',
						]}
						rightImage="./res/html/h10/imgStrip.png"
						rightImageClass="stripListImg_4"
						iconarray={[
							'',
							'',
							'',
						]}/>
				</div>
				<Spring delay={this.delayTime(13)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<div style={styles}><ScrollTip weather="night" /></div>)}
				</Spring>
				<Spring delay={this.delayTime(14)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<div style={styles} className="maskTip7"><img alt="" src="./res/effect/total.png" /></div>)}
				</Spring>
			</React.Fragment>
	);
	}
}
