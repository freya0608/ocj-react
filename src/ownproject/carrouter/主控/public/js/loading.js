/**
 * Created by admin on 2018/12/3.
 */
var loadingName0="loading0_";
var totalframe0=46;
var loadingName1="loading3_";
var totalframe1=13;
var loadingName2="loading4_";
var totalframe2=48;
var loadingwidth=330;
var loadingheight=220;
var loadingframerate=12;
$(document).ready(function () {
	var w=$(window).width()
	var h=$(window).height()
	$("#loadingMove,.loadingMoveIn").css({
		"width":w,
		"height":h,
		"opacity":1,
	})
	$(".showListIcons").css({
		height:w
	})
	TweenMax.set($(".loadingCircle"),{transformOrigin:"0 0",scale:w*.8/loadingwidth,x:(w-w*.8)/2,y:(h-loadingheight*(w*.8/loadingwidth))/2})
	TweenMax.set($(".cloud"),{transformOrigin:"0 0",scaleX:w/285,scaleY:h/507})
	TweenMax.set($(".textcircle"),{transformOrigin:"50% 50%",scale:w*.3/200,x:"-50%",y:"-50%",top:h/2+w/750*150})
	TweenMax.set($(".loadingslg"),{transformOrigin:"50% 50%",scale:w/510,x:"-50%",y:"-50%"})
	$(".iconroud").each(function (i) {
		var angle=360/$(".iconroud").length*i-100
		TweenMax.set($(this),{
			transformOrigin:"50% 50%",
			x:Math.cos(angle*Math.PI/180)*w/2.5+w/2-w*.1,
			y:Math.sin(angle*Math.PI/180)*w/2+h/2-w*.1})
	})
	var aa={frame:0}
	TweenMax.to(aa,totalframe0/loadingframerate,{ease:Linear.easeNone,frame:totalframe0,repeat:-1,roundProps:['frame'],onUpdate:function () {
		$(".circle0").attr({"class":"circle0 "+loadingName0+aa.frame})
	}})

	//playmove()
})
function playmove(callback) {
	TweenMax.to($(".loadingtext"),.5,{opacity:0,onComplete:function () {
		domove(callback)
	}})
}

function loadingadd(num) {
	$(".loadingtext span").text(num+"%");
}

function domove(callback) {
	if(window.location.href.indexOf("localhost")>=0){
		TweenMax.killAll();
		$("#loadingMove").empty();
		$("#loadingMove").remove();
		callback();
		return;
	}
	var aa={frame:0}
	var bb={frame:0}
	var cc={frame:0}
	var textobj={t:0}
	var smalltext={t:0}
	var loadingslg={t:0}
	var strings="今天让我们跟随安吉星a进入一段全新的旅程a了解那些身边的车联数据..."
	var texts=strings.split("");
	var tt="";
	TweenMax.killAll()
	$(".circle0").remove();
	$(".circle1").css({opacity:1});
	var tl = new TimelineMax();
	tl.add(
		TweenMax.to(aa,totalframe1/loadingframerate,{ease:Linear.easeNone,frame:totalframe1,roundProps:['frame'],onUpdate:function () {
			$(".circle1").attr({"class":"circle1 "+loadingName1+aa.frame})
		},onComplete:function () {
			$(".circle1").remove();
			$(".circle2").css({opacity:1});
			TweenMax.to(bb,totalframe2/loadingframerate,{ease:Linear.easeNone,repeat:-1,frame:totalframe2,roundProps:['frame'],onUpdate:function () {
				$(".circle2").attr({"class":"circle2 "+loadingName2+bb.frame})
			}})
			TweenMax.to(smalltext,14/loadingframerate,{ease:Linear.easeNone,t:14,roundProps:['t'],onUpdate:function () {
				$(".textcircle").attr({"class":"textcircle textcircle_"+smalltext.t})
			}})
		}})
	);
	$(".iconroud").each(function (i) {
		tl.add(
			TweenMax.to($(this),.3,{opacity:1,onComplete:function (its) {
				TweenMax.to(its,3,{x:"+="+Math.random()*10,y:"+="+Math.random()*20,yoyo:true,repeat:-1})
			},onCompleteParams:[$(this)]}),"-=.1"
		);
	})
	tl.add(
		TweenMax.to($(".showListIcons"),.5,{opacity:0,delay:2,onComplete:function () {
			$(".iconroud").each(function (i) {
				TweenMax.killTweensOf($(this))
			})
			$(".cloud").css({opacity:1});
		}})
	);
	tl.add(
		TweenMax.to(loadingslg,27/loadingframerate,{ease:Linear.easeNone,t:25,roundProps:['t'],onUpdate:function () {
			$(".loadingslg").attr({"class":"loadingslg slg_"+loadingslg.t})
		}})
	)
	tl.add(
		TweenMax.to(textobj,6,{t:texts.length,roundProps:['t'],onUpdate:function () {
			tt=strings.substring(0,textobj.t);
			tt=tt.replace(/a/g,"<br/>")
			$(".textBox").html(tt);
		},ease:Linear.easeNone})
	)
	tl.add(
		TweenMax.to(cc,2,{ease:Linear.easeNone,delay:2,frame:27,roundProps:['frame'],onUpdate:function () {
			$(".cloud").attr({"class":"cloud cloud_"+cc.frame})
		},onStart:function () {
			TweenMax.killTweensOf(bb)
			TweenMax.to($(".loadingMoveIn"),1,{scale:2,delay:.5,opacity:0});
		},onComplete:function () {
			TweenMax.killAll();
			TweenMax.to($("#loadingMove"),.5,{opacity:0,onComplete:function () {
				TweenMax.killAll();
				tl.kill();
				$("#loadingMove").empty();
				$("#loadingMove").remove();
				callback();
			}});
		}})
	);

}