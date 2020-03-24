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

class ChoseRouter extends React.Component {
	static defaultProps = {
		...Component.defaultProps
	}
	static propTypes = {
		clickCallback:PropTypes.func
	}

	constructor(props) {
		super(props)
		this.state = {
			playid:5,
			usemove:false,
			clickId:-1,
		}
		this.dom = React.createRef()
		this.timeOut=null;
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		this.handleClick = this.handleClick.bind(this);
		this.dofirst=true;
		this.ontouchstart=this.ontouchstart.bind(this);
		this.ontouchend=this.ontouchend.bind(this);
		this.touchPos={
			x:0,y:0,time:0,
		}
	}
	handleClick(e){
		e.preventDefault();
		if(!this.dofirst){
			return;
		}
		Question.ismove=true;
		window.playsound("chosebutton");
		if(this.timeOut){
			clearTimeout(this.timeOut);
			this.timeOut=null;
		}
		this.timeOut=setTimeout(()=>{
			this.dofirst=false;
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
	/*static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.showId===prevState.playid){
			return{
				y:0,
				opacity:1,
			}
		}else{
			return{
				y:100,
				opacity:0,
			}
		}
	}	*/
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
					<Spring native delay={this.delayTime(0)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<animated.h1 style={styles} className="layerTitle_1 smallsize">凯迪拉克车主最具冒险精神，不走寻常路</animated.h1>
						)}
					</Spring>
					<Spring native delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{styles=>(
							<animated.p style={styles} className="layerText txMarBottom">路线规律指数:由车主出行路线得出，指数越高，驾驶路线越规律</animated.p>
						)}
					</Spring>
					<Histogram
						delaynum={2}
						numarray={[52,48,56]}
						stringarray={["别克","凯迪拉克","雪佛兰"]}
						histogramarray={[
							'./res/html/h5/imgStrip_1.png',
							'./res/html/h5/imgStrip_2.png',
							'./res/html/h5/imgStrip_3.png',
						]}
						rightImage="./res/html/h5/imgStrip.png"
						rightImageClass="stripListImg_2"
						iconarray={[
							'./res/html/h5/iconLevel_1.png',
							'./res/html/h5/iconLevel_2.png',
							'./res/html/h5/iconLevel_3.png',
						]}/>
				</div>
				<Spring native delay={this.delayTime(5)} from={{y:100,opacity:0}} to={{y:0,opacity:1}}>
					{({y,opacity})=>(
						<animated.div style={{
							transform:y.interpolate(y=>`translate3d(0,${y}px,0)`),opacity:opacity
						}} className="layerBox">
							<div className="questionTitle">
							<div className="titleLineLeft"></div>
							<div className="titleLineRight"></div>
							做出选择，预测你的2019出行关键词
							</div>
							<h2 className="layerTitle_2" style={{marginBottom:"1rem"}}>前面有两条路，一条是常走的路线，一条是新开辟的路线，你会选择哪条路？</h2>
							<div className={`questionButton ${this.state.usemove?"makebigmove ":""}${this.state.clickId===0?"clicked":""}`} onClick={(e)=>{
								Question.setQuestion(0,0)
								this.setState({
									usemove:false,
									clickId:0,
								})
								this.handleClick(e)
							}}>A. 常规路线，更熟悉一点</div>
							<div className={`questionButton ${this.state.usemove?"makebigmove ":""}${this.state.clickId===1?"clicked":""}`} onClick={
								(e)=>{
									Question.setQuestion(0,1)
									this.setState({
										usemove:false,
										clickId:1,
									})
									this.handleClick(e)
								}
							}>B. 新路线，探索新风景</div>
						</animated.div>
					)}
				</Spring>

			</div>
		);
	}
}

export default ChoseRouter;
