/**_gsTransform
 * Created by admin on 2018/11/18.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
import {TweenMax} from "gsap";
import PropTypes from 'prop-types';

import ChoseCar from './ChoseCar'
import Info1 from './Info1'
import Info2 from './Info2'
import Info3 from './Info3'
import Info4 from './Info4'
import ChoseRouter from './ChoseRouter'
import TransCar from './TransCar'
import Info7 from './Info7'
import Info8 from './Info8'
import Info9 from './Info9'
import Info10 from './Info10'
import Info11 from './Info11'
import Info12 from './Info12'
import Info13 from './Info13'
import Info14 from './Info14'
import Info15 from './Info15'
import Info16 from './Info16'
import InfoFinal from './InfoFinal'
import {screenwidth,screenheight} from '../../tool/GetMapPoint'

class TransitionHtml extends React.PureComponent {
	static defaultProps = {
		...Component.defaultProps,
		showId:-1,
	}
	static propTypes = {
		showId:PropTypes.number.isRequired,
		clickCallback:PropTypes.func,
	}

	constructor(props) {
		super(props)
		this.state = {
			showId:-1,
		}
		this.dom = React.createRef()
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		this.willLeave = this.willLeave.bind(this);
		this.willenter = this.willenter.bind(this);

		this.list=[
			ChoseCar,
			Info1,
			Info2,
			Info3,/*亲子指数*/
			Info4,/*共享汽车*/
			ChoseRouter,/*路线选择题*/
			TransCar,
			Info7,
			Info8,/*开车疲劳时，你会选择听哪种类型的音乐提神*/
			Info9,/*13-安全驾驶*/
			Info10,/*14-驾驶里程*/
			Info11,/*遇到他人强行超车，占据自己车道，你会作何选择？*/
			Info12,
			Info13,
			Info14,
			Info15,/*你对汽车是哪种呵护方式？*/
			Info16,
			InfoFinal,
		]
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
		TweenMax.set(this.dom.current,{z:0.01,"display":"none"})
		if(this.props.showId===-1){
			this.willLeave()
		}else{
			this.willenter()
		}
	}

	/*shouldComponentUpdate(nextProps, nextState) {}*/
	//组件将更新/新建
	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.showId!==prevState.showId&&nextProps.showId!==-1){
			return {
				showId:nextProps.showId,
			}
		}else {
			return{}
		}
	}

	//组件将要卸载
	//componentWillUnmount(){}

	//快照如果不需要 snapshot，则必须显示的返回 null
	getSnapshotBeforeUpdate(props, state){
		if(this.props.showId===-1){
			this.willLeave()
		}else{
			this.willenter()
		}
		return null
	}
	//组件更新完毕
	componentDidUpdate(nextProps, nextState){}
	willLeave(){
		TweenMax.to(this.dom.current,.8,{opacity:0,delay:.1,onComplete:()=>{
			TweenMax.set(this.dom.current,{"display":"none"})
		}})
	}
	willenter(){
		if(this.state.showId===17){
			TweenMax.set(this.dom.current,{opacity:0,y:0,x:0,"display":"block"})
			TweenMax.to(this.dom.current,.8,{delay:.1,opacity:1})
		}else{
			TweenMax.set(this.dom.current,{opacity:0,y:100,x:0,"display":"block"})
			TweenMax.to(this.dom.current,.8,{delay:.1,opacity:1,y:0,x:0})
		}
	}

	render() {
		let Atems=this.list[this.state.showId]
		return (
			<div className="transitionPar" style={{width:screenwidth,height:screenheight}}>
				<div className="transitionParMove" ref={this.dom}>
					{Atems&&<Atems showId={this.state.showId} clickCallback={this.props.clickCallback}></Atems>}
				</div>
			</div>
	);
	}
}

export default TransitionHtml;
