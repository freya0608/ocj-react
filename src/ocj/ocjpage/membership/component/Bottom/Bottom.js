/**
 * Created by ${USER} on ${DATE}.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 动画callback只支持1.x版本的TransitionGroup
 */
import React,{Component} from 'react';
import './bottom.css';
let imgulr = `${process.env.PUBLIC_URL}/imgs/`;

const styles = {
    fuli:{
        marginTop:"15px"
    },
    zhuanshu:{
        // marginTop:"10px"
    },
    linkTo:{
        display:"block"

    }
};


class Bottom extends React.Component {
    static defaultProps = {
        ...Component.defaultProps
    };
    static propTypes = {};
    constructor(props){
        super(props);
        this.state = {};
        this.dom=React.createRef()

    }



    render() {
        return (
            <div className="container">
                <a style={styles.linkTo} href="https://m.ocj.com.cn/oclub/moblieOclubFamilyDayList?from=singlemessage">
                    <img style={styles.zhuanshu} src={`${imgulr}/zhuanshu.png`} alt="东方购物"/>
                </a>

                <a style={styles.linkTo} href="https://m.ocj.com.cn/oclub/tryout?from=singlemessage">
                    <img style={styles.fuli} src={`${imgulr}/fuli.png`} alt="东方购物"/>
                </a>
            </div>
        );
    }
}

export default Bottom;
