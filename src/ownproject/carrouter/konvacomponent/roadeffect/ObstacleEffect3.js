/**_gsTransform
 * Created by admin on 2018/11/8.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import {TweenMax,Linear} from "gsap";
import {Image,Group} from 'react-konva'
import PropTypes from 'prop-types';
import {transformsizeToIphoneFor750,Question} from '../../tool/GetMapPoint'
import {Spring} from 'react-spring'
import {resSingleton} from '../../tool/ResLoader'
export default class extends React.PureComponent {
	static defaultProps = {
		...Component.defaultProps,
		nowPlayId:0,
	}
	static propTypes = {
		nowPlayId:PropTypes.number.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			"images":[],
			"opacity":0,

			id:6,
			x:3806,
			y:3472,
			zIndex:97,
		}
		this.infos=[{"img":"./res/effect/points.png","x":-100,"y":-100},{"img":"./res/effect/tips.png","x":120,"y":-50}];

		this.dom = React.createRef()
		this.domary=[];
		this.movetween=null;
		//事件绑定在es6中用于自定义事件props事件不适用
		this.infos.forEach((item,index)=>{
			resSingleton.get(item.img).then((img)=>{
				let widthsmp=transformsizeToIphoneFor750(img.width)
				let heightsmp=transformsizeToIphoneFor750(img.height)
				let imgobj={
					image:img.img,
					width:widthsmp,
					height:heightsmp,
					x:item.x,
					y:item.y,
					zIndex:item.zIndex,
				}
				let imgary=[...this.state.images]
				imgary.push(imgobj)
				this.setState({images:imgary})
			})
		})
	}

	//组件加载完毕
	componentDidMount() {
		this.dom.current.setZIndex(this.state.zIndex)
	}

	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.nowPlayId===prevState.id&&Question.carStep===prevState.id){
			return{
				opacity:1,
			}
		}else{
			return{
				opacity:0,
			}
		}
	}

	//组件将要卸载
	componentWillUnmount(){
		if(this.movetween)this.movetween.kill();this.movetween=null
	}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	componentDidUpdate(pProps, pState){
		if(Question.carStep===this.state.id){
			if(!this.movetween){
				let scale={scale:1,opacity:1}
				this.movetween=TweenMax.to(scale,2,{scale:1.2,delay:1,opacity:0,ease:Linear.easeNone,repeat:-1,onUpdate:()=>{
					if(this.domary[0]){
						this.domary[0].scale({x:scale.scale,y:scale.scale})
						this.domary[0].opacity(scale.opacity)
					}
				}})
			}
		}else{
			if(this.movetween)this.movetween.kill();this.movetween=null
		}
	}

	render() {
		return (
			<Spring to={{opacity:this.state.opacity}}>
				{(styles) => (
					<Group opacity={this.state.opacity} ref={this.dom} x={transformsizeToIphoneFor750(this.state.x)} y={transformsizeToIphoneFor750(this.state.y)}>
						{this.state.images.map((item,index)=>{
							return(
								<Image
									ref={(e)=>{
										this.domary[index]=e;
									}}
									key={index}
									offsetX={item.width/2}
									offsetY={item.height/2}
									opacity={styles.opacity}
									image={item.image}
									width={item.width}
									height={item.height}
									x={transformsizeToIphoneFor750(item.x)+item.width/2}
									y={transformsizeToIphoneFor750(item.y)+item.height/2}
								/>
							)})}
					</Group>
				)}
			</Spring>
		);
	}
}

