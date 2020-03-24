/**
 * Created by admin on 2018/10/30.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import {TweenMax,Linear} from "gsap";
//import PropTypes from 'prop-types';
import axios from 'axios'

import {resSingleton} from './tool/ResLoader'
import { Stage, Layer } from 'react-konva';
import './style.css'
import Map from './konvacomponent/Map'
import {Spring} from 'react-spring'
import {queuefunc,transformsizeToIphoneFor750,screenwidth,screenheight,Question,delaycallback,mapxy} from './tool/GetMapPoint'
/*基准750*/
/*htmlmodule*/
import TransitionHtml from './component/htmlComponent/TransitionHtml'
// import Loading from './component/Loading/Loading'
import './component/Loading/style.css'
// import MapHtml from './component/tipcompponent/MapHtml'
class index extends React.Component {
	static defaultProps = {
		...Component.defaultProps
	}
	static propTypes = {}

	constructor(props) {
		super(props)
		this.state = {
			carx:0,
			cary:0,
			angle:100,
			weather:"day",
			roadeffect:[],
			showAlert:-1,
			transform:"",
			carid:-1,
			loading:0,
			moveCar:true,
			loaded:false,
			loadedmovecomp:false,
			nowType:"",
			moveId:0,
			transback:false,
		}
		this.dom = React.createRef()
		//加载数据
		this.loadData=null;
		//car 步骤
		this.nowStep=0;
		//汽车所在步骤
		this.carStep=0;
		this.bindEvent=false;
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		this.analytics = this.analytics.bind(this);
		this.touchStart=this.touchStart.bind(this);
		this.touchEnd=this.touchEnd.bind(this);
		this.doanimate=this.doanimate.bind(this);
		this.onEvent=this.onEvent.bind(this);
		this.offEvent=this.offEvent.bind(this);
		this.ontouchmove=this.ontouchmove.bind(this);

		/*html*/
		this.htmlhandle=this.htmlhandle.bind(this);
		this.touchPos={
			x:0,y:0,time:0,
		}

		let w=5690;
		let h=8046;
		this.widthsmp=transformsizeToIphoneFor750(w)
		this.heightsmp=transformsizeToIphoneFor750(h)
	}

	touchStart(e){
		if(!this.loadData||Question.ismove){
			return;
		}
		this.touchPos.x=e.touches[0].clientX
		this.touchPos.y=e.touches[0].clientY
		this.touchPos.time=new Date().getTime()
		this.onEvent()
	}
	touchEnd(e){
		let endTime=new Date().getTime();
		let endx=e.changedTouches[0].clientX
		let endy=e.changedTouches[0].clientY
		if((endTime-this.touchPos.time)>500||Math.sqrt(Math.pow((endx-this.touchPos.x),2),Math.pow(endy-this.touchPos.y),2)<5){
			this.offEvent()
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
		if(lsdirection===2&&(this.nowStep+1<this.loadData.task.length)&&Question.cannextstep){
			Question.ismove=true;
			this.nowStep++;
			if(this.carStep<this.nowStep){
				this.carStep=this.nowStep;
				Question.carStep=this.carStep;
				this.setState({
					moveCar:true,
					moveId:this.nowStep,
					showAlert:-1,
				})
				delaycallback(this.nowStep).then(()=>{
					this.doanimate(this.nowStep,true)
				})
			}else{
				this.setState({
					showAlert:-1,
				})
				setTimeout(()=>{
					this.doanimate(this.nowStep,true)
				},1000)
			}

		}else if(lsdirection===1&&(this.nowStep-1>=1)){
			Question.ismove=true;
			this.nowStep--;
			this.setState({
				moveCar:false,
				showAlert:-1,
			})
			setTimeout(()=>{
				this.doanimate(this.nowStep,false)
			},1000)
		}
		this.offEvent()
		//play sound
		//console.log(123)
		//window.playsound("a"+this.nowStep)
	}
	doanimate(stepid,dir/*是否倒开*/,accelerate=false){
		/*this.setState({
			showAlert:-1,
		})*/
		let ary=[];
		if(dir){
			this.loadData.task[stepid].routers.forEach((item,i)=>{
				ary[i]=()=>{
					return this.analytics(transformsizeToIphoneFor750(item.x),transformsizeToIphoneFor750(item.y),false,item.weather,accelerate)
				}
			})
		}else{
			let tgar=[...this.loadData.task[stepid+1].routers];
			tgar.pop();
			tgar.reverse();
			let ntary=[[...this.loadData.task[stepid].routers].pop()]
			let lastary=tgar.concat(ntary);
			lastary.forEach((item,i)=>{
				ary[i]=()=>{
					return this.analytics(transformsizeToIphoneFor750(item.x),transformsizeToIphoneFor750(item.y),false,item.weather,accelerate)
				}
			})
		}
		return queuefunc(ary).then(()=>{
			let lenid=this.loadData.task[this.nowStep].routers.length-1;
			let types=this.loadData.task[this.nowStep].routers[lenid].type;
			this.setState({
				showAlert:this.nowStep,
				nowType:!types?"":types,
			})
		})
	}

	analytics(targetx,targety,nomove=false,weather="day",accelerate=false){
		return new Promise((resolve,reject)=>{
			let angle=Math.atan2(targety-this.state.cary,targetx-this.state.carx)*180/Math.PI;
			// let angdif=this.state.angle+angle_dif(angle,this.state.angle)
			let gotocar={
				x:this.state.carx,
				y:this.state.cary,
			}
			if(nomove){
				TweenMax.set(gotocar,{x:targetx,y:targety,roundProps:"x,y",onComplete:()=>{
					this.setState({
						carx:gotocar.x,
						cary:gotocar.y,
						weather:weather,
					})
					resolve();
				}})
			}else{
				//100像素0.5秒
				let duration=Number(Math.sqrt(Math.pow((targetx-gotocar.x),2),Math.pow(targety-gotocar.y),2)*.5/100).toFixed(3)
				if(accelerate)duration=duration/2
				this.setState({
					angle:angle
				})
				TweenMax.to(gotocar,duration,{x:targetx,y:targety,roundProps:"x,y",onUpdate:()=>{
					this.setState({
						carx:gotocar.x,
						cary:gotocar.y,
					})
				},onComplete:()=>{
					this.setState({
						carx:gotocar.x,
						cary:gotocar.y,
						weather:weather,
					})
					resolve();
				},ease:Linear.easeNone})
			}
		})
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
		window.document.getElementsByTagName("html")[0].setAttribute("style",`font-size:${Math.floor(window.screen.width*24/750)}px`)
		document.getElementById("base").addEventListener('touchmove', function (event) {
			event.preventDefault();
		});
		axios.get('./config/config.json?'+Math.random(), {}).then((res)=>{
			resSingleton.load(res.data.res,(loaded)=>{
				this.setState({
					"loading":loaded
				})
				if(window.loadingadd)window.loadingadd(loaded);
			},res.data.version).then(()=>{
				this.loadData=res.data;
				this.setState({
					"loading":100,
					"loaded":true,
					roadeffect:this.loadData.roadeffect,
				})
				let firstPos=this.loadData.task[this.nowStep].routers[0];
				this.analytics(transformsizeToIphoneFor750(firstPos.x),transformsizeToIphoneFor750(firstPos.y),true,"day","",false).then(()=>{
					this.setState({
						showAlert:0,
					})
				})
				if(window.playmove)window.playmove(()=>{
					this.setState({"loadedmovecomp":true})
				});

			})
		}).catch(function (error) {
			console.log(error);
		});
	}
	onEvent(){
		if(!this.bindEvent){
			this.bindEvent=true;
			//document.addEventListener('touchmove',this.ontouchmove, {capture:false});
			document.addEventListener('touchend',this.touchEnd, {capture:false});
		}
	}
	offEvent(){
		this.bindEvent=false;
		//document.removeEventListener('touchmove',this.ontouchmove, {capture:false});
		document.removeEventListener('touchend',this.touchEnd, {capture:false});
	}
	ontouchmove(e){

	}
	htmlhandle(type){
		let race;
		let obj={"showAlert":-1}
		switch (type){
			case "transform":
				obj.transform="ufo"
				race=true;
				break;
			case "chose":
				race=false;
				break;
			case "car0":
			case "car1":
			case "car2":
				obj.carid=Number(type.substr(-1));
				Question.carId=obj.carid;
				break;
			default:
				race=false;
				break;
		}
		this.nowStep++;
		if(this.carStep<this.nowStep){
			this.carStep=this.nowStep;
			Question.carStep=this.carStep;
			obj.moveCar=true;
			obj.moveId=this.nowStep;
		}else{
			obj.transform=""
			obj.moveCar=false;
		}
		this.setState(obj)
		delaycallback(this.nowStep).then(()=>{
			this.doanimate(this.nowStep,true,race).then(()=>{
				if(this.carStep!==7){//ufo变回来
					this.setState({
						"transform":"",
					})
				}else{
					this.setState({
						"transback":true,
					})
					setTimeout(()=>{
						this.setState({
							"transform":"",
							"transback":false,
						})
					},1500)
				}
			})
		})
	}
	render() {
		let pos=mapxy(this.state.carx,this.state.cary,this.widthsmp,this.heightsmp)
		return (
			<div
				id="base"
				onTouchStart={this.touchStart}
				style={{width:screenwidth,height:screenheight}}
				ref={this.dom}>
				{this.state.loaded&&(
					<div className="htmlContent" style={{width:screenwidth,height:screenheight}}>
						{
							this.state.weather==="night"&&(
								<div className="startDiv">
									<div className="starmovefinal starmovefinal0"><img src="./res/star.png" alt="" /></div>
									<div className="starmovefinal starmovefinal1"><img src="./res/star.png" alt="" /></div>
								</div>
							)
						}
						<Spring config={{duration:1500}} to={{opacity:`${this.state.weather!=='day'?0:1}`}}>
							{styles=>(
								<div style={styles} className="maskToLight"></div>
							)}
						</Spring>
					</div>)}
				<Stage width={screenwidth} height={screenheight}>
					<Layer name="control">
						{this.loadData&&(<Map
							x={pos.x}
							y={pos.y}
							transback={this.state.transback}
							carid={this.state.carid}
							moveId={this.state.moveId}
							moveCar={this.state.moveCar}
							nowid={this.state.showAlert}
							nowStep={this.nowStep}
							angle={this.state.angle}
							carx={this.state.carx}
							cary={this.state.cary}
							weather={this.state.weather}
							roadeffect={this.state.roadeffect}
							transform={this.state.transform}/>)}
					</Layer>
				</Stage>
				{this.state.loadedmovecomp&&(<TransitionHtml clickCallback={this.htmlhandle} showId={this.state.showAlert}/>)}
			</div>
		);
	}
}

export default index;
