define(["libs","cBase","cAjax","cLog"],function(a,b,c,d){var e=new b.Class({__propertys__:function(){this.url=null,this.param=null,this.dataformat=null,this.validates=[],this.debug=!1,this.protocol="http",this.contentType=e.CONTENT_TYPE_JSON,this.method="POST",this.ajax,this.isAbort=!1,this.onBeforeCompleteCallback=null},initialize:function(a){this.assert();for(var b in a)this[b]=a[b]},assert:function(){if(null===this.url)throw"not override url property";if(null===this.param)throw"not override param property"},pushValidates:function(a){"function"==typeof a&&this.validates.push($.proxy(a,this))},setParam:function(a,b){"object"!=typeof a||b?this.param[a]=b:this.param=a},getParam:function(){return this.param},buildurl:function(){throw"[ERROR]abstract method:buildurl, must be override"},execute:function(a,b,f,g,h){this.isAbort=!1;var i=this.buildurl(),j=this,k=$.proxy(function(c){if(d.serverLog(j.buildurl(),j.getParam(),c),this.validates&&this.validates.length>0)for(var e=0,g=this.validates.length;g>e;e++)if(!this.validates[e](c))return"function"==typeof b?b.call(f||this,c):!1;var h="function"==typeof this.dataformat?this.dataformat(c):c;"function"==typeof this.onBeforeCompleteCallback&&this.onBeforeCompleteCallback(h),"function"==typeof a&&a.call(f||this,h,c)},this),l=$.proxy(function(a){return d.serverLog(j.buildurl(),j.getParam()),j.isAbort?(j.isAbort=!1,"function"==typeof g?g.call(f||this,a):!1):void("function"==typeof b&&b.call(f||this,a))},this),h=h||_.clone(this.getParam()||{});return this.ajax=this.contentType===e.CONTENT_TYPE_JSON?c.cros(i,this.method,h,k,l):this.contentType===e.CONTENT_TYPE_JSONP?c.jsonp(i,h,k,l):c.post(i,h,k,l)},abort:function(){this.isAbort=!0,this.ajax&&this.ajax.abort&&this.ajax.abort()}});return e.getInstance=function(){return this.instance instanceof this?this.instance:this.instance=new this},e.baseurl=function(){throw"[ERROR]abstract method:baseurl, must be override"},e.CONTENT_TYPE_JSON="json",e.CONTENT_TYPE_FORM="form",e.CONTENT_TYPE_JSONP="jsonp",e});