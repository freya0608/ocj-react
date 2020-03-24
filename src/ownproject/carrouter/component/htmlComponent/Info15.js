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
			playid:15,
			usemove:false,
			clickId:-1,
		}
		this.dom = React.createRef()
		this.timeOut=null;
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		this.handleClick = this.handleClick.bind(this);
		this.ontouchstart=this.ontouchstart.bind(this);
		this.ontouchend=this.ontouchend.bind(this);
		this.touchPos={
			x:0,y:0,time:0,
		}
	}
	ontouchstart(e){
		this.touchPos.x=e.touches[0].clientX
		this.touchPos.y=e.touches[0].clientY
		this.touchPos.time=new Date().getTime()
	}
	ontouchend(e){
		let endTime=new Date().getTime();
		let endx=e.changedTouches[0].clientX
		let endy=e.changedTouches[0].clientY
		if((endTime-this.touchPos.time)>500||Math.sqrt(Math.pow((endx-this.touchPos.x),2),Math.pow(endy-this.touchPos.y),2)<5){
			return;
		}
		let angle=Math.atan2(endy-this.touchPos.y,endx-this.touchPos.x)*180/Math.PI;
		let lsdirection=0;
		/*按2点夹角判断方向*/
		if (angle >= -45 && angle < 45) {
			lsdirection = 4;
		} else if (angle >= 45 && angle < 135) {
			lsdirection = 1;
		} else if (angle >= -135 && angle < -45) {
			lsdirection = 2;
		} else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
			lsdirection = 3;
		}
		if(lsdirection===2){
			this.setState({
				usemove:true,
			})
		}
	}
	handleClick(e){
		e.preventDefault();
		window.playsound("chosebutton");
		Question.ismove=true;
		if(this.timeOut){
			clearTimeout(this.timeOut);
			this.timeOut=null;
		}
		this.timeOut=setTimeout(()=>{
			this.props.clickCallback&&this.props.clickCallback("chose")
		},1000)
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
		setTimeout(()=>{
			Question.ismove=false;
			Question.cannextstep=false;
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
	componentWillUnmount(){
		if(this.timeOut){
			clearTimeout(this.timeOut);
			this.timeOut=null;
		}
	}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	//componentDidUpdate(nextProps, nextState){}

	render() {
		return (
			<div onTouchEnd={this.ontouchend} onTouchStart={this.ontouchstart}>
				<div className="layerBox layerBlack">
					<Spring delay={this.delayTime(0)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h1 style={styles} className="layerTitle_1">四线城市，平均保养频次最高</h1>
						)}
					</Spring>
					<Spring delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<p style={styles} className="layerText">爱车呵护指数：由养车频次得出，指数越高，车辆保养周期越短</p>
						)}
					</Spring>
					<Histogram
						delaynum={3}
						numarray={[59,60,60,61,58]}
						stringarray={["一线","二线","三线","四线","五线"]}
						histogramarray={[
							'./res/html/h15/imgStrip_1.png',
							'./res/html/h15/imgStrip_2.png',
							'./res/html/h15/imgStrip_3.png',
							'./res/html/h15/imgStrip_4.png',
							'./res/html/h15/imgStrip_5.png',
						]}
						iconarray={['./res/html/h1/iconLevel_1.png',
							'./res/html/h1/iconLevel_2.png',
							'./res/html/h1/iconLevel_3.png',
							'./res/html/h1/iconLevel_4.png',
							'./res/html/h1/iconLevel_5.png']}/>
				</div>
				<Spring delay={this.delayTime(7)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(
						<div style={styles} className="layerBox layerBlack">
							<div className="questionTitle">
								<div className="titleLineLeft"></div>
								<div className="titleLineRight"></div>
								做出选择，预测你的2019出行关键词
							</div>
							<h2 className="layerTitle_2" style={{marginBottom:"1.5rem"}}>你对汽车是哪种呵护方式？</h2>
							<div className={`questionButton ${this.state.clickId===0?"clicked ":""}${this.state.usemove?"makebigmove ":""}`} onClick={(e)=>{
								Question.setQuestion(3,0)
								this.setState({
									clickId:0,
									usemove:false,
								})
								this.handleClick(e)
							}}>A. 经常保养保证爱车纤尘不染</div>
							<div className={`questionButton ${this.state.clickId===1?"clicked ":""}${this.state.usemove?"makebigmove ":""}`} onClick={(e)=>{
								Question.setQuestion(3,1)
								this.setState({
									clickId:1,
									usemove:false,
								})
								this.handleClick(e)
							}}>B. 定期进行保养</div>
							<div className={`questionButton ${this.state.clickId===2?"clicked ":""}${this.state.usemove?"makebigmove ":""}`} onClick={(e)=>{
								Question.setQuestion(3,2)
								this.setState({
									clickId:2,
									usemove:false,
								})
								this.handleClick(e)
							}}>C. 很少保养</div>
						</div>
					)}
				</Spring>
				<Spring delay={this.delayTime(9)} from={{opacity:0}} to={{opacity:1}}>
					{
						styles=>(
							<div style={styles} className="righttip"><img src="./res/effect/hehu1.png" alt="" /></div>
						)
					}
				</Spring>
			</div>
	);
	}
}
