/**
 * Created by admin on 2018/4/24.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 */
import React, {Component} from 'react';
import './style.css'
import PropTypes from 'prop-types';
import axios from 'axios'
import qs from 'qs';
class GameRule extends React.Component {
	static defaultProps = {
		...Component.defaultProps,
		alignLeft:false,
	}
	static propTypes = {
		alignLeft:PropTypes.bool,
		classname:PropTypes.string,
		imgbutton:PropTypes.string,
		gameid:PropTypes.string.isRequired,
	}

	constructor(props) {
		super(props)
		this.state = {
			"showInfo":false,
			"content":[],
		}
		//事件绑定在es6中用于自定义事件props事件不适用
		this.clicktoShow = this.clicktoShow.bind(this);
	}
	clicktoShow(e){
		this.setState({
			"showInfo":this.state.showInfo?false:true,
		},()=>{

		})
	}

	//组件将要装载
	//componentWillMount(){}
	//组件加载完毕
	componentDidMount(){

		axios.post("/restApi/getRuleContent",qs.stringify({
			"event_no":this.props.gameid,
			"rd":Math.random()
		})).then((res)=>{
			let data=res.data;
			if(data===""){
				return;
			}
			let ary=data.eventListVOs[0].content.split("\n");
			ary.unshift("活动规则")
			this.setState({
				"content":ary,
			})
		}).catch(function (error) {
			console.log(error);
		});
	}
	//组件将要卸载
	//componentWillUnmount(){}
	//组件将更新
	//componentWillUpdate(){}
	//组件更新完毕
	//componentDidUpdate(){}
	//shouldComponentUpdate(nextProps, nextState) {}
	//组件将接收道具
	// componentWillReceiveProps(nextProps){}
	render() {
		let names="buttonRule";
		if (this.props.classname){
			names=this.props.classname
		}else if(this.props.alignLeft){
			names="buttonRule left";
		}
		let buts="活动规则";
		if(this.props.imgbutton){
			buts=(<img alt="" src={this.props.imgbutton} />)
		}
		return (
			<div className="e-RuleContent">
				<div className="e-RuleBox" style={{"display":`${this.state.showInfo?"block":"none"}`}}>
					<div className="e-RuleMain">
						<div className="e-RuleClose" onClick={this.clicktoShow}></div>
						<div className="byContent" style={{"height":`${document.documentElement.clientHeight}px`}}>{
							this.state.content.map((item,i)=>{
								return(
									<p key={i}>{item}</p>
								)
							})
						}</div>
					</div>
				</div>
				<div onClick={this.clicktoShow} className={names}>{buts}</div>
			</div>
		);
	}
}

export default GameRule;
