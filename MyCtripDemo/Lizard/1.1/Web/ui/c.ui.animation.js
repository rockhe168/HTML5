define([],function(){return{slideleft:function(a,b,c,d){$("body").addClass("hiddenx"),a.addClass("animatestart"),a.addClass("sliderightin"),a.__show();return setTimeout(function(){$("body").removeClass("hiddenx"),a.removeClass("animatestart"),a.removeClass("sliderightin"),b&&b.__hide(a.viewname),c&&c.call(d,a,b)},340)},slideright:function(a,b,c,d){$("body").addClass("hiddenx"),b&&(b.addClass("animatestart"),b.addClass("sliderightout")),a.__show();return setTimeout(function(){$("body").removeClass("hiddenx"),b&&(b.removeClass("animatestart"),b.removeClass("sliderightout"),b.__hide(a.viewname)),c&&c.call(d,a,b)},340)},noAnimate:function(a,b,c,d){this.mainframe.hide(),b&&b.__hide(a.viewname),a.__show(),this.mainframe.show(),c&&c.call(d,a,b)}}});