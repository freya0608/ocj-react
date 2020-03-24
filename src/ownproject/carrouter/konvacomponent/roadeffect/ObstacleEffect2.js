/**_gsTransform
 * Created by admin on 2018/11/8.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
// import {TweenMax} from "gsap";
import {Image,Group} from 'react-konva'
import PropTypes from 'prop-types';
import {Spring} from 'react-spring'

import {transformsizeToIphoneFor750} from '../../tool/GetMapPoint'
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

			id:5,
			x:4566,
			y:3002,
			zIndex:98,
		}
		this.infos=[{"img":"./res/line0.png","x":-120,"y":10},{"img":"./res/line1.png","x":-23,"y":-10}];

		this.dom = React.createRef()
		this.domary=[];
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

/*
		this.alphaMove1={op:0}
		this.alphaMove2={op:0}
		this.tmx0=null;
		this.tmx1=null;
*/
	}

	//组件加载完毕
	componentDidMount() {
		this.dom.current.setZIndex(this.state.zIndex)
	}

	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.nowPlayId===prevState.id){
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
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	/*componentDidUpdate(nextProps, nextState){
		if(this.props.nowPlayId===this.state.id){
			if(this.tmx0)this.tmx0.kill();this.tmx0=null;
			if(this.tmx1)this.tmx1.kill();this.tmx1=null;
			TweenMax.to(this.alphaMove1,1,{op:1,onUpdate:()=>{
				this.domary[0].opacity(this.alphaMove1.op)
			}})
			TweenMax.to(this.alphaMove2,1,{op:1,delay:.5,onUpdate:()=>{
				this.domary[1].opacity(this.alphaMove2.op)
			}})
		}else{
			if(!this.tmx0){
				let aq=Question.question[0];
				this.tmx0=TweenMax.to(this.alphaMove1,.4,{op:0,yoyo:true,repeat:2,onUpdate:()=>{
					this.domary[aq].opacity(this.alphaMove1.op)
				},onComplete:()=>{
					if(!this.tmx1){
						this.tmx1=TweenMax.to(this.alphaMove2,1,{op:0,onUpdate:()=>{
							this.domary[Math.abs(aq-1)].opacity(this.alphaMove2.op)
						}})
					}
				}})
			}

		}
	}*/

	render() {
		return (
			<Spring to={{opacity:this.state.opacity}}>
				{(styles) => (
					<Group opacity={styles.opacity} ref={this.dom} x={transformsizeToIphoneFor750(this.state.x)} y={transformsizeToIphoneFor750(this.state.y)}>
						{this.state.images.map((item,index)=>{
							return(
								<Image
									key={index}
									ref={(e)=>{
										this.domary[index]=e;
									}}
									image={item.image}
									width={item.width}
									height={item.height}
									x={transformsizeToIphoneFor750(item.x)}
									y={transformsizeToIphoneFor750(item.y)}
								/>)
						})}
					</Group>
				)}
			</Spring>
		);
	}
}

