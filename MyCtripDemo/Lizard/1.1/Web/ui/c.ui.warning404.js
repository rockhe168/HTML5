define(["libs","cBase","cUIPageview","cWidgetFactory","cWidgetGuider"],function(a,b,c,d){var e=d.create("Guider"),f={},g={prefix:"cui-"},h={};return h.class=g.prefix+"warning",h.onCreate=function(){this.root.html(['<div class="head-warning">','<div class="head-warning-padding">','<div class="head-warning-content">','<div class="cui-load-fail cui-text-center">','<div class="cui-load-error">','<div class="cui-i cui-wifi cui-fail-icon">',"</div>","</div>",'<p class="cui-grayc">加载失败，请稍后再试试吧</p>','<button type="button" class="cui-btns-retry">重试</button>','<div class="cui-glines"></div>','<p class="cui-grayc">或者拨打携程客服电话</p>','<span id="telBtn" class="cui-btns-tel"><span class="cui-i cui-warning-kf"></span>联系客服</span>',"</div>","</div>","</div>","</div>"].join("")),this.addClass("head-warning-top"),this.retryDom=this.root.find(".cui-btns-retry"),this.retryDom.bind("click",$.proxy(function(){this.callback&&this.callback()},this))},h.onShow=function(){this.mask.root.css({"z-index":"1000"}),this.root.css({"z-index":"1001"});var a=this;window.scrollTo(0,0),this.root.find("#telBtn").click(function(){e.apply({hybridCallback:function(){e.callService()},callback:function(){window.location.href="tel:"+a.tel}})})},f.__propertys__=function(){this.retryDom,this.tel="4000086666",this.callback=function(){}},f.initialize=function($super,a){$super(h,a)},f.retryClick=function(a){a&&(this.callback=a)},new b.Class(c,f)});