/**_gsTransform
 * Created by admin on 2018/11/22.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
//import ReactDOM from 'react-dom';
//import {TweenMax} from "gsap";
import PropTypes from 'prop-types';
import {Spring} from 'react-spring'
import './style.css'
import {screenwidth,screenheight} from '../../tool/GetMapPoint'
class Loading extends React.Component {
	static defaultProps = {
		...Component.defaultProps,
		num:0,
	}
	static propTypes = {
		num:PropTypes.number.isRequired,
		loaded:PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			num:0,
		}
		this.dom = React.createRef()
		this.interval=null;
		//React.createRef();current
		//事件绑定在es6中用于自定义事件props事件不适用
		this.movecomp = this.movecomp.bind(this);
	}

	//组件加载完毕
	componentDidMount() {
		//this.dom.root=ReactDOM.findDOMNode(this);
		this.interval=setInterval(()=>{
			this.setState({
				num:Math.min(this.state.num+1,100)
			})
		},1000)
	}

	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将更新/新建
	static getDerivedStateFromProps(nextProps, prevState){
		if(nextProps.num>prevState.num){
			return {
				num:Math.floor(nextProps.num)
			}
		}else{
			return{}
		}
	}

	//组件将要卸载
	componentWillUnmount(){
		if(this.interval){
			clearInterval(this.interval)
			this.interval=null;
		}
	}

	//快照如果不需要 snapshot，则必须显示的返回 null
	//getSnapshotBeforeUpdate(props, state){}
	//组件更新完毕
	//componentDidUpdate(prevProps, prevState){}
	movecomp(){
		if(this.props.num===100){
			if(this.interval){
				clearInterval(this.interval)
				this.interval=null;
			}
			if(this.props.loaded)this.props.loaded()
		}
	}
	render() {
		return (
			<Spring onRest={this.movecomp} to={{num:this.state.num}}>
				{
					(styles)=>{
						return (<div style={{width:screenwidth,height:screenheight}} className="loading">
							<div style={{width:`${styles.num}%`}} className="loadingIn"></div>
							<p>{Math.floor(styles.num)}%</p>
						</div>)
					}
				}
			</Spring>
		);
	}
}

export default Loading;
