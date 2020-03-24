/**_gsTransform
 * Created by admin on 2018/11/26.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import {Spring,animated} from 'react-spring'
import '../layer.css'
export default class Histogram extends React.Component {
	static defaultProps = {
		...Component.defaultProps,
		isBig:false,
	}
	static propTypes = {
		iconarray:PropTypes.array.isRequired,
		histogramarray:PropTypes.array.isRequired,
		numarray:PropTypes.array.isRequired,
		stringarray:PropTypes.array.isRequired,
		delaynum:PropTypes.number.isRequired,
		isBig:PropTypes.bool.isRequired,
		isSmall:PropTypes.bool,
		parclass:PropTypes.string,
		leftSpace:PropTypes.number,
		rightImage:PropTypes.string,
		rightImageClass:PropTypes.string,
	}

	constructor(props) {
		super(props)
		this.state = {}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		//this.handleClick = this.handleClick.bind(this);
	}
	delayTime=(i)=>{
		return i*300+500;
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
		let parclass=this.props.isBig?"stripListBig":""
		parclass=this.props.isSmall?"stripListSmall":parclass
		if(this.props.parclass)parclass=this.props.parclass
		let max = Math.max.apply(null, this.props.numarray)
		let already=false;
		let leftspace=null;
		let delaya=0;
		let delayb=0;
		if(this.props.leftSpace){
			leftspace=[]
			for(let i=0;i<this.props.leftSpace;i++){
				leftspace.push(
					<li key={i}></li>
				)
			}
			delaya=1;
			delayb=this.props.delaynum;
		}else{
			delayb=this.props.iconarray.length+this.props.delaynum;
		}
		return (
			<ul className={`stripList ${parclass}`}>
				{leftspace}
				{this.props.iconarray.map((items,index)=>{
					let className=""
					if(max===this.props.numarray[index]&&!already){
						already=true;
						className="itemHighest";
					}
					return(
						<li key={index*3+5} className={className}>
							<Spring native delay={this.delayTime(this.props.delaynum+index+delaya)} from={{y:100,opacity:0}} to={{y:0,opacity:1}}>
								{({y,opacity})=>(
									<div>
										<div className="stripBox">
											<animated.div style={{
												transform:y.interpolate(y=>`translate3d(0,${y}%,0)`),
												opacity:opacity}}>
												<div className="stripImg"><img alt="" src={this.props.histogramarray[index]}/></div>
												<div className="stripNum">{this.props.numarray[index]}</div>
												<div className="stripBlock">
													{items!==""&&(
														<div className="stripIcon"><img alt="" src={items}/></div>
													)}
												</div>
											</animated.div>
										</div>
										<animated.p style={{opacity:opacity}} className="stripName">{this.props.stringarray[index]}</animated.p>
									</div>
								)}
							</Spring>
						</li>
					)
				})}
				{this.props.rightImage&&(
					<Spring native delay={this.delayTime(delayb)} from={{opacity:0}} to={{opacity:1}}>
						{
							styles=>(<animated.div style={styles} className={this.props.rightImageClass}><img alt="" src={this.props.rightImage}/></animated.div>)
						}
					</Spring>
				)}
			</ul>
		);
	}
}

