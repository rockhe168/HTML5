define(["libs","cBase","cUILayer"],function(a,b,c){var d=Object.prototype.toString,e="confirm",f="cancel",g={};g.onCreate=function(){this.loadButtons()};var h={},i={prefix:"cui-"};h.__propertys__=function(){this.tpl=this.template(['<div class="cui-pop-box">',"<%if(showTitle) {%>",'<div class="cui-hd">','<div class="cui-text-center"><%=title%></div>',"</div>","<% } %>",'<div class="cui-bd">','<div class="cui-error-tips"><%=message%></div>','<div class="cui-roller-btns">',"</div>","</div>","</div>"].join("")),this.title="",this.message="",this.buttons=[{text:"确定",type:"confirm",click:function(){this.hide()}}],this.viewdata={title:"",message:"",showTitle:!1}},h.initialize=function($super,a){var b={title:!0,message:!0,buttons:!0,showTitle:!0};this.setOption(function(a,c){switch(!0){case b[a]:this[a]=c}}),this.addClass(i.prefix+"alert"),$super($.extend(g,a)),this.buildViewData()},h.buildViewData=function(){this.viewdata.title=this.title,this.viewdata.message=this.message,this.viewdata.showTitle=this.showTitle},h.setViewData=function(a){a.title&&(this.title=a.title),a.message&&(this.message=a.message),a.showTitle&&(this.showTitle=this.showTitle),a.buttons&&(this.buttons=a.buttons),this.buildViewData(),this.root||(this.root=this.createRoot()),this.setRootHtml(this.createHtml()),this.loadButtons()},h.loadButtons=function(){this.root||this.create();var a=this.root.find(".cui-roller-btns"),b=this.createButtons();a.empty(),$.each(b,function(b,c){a.append(c)})},h.createButtons=function(){var a=[],b="[object Array]"===d.call(this.buttons),c=0,g=this;return $.each(this.buttons,function(d,h){var i="",j=[],k=function(){};if(b){switch(i=h.text,h.cls&&j.push(h.cls),h.type=h.type?h.type:"取消"==i?f:e,h.type){case f:j.push("cui-btns-cancel");break;case e:j.push("cui-btns-sure")}h.click&&(k=h.click)}else i=d,"function"==typeof h&&(k=h);a[c]=$('<div class="cui-flexbd '+j.join(" ")+'">'+i+"</div>"),a[c].addClass(j.join(" ")),a[c].bind("click",$.proxy(k,g)),c++}),a},h.createHtml=function(){return this.tpl(this.viewdata)};var j=new b.Class(c,h);return j.STYLE_CONFIRM=e,j.STYLE_CANCEL=f,j});