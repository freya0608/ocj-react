/**
 * Created by ${USER} on ${DATE}.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 动画callback只支持1.x版本的TransitionGroup
 */
import React,{Component} from 'react';
import './myfy-quan.css';

let imgulr = `${process.env.PUBLIC_URL}/imgs`;

class MyfyQuan extends React.Component {

    render() {
        let { userLevel } = this.props;
        console.log('hshsh',userLevel);
        return (
            <div className="myfy-quan" style={{height:(userLevel == 1||userLevel == 2||userLevel == 3)?"420px":"500px"}}>
                <div className="myfy-title">
                    <img  src={`${imgulr}/myfy-title.png`} alt=""/>
                </div>

                {
                    (userLevel == 1) && <div className="myfy-quan-img">
                        <p className="q-title">普通会员</p>
                        <img  src={`${imgulr}/quan-pu.png`} alt=""/>
                    </div>
                }
                {
                    (userLevel == 2) && <div className="myfy-quan-img">
                        <p className="q-title">白银会员</p>
                        <img  src={`${imgulr}/quan-yin.png`} alt=""/>
                    </div>
                }
                {
                    (userLevel === 3) && <div className="myfy-quan-img">
                        <p className="q-title">黄金会员</p>
                        <img  src={`${imgulr}/quan-huang.png`} alt=""/>
                    </div>
                }
                {
                    (userLevel === 4) && <div className="myfy-quan-img">
                        <p className="q-title">钻石会员</p>
                        <img  src={`${imgulr}/quan-zuan.png`} alt=""/>
                    </div>
                }
                {
                    (userLevel === 5) && <div className="myfy-quan-img">
                        <p className="q-title">钻石会员100M</p>
                        <img  src={`${imgulr}/quan-zuan.png`} alt=""/>
                    </div>
                }
                {
                    (userLevel === 6) && <div className="myfy-quan-img">
                        <p className="q-title">钻石会员100M(老用户)</p>
                        <img  src={`${imgulr}/quan-zuan.png`} alt=""/>
                    </div>
                }
                <a className="quan-toUse" href="https://m.ocj.com.cn/myocj/tickets">
                    <img   src={`${imgulr}/toUse.png`} alt="东方购物"/>
                </a>

            </div>
        );
    }
}

export default MyfyQuan;
