/**_gsTransform
 * Created by admin on 2018/11/2.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
// import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import {Sprite} from 'react-konva'
import {transformsizeToIphoneFor750} from '../tool/GetMapPoint'
import People from './animate/PeopleMoveCar'
import {Spring} from 'react-spring'

// import arrow from '../res/arrow.png'
import {resSingleton} from '../tool/ResLoader'


class Car extends React.Component {
	static defaultProps = {
		...Component.defaultProps,
		x:0,
		y:0,
		nowStep:0,
		angle:0,
		carbg:"./res/car.png",
		moveCar:true,
	}
	static propTypes = {
		x:PropTypes.number.isRequired,
		y:PropTypes.number.isRequired,
		angle:PropTypes.number.isRequired,
		carheight:PropTypes.number.isRequired,
		nowStep:PropTypes.number.isRequired,
		moveId:PropTypes.number.isRequired,
		carwidth:PropTypes.number.isRequired,
		carbg:PropTypes.string.isRequired,
		moveCar:PropTypes.bool.isRequired,
		weather:PropTypes.string,
		animations:PropTypes.object.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			image:null,
			x:0,
			y:0,
			width:1,
			height:1,
			scale:1,

			effect:"",
			peopleX:4111,
			peopleY:2807,
			opacity:1,
			/*move*/
			showPeopleMove:true,
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		this.angleGetDirection = this.angleGetDirection.bind(this);
		this.getOffsetXy = this.getOffsetXy.bind(this);
		this.firstPlaymove=true;//播放一次开门动画
		resSingleton.get(this.props.carbg).then((img)=>{
			let widthsmp=transformsizeToIphoneFor750(this.props.carwidth)
			this.setState({
				image:img.img,
				width:this.props.carwidth,
				height:this.props.carheight,
				scale:widthsmp/this.props.carwidth/3,//图片过大。缩小一倍
			})
		})
	}
	angleGetDirection(angle,effect=""){
		/*
		 * 1：左下角
		 * 2：右上角
		 * 3：左上角
		 * 4：右下角
		 * */
		if(effect!==""){
			return effect;
		}else{
			let lsdirection;
			if (angle >= 0 && angle < 90) {
				lsdirection = this.props.weather+"-right";
			} else if (angle >= 90 && angle < 180) {
				lsdirection = this.props.weather+"-down";
			} else if (angle >= -90 && angle < 0) {
				lsdirection = this.props.weather+"-up";
			} else if ((angle >= -180 && angle < -90)) {
				lsdirection = this.props.weather+"-left";
			}
			return lsdirection;
		}
	}
	getOffsetXy(getdec){
		let obj={x:this.state.width/2,y:this.state.height/2}
		switch (getdec){
			case "night-down":
				obj.x=416-this.state.width/2;
				break;
			default:
				break;
		}
		return obj;
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if(nextProps.moveCar){
			return true
		}else{
			return false
		}
	}
	//组件将更新/新建
	// static getDerivedStateFromProps(nextProps, prevState){}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	openDoorToGoCar(){
		this.setState({
			effect:"opendoor",
			peopleX:4111+Math.floor(Math.cos(Math.PI*40/180)*50),
			peopleY:2807-Math.floor(Math.sin(Math.PI*40/180)*50),
			opacity:0,
		})
		setTimeout(()=>{
			this.setState({
				effect:"",
				showPeopleMove:false,
			})
		},2000)
	}
	//组件更新完毕
	componentDidUpdate(prevProps, prevState){
		if(this.props.moveId===5&&this.firstPlaymove){
			this.firstPlaymove=false;//播放开门上车动画
			this.openDoorToGoCar()
		}
	}

	render() {
		let getdec=this.angleGetDirection(this.props.angle,this.state.effect);
		let offsets=this.getOffsetXy(getdec);
		return (
			<React.Fragment>

				<Sprite
					offsetX={offsets.x}
					offsetY={offsets.y}
					scaleX={this.state.scale}
					scaleY={this.state.scale}
					fill={"rgba(0,0,0,0"}
					x={this.props.x}
					y={this.props.y}
					animation={getdec}
					animations={this.props.animations}
					image={this.state.image}
					ref={this.dom}/>
				{this.state.showPeopleMove&&<Spring delay={500} config={{duration:1000}} to={{opacity:this.state.opacity,x:this.state.peopleX,y:this.state.peopleY}}>
					{
						styles=>(
							<People opacity={styles.opacity} x={styles.x} y={styles.y}/>
						)
					}
				</Spring>}
			</React.Fragment>
		);
	}
}

export default Car;
