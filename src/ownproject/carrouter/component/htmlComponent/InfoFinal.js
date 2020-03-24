/**_gsTransform
 * Created by admin on 2018/11/16.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import './htmlStyle.css'
import {Question,screenwidth,screenheight} from '../../tool/GetMapPoint'
import {Spring} from 'react-spring'
import {resSingleton} from '../../tool/ResLoader'

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
			playid:17,
			alpha:0,
			display:"none",
			showwx:false,
			img:null,
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		this.handleClick = this.handleClick.bind(this);

		resSingleton.get("./res/html/final/bg.jpg").then((img)=>{
			this.setState({
				img:img.img.src
			})
		})
	}
	handleClick(e){
		e.preventDefault();
		this.props.clickCallback&&this.props.clickCallback("transform")
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
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
		let carimg;
		let carbottom;
		let carname="";
		let carslg="";
		let width=50;
		let imgurl=`./res/html/final/out/${Question.analysis()}.png`;
		switch (Question.carId){
			case 0:
				carimg=(<img alt="" src="./res/html/final/xufulanlogo.png" />);
				carbottom=(<img alt="" src="./res/html/final/xuefulan.png" />);
				carname="---雪佛兰"
				carslg="梦.创未来"
				width=53.6
				break;
			case 1:
				carimg=(<img alt="" src="./res/html/final/kaidilakelogo.png" />);
				carbottom=(<img alt="" src="./res/html/final/kaidilake.png" />);
				carname="---凯迪拉克"
				carslg="所有的伟大，都源于一个勇敢的开始"
				width=50.7
				break;
			case 2:
				carimg=(<img alt="" src="./res/html/final/biekelogo.png" />);
				carbottom=(<img alt="" src="./res/html/final/bieke.png" />);
				carname="---别克"
				carslg="心静 思远 志行千里"
				width=24
				break;
			default:
				carimg=null;
				carbottom=null;
				break;
		}
		return (
			<div>
				<Spring from={{opacity:0}} to={{opacity:1}}>
					{
						styles=>(
							<div className="htmlfinal" style={{width:screenwidth,height:screenheight, opacity:styles.opacity,
								backgroundImage:`url(${this.state.img})`,
							}}>
								<Spring delay={300} from={{opacity:0}} to={{opacity:1}}>
									{styles1=>(<div style={styles1} className="slglast"><img alt="" src="./res/html/final/slg.png" /></div>)}
								</Spring>
								<Spring delay={300*2} from={{opacity:0}} to={{opacity:1}}>
									{styles1=>(<div className="carlogo" style={{opacity:styles1.opacity,width:`${width}%`,left:`${(100-width)/2}%`}}>{carimg}</div>)}
								</Spring>
								<Spring delay={300*3} from={{opacity:0}} to={{opacity:1}}>
									{styles1=>(
										<div style={styles1} className="slgtext">
											<p>{carslg}</p>
											<p>{carname}</p>
										</div>
									)}
								</Spring>
								<Spring delay={300*4} from={{opacity:0}} to={{opacity:1}}>
									{styles1=>(
										<div style={styles1} className="makeImage" onClick={(e)=>{
											this.setState({
												alpha:1,
												display:"block"
											})
										}}><img alt="" src="./res/html/final/makeimg.png" /></div>
									)}
								</Spring>
								<div className="startDiv">
									<div className="starmovefinal starmovefinal0"><img src="./res/star.png" alt="" /></div>
									<div className="starmovefinal starmovefinal1"><img src="./res/star.png" alt="" /></div>
								</div>
								<div className="carbuttom">{carbottom}</div>
							</div>
						)
					}
				</Spring>
				<Spring to={{alpha:this.state.alpha}}>
					{
						(styles)=>(
							<div className="maskshadow" style={{
								display:this.state.display,
								opacity:styles.alpha,
								width:screenwidth,
								height:screenheight}}>
								<img alt="" src="./res/html/final/shadow.jpg" />
								<div className="flexLast">
									<div className="lastAlert">
										<img alt="" src={imgurl} />
									</div>
									<div className="downlist">
										<div className="downlistButton"><a href={`${window.location.href}`}><img alt="" src="./res/html/final/playagain.png" /></a></div>
										<div className="downlistButton"><img alt="" src="./res/html/final/download.png" /></div>
										<div className="downlistButton" onClick={()=>{
											this.setState({
												showwx:true,
											})
										}}><img alt="" src="./res/html/final/share.png" /></div>
									</div>
								</div>
							</div>
						)
					}
				</Spring>
				<div onClick={(e)=>{
					this.setState({
						showwx:false,
					})
				}} style={{display:`${this.state.showwx?"block":"none"}`}} className="finalalertMask">
					<div className="shareAlert">
						<img src="./res/html/final/sharestart.png" alt="" />
						<div className="satellite"><img src="./res/html/final/satellite.png" alt="" /></div>
					</div>
				</div>

			</div>
		);
	}
}
