
import React,{Component} from 'react';
import './mai-yi.css';
let imgulr = `${process.env.PUBLIC_URL}/imgs/`;

class MaiYi extends React.Component {
    static defaultProps = {
        ...Component.defaultProps
    };
    static propTypes = {};
    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        //this.dom.root=ReactDOM.findDOMNode(this);
    }
    render() {
        return (
            <div className="container">
                <div className="title">
                    <img src={`${imgulr}/huiyuan-txt.png`} alt="东方购物"/>
                </div>
                <img src={`${imgulr}/maiyi.png`} alt="东方购物"/>
            </div>
        );
    }
}

export default MaiYi;
