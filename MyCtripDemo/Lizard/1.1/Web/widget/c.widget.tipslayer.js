define(["cBase","cUICore","cWidgetFactory","cUIScroll"],function(a,b,c,d){"use strict";var e="TipsLayer";if(!c.hasWidget(e)){var f=new a.Class(b.Layer,{__propertys__:function(){this.showTitle=!0,this.contentDom,this.title="",this.body="",this.mask=new b.Mask({classNames:[b.config.prefix+"opacitymask"]});var a=this;this.mask.addEvent("onShow",function(){this.setzIndexTop(-1),$(window).bind("resize",this.onResize),this.onResize();var b=this;this.root.bind("click",function(){b.hide(),b.root.unbind("click"),a.hide()})}),this._loadButtonHtml=function(){if(0==this.buttons.length)return"";var a=['<div class="cui-roller-btns">'];return $.each(this.buttons,function(b,c){var d="cui-btns-sure";"cancle"==c.type&&(d="cui-btns-cancle"),a.push('<div class="cui-flexbd '+d+'">'+c.text+"</div>")}),a.push("</div>"),a.join("")},this.html=""},initialize:function($super,a){$super({onCreate:function(){},onShow:function(){this.title=a.title||"",this.buttons=a.buttons||[],this.html=a.html||"","undefined"!=typeof a.showTitle&&(this.showTitle=a.showTitle),this.html=$(this.html),this.btns=$(this._loadButtonHtml()),this.header=a.header,this.footer=a.footer,this.buttons=a.buttons||[],this.contentDom.html(['<div class="cui-pop-box">','<div class="cui-hd">'+this.title+'<div class="lab-close-area"><span class="cui-top-close">×</span></div></div>','<div class="cui-bd" style="overflow: hidden; position: relative; background-color: #fafafa; width: 100%;">',"</div>","</div>"].join("")),a.width&&this.contentDom.find(".cui-pop-box").css({width:a.width+"px"}),this.mask.show(),this.reposition(),this.closeDom=this.contentDom.find(".cui-top-close").parent(),this.body=this.contentDom.find(".cui-bd"),this.header&&this.body.before($(this.header)),this.footer&&this.body.after($(this.footer)),this.html.length>1&&(this.html=$('<div style="width: 100%;"></div>').append(this.html)),this.html.css("background-color","white"),this.body.append(this.html);var b=parseInt(.7*$(window).height()),c=this.html.height(),e=c;a.height&&(e=a.height),e>b&&(e=b),this.body.css({height:e+"px"}),this.showTitle||this.contentDom.find(".cui-hd").hide();var f={wrapper:this.body,scroller:this.html};$.extend(f,a),c>e&&(this.s=new d(f)),this.contentDom.find(".cui-pop-box").append(this.btns);var g=this;this.closeDom.on("click",function(){g.hide()}),$.each(this.btns,function(a,b){var c=g.buttons[a].click;$(b).on("click",function(){c.call(g)})}),this.setHtml=function(a){g.body.html(a)}},onHide:function(){this.s&&this.s.destroy(),this.mask.hide(),this.closeDom.off("click"),this.root.remove(),this.mask.root.remove()}})}});c.register({name:e,fn:f})}});