define(["libs","cBase","cUIAnimation"],function(a,b,c){var d=new b.Class({__propertys__:function(){this.webroot="/#hotelsearch",this.viewRootPath="app/views/",this.defaultView="index",this.request,this.viewpath,this.mainframe,this.viewport,this.statedom,this.views=new b.Hash,this.curView,this.lastView,this.inteface={loadView:_.bind(this.loadView,this),forward:_.bind(this.forward,this),back:_.bind(this.back,this)},this.isCreate=!1,this.history=[],this.stopListening=!1,this.timeoutres,this.lastHash="",this.lashFullHash="",this.isChangeHash=!1,this.animations=c,this.isAnimat=!0,this.animatSwitch=!1,b.isInApp()&&(this.animatSwitch=!0),this.animForwardName="slideleft",this.animBackwardName="slideright",this.animNoName="noAnimate",this.animatName=this.animNoName,this.path=[],this.query={},this.viewMapping={}},initialize:function(a){this.setOption(a),this.buildEvent()},setOption:function(a){a=a||{};for(var b in a)this[b]=a[b]},buildEvent:function(){requirejs.onError=function(a){if(a&&a.requireModules)for(var b=0;b<a.requireModules.length;b++){0;break}},$(window).bind("hashchange",_.bind(this.onHashChange,this)),this.onHashChange()},onHashChange:function(){window.history.length;if(this.history.push(window.location.href),!this.stopListening){var a=decodeURIComponent(window.location.hash.replace(/^#+/i,"")).toLowerCase();this._onHashChange(a)}},_onHashChange:function(a,b){a=a.replace(/^#+/i,"");var c=this.parseHash(a);this.localObserver(c,b)},parseHash:function(a){var b,c,d=a,a=a.replace(/([^\|]*)(?:\|.*)?$/gim,"$1"),e=/^([^?&|]*)(.*)?$/i.exec(a),f=e[1]?e[1].split("!"):[],g=(f.shift()||"").replace(/(^\/+|\/+$)/i,""),h=f.length?f.join("!").replace(/(^\/+|\/+$)/i,"").split("/"):this.path,i=(e[2]||"").replace(/^\?*/i,"").split("&"),j=_.clone(this.query);if(this.isChangeHash=!(this.lastHash||d!==this.lashFullHash)||!(!this.lastHash||this.lastHash===a),-1!=location.hash.indexOf("cui-")&&(this.isChangeHash=!1),i)for(var k=0;k<i.length;k++)i[k]&&(b=i[k].split("="),b[1]?(c=b.shift(),j[c]=b.join("=")):j[b[0]]="");return this.lastHash=a,this.lashFullHash=d,{viewpath:g,path:h,query:j,root:location.pathname+location.search,fullhash:d}},localObserver:function(a,b){this.animatName=b?this.animForwardName:this.animBackwardName,this.request=a,this.viewpath=this.request.viewpath||this.defaultView,this.request.viewpath=this.viewpath,this.switchView(this.viewpath)},switchView:function(a){var b=a,c=this.views.getItem(b),d=this.curView;if(d&&d!=c&&(this.lastView=d),c){if(c==this.curView&&0==this.isChangeHash)return;c.request=this.request,this.curView=c;var e=(d||c).viewname;this.curView.__load(e)}else this.loadView(a,function(a){c=new a(this.request,this.inteface,b),this.views.push(b,c),c.turning=_.bind(function(){this.createViewPort(),c.viewport=this.viewport,this.startAnimation(function(a,b){this.views.each(function(c){return a===c||b===c?!1:void c.$el.hide()}),a.$el.show()})},this),this.curView=c;var e=(d||c).viewname;this.curView.__load(e)})},startAnimation:function(a){var b=this.curView,c=this.lastView;this.animatSwitch||(this.isAnimat=!1),this.isAnimat||(this.animatName=this.animNoName),this.timeoutres=this.animations[this.animatName]&&this.animations[this.animatName].call(this,b,c,a,this),this.isAnimat=!0},loadView:function(a,b){var c=this;requirejs([this.buildUrl(a)],function(a){b&&b.call(c,a)})},buildUrl:function(a){var b=this.viewMapping[a];return b?b:this.viewRootPath+a},createViewPort:function(){if(!this.isCreate){var a=['<div class="main-frame">','<div class="main-viewport"></div>','<div class="main-state"></div>',"</div>"].join("");this.mainframe=$(a),this.viewport=this.mainframe.find(".main-viewport"),this.statedom=this.mainframe.find(".main-state");var b=$("#main");b.empty(),b.append(this.mainframe),this.isCreate=!0}},lastUrl:function(){return this.history.length<2?document.referrer:this.history[this.history.length-2]},startObserver:function(){this.stopListening=!1},endObserver:function(){this.stopListening=!0},forward:function(a,b,c){a=a.toLowerCase(),c&&(this.isAnimat=!1),this.endObserver(),b?window.location.replace(("#"+a).replace(/^#+/,"#")):window.location.href=("#"+a).replace(/^#+/,"#"),this._onHashChange(a,!0),setTimeout(_.bind(this.startObserver,this),1)},back:function(a,b){b&&(this.isAnimat=!1);var c=this.lastUrl();!a||c&&0===c.indexOf(a)?(a=this.request.query.refer,a?window.location.href=a:history.back()):window.location.hash=a}});return d});