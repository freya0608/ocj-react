/**
 * Created by ${USER} on ${DATE}.
 * https://www.jetbrains.com/help/webstorm/file-template-variables.html
 动画callback只支持1.x版本的TransitionGroup
 */
import React,{Component} from 'react';
import './layers.css';
let imgulr = `${process.env.PUBLIC_URL}/imgs/`;



class Layers extends React.Component {


    render() {
        let {layerType,handleCloseLayer,isSelfApp,userLevel,reInput} = this.props;

        return (
            <div >
                <div className="opacity-layer" style={{"top":isSelfApp?'44px':0}}>{}</div>
                <div className="close" onClick={ handleCloseLayer }>
                    <img  src={`${imgulr}/close.png`} alt="东方购物"/>
                </div>
                {
                    //兑换码验证成功
                    layerType===1&& <div className="pop-layer">
                        <div className="verifySuccess">
                            <img  src={`${imgulr}/verifySuccess.png`} alt="东方购物"/>
                        </div>
                        <img className="go" onClick={ handleCloseLayer }  src={`${imgulr}/go.png`} alt="东方购物"/>
                    </div>
                }
                {
                    //兑换码验证失败
                    layerType===2&& <div className="pop-layer">
                        <div className="verifySuccess">
                            <img  src={`${imgulr}/verifyFailure.png`} alt="东方购物"/>
                        </div>
                        <img className="go" onClick={ reInput }  src={`${imgulr}/reInput.png`} alt="东方购物"/>
                    </div>
                }
                {
                    //兑换码已被兑换
                    layerType===6&& <div className="pop-layer">
                        <div className="verifySuccess">
                            <img  src={`${imgulr}/hasChanged.png`} alt="东方购物"/>
                        </div>
                        <img className="go" onClick={ reInput }  src={`${imgulr}/reInput.png`} alt="东方购物"/>
                    </div>
                }

                {/*生日月份*/}
                {
                    //请输入正确的生日月份
                    layerType===3&& <div className="pop-layer">
                        <div className="verifySuccess">
                            <img  src={`${imgulr}/inputRightMonth.png`} alt="东方购物"/>
                        </div>
                        <img className="go" onClick={ handleCloseLayer }  src={`${imgulr}/toTotal.png`} alt="东方购物"/>
                    </div>
                }
                {
                    //输入生日月份
                    layerType===4&& <div className="pop-layer">
                        <div className="verifySuccess">
                            <img  src={`${imgulr}/inputBirth.png`} alt="东方购物"/>
                        </div>
                        <img className="go" onClick={ handleCloseLayer }  src={`${imgulr}/toTotal.png`} alt="东方购物"/>
                    </div>
                }
                {
                    //输入生日月份并领取成功
                    layerType===5&& <div className="pop-layer">
                        <div className="verifySuccess">
                            { parseInt(userLevel) === 1 &&<img  src={`${imgulr}/hasGet-putong.png`} alt="东方购物"/>}
                            { parseInt(userLevel) === 2 &&<img  src={`${imgulr}/hasGet-baiyin.png`} alt="东方购物"/>}
                            { parseInt(userLevel) === 3 &&<img  src={`${imgulr}/hasGet-huangjin.png`} alt="东方购物"/>}
                            { parseInt(userLevel) === 4 &&<img  src={`${imgulr}/hasGet-zuanshi.png`} alt="东方购物"/>}
                            { parseInt(userLevel) === 5 &&<img  src={`${imgulr}/hasGet-zuanshi100.png`} alt="东方购物"/>}
                            { parseInt(userLevel) === 6 &&<img  src={`${imgulr}/hasGet-zuanshi100old.png`} alt="东方购物"/>}
                        </div>
                        <a className="month-toSee" href="https://m.ocj.com.cn/myocj/tickets">
                            <img  onClick={ handleCloseLayer }  src={`${imgulr}/toSee.png`} alt="东方购物"/>
                        </a>
                    </div>
                }

            </div>
        );
    }
}

export default Layers;
