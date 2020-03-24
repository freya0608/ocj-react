/**_gsTransform
 * Created by admin on 2018/11/2.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
// import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import {Group} from 'react-konva'
import {screenheight} from '../tool/GetMapPoint'
import Car1 from './car/Car0'
import Car2 from './car/Car1'
import Car0 from './car/Car2'
import Ufo from './Ufo'
import Obstacle from './Obstacle'

// import People from './animate/People'
import PlayBall from './animate/PlayBall'
import Girl from './animate/Girl'
// import Boy from './animate/Boy'
import PeopleHb from './animate/PeopleHb'

//小车
import NxCar from './animate/NxCar'
import NxCarLight from './animate/NxCarLight'

import ObstacleEffect1 from './roadeffect/ObstacleEffect1'
import ObstacleEffect2 from './roadeffect/ObstacleEffect2'
import ObstacleEffect3 from './roadeffect/ObstacleEffect3'
// import ObstacleEffect4 from './roadeffect/ObstacleEffect4'
import ObstacleEffect5 from './roadeffect/ObstacleEffect5'
// import ObstacleEffect6 from './roadeffect/ObstacleEffect6'
import ObstacleEffectPeopleMove from './roadeffect/ObstacleEffectPeopleMove'
import ObstacleEffectBoy from './roadeffect/ObstacleEffectBoy'
// import ObstacleEffect7 from './roadeffect/ObstacleEffect7'
// import ObstacleEffect8 from './roadeffect/ObstacleEffect8'
import ObstacleEffect9 from './roadeffect/ObstacleEffect9'

import MapCut from './MapCut'

class Map extends React.Component {
	static defaultProps = {
		...Component.defaultProps,
		carx:0,
		cary:0,
		nowid:0,
		mapbg:"./res/mappng-min.png",
		weather:"day",
		angle:0,
		transform:"",
		transback:false,
		moveCar:true,
	}
	static propTypes = {
		x:PropTypes.number.isRequired,
		y:PropTypes.number.isRequired,
		carx:PropTypes.number.isRequired,
		cary:PropTypes.number.isRequired,
		angle:PropTypes.number.isRequired,
		carid:PropTypes.number.isRequired,
		moveId:PropTypes.number.isRequired,//滑动后的动画id
		nowid:PropTypes.number.isRequired,
		nowStep:PropTypes.number.isRequired,
		mapbg:PropTypes.string.isRequired,
		weather:PropTypes.string.isRequired,
		clickCallback:PropTypes.func,
		transform:PropTypes.string,
		moveCar:PropTypes.bool.isRequired,
		transback:PropTypes.bool.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		this.handleClick = this.handleClick.bind(this);

		this.roadeffect=[
			null,
			ObstacleEffect1,
			ObstacleEffectPeopleMove,
			ObstacleEffectBoy,
			null,
			ObstacleEffect2,
			ObstacleEffect3,
			null,// ObstacleEffect4,
			null,
			ObstacleEffect5,
			null,// ObstacleEffect6,
			null,
			null,// ObstacleEffect7,
			null,// ObstacleEffect8,
			null,
			(screenheight<600?null:ObstacleEffect9),
		]
		this.obstacleList=[
			// People,
			PlayBall,
			Girl,
			// Boy,
			PeopleHb,
		]
		this.obslist=[
			{x:4568,y:644,img:'./res/obstacle/0.png'},
			{x:4209,y:1172,img:'./res/obstacle/1.png'},
			{x:3460,y:2421,img:'./res/obstacle/2.png'},
			{x:4232,y:2822,img:'./res/obstacle/3.png'},
			{x:3710,y:3165,img:'./res/obstacle/4.png'},
			{x:3733,y:3588,img:'./res/obstacle/5.png'},
			{x:3105,y:3541,img:'./res/obstacle/6.png'},
			{x:3002,y:3996,img:'./res/obstacle/7.png'},
			{x:1435,y:4885,img:'./res/obstacle/8.png'},
			{x:1196,y:5047,img:'./res/obstacle/9.png'},
			{x:531,y:5386,img:'./res/obstacle/10.png'},
			{x:572,y:5736,img:'./res/obstacle/11.png'},
			{x:1238,y:6125,img:'./res/obstacle/12.png'},
			// {x:2703,y:6613,img:'./res/obstacle/13.png'},
			{x:2575,y:6893,img:'./res/obstacle/14.png'},
			{x:2991,y:7146,img:'./res/obstacle/15.png'},
			{x:3618,y:7491,img:'./res/obstacle/16.png'},
			{x:3863,y:7362,img:'./res/obstacle/17.png'},
		];
	}
	handleClick(e){
		// let transform = e.target.getParent().getAbsoluteTransform().copy();
		let transform = e.currentTarget.getAbsoluteTransform().copy();
		transform.invert();
		let circlePos = transform.point(e.target.getStage().getPointerPosition());
		let targetX=circlePos.x;
		let targetY=circlePos.y;
		this.props.clickCallback(targetX,targetY);
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
	}

	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	// static getDerivedStateFromProps(nextProps, prevState){}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	// componentDidUpdate(nextProps, nextState){}

	render() {
		let cars=null;
		if(this.props.transform==="ufo"){
			cars=(
				<Ufo moveCar={this.props.moveCar}
				     transback={this.props.transback}
				     y={this.props.cary}
				     x={this.props.carx}/>
			)
		}else{
			switch (this.props.carid){
				case 0:
					cars=(<Car0
						moveId={this.props.moveId}
						nowStep={this.props.nowid}
						moveCar={this.props.moveCar}
						weather={this.props.weather}
						angle={this.props.angle}
						x={this.props.carx} y={this.props.cary}/>)
					break;
				case 1:
					cars=(<Car1
						moveId={this.props.moveId}
						nowStep={this.props.nowid}
						moveCar={this.props.moveCar}
						weather={this.props.weather}
						angle={this.props.angle}
						x={this.props.carx} y={this.props.cary}/>)
					break;
				case 2:
					cars=(<Car2
						moveId={this.props.moveId}
						nowStep={this.props.nowid}
						moveCar={this.props.moveCar}
						weather={this.props.weather}
						angle={this.props.angle}
						x={this.props.carx} y={this.props.cary}/>)
					break;
				default:
					break;
			}
		}
		return (
			<Group x={this.props.x} y={this.props.y}>
				<MapCut/>
				{
					this.obstacleList.map((ObstacleMove,index)=>{
						return (<ObstacleMove key={index}/>)
					})
				}
				{cars}
				{
					this.obslist.map((jsons,index)=>{
						return(<Obstacle key={index+50} x={jsons.x} y={jsons.y} zIndex={index+50} img={jsons.img}/>)
					})
				}
				{
					this.roadeffect.map((Obstacle,index)=>{
						if(Obstacle&&Math.abs(this.props.nowStep-index)<=1){
							return (<Obstacle nowPlayId={this.props.nowid} key={index+100}/>)
						}else{
							return null
						}
					})
				}
				<NxCar/>
				<NxCarLight/>
			</Group>
		);
	}
}

export default Map;
