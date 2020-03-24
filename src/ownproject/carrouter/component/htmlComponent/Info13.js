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
			playid:13,
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
		},300*19)
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
							<h1 style={styles} className="layerTitle_1">休闲指数</h1>
						)}
					</Spring>
					<Spring delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<p style={styles} className="layerText">指数越高，代表车主去电影院等文娱场所，以及商场超市等购物场所的频次越高</p>
						)}
					</Spring>
					<div className="layerLine"></div>
					<Spring delay={this.delayTime(2)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h2 style={styles} className="layerTitle_2">二线城市指数最高，更懂享受生活</h2>
						)}
					</Spring>
					<Histogram
						delaynum={3}
						numarray={[47,48,46,45,43]}
						stringarray={["一线","二线","三线","四线","五线"]}
						histogramarray={[
							'./res/html/h13/imgStrip_1.png',
							'./res/html/h13/imgStrip_2.png',
							'./res/html/h13/imgStrip_3.png',
							'./res/html/h13/imgStrip_4.png',
							'./res/html/h13/imgStrip_5.png',
						]}
						iconarray={['./res/html/h1/iconLevel_1.png',
							'./res/html/h1/iconLevel_2.png',
							'./res/html/h1/iconLevel_3.png',
							'./res/html/h1/iconLevel_4.png',
							'./res/html/h1/iconLevel_5.png']}/>
					<div className="layerLine"></div>
					<Spring delay={this.delayTime(8)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h2 style={styles} className="layerTitle_2">SUV车主休闲指数最高</h2>
						)}
					</Spring>
					<Histogram
						leftSpace={3}
						isSmall={true}
						delaynum={9}
						numarray={[47,46,45]}
						stringarray={["SUV","MPV","轿车"]}
						histogramarray={[
							'./res/html/h13/imgStrip_6.png',
							'./res/html/h13/imgStrip_7.png',
							'./res/html/h13/imgStrip_8.png',
						]}
						rightImage="./res/html/h13/imgStrip.png"
						rightImageClass="stripListImg_5"
						iconarray={[
							'',
							'',
							'',
						]}/>
				</div>
				<Spring delay={this.delayTime(13)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<div style={styles} className="maskTip"><img alt="" src="./res/html/h13/tencent.png" /></div>)}
				</Spring>
				<Spring delay={this.delayTime(18)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(<div style={styles}><ScrollTip weather="night" /></div>)}
				</Spring>
			</React.Fragment>
	);
	}
}
