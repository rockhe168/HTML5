define(["libs"],function(){var a=function(a){function b(a,b,c,d){var e=h(a,b,c,d);return e.type="GET",g(e)}function c(a,b,c,d){b=JSON.stringify(b);var e=h(a,b,c,d);return e.type="POST",e.dataType="json",e.timeout=3e4,e.contentType="application/json",g(e)}function d(a,b,c,d){var e=h(a,b,c,d);return e.type="GET",e.dataType="jsonp",e.crossDomain=!0,g(e)}function e(a,b,c,d,e){"get"!==b.toLowerCase()&&(c=JSON.stringify(c));var f=h(a,c,d,e);return f.type=b,f.dataType="json",f.crossDomain=!0,f.data=c,f.contentType="application/json; charset=utf-8",g(f)}function f(b,c,d,e){var f=null,i="";f=a("string"==typeof c?"#"+c:c),f&&f.length>0&&(i=f.serialize());var j=h(b,i,d,e);return g(j)}function g(b){var c={url:b.url,type:b.type,dataType:b.dataType,data:b.data,contentType:b.contentType,timeout:b.timeout||5e4,success:function(a){b.callback(a)},error:function(a){b.error&&b.error(a)}};return-1===b.url.indexOf(window.location.host)&&(c.crossDomain=!!b.crossDomain),a.ajax(c)}function h(a,b,c,d){return{url:a,data:b,callback:c,error:d}}return{get:b,post:c,jsonp:d,cros:e,form:f}}($);return a});