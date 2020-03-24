/**
 * Created by admin on 2018/11/2.
 */
const screenwidth=document.documentElement.clientWidth;
const screenheight=document.documentElement.clientHeight;
const mapxy=(x,y,mapwidth,mapheight)=>{
	let ob={x:0,y:0}
	if(x<screenwidth/2){
		ob.x=0;
	}else if(x>(mapwidth-screenwidth/2)){
		ob.x=(mapwidth-screenwidth)*-1;
	}else{
		ob.x=x*-1+screenwidth/2
	}
	let rgy=y-(screenheight/2.8)
	if(rgy<screenheight/2){
		ob.y=0;
	}else if(rgy>(mapheight-screenheight/2)){
		ob.y=(mapheight-screenheight)*-1;
	}else{
		ob.y=rgy*-1+screenheight/2
	}
	return ob
}
const getMapPoint=(x,y,oldmapx,oldmapy,mapwidth,mapheight)=>{
	let xcar=x+oldmapx*-1;
	let ycar=y+oldmapy*-1;
	// let desc=Math.sqrt(Math.pow((xcar-this.state.x),2)+Math.pow((ycar-this.state.y),2),2)
	let ob=mapxy(xcar,ycar,mapwidth,mapheight)
	return {
		carx:xcar,
		cary:ycar,
		mapx:ob.x,
		mapy:ob.y,
		// time:Math.max(desc/100,.5),
	}
}

const angle_dif=(a,b)=> {
	let d1, d2;
	let bbb=b%360;
	d1 = a-bbb;
	d2 = 360 - Math.abs(d1);
	if(d1 > 0){
		d2 *= -1.0;
	}
	if(Math.abs(d1) < Math.abs(d2)){
		return(d1);
	}else{
		return(d2);
	}
}

const queuefunc=(arr)=>{
	var sequence = Promise.resolve()
	arr.forEach((item)=>{
		sequence = sequence.then(item)
	})
	return sequence
}

const transformsizeToIphoneFor750=(item)=>{
	return Math.floor(item*screenwidth/750)
}

/*--------题目--------*/
const questioninfo=[
	[
		[
			[
				["稳健"],
				["稳健"],
				["稳健"],
			],
			[
				["佛系"],
				["佛系"],
				["佛系"],
			],
			[
				["随性"],
				["随性"],
				["随性"],
			],
		],
		[
			[
				["豁达"],
				["豁达"],
				["豁达"],
			],
			[
				["开阔"],
				["开阔"],
				["开阔"],
			],
			[
				["超越"],
				["超越"],
				["超越"],
			],
		],
		[
			[
				["独特"],
				["独特"],
				["独特"],
			],
			[
				["豁达"],
				["豁达"],
				["豁达"],
			],
			[
				["无畏"],
				["无畏"],
				["无畏"],
			],
		]
	],
	[
		[
			[
				["探索"],
				["探索"],
				["探索"],
			],
			[
				["随性"],
				["随性"],
				["随性"],
			],
			[
				["超越"],
				["超越"],
				["超越"],
			],
		],
		[
			[
				["独特"],
				["独特"],
				["独特"],
			],
			[
				["开阔"],
				["开阔"],
				["开阔"],
			],
			[
				["勇敢"],
				["勇敢"],
				["勇敢"],
			],
		],
		[
			[
				["开阔"],
				["开阔"],
				["开阔"],
			],
			[
				["随性"],
				["随性"],
				["随性"],
			],
			[
				["探索"],
				["探索"],
				["探索"],
			],
		]
	],
]
class Singleton {
	static instance;
	constructor(){
		if(Singleton.instance){
			return Singleton.instance;
		}
		this.instance = this;
		this.question=[0,0,0,0];
		this.carId=0;
		this.carStep=-1;
		this.ismove=true;
		this.cannextstep=false;
	}
	setQuestion(id,str){
		this.question[id]=str;
	}
	analysis(){
		let string=questioninfo[this.question[0]][this.question[1]][this.question[2]][this.question[3]][0];
		let rtn=0;
		switch (string){
			case "勇敢":
				rtn=7;
				break;
			case "探索":
				rtn=8;
				break;
			case "独特":
				rtn=6;
				break;
			case "豁达":
				rtn=3;
				break;
			case "佛系":
				rtn=1;
				break;
			case "超越":
				rtn=5;
				break;
			case "无畏":
				rtn=6;
				break;
			case "开阔":
				rtn=4;
				break;
			case "随性":
				rtn=2;
				break;
			case "稳健":
				rtn=0;
				break;
			default:
				break;
		}
		return rtn
	}
}
const Question=new Singleton();

const delaycallback=(stemNum)=>{
	if(stemNum===5){//开门上车动画
		let promise=new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve();
				console.log("complete")
			},2500);
		});
		return promise;
	}else if(stemNum===1){
		let promise=new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve();
				console.log("car start")
			},200);
		});
		return promise;
	}else if(stemNum===6){//地面箭头动画
		let promise=new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve();
				console.log("complete")
			},1000);
		});
		return promise;
	}else if(stemNum===7){
		let promise=new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve();
				console.log("complete")
			},2000);
		});
		return promise;
	}else {
		let promise=new Promise((resolve,reject)=>{
			setTimeout(()=>{
				resolve();
				console.log("delaymove")
			},1000);
		});
		return promise;
		// return Promise.resolve();
	}
}


export {getMapPoint,screenwidth,screenheight,mapxy,angle_dif,queuefunc,transformsizeToIphoneFor750,Question,delaycallback}