/**
 * Created by admin on 2018/4/24.
 *
 *
 * //----原生头 分享回调函数sharecallbackfunc
 * //----h5头 分享回调函数wxAPPShareResponse
 */
import wkWebViewBridge from './wkWebViewBridge'
var wx=require("weixin-js-sdk");
var axios=require("axios")

const webviewBridge=new wkWebViewBridge();
function isSelfApp() {
	var ua = navigator.userAgent.toLowerCase();
	if(String(ua.match(/OCJ/i))==="ocj") {
		return true;
	} else {
		return false;
	}
}
function is_weixn(){
	var ua = navigator.userAgent.toLowerCase();
	if(String(ua.match(/MicroMessenger/i))==="micromessenger") {
		return true;
	} else {
		return false;
	}
}

var shareapi=function (shareTitle,shareContent,shareimg,sharehref) {
	var _this=this;
	this.shareTitle=shareTitle?shareTitle:"精彩活动为您推荐，绝对不容错过！";
	this.shareContent=shareContent?shareContent:"精彩活动为您推荐，绝对不容错过！";
	this.shareimg=shareimg?shareimg:"http://cdnimg.ocj.com.cn/common/html5/images/mevent/Activity-v2/fenxlogo.jpg";
	this.sharehref=sharehref?sharehref:window.location.href;
	var classCallCheck = function (instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	};

	var toConsumableArray = function (arr) {
		if (Array.isArray(arr)) {
			for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

			return arr2;
		} else {
			return Array.from(arr);
		}
	};

	var Deferred = function Deferred() {
		var _this = this;

		classCallCheck(this, Deferred);

		this.promise = new Promise(function (resolve, reject) {
			_this.resolve = resolve;
			_this.reject = reject;
		});
	};

	var count = 0;

	function getUID() {
		return count++;
	}

	var getTransactionKey = function getTransactionKey(data) {
		return data.command + '(' + data.id + ')';
	};

	var SYNC_COMMAND = 'RNWV:sync';

	function createMessager(sendHandler) {
		var needWait = [];

		var transactions = {};
		var callbacks = {};
		var fn = {};

		function bind(name) {
			return function () {
				for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
					args[_key] = arguments[_key];
				}

				return send(name, args);
			};
		}

		function define(name, func) {
			callbacks[name] = function (args) {
				return func.apply(undefined, toConsumableArray(args));
			};
			!needWait && sync();
			return { define: define, bind: bind };
		}

		/** sender parts */
		function sender(data) {
			var force = data.command === SYNC_COMMAND;
			if (!force && needWait) {
				needWait.push(data);
			} else {
				sendHandler(data);
			}
		}
		function initialize() {
			if (needWait) {
				var waiting = needWait;
				needWait = null;
				waiting.forEach(function (payload) {
					sender(payload);
				});
			}
		}

		function send(command, data) {
			var payload = {
				command: command, data: data, id: getUID(), reply: false
			};
			var defer = new Deferred();
			transactions[getTransactionKey(payload)] = defer;
			sender(payload);
			return defer.promise;
		}

		function reply(data, result) {
			data.reply = true;
			data.data = result;
			sender(data);
		}
		/** listener parts */
		function listener(data) {
			if (data.reply) {
				var _key2 = getTransactionKey(data);
				transactions[_key2] && transactions[_key2].resolve(data.data);
			} else {
				if (callbacks[data.command]) {
					var result = callbacks[data.command](data.data);
					if (result && result.then) {
						result.then(function (d) {
							return reply(data, d);
						});
					} else {
						reply(data, result);
					}
				} else {
					reply(data, null);
				}
			}
		}
		var __sync = bind(SYNC_COMMAND);
		function _sync() {
			var defines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

			defines.filter(function (d) {
				return !(d in fn);
			}).map(function (d) {
				return fn[d] = bind(d);
			});
			initialize();
			return Object.keys(callbacks);
		}
		define(SYNC_COMMAND, _sync);

		function sync() {
			__sync(Object.keys(callbacks)).then(_sync);
		}

		return { bind: bind, define: define, listener: listener, ready: sync, fn: fn };
	}

	var originalPostMessage = window['originalPostMessage'];

	var _createMessager = createMessager(function (data) {
		return window.postMessage(JSON.stringify(data));
	});
	var bind = _createMessager.bind;
	var define = _createMessager.define;
	var listener = _createMessager.listener;
	var ready = _createMessager.ready;
	var fn = _createMessager.fn;

	if (originalPostMessage) {
		ready();
	} else {
		var descriptor = {
			get: function get() {
				return originalPostMessage;
			},
			set: function set(value) {
				originalPostMessage = value;
				if (originalPostMessage) {
					setTimeout(ready, 50);
				}
			}
		};
		Object.defineProperty(window, 'originalPostMessage', descriptor);
	}

	window.document.addEventListener('message', function (e) {
		return listener(JSON.parse(e.data));
	});


	var hd = function() {
			return Math.round(2147483647 * Math.random()) },
		Bd = function() {
			try {
				var a = new Uint32Array(1);
				window.crypto.getRandomValues(a);
				return a[0] & 2147483647 } catch (b) {
				return hd() } };
	// encodeURIComponent缂栫爜
	var encode = function(a) {
		if (encodeURIComponent instanceof Function) return encodeURIComponent(a);
		return a };
	// decodeURIComponent瑙ｇ爜
	/*var decode = function(a) {
		if (decodeURIComponent instanceof Function) return decodeURIComponent(decodeURIComponent(a));
		return a };*/
	// 杩囨护鍦嗘嫭鍙�'()', 杩涜缂栫爜澶勭悊
	var strongEncode = function(a) {
		return encode(a).replace(/\(/g, "%28").replace(/\)/g, "%29") };

	// 鑾峰彇get queryString 瀛楃涓诧紝濡傦細?a=b&c=d&e=f
	var getQueryString = function(params) {
		var qs = JSON.stringify(params).replace(/^\{/, '').replace(/\}$/, '').replace(/( |"|)/g,'');
		var qsArr = qs.split(',').map(function(item, index) {
			var arr = item.split(':');
			return arr[0] + '=' + strongEncode(arr[1]);
		});
		qsArr.push('rnd=' + Bd())
		// alert(qsArr.join('&'))
		return qsArr.join('&');
	};

	window.browser = {
		bind: bind, define: define, fn: fn, qs: getQueryString
	};
	window.WebViewInvoke=window.browser
	this.share=function(){
		if(typeof(window.wxAPPShareResponse)!=='undefined'){
			window.wxAPPShareResponse();
		}
		var str = {
			action: 'share', // back login pay
			param:{
				image_url:_this.shareimg,
				title:_this.shareTitle,
				content:_this.shareContent,
				target_url:_this.sharehref
			}
		};
		let aahttp=String(window.location.href).indexOf("https://")>=-1?"https://":"http://";
		/*alert(`${aahttp}${window.location.host}#${JSON.stringify(str)}`);*/
		window.location.href = `${aahttp}${window.location.host}#${JSON.stringify(str)}`;
	}

	/*---------------以下为js端自己调用--------------------*/


	if(is_weixn()){
		wx.ready(function () {
			// 1 判断当前版本是否支持指定 JS 接口，支持批量判断
			wx.checkJsApi({
				jsApiList: [
					'getNetworkType',
					'previewImage',
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage'
				],
				success: function (res) {
				}
			});

			wx.onMenuShareAppMessage({
				title: _this.shareTitle, // 分享标题
				desc: _this.shareContent, // 分享描述
				link: _this.sharehref , // 分享链接
				imgUrl: _this.shareimg, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
					if(typeof (window.wxAPPShareResponse)!=='undefined'){
						window.wxAPPShareResponse();
					}
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});

			//2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
			wx.onMenuShareTimeline({
				title: _this.shareContent,
				link:  _this.sharehref,
				imgUrl:_this.shareimg,
				success: function (res) {
					if(typeof (window.wxAPPShareResponse)!=='undefined'){
						window.wxAPPShareResponse();
					}
				},
				cancel: function (res) {

				},fail: function (res) {

				}

			});

		});
		wx.error(function (res) {
			console.log(res)
		});

		var form = new FormData();
		form.append("url", window.location.href);

		axios.post("/event/fenx?ts="+new Date().getTime(), form).then((res)=>{
			var data=res.data;
			var noncestr=data.noncestr;
			var timestamp=data.timestamp;
			var signature=data.signature;
			// console.log(data);
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: 'wx3fb3c2f24d8ee8b7', // 必填，公众号的唯一标识
				timestamp: parseInt(timestamp,0), // 必填，生成签名的时间戳
				nonceStr:noncestr, // 必填，生成签名的随机串
				signature:  signature,     // 必填，签名，见附录1
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline'
					,'onMenuShareAppMessage'
				] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		}).catch(function (error) {
			console.log(error);
		});
	}
		return this;
}

function historyGoM(){
	if(window.historyGoURL!==""){
		window.location.href=window.historyGoURL;
		return;
	}
	var ref = window.document.referrer;

	if(ref !== undefined && ref !== '' && ref !== 'undefined' && ref.indexOf("event/niuslanquestion") >= 0)
	{
		window.location.href = "/";
		return;
	}
	if(ref !== undefined && ref !== '' && ref !== 'undefined' && (ref.indexOf("darw/living") >= 0||ref.indexOf("events/yxred") >= 0 ||ref.indexOf("event/tianmao") >= 0 ||ref.indexOf("darw/intoActivity") >= 0 ||ref.indexOf("darw/qszcfst") >= 0 ||ref.indexOf("darw/foodtime") >= 0 ||ref.indexOf("darw/guyu") >= 0 ||ref.indexOf("darw/goldrain") >= 0 ||ref.indexOf("darw/hotList") >= 0||ref.indexOf("darw/newCustomer") >= 0))
	{
		window.location.href = ref;
		return;
	}
	if(ref !== undefined && ref !== '' && ref !== 'undefined' && ref.indexOf("?isPufa=1") > 0)
	{
		window.location.href = ref;
		return;
	}
	if(ref === ''||ref.indexOf("/qr") > 0 ||ref.indexOf("/detail") > 0 ||ref.indexOf("/admin/se_ads/parseandforward") > 0 ){
		window.location.href ="/";
	}else{
		window.history.go(-1);
	}
}

var shareapiNative=function (shareTitle,shareContent,shareimg,sharehref) {
	var _this = this;
	this.shareTitle = shareTitle ? shareTitle : "精彩活动为您推荐，绝对不容错过！";
	this.shareContent = shareContent ? shareContent : "精彩活动为您推荐，绝对不容错过！";
	this.shareimg = shareimg ? shareimg : "http://cdnimg.ocj.com.cn/common/html5/images/mevent/Activity-v2/fenxlogo.jpg";
	this.sharehref = sharehref ? sharehref : window.location.href;

	if(is_weixn()){
		wx.ready(function () {
			// 1 判断当前版本是否支持指定 JS 接口，支持批量判断
			wx.checkJsApi({
				jsApiList: [
					'getNetworkType',
					'previewImage',
					'checkJsApi',
					'onMenuShareTimeline',
					'onMenuShareAppMessage'
				],
				success: function (res) {
				}
			});

			wx.onMenuShareAppMessage({
				title: _this.shareTitle, // 分享标题
				desc: _this.shareContent, // 分享描述
				link: _this.sharehref , // 分享链接
				imgUrl: _this.shareimg, // 分享图标
				success: function () {
					// 用户确认分享后执行的回调函数
					if(typeof (window.sharecallbackfunc)!=='undefined'){
						window.sharecallbackfunc();
					}
				},
				cancel: function () {
					// 用户取消分享后执行的回调函数
				}
			});

			//2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
			wx.onMenuShareTimeline({
				title: _this.shareContent,
				link:  _this.sharehref,
				imgUrl:_this.shareimg,
				success: function (res) {
					if(typeof (window.sharecallbackfunc)!=='undefined'){
						window.sharecallbackfunc();
					}
				},
				cancel: function (res) {

				},fail: function (res) {

				}

			});

		});
		wx.error(function (res) {
			console.log(res)
		});

		var form = new FormData();
		form.append("url", window.location.href);

		axios.post("/event/fenx?ts="+new Date().getTime(), form).then((res)=>{
			var data=res.data;
			var noncestr=data.noncestr;
			var timestamp=data.timestamp;
			var signature=data.signature;
			// console.log(data);
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: 'wx3fb3c2f24d8ee8b7', // 必填，公众号的唯一标识
				timestamp: parseInt(timestamp,0), // 必填，生成签名的时间戳
				nonceStr:noncestr, // 必填，生成签名的随机串
				signature:  signature,     // 必填，签名，见附录1
				jsApiList: [
					'checkJsApi',
					'onMenuShareTimeline'
					,'onMenuShareAppMessage'
				] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
		}).catch(function (error) {
			console.log(error);
		});
	}else if(isSelfApp()){
		webviewBridge.callHandler( "navigation_bar", JSON.stringify({
			isShowNav:"1",
			isShowShare:"1",
			shareTitle:_this.shareTitle,
			shareContent:_this.shareContent,
			shareTargetUrl:_this.sharehref,
			shareImageUrl:_this.shareimg,
			shareCallBackJSKey:'sharecallbackfunc()',
		}))
	}
	return this;
}


export default isSelfApp;


class Singleton {
	constructor(shareTitle,shareContent,shareimg,sharehref,usenative) {
		this.instance = null
	}
	static getInstance(shareTitle,shareContent,shareimg,sharehref,usenative) {
		if(!this.instance) {
			if(usenative){
				this.instance = new shareapiNative(shareTitle,shareContent,shareimg,sharehref);
			}else{
				this.instance = new shareapi(shareTitle,shareContent,shareimg,sharehref);
			}
		}
		return this.instance;
	}
}

export {Singleton,historyGoM,webviewBridge};