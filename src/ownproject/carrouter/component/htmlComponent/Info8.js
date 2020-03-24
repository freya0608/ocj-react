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
			playid:8,
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
		},300*11)
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

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	//componentDidUpdate(nextProps, nextState){}

	render() {
		return (
			<div onTouchEnd={this.ontouchend} onTouchStart={this.ontouchstart}>
				<div className="layerBox">
					<Spring delay={this.delayTime(0)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<h1 style={styles} className="layerTitle_1">一线城市疲劳驾驶指数最高</h1>
						)}
					</Spring>
					<Spring delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<p style={styles} className="layerText">疲劳驾驶指数：指数越高，代表车主疲劳驾驶频次越高</p>
						)}
					</Spring>
					<Histogram
						delaynum={2}
						numarray={[59,49,46,46,46]}
						stringarray={["一线","二线","三线","四线","五线"]}
						histogramarray={[
							'./res/html/h8/imgStrip_1.png',
							'./res/html/h8/imgStrip_2.png',
							'./res/html/h8/imgStrip_3.png',
							'./res/html/h8/imgStrip_4.png',
							'./res/html/h8/imgStrip_5.png',
						]}
						iconarray={['./res/html/h1/iconLevel_1.png',
							'./res/html/h1/iconLevel_2.png',
							'./res/html/h1/iconLevel_3.png',
							'./res/html/h1/iconLevel_4.png',
							'./res/html/h1/iconLevel_5.png']}/>
				</div>
				<Spring delay={this.delayTime(7)} from={{opacity:0}} to={{opacity:1}}>
					{styles=>(
						<div style={styles} className="layerBox">
							<div className="questionTitle">
								<div className="titleLineLeft"></div>
								<div className="titleLineRight"></div>
								做出选择，预测你的2019出行关键词
							</div>
							<h2 className="layerTitle_2" style={{"marginBottom":"1.5rem"}}>开车疲劳时，你会选择听哪种类型的音乐提神？</h2>
							<div className={`questionButton ${this.state.clickId===0?"clicked ":""}${this.state.usemove?"makebigmove ":""}`} onClick={(e)=>{
								Question.setQuestion(1,0)
								this.setState({
									clickId:0,
									usemove:false,
								})
								this.handleClick(e)
							}}>A. 舒缓的钢琴曲</div>
							<div className={`questionButton ${this.state.clickId===1?"clicked ":""}${this.state.usemove?"makebigmove ":""}`} onClick={(e)=>{
								Question.setQuestion(1,1)
								this.setState({
									clickId:1,
									usemove:false,
								})
								this.handleClick(e)
							}}>B. 欢快的流行音乐</div>
							<div className={`questionButton ${this.state.clickId===2?"clicked ":""}${this.state.usemove?"makebigmove ":""}`} onClick={(e)=>{
								Question.setQuestion(1,2)
								this.setState({
									clickId:2,
									usemove:false,
								})
								this.handleClick(e)
							}}>C. 劲爆的摇滚电音</div>
						</div>
					)}
				</Spring>

			</div>
		);
	}
}
