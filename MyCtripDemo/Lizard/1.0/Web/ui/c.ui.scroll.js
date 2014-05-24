define(["cBase"],function(){function a(a){if(this.wrapper="string"==typeof a.wrapper?$(a.wrapper):a.wrapper,this.scroller="string"==typeof a.scroller?$(a.scroller):a.scroller,!a.wrapper[0]||!a.scroller[0])throw"param error";this.wrapper=this.wrapper[0],this.scroller=this.scroller[0],this.scrollerStyle=this.scroller.style,this.options={scrollbars:!0,startY:0,bounceTime:600,bounceEasing:d.ease.circular,bounce:!0,bindToWrapper:!0,resizePolling:60,startX:0,startY:0};for(var b in a)this.options[b]=a[b];this.translateZ=" translateZ(0)",this.x=0,this.y=0,this._events={},this._init(),this.refresh(),this.scrollTo(this.options.startX,this.options.startY),this.enable()}function b(){var a=document.createElement("div"),b=document.createElement("div");return a.style.cssText="position:absolute;z-index:9999",a.style.cssText+=";width:7px;bottom:2px;top:2px;right:1px",a.style.cssText+=";overflow:hidden",b.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px",b.style.width="100%",a.appendChild(b),a}function c(a,b){this.wrapper="string"==typeof b.el?document.querySelector(b.el):b.el,this.indicator=this.wrapper.children[0],this.wrapperStyle=this.wrapper.style,this.indicatorStyle=this.indicator.style,this.scroller=a,this.sizeRatioY=1,this.maxPosY=0,this.wrapperStyle[d.style.transform]=this.scroller.translateZ,this.wrapperStyle[d.style.transitionDuration]="0ms",this.wrapperStyle.opacity="0"}var d=function(){function a(a){return d===!1?!1:""===d?a:d+a.charAt(0).toUpperCase()+a.substr(1)}var b={},c=document.createElement("div").style,d=function(){for(var a,b=["t","webkitT","MozT","msT","OT"],d=0,e=b.length;e>d;d++)if(a=b[d]+"ransform",a in c)return b[d].substr(0,b[d].length-1);return!1}();return b.getTime=Date.now||function(){return(new Date).getTime()},b.addEvent=function(a,b,c,d){a[0]&&(a=a[0]),a.addEventListener(b,c,!!d)},b.removeEvent=function(a,b,c,d){a[0]&&(a=a[0]),a.removeEventListener(b,c,!!d)},b.momentum=function(a,b,c,d,e){var f,g,h=a-b,i=Math.abs(h)/c,j=6e-4;return f=a+i*i/(2*j)*(0>h?-1:1),g=i/j,d>f?(f=e?d-e/2.5*(i/8):d,h=Math.abs(f-a),g=h/i):f>0&&(f=e?e/2.5*(i/8):0,h=Math.abs(a)+f,g=h/i),{destination:Math.round(f),duration:g}},$.extend(b,{hasTouch:"ontouchstart"in window}),$.extend(b.style={},{transform:a("transform"),transitionTimingFunction:a("transitionTimingFunction"),transitionDuration:a("transitionDuration"),transitionDelay:a("transitionDelay"),transformOrigin:a("transformOrigin")}),$.extend(b.eventType={},{touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2}),$.extend(b.ease={},{quadratic:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(a){return a*(2-a)}},circular:{style:"cubic-bezier(0.1, 0.57, 0.1, 1)",fn:function(a){return Math.sqrt(1- --a*a)}},back:{style:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",fn:function(a){var b=4;return(a-=1)*a*((b+1)*a+b)+1}},bounce:{style:"",fn:function(a){return(a/=1)<1/2.75?7.5625*a*a:2/2.75>a?7.5625*(a-=1.5/2.75)*a+.75:2.5/2.75>a?7.5625*(a-=2.25/2.75)*a+.9375:7.5625*(a-=2.625/2.75)*a+.984375}},elastic:{style:"",fn:function(a){var b=.22,c=.4;return 0===a?0:1==a?1:c*Math.pow(2,-10*a)*Math.sin(2*(a-b/4)*Math.PI/b)+1}}}),b}();return a.prototype={_init:function(){this._initEvents(),this.options.scrollbars&&this._initIndicator()},refresh:function(){this.wrapper.offsetHeight;this.wrapperHeight=this.wrapper.clientHeight,this.scrollerHeight=this.scroller.offsetHeight,this.maxScrollY=this.wrapperHeight-this.scrollerHeight,this.endTime=0,this._execEvent("refresh"),this.resetPosition()},_initEvents:function(a){var b=a?d.removeEvent:d.addEvent,c=this.options.bindToWrapper?this.wrapper:window;b(window,"orientationchange",this),b(window,"resize",this),d.hasTouch?(b(this.wrapper,"touchstart",this),b(c,"touchmove",this),b(c,"touchcancel",this),b(c,"touchend",this)):(b(this.wrapper,"mousedown",this),b(c,"mousemove",this),b(c,"mousecancel",this),b(c,"mouseup",this)),b(this.scroller,"transitionend",this),b(this.scroller,"webkitTransitionEnd",this),b(this.scroller,"oTransitionEnd",this),b(this.scroller,"MSTransitionEnd",this)},_start:function(a){if(this.enabled&&(!this.initiated||d.eventType[a.type]===this.initiated)){var b,c=a.touches?a.touches[0]:a;if(this.initiated=d.eventType[a.type],this.moved=!1,this.distY=0,this._transitionTime(),this.startTime=d.getTime(),this.isInTransition){this.isInTransition=!1,b=this.getComputedPosition();var e=Math.round(b.x),f=Math.round(b.y);0>f&&f>this.maxScrollY&&this.options.adjustXY&&(f=this.options.adjustXY.call(this,e,f).y),this._translate(e,f),this._execEvent("scrollEnd")}this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=c.pageX,this.pointY=c.pageY,this._execEvent("beforeScrollStart"),a.preventDefault()}},_move:function(a){if(this.enabled&&d.eventType[a.type]===this.initiated){a.preventDefault();var b,c,e,f=a.touches?a.touches[0]:a,g=f.pageX-this.pointX,h=f.pageY-this.pointY,i=d.getTime();this.pointX=f.pageX,this.pointY=f.pageY,this.distX+=g,this.distY+=h,c=Math.abs(this.distX),e=Math.abs(this.distY),i-this.endTime>300&&10>c&&10>e||(b=this.y+h,(b>0||b<this.maxScrollY)&&(b=this.options.bounce?this.y+h/3:b>0?0:this.maxScrollY),this.moved||this._execEvent("scrollStart"),this.moved=!0,this._translate(0,b),i-this.startTime>300&&(this.startTime=i,this.startX=this.x,this.startY=this.y))}},_end:function(a){if(this.enabled&&d.eventType[a.type]===this.initiated){var b,c=(a.changedTouches?a.changedTouches[0]:a,d.getTime()-this.startTime),e=Math.round(this.x),f=Math.round(this.y),g=(Math.abs(e-this.startX),Math.abs(f-this.startY),0),h="";if(this.isInTransition=0,this.initiated=0,this.endTime=d.getTime(),!this.resetPosition(this.options.bounceTime))return this.scrollTo(e,f),this.moved?(300>c&&(b=d.momentum(this.y,this.startY,c,this.maxScrollY,this.options.bounce?this.wrapperHeight:0),f=b.destination,g=Math.max(b.duration),this.isInTransition=1),f!=this.y?((f>0||f<this.maxScrollY)&&(h=d.ease.quadratic),void this.scrollTo(e,f,g,h)):void this._execEvent("scrollEnd")):void this._execEvent("scrollCancel")}},_resize:function(){var a=this;clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){a.refresh()},this.options.resizePolling)},_transitionTimingFunction:function(a){this.scrollerStyle[d.style.transitionTimingFunction]=a,this.indicator&&this.indicator.transitionTimingFunction(a)},_transitionTime:function(a){a=a||0,this.scrollerStyle[d.style.transitionDuration]=a+"ms",this.indicator&&this.indicator.transitionTime(a)},getComputedPosition:function(){var a,b,c=window.getComputedStyle(this.scroller,null);return c=c[d.style.transform].split(")")[0].split(", "),a=+(c[12]||c[4]),b=+(c[13]||c[5]),{x:a,y:b}},_initIndicator:function(){var a=b();this.wrapper.appendChild(a),this.indicator=new c(this,{el:a}),this.on("scrollEnd",function(){this.indicator.fade()});var d=this;this.on("scrollCancel",function(){d.indicator.fade()}),this.on("scrollStart",function(){d.indicator.fade(1)}),this.on("beforeScrollStart",function(){d.indicator.fade(1,!0)}),this.on("refresh",function(){d.indicator.refresh()})},_translate:function(a,b){this.scrollerStyle[d.style.transform]="translate("+a+"px,"+b+"px)"+this.translateZ,this.x=a,this.y=b,this.options.scrollbars&&this.indicator.updatePosition()},resetPosition:function(a){var b=this.x,c=this.y;return a=a||0,this.y>0?c=0:this.y<this.maxScrollY&&(c=this.maxScrollY),c==this.y?!1:(this.scrollTo(b,c,a,this.options.bounceEasing),!0)},scrollTo:function(a,b,c,e){this.options.adjustXY&&(b=this.options.adjustXY.call(this,a,b).y),this.options.checkSelected&&(b=this.options.checkSelected.call(this,a,b).y),e=e||d.ease.circular,this.isInTransition=c>0,(!c||e.style)&&(this._transitionTimingFunction(e.style),this._transitionTime(c),this._translate(a,b))},disable:function(){this.enabled=!1},enable:function(){this.enabled=!0},on:function(a,b){this._events[a]||(this._events[a]=[]),this._events[a].push(b)},_execEvent:function(a){if(this._events[a]){var b=0,c=this._events[a].length;if(c)for(;c>b;b++)this._events[a][b].call(this)}},destroy:function(){this._initEvents(!0),this._execEvent("destroy"),0},_transitionEnd:function(a){a.target==this.scroller&&this.isInTransition&&(this._transitionTime(),this.resetPosition(this.options.bounceTime)||(this.isInTransition=!1,this._execEvent("scrollEnd")))},handleEvent:function(a){switch(a.type){case"touchstart":case"mousedown":this._start(a);break;case"touchmove":case"mousemove":this._move(a);break;case"touchend":case"mouseup":case"touchcancel":case"mousecancel":this._end(a);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(a)}}},c.prototype={transitionTime:function(a){a=a||0,this.indicatorStyle[d.style.transitionDuration]=a+"ms"},transitionTimingFunction:function(a){this.indicatorStyle[d.style.transitionTimingFunction]=a},refresh:function(){this.transitionTime();this.wrapper.offsetHeight;this.wrapperHeight=this.wrapper.clientHeight,this.indicatorHeight=Math.max(Math.round(this.wrapperHeight*this.wrapperHeight/(this.scroller.scrollerHeight||this.wrapperHeight||1)),8),this.indicatorStyle.height=this.indicatorHeight+"px",this.maxPosY=this.wrapperHeight-this.indicatorHeight,this.sizeRatioY=this.scroller.maxScrollY&&this.maxPosY/this.scroller.maxScrollY,this.updatePosition()},updatePosition:function(){var a=Math.round(this.sizeRatioY*this.scroller.y)||0;this.y=a,this.indicatorStyle[d.style.transform]="translate(0px,"+a+"px)"+this.scroller.translateZ},fade:function(a,b){if(!b||this.visible){clearTimeout(this.fadeTimeout),this.fadeTimeout=null;var c=a?250:500,e=a?0:300;a=a?"1":"0",this.wrapperStyle[d.style.transitionDuration]=c+"ms",this.fadeTimeout=setTimeout(function(a){this.wrapperStyle.opacity=a,this.visible=+a}.bind(this,a),e)}}},a.utils=d,a});