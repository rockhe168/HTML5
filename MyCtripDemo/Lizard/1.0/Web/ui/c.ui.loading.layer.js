define(["libs","cBase","cUILayer"],function(a,b,c){var d={prefix:"cui-"},e={};e["class"]=d.prefix+"loading",e.onShow=function(){this.contentDom.html(['<div class="cui-grayload-text">','<div class="cui-w-loading"></div>','<i class="cui-white-logo"></i>','<i class="cui-grayload-close"></i>','<div class="cui-grayload-bfont">'+this.text+"</div>","</div>"].join("")),this.root.find(".cui-grayload-close").off("click").on("click",$.proxy(function(){this.callback&&this.callback(),this.hide()},this)),this.reposition()};var f={};return f.__propertys__=function(){this.contentDom,this.callback=function(){},this.text="发送中..."},f.initialize=function($super,a,b){this.callback=a||function(){},this.text=b||"发送中...",$super(e)},new b.Class(c,f)});