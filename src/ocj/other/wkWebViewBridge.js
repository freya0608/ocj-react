/**
 * @file 原生桥接
 * @version 0.0.1
 * @license 东方购物 2018
 **/
class Bridge {
    constructor() {
        this.ready = false;
        this._init();
        this._listener();
        this._isCallInit=false;
    }
    // 通知原生桥接初始化（注意：这里不能调用多次，会导致原生初始化多次崩溃）
    _init() {
        if (window.WebViewJavascriptBridge) { return; }
        let WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__WVJB_QUEUE_MESSAGE__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0);
    }
    // 监听完成
    _listener() {
        this._once(document, 'WebViewJavascriptBridgeReady', () => this.ready = true);
    }
    // 只监听一次
    _once(el, event, fn) {
        const listener = function() {
            if (fn) {fn.apply(this, arguments);}
            el.removeEventListener(event, listener, false);
        };
        el.addEventListener(event, listener, false);
    }
    // 请求数据
    _fetch(resolve, key, data) {
        window.WebViewJavascriptBridge.callHandler(key, data, function(response) {
            resolve(response);
        });
    }
    // 获取桥接消息
    callHandler(key = "getAppInfo", data = {}) {
      return new Promise((resolve, reject) => {
        if (this.ready || typeof  window.WebViewJavascriptBridge === 'object') {
          if(window.WebViewJavascriptBridge.init&&!this._isCallInit){
            this._isCallInit=true;
            window.WebViewJavascriptBridge.init();
          }
          this._fetch(resolve, key, data)
        } else {
          this._once(document, 'WebViewJavascriptBridgeReady', () => this._fetch(resolve, key, data));
        }
      });
    }
}
export default Bridge
