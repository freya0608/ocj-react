/**_gsTransform
 * Created by admin on 2018/11/16.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import './htmlStyle.css'
import {Spring,animated,interpolate} from 'react-spring'
class ChoseCar extends React.Component {
	static defaultProps = {
		...Component.defaultProps
	}
	static propTypes = {
		clickCallback:PropTypes.func
	}

	constructor(props) {
		super(props)
		this.state = {
			nochose:-1,
			playid:0,
			canclick:false,
		}
		this.dom = React.createRef()
		this.isFirst=true;
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		this.handleClick = this.handleClick.bind(this);
		this.clickToChoseCar = this.clickToChoseCar.bind(this);
		this.delayTime = this.delayTime.bind(this);
	}
	handleClick(e){
		e.preventDefault();
		if(this.isFirst){
			this.isFirst=false;
			window.playsound("start");
			this.props.clickCallback&&this.props.clickCallback("car"+this.state.nochose)
		}
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
		setTimeout(()=>{
			this.setState({
				"nochose":1,
				canclick:true,
			})
		},this.delayTime(6))
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.showId===this.state.playid){
			return true;
		}else {
			return false;
		}
	}
	//组件将更新/新建
	//static getDerivedStateFromProps(nextProps, prevState){}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	//componentDidUpdate(nextProps, nextState){}
	clickToChoseCar(id){
		if(!this.state.canclick){
			return false;
		}
		this.setState({
			nochose:id,
		})
	}
	delayTime=(i)=>{
		if(this.state.nochose!==-1){
			return 0;
		}else{
			return i*300+500;
		}

	}
	render() {
		return (
			<div className="htmlinfo">
				<div className="carchose">
					<Spring native delay={this.delayTime(0)} from={{opacity:0}} to={{opacity:1}}>
						{sty=>(<animated.p style={sty} className="title">恭喜您喜提爱车一辆!</animated.p>)}
					</Spring>
					<Spring native delay={this.delayTime(1)} from={{opacity:0}} to={{opacity:1}}>
						{sty=>(<animated.p style={sty} className="title">现在请选择您的专属座驾</animated.p>)}
					</Spring>
					<Spring native delay={this.delayTime(2)} from={{opacity:0}} to={{opacity:1}}>
						{sty=>(<animated.p style={sty} className="smallTitle">安吉星为通用旗下品牌提供车联服务</animated.p>)}
					</Spring>
				</div>
				<div className="choseBoxPar">
					<Spring native delay={this.delayTime(3)} from={{opacity:0,y:50,scale:1}} to={{opacity:1,y:0,scale:`${this.state.nochose===0?1.1:1}`}}>
						{({opacity,y,scale})=>(<div className="choseBox" onClick={(e)=>{e.preventDefault();this.clickToChoseCar(0)}}>
							<div><img alt="" src="./res/html/h0/4.png" /></div>
							<animated.div style={{
								opacity,
								transform:interpolate([y,scale],(y,scale)=>`translate3d(0,${y}px,0) scale(${scale})`)
							}}><img alt="" src="./res/html/h0/5.png" /></animated.div>
							<div style={{
								opacity:`${this.state.nochose===0?1:0}`
							}} className="maskButton"><img alt="" src="./res/html/h0/mask.png" /></div>
						</div>)}
					</Spring>
					<Spring native delay={this.delayTime(4)} from={{opacity:0,y:50,scale:1}} to={{opacity:1,y:0,scale:`${this.state.nochose===1?1.1:1}`}}>
						{({opacity,y,scale})=>(<div className="choseBox" onClick={(e)=>{e.preventDefault();this.clickToChoseCar(1)}}>
							<div><img alt="" src="./res/html/h0/0.png" /></div>
							<animated.div style={{
								opacity,
								transform:interpolate([y,scale],(y,scale)=>`translate3d(0,${y}px,0) scale(${scale})`)
							}}><img alt="" src="./res/html/h0/1.png" /></animated.div>
							<div style={{
								opacity:`${this.state.nochose===1?1:0}`
							}} className="maskButton"><img alt="" src="./res/html/h0/mask.png" /></div>
						</div>)}
					</Spring>
					<Spring native delay={this.delayTime(5)} from={{opacity:0,y:50,scale:1}} to={{opacity:1,y:0,scale:`${this.state.nochose===2?1.1:1}`}}>
						{({opacity,y,scale})=>(<div className="choseBox" onClick={(e)=>{e.preventDefault();this.clickToChoseCar(2)}}>
							<div><img alt="" src="./res/html/h0/2.png" /></div>
							<animated.div style={{
								opacity,
								transform:interpolate([y,scale],(y,scale)=>`translate3d(0,${y}px,0) scale(${scale})`)
							}}><img alt="" src="./res/html/h0/3.png" /></animated.div>
							<div style={{
								opacity:`${this.state.nochose===2?1:0}`
							}} className="maskButton"><img alt="" src="./res/html/h0/mask.png" /></div>
						</div>)}
					</Spring>
				</div>
				<div onClick={this.handleClick} style={{display:this.state.nochose!==-1?"block":"none"}} className="clickToChose">
					确认选择,开启旅程
				</div>
			</div>
		);
	}
}

export default ChoseCar;
