define(["libs","c"],function(a,b){var c=b.base,d=new c.Class({__propertys__:function(){this.models=new c.Hash,this.index=0,this.results={}},initialize:function(a){this.setOption(a)},setOption:function(a){for(var b in a)switch(b){case"models":this.addModels(a[b])}},addModel:function(a,b){this.models.add(a,b)},addModels:function(a){for(var b in a)a.hasOwnProperty(b)&&this.models.add(b,a[b])},removeModelByName:function(a){this.models.del(a)},removeModelByIndex:function(a){this.models.delByIndex(a)},excute:function(a,b,c,d,e){if(!this.models.length())throw"No model";this.index=0,this._request(a,b,c,d,e)},_request:function(a,b,c,d,e){var f=this.models.index(this.index),g=this;f.excute(function(f){return g.results[g.models.getKey(g.index)]=f,g.index++,g.index>=g.models.length()?(a&&a.call(this,g.results),void(g.results={})):void g._request(a,b,c,d,e)},function(a){b&&b.call(this,a)},c,d,e)}});return d});