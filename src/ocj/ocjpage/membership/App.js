
import React ,{Component}from 'react'
import './app.css'
import Bottom from "./component/Bottom/Bottom";
import MaiYi from "./component/MaiYi/MaiYi";
import GameRule from "../../ocjcomponent/gamerule/GameRule";
import axios from 'axios';

import Layers from "./component/Layers/Layers";
import isSelfApp from "../../other/WechatShare";
import MyfyQuan from "./component/MyfyQuan/MyfyQuan";
let imgulr = `${process.env.PUBLIC_URL}/imgs`;

class App extends Component{
    constructor(props) {
        super(props);
        this.state={
            noLoginHref:"",
            isLogin:true,
            layerType:0,  // 1兑换码验证成功  2兑换码验证失败  6兑换码已被兑换 7输入兑换码  3请输入正确的生日月份  4输入生日月份  5输入生日月份并领取成功
            userLevel:1, // 1： 普通会员，2：白银会员，3：黄金会员，4：钻石会员，5：钻石100，6：钻石100（老用户）
            userReceivingStatus:"1", //0未领取1领取
            couponNoStatus:"1",      //0未领取1领取
            inputMonth:'',
            inputVerify:'',
            msgCode:0,
            itemList: [{
                itemImg: `${imgulr}/thingImg.png`,
                itemCode: "O123546",
                itemStatus: "0",  //0未领取1，领取 ，2选了其他的
                itemUrl:"http://m.ocj.com.cn/1235462"
            },
            {
                itemImg: `${imgulr}/thingImg.png`,
                itemCode: "O1235462",
                itemStatus: "0",  //0未领取1，领取 ，2选了其他的
                itemUrl:"http://m.ocj.com.cn/1235462"
            },
            {
                itemImg: `${imgulr}/thingImg.png`,
                itemCode: "O1235462",
                itemStatus: "0",  //0未领取1，领取 ，2选了其他的
                itemUrl:"http://m.ocj.com.cn/1235462"
            }]
        }
    }
    //页面初始化
    componentDidMount(){
        //进入页面后调取状态接口
        //  this.getGameState();
    }

    render() {
        let {isLogin,itemList,couponNoStatus,userLevel,userReceivingStatus,layerType} =this.state;
        console.log('userLevel',userLevel);
        console.log('couponNoStatus',couponNoStatus);
        console.log('userReceivingStatus',userReceivingStatus);
        console.log('isLogin',isLogin);

        return(
            <div className="member-main">
                <GameRule gameid={"A20191204160352"}/>
                <div className="page-title">
                    <img src={`${imgulr}/title.png`} alt="东方购物"/>
                </div>
                <div className="content">
                    {/*四大专享特权*/}
                    <div className="siDaContainer">
                        {(!isLogin  ||  userReceivingStatus == 0) &&
                        <div className="notLogin">
                            <div className="zhuanShuOpacity"></div>
                            {
                                <img  style={{display:(this.state.layerType ==1 || this.state.layerType ==2 || this.state.layerType ==6|| this.state.layerType ==7)?"none":"block"}}
                                      className="zhuanshuImg" src={`${imgulr}/lock.png`} alt="东方购物"/>
                            }
                        </div>
                        }
                        <img src={`${imgulr}/top.png`} alt="东方购物"/>
                        {
                            (parseInt(userReceivingStatus) === 1)?
                                <div    className="btn">
                                    <img src={`${imgulr}/toKnown.png`} alt="东方购物"/>:
                                </div>
                                :
                                <div className="btn" onClick={this.toGet}>
                                    <img src={`${imgulr}/lingqu-btn.png`}   alt="东方购物"/>
                                </div>
                        }
                    </div>
                    {/*买一返一*/}
                    { (isLogin  &&   userReceivingStatus == 1) ?
                        <div className="container">
                            {
                                (parseInt(couponNoStatus) === 1) ?
                                    <MyfyQuan userLevel = { userLevel }/>
                                    :
                                    <div className="myfy">
                                        <div className="myfy-title">
                                            <img  src={`${imgulr}/myfy-title.png`} alt=""/>
                                        </div>
                                        <div  className="hyLevel">
                                            { (parseInt(userLevel) === 1) && <img  src={`${imgulr}/putong.png`} alt=""/>}
                                            { (parseInt(userLevel) === 2) && <img  src={`${imgulr}/baiyin.png`} alt=""/>}
                                            { (parseInt(userLevel) === 3) && <img  src={`${imgulr}/huangjin.png`} alt=""/>}
                                            { (parseInt(userLevel) === 4) && <img  src={`${imgulr}/zuanshi.png`} alt=""/>}
                                            { (parseInt(userLevel) === 5) && <img  src={`${imgulr}/zuanshi100.png`} alt=""/>}
                                            { (parseInt(userLevel) === 6) && <img  src={`${imgulr}/zuanshi100-old.png`} alt=""/>}
                                            <div className="input-month">
                                                <img className="input-img" src={`${imgulr}/inputMonth.png`} alt=""/>
                                                <input className="input-text" type="text"
                                                       name={'inputMonth'}
                                                       onChange={(e)=>this.setState({inputMonth: e.target.value})}/>
                                                <img className="input-yue" src={`${imgulr}/inputYue.png`} alt=""/>
                                            </div>
                                            <div  className="tolevelGet" onClick={this.saveMonth}>
                                                <img  src={`${imgulr}/tolevelGet.png`} alt=""/>
                                            </div>
                                        </div>
                                    </div>
                            }
                        </div>
                         :
                        <MaiYi/>
                    }
                    {/*超值开购卡*/}
                    <div className="container">
                        {(isLogin  &&   userReceivingStatus == 1) ?
                            <div className="chaozhi-login">
                                <div className="chaozhi-title">
                                    <img  src={`${imgulr}/chaozhi-title.png`} alt=""/>
                                </div>
                                <div className="chaozhi-list">
                                    {
                                        itemList&&itemList.map((item,index)=>(
                                            <div className="list-item" key={index}>
                                                <img  src={`${item.itemImg}`} alt="东方购物"/>
                                                <a  className="toBuy"
                                                    href={`${this.state.itemList[index].itemUrl}`}
                                                    style={{ display:this.state.itemList[index].itemStatus=="1"?"block":"none"}}>
                                                    <img  src={`${imgulr}/toBuy.png`} alt="东方购物"/>
                                                </a>
                                                <div className="selectMe"
                                                    onClick={(e)=>{
                                                        this.selectMe(e,index)
                                                    }}
                                                     style={{ display:this.state.itemList[index].itemStatus=="0"?"block":"none"}}>
                                                    <img     src={`${imgulr}/selectMe.png`} alt="东方购物"/>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            :<img className="chaozhi-nlogin" src={`${imgulr}/chaozhi.png`} alt="东方购物"/>
                        }
                    </div>

                    {/*专享会员价和会员福利社*/}
                    <Bottom/>

                </div>
                {
                    (layerType !== 0)&&
                    <Layers
                        handleCloseLayer = { this.handleCloseLayer }
                        reInput = { this.reInput }
                        layerType={ layerType }
                        isSelfApp = {isSelfApp()}
                        userLevel={userLevel}/>
                }
                {
                    ( (parseInt(userReceivingStatus) === 0) && isLogin && layerType===7) && <div>
                        <div className="opacity-layer" style={{"top":isSelfApp()?'44px':0}}>{}</div>
                        <div className="close" onClick={ this.handleCloseLayer }>
                            <img  src={`${imgulr}/close.png`} alt="东方购物"/>
                        </div>
                        <div className="pop-layer">
                            <div className="verifySuccess">
                                <img  src={`${imgulr}/imputchange.png`} alt="东方购物"/>
                            </div>
                            <input type="text" className="inputVerify"
                                   onChange={(e)=>this.setState({inputVerify: e.target.value})}
                            />
                            <div className="go" onClick={ this.toVerify }>
                                <img    src={`${imgulr}/toVerify.png`} alt="东方购物"/>
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }


    getGameState = () =>{
        axios.post("/event/dfyxeventinfo").then((res) => {
            // console.log('res  saved',res.data)
            let myData = res.data.data;
            if(res.data.msg_code=='10000'){
                this.setState({
                    userLevel:myData.userLevel,
                    itemList :myData.itemList ,
                    couponNoStatus:myData.couponNoStatus,
                    userReceivingStatus:myData.userReceivingStatus,
                    noLoginHref:myData.nologinurl,
                    isLogin:true,
                });
                console.log("初始化接口用户等级"+this.state.userLevel)
            }else if(res.data.msg_code=="20001"){
                console.log("非app下未登录");
                //alert(res.data.msg);
                this.setState(() => ({
                    noLoginHref: myData.nologinurl,
                    msgCode :20001
                }));
                //this.toGet();
            }else if(res.data.msg_code=="20002"){
                console.log("app下未登录");
                //alert(res.data.msg);
                this.setState(() => ({
                    noLoginHref: myData.nologinurl,
                    msgCode :20002
                }));
                //this.toGet();
            }else{
                alert(res.data.msg);
            }

        });
    };
    getHref = ()=>{
        if(String(navigator.userAgent.toLowerCase().match(/OCJ/i))==="ocj"){
            let qs = window.WebViewInvoke.qs;// 原生WEBVInpm EW调用接口
            let queryString = qs({});
            let str = {
                action: 'login', // back login pay
                url:  window.location.href+'?'+queryString,
                param:{
                    url:window.location.href+'?'+queryString,
                    target_url:window.location.href+'?'+queryString
                }
            };
            return window.location.href+"#"+JSON.stringify(str);
        }else{
            return this.state.noLoginHref;
        }
    };
    toGet=()=>{
        if(this.state.msgCode===20002){
            console.log("M版跳转登录"+ this.this.getHref());
            window.location.href = this.getHref();
        }
        if(this.state.msgCode === 20001){
            console.log("M版跳转登录"+this.state.noLoginHref);
            window.location.href = this.state.noLoginHref;
        }
        if(parseInt(this.state.userReceivingStatus) ===0 && this.state.isLogin){
            this.setState({
                layerType:7,
            });
        }
        // window.location.reload();
    };
    toVerify =()=>{
        let {inputVerify} = this.state;
        console.log('inputVerify',inputVerify);
        console.log(this.state.layerType);

        axios.post("/event/dfyxexchange",{
            exchangeCode:inputVerify
        }).then((res) => {
            // console.log('res  saved',res.data)
            let myData = res.data.data;
            if(res.data.msg_code=='10000'){
                this.setState({
                    userReceivingStatus:1, //已经兑换
                    layerType:1,  //兑换成功
                });
            }else if(res.data.msg_code=='20001'){
                this.setState({
                    layerType:2,  //兑换失败
                });
                // this.toGet();
            }else if(res.data.msg_code=='20002'){
                this.setState({
                    layerType:6,  //已被验证
                });
                // this.toGet();
            }
        });

    };
     selectMe=(e,index)=>{
          e.stopPropagation();
         console.log('e.target',index);
        // let index = parseInt(e.target.getAttribute('data-index'));
         const data = this.state.itemList.map( (value,i)=>{
            if(index===i){
                value.itemStatus='1';
            }else {
                value.itemStatus='2';
            }
            return value;
        });
         console.log('index',index);
         axios.post("/event/dfyxdiscountitem",{
             itemCode:this.state.itemList[index].itemCode
         }).then((res) => {
             // console.log('res  saved',res.data)
             if(res.data.msg_code=='10000'){
                 this.setState({
                     itemList:data
                 });
             }else{
                 alert(res.data.msg)
             }
         });
    };
    saveMonth=()=>{
        let {inputMonth} = this.state;

        if(inputMonth===''){
            this.setState(() => ({
                layerType:4
            }));
            return
        }
        let reg = /^(0?[1-9]|1[012])$/;
        let pattern = new RegExp(reg);
        if(!pattern.test(inputMonth)){
            this.setState(() => ({
                layerType:3
            }));
        }else {
            axios.post("/event/dfyxexmonthquan", {
                month:inputMonth,
            }).then((res) => {
                // console.log('res  saved',res.data)
                if(res.data.msg_code=='10000'){
                    this.setState({
                        layerType:5,
                        couponNoStatus:1
                    });
                }else{
                    alert(res.data.msg)
                }
            });
        }
    };

    handleCloseLayer=()=>{
        this.setState(() => ({
            layerType:0
        }));
        if(this.state.userReceivingStatus ==0){

        }
    };

    reInput=()=>{
        this.setState(() => ({
            layerType:7
        }));
    };
}
export default App;
