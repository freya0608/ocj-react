/**_gsTransform
 * Created by admin on 2018/11/30.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
// import PropTypes from 'prop-types';
import {transformsizeToIphoneFor750} from '../tool/GetMapPoint'
import {resSingleton} from '../tool/ResLoader'
import {Group,Image} from 'react-konva'

export default class extends React.Component {
	static defaultProps = {
		...Component.defaultProps,
	}
	static propTypes = {}

	constructor(props) {
		super(props)
		this.state = {
			maparray:[]
		}
		this.dom = React.createRef()

		this.w=transformsizeToIphoneFor750(1138)
		this.h=transformsizeToIphoneFor750(1609)
		let funarray=[];
		for(let i=1;i<=25;i++){
			let it=String(i).length===1?"0"+i:i;
			funarray.push(
				resSingleton.get(`./res/map/images/map_${it}.png`).then((img)=>{
					return {
						image:img.img,
						width:this.w,
						height:this.h,
						x:this.w*((i-1)%5),
						y:this.h*(Math.floor((i-1)/5)),
					}
				}
			));
		}
		Promise.all(funarray).then((values)=>{
			this.setState({
				maparray:values
			})
		})
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		//this.handleClick = this.handleClick.bind(this);
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
	}

	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	//static getDerivedStateFromProps(nextProps, prevState){}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	//componentDidUpdate(prevProps, prevState){}

	render() {
		return (
			<Group>
				{this.state.maparray.map((item,index)=>{
					return(
						<Image
							key={index}
							image={item.image}
							width={item.width}
							height={item.height}
							x={item.x}
							y={item.y}
						/>)
				})}
			</Group>
		);
	}
}

