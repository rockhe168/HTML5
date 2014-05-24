define(["cBase","cStore","cStorage","cUtility"],function(a,b,c,d){var e={};return e.UserStore=new a.Class(b,{__propertys__:function(){this.key="USER",this.lifeTime="1D"},initialize:function($super,a){$super(a)},getUser:function(){var a=c.localStorage.oldGet("USERINFO");return a=a&&a.data||null,this.set(a),a},setUser:function(a){var b=c.localStorage.getExpireTime("USERINFO"),d={data:a,timeout:b};c.localStorage.oldSet("USERINFO",JSON.stringify(d)),this.set(a)},removeUser:function(){c.localStorage.oldRemove("USERINFO"),this.set(null)},isNonUser:function(){var a=this.getUser();return a&&!!a.IsNonUser},isLogin:function(){var a=this.getUser();return a&&!!a.Auth&&!a.IsNonUser},getUserName:function(){var a=this.getUser();return a.UserName},getUserId:function(){var a=this.getUser()||{};return a.UserID||d.getGuid()},getAuth:function(){var a=e.HeadStore.getInstance(),b=this.getUser();return b&&b.Auth&&a.setAttr("auth",b.Auth),a.getAttr("auth")},setAuth:function(a){var b=this.isLogin(),c=this.getUser()||{};c.Auth=a,c.IsNonUser=b?!1:!0,this.setUser(c)},setNonUser:function(a){var b=c.localStorage.oldGet("USERINFO"),d=e.HeadStore.getInstance(),f=b&&b.data||{};f.Auth=a,f.IsNonUser=!0,this.setUser(f),d.setAttr("auth",a)}}),e.HeadStore=new a.Class(b,{userStore:e.UserStore.getInstance(),__propertys__:function(){this.key="HEADSTORE",this.lifeTime="15D",this.defaultData={cid:d.getGuid(),ctok:"351858059049938",cver:"1.0",lang:"01",sid:"8888",syscode:"09",auth:""};var a=this.get;this.get=function(){var b=a.apply(this,arguments),c=this.userStore.getUser(),d=e.SalesObjectStore.getInstance().get();return b.sid=d&&d.sid?d.sid:"8888",b.auth=c&&c.Auth?c.Auth:"",this.set(b),b}},initialize:function($super,a){$super(a)},setAuth:function(a){var b=e.UserStore.getInstance();b.setAuth(a),this.setAttr("auth",a)}}),e.UnionStore=new a.Class(b,{__propertys__:function(){this.key="UNION",this.lifeTime="7D",this.store=c.localStorage},initialize:function($super,a){$super(a)},get:function(){var a=this.store.oldGet(this.key);return a&&a.data||null},set:function(b,c){c||(c=new a.Date(d.getServerDate()),c.addSeconds(this._getLifeTime()));var e={data:b,timeout:c.format("Y/m/d H:i:s")};this.store.oldSet(this.key,JSON.stringify(e))}}),e.SalesStore=new a.Class(b,{__propertys__:function(){this.key="SALES",this.lifeTime="30D",this.store=c.localStorage},initialize:function($super,a){$super(a)},get:function(){var a=this.store.oldGet(this.key);return a&&a.data||null},set:function(b,c){c||(c=new a.Date(d.getServerDate()),c.addSeconds(this._getLifeTime()));var e={data:b,timeout:c.format("Y/m/d H:i:s")};this.store.oldSet(this.key,JSON.stringify(e))}}),e.SalesObjectStore=new a.Class(b,{__propertys__:function(){this.key="SALES_OBJECT",this.lifeTime="30D"},initialize:function($super,a){$super(a)}}),e.UnionStore.getInstance=e.SalesStore.getInstance=a.getInstance,e});