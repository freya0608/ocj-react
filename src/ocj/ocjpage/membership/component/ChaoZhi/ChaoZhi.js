/**
 * Created by ${USER} on ${DATE}.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 动画callback只支持1.x版本的TransitionGroup
 */
import React,{Component} from 'react';
import './chao-zhi.css';
let imgulr = `${process.env.PUBLIC_URL}/imgs/`;

class ChaoZhi extends React.Component {
    static defaultProps = {
        ...Component.defaultProps
    }
    static propTypes = {}
    constructor(props){
        super(props);
        this.state = {};
        this.dom=React.createRef()

    }

    componentDidMount(){
        //this.dom.root=ReactDOM.findDOMNode(this);
    }
    render() {
        return (
            <div className="container">
                <img src={`${imgulr}/chaozhi.png`} alt="东方购物"/>
            </div>
        );
    }
}

export default ChaoZhi;
