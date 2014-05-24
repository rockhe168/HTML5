define(["cBase","cUIBase","libs"],function(a,b){"use strict";return new a.Class({__propertys__:function(){this.ENUM={DIR:{LEFT:"LEFT",RIGHT:"RIGHT"}},this.images=[],this.autoPlay=!0,this.index=0,this.delay=3e3,this.dir=this.ENUM.DIR.LEFT,this.errorImage="",this.lodingImage="",this.onChange,this.onImageClick,this.container,this.onChanged,this.scope,this.showNav=!0,this.autoHeight=!1,this.defaultImageUrl,this.defaultHeight,this.imageSize,this.loop=!1,this.errorImageUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAYCAMAAAAGTsm6AAAAMFBMVEX6+vr+/v7+/v7+/v7+/v7+/v7+/v7y8vLv7+/+/v7+/v7+/v729vYAAADt7e3+/v6PQhf9AAAADnRSTlOtVTOIZpki1+wRd0TCAMJ8iPYAAAKfSURBVHjaxZWLjqMwDEXJO7FN7v//7WITOgQ6pVpptbdSecTxiW3iLOt/0g3cirj3po1ZL5lcuw8Sud8QgegJbALy+laMZb/UdY2n9Xj9F/wKFnwLXu/KRiSLG7ISwk+s6Fm9n9PgZUjNKvJ34LLeRThECl4L4ssDyMKak7NLTRvKc41z28Bia15dEVWxwkYiShAicgb26QiwAY6ZC1gV4wCTXdXUjey09gFMOCSvVSv46u2kiEnyMm3DNGGIP4GLCLpIgQyOmD266MsqKnuQPnJbkWhTBalSeIEFycAdZi3in2osOjHM4CqmO5i0gvcaG9ipr4gyDT+BaQKbUom3VLc6xqXewaymBfQdOOu3QFew14HSbGPVLYRCediPBHZ5D2b0bOt6BBvvBsZLoqtvGIEGCWRCJVOQOIEFVpMqfwleaEFajLImNId0dKWb6AXWqrQg8NvN8ggmJRHcBNZiJu1OwyIclY8UWZUAxyoinsBqHtcMegSnHcwzOJfKXODUrwfVa8lq7z+uZ7Dboo3gR3CB0q/gcs5kB+I8KSKlnmdwrTu4AXnpj706j213ATvtlQU8knIJ2HdkRjmfoLkplL0ikJAewYTwDnw0icxRbeRyhCPoaGpTEiiGdpwY+RFcDSSbJVu76vacmYlS31PN1nfpRfHVdnjuqPHcWfS919ttoD2BCXWcyRPYYVcgzr533ki1DwLBuJZw9ERsD0mPCUH3+nr7xc9ghu4jEvT18nGFyHvfcx3eTjGbyaEDMuLJgvG+JRTz3pmA1ApQQ/4d3KpOaxraRhhgd65xC0C0gOyiHs/7iBcrZ65HElKFuQkAPp1OLTUFiNoysU7lfKr/usa6L4TS0Vfm8uVoo8q17Y/KdseyXFP9T9VOn9s88gcLTIlzurC4gAAAAABJRU5ErkJggg==",this.loadImageUrl="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAAYCAMAAAAGTsm6AAAAMFBMVEX6+vr+/v7+/v7+/v7+/v7+/v7+/v7+/v7y8vLv7+/+/v729vb+/v4AAADt7e3+/v6c4gmbAAAADnRSTlOtM4hmVZkiEdfsRMJ3AHDRYrYAAAGwSURBVHjaxdbZktsgEAVQLSxNL9z//9vQgvFYUjKpkqnkPhgJbI4bJMuL/af8DGeS8IcRZm+Shnwb21U/hQ1Ivx9gLL0pDbqMKbYJsN2TDlGPuiF3RzGhYrJ7FF9Rh42wT4VTbrD40WqBxEM89lAjpL2GA15j7h/gdIIzp0fwd2FijB62ER6TO/zdd40+g0kEVYQgw5EDbn3eWcRznEhFh6t4yhgrz+BXQYztDBfpucNyWmr9GNYTfCTSflrqyXDyO0Wv8OoDlH3cCpmRptmwe3cYr0jrsgzwv4EXXRAX2VTVInJAnL7UCvaXcNnjXGI7zuMdG/gLLuoRSG+fw7HDfIYTFWZCUGVboaXMvY89BNevML1PXIH9BRN7ImJvH8MJ5NwVDqqBCTwWpdjIftnjXfaHsGK7wyMCS9wmVtdmP50K+CCS8fFzVY/zxKwaa19qBlqn5qmwooxn8gkO6NmU01org3KpM2GG30cqqHa5uLad27F/h4q1OcAyEc7Fp8teWhMGHN73OG/9io7evGX78K9PjtkBcZLVa105ve2/2V5CLzHaewTyAJ6QlVf7a34BIRiNTVIrVfEAAAAASUVORK5CYII=",this._loadingNode,this._errorNode,this._isloadingImage=!1,this._pfix="slider",this._changing=!1,this._containerNode,this._rootNode,this._imageNode,this._navNode,this._imageLoaderNode,this._handerStartPos={x:0,y:0},this._moveValue=50,this._imageCount=0,this._played=!1,this._size={height:0,width:0},this._lastSize={height:0,width:0},this._displayImage,this._nextImage,this._loadingImage=new Image,this._changeCompletedEvents=[],this._autoPlayTimeout,this._loadMsg="加载中...",this.firstLoad=!0,this._defaultSize={width:0,height:0},this._loadingImage=new Image,this._errorImage=new Image},initialize:function(a){for(var b in a)switch(b){case"images":case"autoPlay":case"delay":case"dir":case"index":case"onChange":case"autoPlay":case"onImageClick":case"scope":case"onChanged":case"errorImageUrl":case"loadImageUrl":case"loop":case"showNav":case"defaultImageUrl":case"defaultHeight":case"imageSize":this[b]=a[b];break;case"container":this._containerNode="string"==typeof a[b]?$(a[b]):a[b],this[b]=a[b]}this._validArgs(),this._correctArgs(),this._imageCount=this.images.length,this._loadingImage.src=this.loadImageUrl,this._errorImage.src=this.errorImageUrl,this.autoHeight=this.imageSize&&this.imageSize.width&&this.imageSize.height?!1:!0},play:function(){this._played||(this._played=!0,this._injectHTML(),this._bindEvents()),this.rePlay()},stop:function(){this._clearAutoPlay()},rePlay:function(){this.autoPlay&&this._autoPlay()},_autoPlay:function(){this._autoPlayTimeout=setTimeout($.proxy(function(){this._isloadingImage||this._play()},this),this.delay)},next:function(){this._changing||this._play()},pre:function(){if(!this._changing){if(this.dir===this.ENUM.DIR.RIGHT)if(this.index>=this._imageCount-1){if(!this.loop)return;this.index=0}else this.index++;else if(this.index<=0){if(!this.loop)return;this.index=this._imageCount-1}else this.index--;this.goto(this.index)}},"goto":function(a){this.index=a,this._changeImage()},_play:function(){this.dir===this.ENUM.DIR.RIGHT?this._imageToRight():this._imageToLeft()},_clearAutoPlay:function(){clearTimeout(this._autoPlayTimeout)},_validArgs:function(){if(!this.container||!this._containerNode)throw"[c.widget.imageSlider]:no container!"},_correctArgs:function(){this.delay<=500&&(this.delay=2e3)},_createHTML:function(){return['<div class="cui-sliderContainer" style="width:100%;position:relative;">','<div class="cui-imageContainer" style="width:100%;">',"</div>",'<div class="cui-navContainer" style="color:#1491c5;position:absolute;"></div>','<div class="cui-imageLoader">',"</div>"].join("")},_createNav:function(){for(var a=[],b=0;b<this._imageCount;b++){var c=b==this.index?"cui-slide-nav-item-current":"";a.push('<span class="cui-slide-nav-item '+c+'"></span>')}this._navNode.empty().html(a.join(" "))},_injectHTML:function(){this._rootNode=$(this._createHTML()),this._containerNode.html(this._rootNode),this._imageNode=this._rootNode.find(".cui-imageContainer"),this._navNode=this._rootNode.find(".cui-navContainer"),this.showNav||this._navNode.css("display","none"),this._imageNode.empty(),this._createLoading(),this._imageCount>0?this._createImageItem(this.index,$.proxy(function(a,b){this._createNav(),this._setSize(b.height,b.width),this._displayImage=a,this._createImageContainer()},this)):(this._createDefault(),this._loadingNode.css("display","none"))},_onImageClick:function(){var a=this.images[this.index];return a&&a.onClick?void a.onClick.call(this.scope||this,a):void(this.onImageClick&&this.onImageClick.call(this.scope||this))},_createImageItem:function(a,b){this._isloadingImage=!0,!a&&(a=0);var c=this._getImageInfo(a),d=new Image;c.src&&(d.src=c.src),c.alt&&(d.alt=c.alt);var e=this;d.onload=function(){c.orgImage=d,e.autoHeight||(e._defaultSize.width=d.width,e._defaultSize.height=d.height),e._isloadingImage=!1,b.call(e,c,d)},d.onerror=function(){c.loadError=!0,e._errorImage=new Image,e._errorImage.src=e.errorImageUrl,e._isloadingImage=!1,e._errorImage.onload=function(){c.orgImage=e._errorImage,b.call(e,c,e._errorImage)}}},_getImageInfo:function(a){!a&&(a=0);for(var b=0,c=this.images.length;c>b;b++)if(a===b)return this.images[b];throw new Error("[c.ui.imageSlider]:image index is "+a+",but images.length is "+c)},_bindEvents:function(){this._containerNode.bind("touchmove",$.proxy(this._touchmove,this)),this._containerNode.bind("touchstart",$.proxy(this._touchstart,this)),this._containerNode.bind("touchend",$.proxy(this._touchend,this)),$(window).on("resize",$.proxy(this._resize,this)),this._navNode.bind("click",$.proxy(this._switchImage,this)),this._imageNode.bind("click",$.proxy(this._onImageClick,this))},_switchImage:function(a){var b=a.targetElement||a.srcElement,c=$(b).data("index");(0===c||c)&&this.index!==+c&&(this.index=c,this._changeImage())},_imageToRight:function(){if(this.index<=0){if(!this.loop)return;this.index=this._imageCount-1}else this.index--;this._changeImage(this.ENUM.DIR.LEFT)},_imageToLeft:function(){if(this.index>=this._imageCount-1){if(!this.loop)return;this.index=0}else this.index++;this._changeImage(this.ENUM.DIR.RIGHT)},_changeImage:function(a){if(!(this._imageCount<=1)){this._clearAutoPlay(),this._changing=!0,!a&&(a=this.dir);var b=this.images[this.index];b.node?(this._nextImage=b,this._showSliderImage(a)):(this._nextImage={node:this._loadingNode,orgImage:this._loadingImage},this._showLoading(),this._createImageItem(this.index,$.proxy(function(b){this._createImageContainer(),this._nextImage=b,this._showSliderImage(a)},this)))}},_showSliderImage:function(a){var b=0,c=0,d=0,e=0;a===this.ENUM.DIR.LEFT?(b=-1*this._size.width,c=0,d=0,e=this._size.width):(b=this._size.width,c=0,d=0,e=-1*this._size.width),this._displayImage.node.css("left",c),this._nextImage.node.css("left",b).css("display",""),this._nextImage.node.animate({left:d},500,"ease-out",$.proxy(function(){this._changing=!1,this._changeCompeted(),this.rePlay()},this)),this._displayImage.node.animate({left:e},500,"ease-out",$.proxy(function(){this._displayImage.node.css("display","none").css("left",0),this._displayImage=this._nextImage},this))},_touchmove:function(a){if(a.preventDefault(),!this._changing){var c=b.getMousePosOfElement(a.targetTouches[0],a.currentTarget),d=c.x-this._handerStartPos.x;d>0&&d>this._moveValue?this._imageToRight():0>d&&Math.abs(d)>this._moveValue&&this._imageToLeft()}},_touchstart:function(a){a.preventDefault();var c=b.getMousePosOfElement(a.targetTouches[0],a.currentTarget);this._handerStartPos={x:c.x,y:c.y}},_touchend:function(a){a.preventDefault()},_setSize:function(a,b){this._size.width=Math.ceil($(window).width()),this._size.height=Math.ceil(a*(this._size.width/b)),this._size.height<100&&(this._size.height=100,this._size.width=b*(this._size.height/a)),this._rootNode.css("width",this._size.width).css("height",this._size.height),this._imageNode.find("div").find("img").css("width",this._size.width).css("height",this._size.height),this.showNav&&this._setNavPos()},_setNavPos:function(){var a=(this._size.width-20*this._imageCount)/2,b=this._size.height-30;this._navNode.css("left",a).css("top",b)},_resize:function(){this._lastSize.width=this._size.width,this._lastSize.height=this._size.height,this.imageSize&&this.imageSize.height&&this.imageSize.width?this._setSize(this.imageSize.height,this.imageSize.width):this._displayImage&&!this._displayImage.loadError&&this._setSize(this._displayImage.orgImage.height,this._displayImage.orgImage.width)},_changeCompeted:function(){for(var a in this._changeCompletedEvents)this._changeCompletedEvents[a]();this._changeCompletedEvents.length=0,this._changeNav(),this.autoHeight&&this._resize(),this.onChanged&&this.onChanged.call(this.scope||this,this.images[this.index],this.index)},_changeNav:function(){this.showNav&&(this._navNode.find("span").removeClass("cui-slide-nav-item-current"),$(this._navNode.find("span")[this.index]).addClass("cui-slide-nav-item-current"))},_createImageContainer:function(){var a=this.images[this.index];if(this._loadingNode.css("display","none"),!a.node){{b.getElementPos(this._rootNode[0]).top-48}a.node=$(a.loadError?this._createImageHtml(this.errorImageUrl,a.alt):this._createImageHtml(a.src,a.alt)),this._imageNode.append(a.node),a.node.css("position","absolute").css("left",0),a.node.bind("click",function(a){a.preventDefault()})}this.autoHeight&&this._resize()},_createLoading:function(){if(this.firstLoad){this._loadingNode=$(this._createImageHtml(this.loadImageUrl));var a=['<div class="cui-breaking-load">','<div class="cui-i cui-m-logo">','</div> <div class="cui-i cui-w-loading">',"</div></div>"];this._loadingNode.html(a.join(" ")),this.autoHeight||(this._resize(),this._setLoadingPos()),this._imageNode.append(this._loadingNode),this.firstLoad=!1}},_setLoadingPos:function(){if(this._loadingNode.css("position","absolute").css("height",this._size.height).css("width",this._size.width),this._size.height){var a=(this._size.height-70)/2;this._loadingNode.find(".cui-breaking-load").css("top",a)}},_showLoading:function(){this._loadingNode.css("display",""),this._setLoadingPos()},_createDefault:function(){if(this.defaultImageUrl){var a=new Image;a.src=this.defaultImageUrl;var b=this;a.onload=function(){var c=$(b._createImageHtml(b.defaultImageUrl));b._imageNode.append(c),b._displayImage=a,b.autoHeight?b._setSize(a.height,a.width):b._setSize(b.imageSize.height,b.imageSize.width)}}},_createImageHtml:function(a,b){return'<div class="image-node slider-imageContainerNode"><img style="width:'+this._size.width+"px;height:"+this._size.height+'px" src="'+a+'" alt="'+(b?b:"")+'"></div>'}})});