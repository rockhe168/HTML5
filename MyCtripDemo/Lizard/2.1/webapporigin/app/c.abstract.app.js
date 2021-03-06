﻿/** 
 * @File c.abstract.app.js
 * Lizard APP对象
 * @author wxj@ctrip.com/luwei@ctripcom
 * @version V2.1
 */
define(['cPageModelProcessor', 'cUtilPerformance', 'cUtilCommon', 'loading', (Lizard.app.vendor.is('CTRIP') || Lizard.isHybrid) ? 'cHybridHeader' : 'UIHeader', 'loadFailed', 'UIAlert', 'UIToast', 'cMessageCenter', 'UIAnimation', Lizard.app.version.gte(6.4)? 'cHybridShell' : '','cPageParser'],
  function (callModels, cperformance, utils, Loading, Header, Warning404, Alert, Toast, MessageCenter, animation, cHybridShell) {

    if (/\/html5\//i.test(location.href.replace(/[\?#].+$/, ''))) {
      $('<base/>').attr('href', location.href.replace(/\/html5\//i, '/webapp/')).prependTo($('head').eq(0));
    }

    //矫正lizard的两个静态属性 ;
    Lizard.runAt = "client"; //运行在什么环境 html5还是webapp
    var renderAt = $('.main-viewport').attr('renderat');
    Lizard.renderAt = 'server';
    if (!renderAt) Lizard.renderAt = 'client'; //判断首屏渲染的环境v8还是brower

    function APP(options) {
      this.initialize(options)
    }

    APP.subclasses = [];

    APP.defaults = {
      "mainRoot"        : '#main',
      "header"          : 'header',
      "viewport"        : '.main-viewport',
      "animForwardName" : 'slideleft',
      "animBackwardName": 'slideright',
      "isAnim"          : false,
      //是否开启动画
      "maxsize"         : 10
    };

    APP.prototype = {
      ctnrViewNames: ['lizardHisCtnrView'],

      viewReady: function (handler) {
        //TODO subscribe viewReady message
        MessageCenter.subscribe('viewReady', handler);
      },

      initialize: function initialize(options) {
        // Lizard.group();
        var opts = this.initProperty(options);
        this.options = opts;
        this.firstState = null;
        this.mainRoot = $(opts.mainRoot);
        this.header = $(opts.header);
        this.targetViewport = this.viewport = this.mainRoot.find(opts.viewport);
        this.curView = null;
        this.lastView = null;
        //实例化cathViews组件
        this.maxsize = opts.maxsize;
        this.animForwardName = opts.animForwardName;
        this.animBackwardName = opts.animBackwardName;
        this.isAnim = Lizard.config.animationAPI || Lizard.config.isAnim || opts.isAnim;
        if (Lizard.config.animationAPI) {
          require([Lizard.config.animationAPI], _.bind(function(animation){
            this.animAPIs = animation;
          }, this));
        } else {
          this.animAPIs = animation;
        }
        this.animatName = this.animForwardName;
        this._loading = new Loading();
        this._alert = new Alert();
        this._confirm = new Alert();
        this._toast = new Toast();
        this._warning404 = new Warning404();
        
        //是否开启hashchange,false为不开启
        this.observe = false;
        this.headerView = new Header({ 'root': $('#headerview'),'parent':this });
        if (Lizard.isHybrid) {
          this.headerView.root.addClass('cm-header-hybird-wrap');
        }
        this.bindEvents();
        this.views = {};        
        this.start();
        MessageCenter.subscribe('switchview', function (inView, outView) {
          inView.$el.show();
        }, this);
      },

      /**
       * 以弹出框的形式，弹出提示信息,使用方式一
       * @method Global.Lizard.showMessage
       * @param {string} message 需要弹出的信息
       * @example
       * Lizard.showMessage('显示信息');
       */
      /**
       * 以弹出框的形式，弹出提示信息,使用方式二, 见{@link http://svn.ui.sh.ctripcorp.com/lizard/webapp/demo2.1/index.html#%2Fwebapp%2Fdemo2.1%2Fui%2Falert | UI Message Demo}
       * @method Global.Lizard.showMessage
       * @param {object} params 弹出框数据解构
       * @param {object} params.datamodel 弹出框表现层数据结构
       * @param {string} params.datamodel.content 显示内容
       * @param {string} [params.datamodel.title] 标题文本
       * @param {string} [params.datamodel.okTxt] 按钮文本
       * @param {function} [params.okAction] 按钮回调函数
       * @example
       * Lizard.showMessage({
       *    datamodel：
       *      {
       *        content："显示信息"，
       *        title："带标题",
       *        okTxt:"按钮文本",
       *      },
       *    okAction:function(){}   //按钮回调函数
       *  });
       */
      showMessage: function (params) {
        if (!params) params = {};
        if (typeof params == 'string') {
          params = {
            datamodel: {
              content: params
            }
          };
        }

        //每次需要重置属性，以防组件互相影响
        this._alert.resetDefaultProperty();
        this._alert.setOption(params);
        this._alert.refresh();
        this._alert.show();

      },

      /**
       * 隐藏由showMessage弹出的消息
       * @method Global.Lizard.hideMessage
       */
      hideMessage: function () {
        this._alert.hide();
      },

      /**
       * 以弹出框的形式，弹出确认信息,使用方式一
       * @method Global.Lizard.showConfirm
       * @param {String} message 需要弹出的信息
       * @example
       * Lizard.showConfirm('显示信息')
       */
      /**
       * 以弹出框的形式，弹出确认信息,使用方式二 见{@link http://svn.ui.sh.ctripcorp.com/lizard/webapp/demo2.1/index.html#%2Fwebapp%2Fdemo2.1%2Fui%2Falert | UI Message Demo}
       * @param {Object} param 需要弹出的信息
       * @method Global.Lizard.showConfirm
       * @param {object} params 弹出框数据解构
       * @param {object} params.datamodel 弹出框表现层数据结构
       * @param {string} params.datamodel.content 显示内容
       * @param {string} params.datamodel.title 标题文本
       * @param {array} [params.datamodel.btns] 按钮数组
       * @param {string} [params.datamodel.btn.name] 按钮标题
       * @param {string} [params.datamodel.btn.className] 按钮样式
       * @param {function} params.okAction 确认按钮回调函数
       * @param {function} params.cancleAction 取消按钮回调函数
       * @example
       * Lizard.showConfirem({
       *    datamodel：
       *      {
       *        content："显示信息"，
       *        title："带标题",
       *         btns: [
       *              { name: '取消', className: 'cui-btns-cancel' },
       *              { name: '确定', className: 'cui-btns-ok' }
       *            ]//对应按钮
       *      },
       *    okAction:function(){},           //确认按钮回调
       *    cancleAction:function(){}       //取消按钮的回调
       *  });
       */
      showConfirm: function (params) {
        if (!params) params = {};
        if (typeof params == 'string') {
          params = {
            datamodel: {
              content: params
            }
          };
        }

        this._confirm.resetDefaultProperty();

        //与showMessage不一样的地方
        this._confirm.datamodel.btns = [
          { name: '取消', className: 'cui-btns-cancel' },
          { name: '确定', className: 'cui-btns-ok' }
        ];
        this._confirm.setOption(params);
        this._confirm.refresh();
        this._confirm.show();
      },

      /**
       * 隐藏由showConfirm 弹出的确认信息框
       * @method Global.Lizard.hideConfirm
       */
      hideConfirm: function () {
        this._confirm.hide();
      },

      /**
       * 显示全局单例的404页面,使用方式一
       * @param {Function} retryFun 点击重试的回调
       * @method Global.Lizard.showWarning404
       */

      /**
       * 全局单例的warning404,使用方式二,
       * @method Global.Lizard.showWarning404
       * @param {Object} params  组件数据结构
       * @param {Object} params.datamodel  组件表现层数据结构
       * @param {String} params.datamodel.tel 拨打电话
       * @param {String} params.datamodel.loadFail 加载失败文本
       * @param {String} params.datamodel.telText 拨打电话文本
       * @param {String} params.datamodel.tryAgain 重试文本
       * @param {String} params.datamodel.contact 联系客服文本
       * @param {String} params.datamodel.showContact 是否联系客服文本
       * @param {Function} params.callTelAction 拨打电话回调函数
       * @param {Function} params.callTelAction 重试回调函数
       * @param {Object} [pageConfig=null] 页面配置。此参数已经废弃，这里暂时和之前的版本保持兼容，默认传null即可
       * @param {Object} [headData] 头部设置，用于设置头部的数据,见{@link http://svn.ui.sh.ctripcorp.com/lizard/webapp/demo2.1/index.html#%2Fwebapp%2Fdemo2.1%2Fui%2Fnew_header |UI Header Demo}

       * @example
       * Lizard.showWarning404({
       *   datamodel: {
       *     tel: '4000086666',
       *     loadFail: '加载失败，请稍后再试试吧',
       *     telText: '或者拨打携程客服电话',
       *     tryAgain: '重试',
       *     contact: '联系客服',
       *     showContact: true
       *    },
       *    callTelAction: function() {}, //拨打客服电话的回调
       *    retryAction: function(){}   // 点击重试按钮的回调
       * });
       */
      showWarning404: function (params, pageConfig, errorData) {
        var scope = this;

        if (!params) params = {};
        if (typeof params == 'function') {
          params = {
            retryAction: params
          };
        }

        //每次需要重置属性，以防组件互相影响
        this._warning404.resetDefaultProperty();
        this._warning404.setOption(params);
        this._warning404.refresh();

        Lizard.showHisCtnrView(function () {
          if (scope._warning404) {
            scope._warning404.wrapper = this.$el;
            scope._warning404.show();
            if (errorData) {
              this.headerview.set(errorData.headData);
            } else {
              this.headerview.set({view: this, title: '网络不给力', back: true, events: {returnHandler: function () {                
                if (window.location.href.substring(window.location.href.length-this.$el.attr("page-url").length)==this.$el.attr("page-url")) {
                  Lizard.goBack();
                } else {
                  Lizard.goTo(this.$el.attr('page-url'), {pushState: false});  
                }
              }}});
            }
          }
        }, function () {
          if (scope._warning404) scope._warning404.hide();
        }, {triggerHide: false, addToHistory: false, viewName: 'warning404', pageConfig: pageConfig});
      },

      /**
       * 关闭由showWarning404弹出的提示框
       * @method Global.Lizard.hideWarning404
       */
      hideWarning404: function () {
        this._warning404.hide();
      },

      /**
       * 显示提示信息，在一定时间内自动消失,使用方式一
       * @method Global.Lizard.showToast
       * @param {String} message 需要显示的消息
       * @example
       * Lizard.showToast('你好')
       */
      /**
       * 显示提示信息，在一定时间内自动消失,使用方式二, 见 {@link http://svn.ui.sh.ctripcorp.com/lizard/webapp/demo2.1/index.html#%2Fwebapp%2Fdemo2.1%2Fui%2Ftoast | UI toast Demo}
       * @method Global.Lizard.showToast
       * @param {object} params 弹出框数据解构
       * @param {object} params.datamodel 弹出框表现层数据结构
       * @param {string} params.datamodel.content 显示内容
       * @param {function} hideAction 关闭消息是的回调
       * @example
       * Lizard.showToast({
       *    datamodel:{
       *          content: '消息内容'
       *       }
       *       hideAction: function() {}//关闭消息时执行的回调
       *    });
       */
      showToast: function (params) {
        if (!params) params = {};
        if (typeof params == 'string') {
          params = {
            datamodel: {
              content: params
            }
          };
        }

        this._toast.resetDefaultProperty();
        this._toast.setOption(params);
        this._toast.refresh();
        this._toast.show();
      },

      /**
       * 关闭有showToast弹出的消息
       * @method Global.Lizard.hideToast
       */
      hideToast: function () {
        this._toast.hide();
      },

      /**
       * 显示携程的loading 图标,见{@link http://svn.ui.sh.ctripcorp.com/lizard/webapp/demo2.1/index.html#%2Fwebapp%2Fdemo2.1%2Fui%2Floading | UI Loading Demo}
       * @method Global.Lizard.showLoading
       * @param {Object} [params] loading数据结构
       * @param {Object} params.datamodel 表现层数据结构
       * @param {String} params.datamodel.content 显示文本
       * @param {Boolean} [params.datamodel.closeBtn=false] 是否显示关闭按钮
       *
       * @example
       * //方式一
       * Lizard.showLoading()
       * //方式二
       * Lizard.showLoading({
       *      datamodel: {
       *        content: '加载中...',
       *        closeBtn: true
       *      }
       * });
       */
      showLoading: function (params) {        
        if (this._loading._showTimeout) {
          clearTimeout(this._loading._showTimeout);
          delete this._loading._showTimeout;
        }
        if (!params) params = {};

        this._loading.resetDefaultProperty();        
        this.__showLoading(params);
      },
      
      __showLoading: function (params) {
        this._loading.setOption(params);
        this._loading.refresh();
        this._loading._showTimeout = setTimeout(_.bind(function () {
          if (_.isUndefined(cHybridShell)) {
            this._loading.show();  
          } else {
            var fn = new cHybridShell.Fn('show_loading_page');
            fn.run();
          }
          delete this._loading._showTimeout;
        }, this), Lizard.config.showloadingtimeout || 200);  
      },

      /**
       * 关闭携程的loading图标
       * @method Global.Lizard.hideLoading
       */
      hideLoading: function () {        
        if (this._loading._showTimeout) {
          clearTimeout(this._loading._showTimeout);
          delete this._loading._showTimeout;
        }
        if (_.isUndefined(cHybridShell)) {
          this._loading.hide();  
        } else {
          var fn = new cHybridShell.Fn('hide_loading_page');
          fn.run();
        }
      },

      initProperty: function initProperty(options) {
        var opts = _.extend({}, APP.defaults, options || {});
        return opts;
      },

      bindEvents: function () {
        //l_wang提升响应速度
        $.bindFastClick && $.bindFastClick();
        //处理a标签
        this._handleLink();
      },

      _handleLink: function _handleLink() {
        if (!Lizard.isHybrid && !utils.isSupportPushState) return;
        $('body').on('click', $.proxy(function (e) {
            var el = $(e.target);
            var needhandle = false;

            while (true) {
              if (!el[0]) break;
              if (el[0].nodeName == 'BODY') break;
              if (el.hasClass('sub-viewport')) break;

              if (el[0].nodeName == 'A') {
                needhandle = true;
                break;
              }
              el = el.parent();
            }

            if (needhandle) {
              var href = el.attr('href');
              var opts = {};
              var lizard_data = el.attr('lizard-data');

              if (Lizard.config['lizardCatch'] == 'off'|| (el.attr('lizard-catch') == 'off') || (href && utils.isExternalLink(href))) {
                return true;
              }
              e.preventDefault();
              if (lizard_data) {
                opts.data = JSON.parse(lizard_data);
              }
              if (el.attr('data-jumptype') == 'back') {
                this.back(el.attr('href'), opts);
              } else if (el.attr('data-jumptype') == 'forward') {
                this.goTo(el.attr('href'), opts);
              }
            }
          },
          this));
      },

      start: function () {

      },

      loadView: function (url, html, options) {
        var uuidDomready = cperformance.getUuid();
        var uuidOnload = cperformance.getUuid();
        cperformance.group(uuidDomready, {
          name       : "Domready",
          landingpage: (options.landingpage == 1) ? 1 : 0,
          url        : url
        });
        cperformance.group(uuidOnload, {
          name       : "Onload",
          landingpage: (options.landingpage == 1) ? 1 : 0,
          url        : url
        });
        if ((Lizard.config && Lizard.config.isHideAllLoading) || options.hideloading) {
          this.hideLoading();
        }
        else {
          this.showLoading();
        }
        Lizard.loadingView = true;

        if (url) {
          //先向ubt发送unload
          Lizard.unloadUbt && Lizard.unloadUbt(this.curView);
        }
        var pageConfig = Lizard._initParser(url, html);
        //获取页面配置后，执行Ajax获取数据并渲染callModels类似Model的excute并提供了成功和失败回调
        callModels(pageConfig, _.bind(function (datas, pageConfig) {
          //成功回调，先判断目前执行的回调是否属于当前用户最近浏览的URL
          if (_.isFunction(this.judgeForward) && !this.judgeForward(url)) {
            return;
          }
          var uuidTemplateRender = cperformance.getUuid();
          cperformance.group(uuidTemplateRender, {
            name: "TemplateRender",
            url : url
          });
          //执行渲染
          var renderObj = Lizard.render(pageConfig, datas);
          if (renderObj.header && this.targetViewport == this.viewport) {
            this.header.html(renderObj.header).css({display:''});
          }
          cperformance.groupEnd(uuidTemplateRender);
          //html模板提供两种缓存机制，一种根据viewName缓存，还有一种根据schema缓存
          if (!Lizard.viewHtmlMap) {
            Lizard.viewHtmlMap = {};
          }
          if (!Lizard.viewSchemaMap) {
            Lizard.viewSchemaMap = {};
          }
          //全局遮罩层特殊，比如404这样的View对应的viewName可能是一个业务View的，所以不缓存
          if (_.indexOf(this.ctnrViewNames, renderObj.config.viewName) == -1){
            Lizard.viewHtmlMap[renderObj.config.viewName] = html;
            if (_.isString(renderObj.config.url_schema)) {
              var url_schema = renderObj.config.url_schema;
              (url_schema.indexOf('/') == 0)?(Lizard.viewSchemaMap[Lizard.schema2re(url_schema) + '$'] = html):(Lizard.viewSchemaMap[Lizard.schema2re('/' + url_schema) + '$'] = html);
            } else {
              _.each(renderObj.config.url_schema, function(url_schema){
                (url_schema.indexOf('/') == 0)?(Lizard.viewSchemaMap[Lizard.schema2re(url_schema) + '$'] = html):(Lizard.viewSchemaMap[Lizard.schema2re('/' + url_schema) + '$'] = html);
              });  
            }  
          }
            
          //其实渲染完毕后，理论上就可以提前显示，而不必等 View实例化完成，所以这里先搞出节点放到文档碎片中根据需要可以提前append到文档上
          var renderNode = $('<DIV></DIV>').css({display: 'none'});
          if (options.renderAt == 'server') {
            this.hideLoading();
          } else {
            renderNode = $(renderObj.viewport).css({display: 'none'});
          }
          if (renderObj.config.showfake && (!this.views[renderObj.config.viewName] || this.views[renderObj.config.viewName].$el.attr('page-url') != url)) {
            if (_.isObject(renderObj.config.showfake) && renderObj.config.showfake.hideloading) {
              this.hideLoading();
            }
            Lizard.__fakeViewNode = renderNode.appendTo(this.targetViewport);
            this.curView && this.curView.$el.hide();
          }
          //实例化View
          require([renderObj.config.controller || 'cPageView'], _.bind(function (View) {
            if (_.isFunction(this.judgeForward) && !this.judgeForward(url)) {
              return;
            }
            if (this.curView) this.lastView = this.curView;
            //同一个ViewName的View共享View实例
            if (renderObj.config.viewName && this.views[renderObj.config.viewName]) {
              this.curView = this.views[renderObj.config.viewName];
              //url相同的不再重新创建节点，另外也允许业务通过emptyContentNode函数决定是否重新创建节点
              if (this.curView.$el.attr('page-url') != url && this.curView.$el.attr('page-url') != encodeURIComponent(url) && (!_.isFunction(this.curView.emptyContentNode) || this.curView.emptyContentNode(this.curView.$el.attr('page-url'), url))) {
                delete this.curView.navigationType;
                this.curView.$el.remove();
                !renderObj.config.showfake && renderNode.appendTo(this.targetViewport);
                this.curView.$el = renderNode;
                this.curView.onCreate && this.curView.onCreate();
                this.curView.delegateEvents();
                _.extend(this.curView, _.pick(renderObj, ['datas', 'config', 'lizTmpl', 'lizParam']));
              } else {
                this.curView.navigationType = this.navigationType;
              }
            }
            else {
              !renderObj.config.showfake && renderNode.appendTo(this.targetViewport);
              this.curView = new View({
                el: (options.renderAt == 'server') ? this.viewport.children().first() : renderNode
              });
              this.curView.$el.attr('page-url', url);
              delete this.curView.navigationType;
              this.curView.text = html;
              _.extend(this.curView, _.pick(renderObj, ['datas', 'config', 'lizTmpl', 'lizParam']));
            }
            if (this.curView.$el.parent()[0] != this.targetViewport[0]) {
              this.curView.$el.appendTo(this.targetViewport);
            }
            if (options.renderAt == 'server') renderNode.remove();
            Lizard.__fakeViewNode = null;
            cperformance.groupEnd(uuidDomready);
            if (this.curView && this.curView.switchByOut) {
              var self = this;
              this.curView.turning = function () {
                this.hideLoading();
                self.lastView && self.lastView.hide();
                MessageCenter.publish('switchview', [self.curView, self.lastView]);
                self.curView.$el.show();
              }
            }
            else {
              this.hideLoading();
              MessageCenter.publish('switchview', [this.curView, this.lastView]);
            }
            this.curView.lastViewId = this.curView.referrer = (this.lastView && this.lastView.config.viewName);
            this.switchView(this.curView, this.lastView);
            cperformance.groupEnd(uuidOnload);
            if (renderObj.config.viewName) {
              this.views[renderObj.config.viewName] = this.curView;
            }
          }, this))
        }, this), _.bind(function (datas, errorBack) {
          //失败回调
          this.hideLoading();
          var errorData =
          {
            callback: function () {              
              Lizard.goTo(url, {pushState: false});
            },
            headData: {
              title : '网络不给力',
              back  : true,
              events: {
                returnHandler: function () {
                  Lizard.back();
                }
              }
            }
          };
          if (errorBack) errorData = _.extend(errorData, errorBack(datas));
          this.showWarning404(_.bind(errorData.callback, this), pageConfig, errorData);
        }, this));
      },

      switchView: function(inView, outView) {
        if (outView && !document.getElementById(outView.id) && (inView && !inView.switchByOut)) {
          outView.$el.appendTo(this.targetViewport);
          outView.$el.hide();
          outView.id = outView.$el.attr('id');
        }
        if (inView && !document.getElementById(inView.id)) {
          inView.$el.appendTo(this.targetViewport);
          inView.$el.hide();
          inView.id = inView.$el.attr('id');
        }
        //inView.$el.show();
        //动画切换时执行的回调
        var switchFn;

        //此处有问题，如果inView不再的话，应该由firstState生成默认页面
        if (!inView) throw 'inview 未被实例化';

        //将T 、P的值重新设置回去
        Lizard.T.lizTmpl = inView.lizTmpl;
        Lizard.P.lizParam = inView.lizParam;

        //outView不存在的情况下就不释放动画接口
        if (outView) {
          outView.saveScrollPos();
          if (this.isAnim) {
            switchFn = this.animAPIs[this.animatName];
          }
          //switchFn = this.animAPIs[this.animatName];
          //未定义的话便使用默认的无动画
          //l_wang 此段代码需要做一个包裹，或者需要回调，否则不会执行应该执行的代码!!!
          inView.fromView = outView.config.viewName;
          if (_.indexOf(this.ctnrViewNames, inView.config.viewName) > -1) {
            MessageCenter.publish('showHisCtnrView');
            outView.hideWarning404 = _.bind(function () {
              if (this._warning404.status === 'show') {
                if (inView.config.viewName == 'warning404') {
                  this._warning404.hide();
                } else {
                  Lizard.goBack();
                }
              }
            }, this)
          }
          if (switchFn && _.isFunction(switchFn)) {
            switchFn(inView, outView, $.proxy(function (inView, outView) {
              this._onSwitchEnd(inView, outView);
            }, this));
          } else {
            if (_.indexOf(this.ctnrViewNames, inView.config.viewName) == -1) {
              inView && !inView.switchByOut && outView.hide();
              inView.show();
            }
            this._onSwitchEnd(inView, outView);
          }
        } else {
          //这里开始走view的逻辑，我这里不予关注
          if (_.indexOf(this.ctnrViewNames, inView.config.viewName) > -1) {
            MessageCenter.publish('showHisCtnrView');
          }
          inView.show();
          this._onSwitchEnd(inView, outView);
        }
      },
      //l_wang 既然使用消息机制，就应该全部使用，后期重构
      _onSwitchEnd: function (inView, outView) {
        _.each(this.targetViewport.children(), function (view) {
          if (inView.switchByOut && outView && view == outView.$el[0]) return;
          if (view != inView.$el[0]) $(view).hide();          
        })
        if (outView != inView && !inView.switchByOut) {
          setTimeout(function () {
            outView && outView.$el && outView.$el.hide()
          }, 10);
        }

        MessageCenter.publish('viewReady', [inView]);
      },

      showView: function (data) {
        this.loadView(data.url, data.text, data.options);
      },

      /**
       * 页面跳转方法,灵活使用此方法,也可实现跨页面跳转
       * @param {String} url URL信息
       * @param {Object} [opt] 跨页跳转的配置参数,如不传此参数, 则为单页的view切换, 详细参数信息,见{@link http://jimzhao2012.github.io/api/classes/CtripUtil.html#method_app_open_url},
       * @param {String} [opt.targetModel] 打开模式  如果全局的Lizard.config.multiView=on开启,则取值为4
       *
       * 0.当前页面刷新url, 该参数类似于js的location.href="", 注：只支持打online地址
       *
       * 1.处理ctrip://协议; 注：只处理ctrip协议的URL Schema
       *
       * 2.开启新的H5页面,title生效; 注：只支持online地址
       *
       * 3.使用系统浏览器打开; 注：只支持online地址和其它App的URL Schema，例如微信的weixin://home
       *
       * 4.开启新的H5页面，title生效，打开webapp目录下的相对路径；注：和2对应，2打开online地址，4打开相对路径
       *
       * 5.当前页面打开webapp目录下相对路径；注：和0对应，0是打开online地址，5是打开本地相对路径。 5.8之前版本，内部自动调用app_cross_package_href
       * @param {String} [opt.pageName] view的唯一标示
       * @param {String} [opt.title]  当targetMode＝2时候，新打开的H5页面的title
       * @param {Boolean} [opt.isShowLoadingPage] 开启新的webview的时候，是否加载app的loading
       * @method Global.Lizard.goTo
       * @example
       * //新开WebView的方式打开 osd/osdindex webView的名称指定为webViewOsd
       * Lizard.goTo(Lizard.appBaseUrl + 'osd/osdindex', {targetModel: '4', pageName: 'webViewOsd'})
       * //在同一个webView中直接跳转到osd/osdindex
       * Lizard.goTo(Lizard.appBaseUrl + 'osd/osdindex')
       */
      goTo: function (url, opt) {

      },

      /**
       * 页面回退方法,如果在第一个页面回退,则自动会回退至native界面
       * @param {String} url URL信息
       * @param {Object} opt 设置信息
       * @param {String} [opt.pageName] 可选,如指定了此参数,多webview的情况,可回退至指定页面
       * @method Global.Lizard.goBack
       * @example
       * //回退至上一个页面,框架会判断如果是webview最先打开的页面会直接回退到上一个native页
       * Lizard.goBack()
       * //多WebView的情况下,回退至已打开webViewOsd页面, {pageName: 'webViewOsd'})
       * Lizard.goBack(Lizard.appBaseUrl + 'osd/osdindex', {pageName: 'webViewOsd'})
       */
      goBack: function () {

      },

      /**
       * 处理跨频道跳转, 屏蔽web与hybrid跨频道的不同
       * @method Global.Lizard.jump
       * @param {String} url 要跳转的页面,支持http/https/ctripwireless和部分路径
       * @param {Object} [opt]  配置参数, 详细见{@link http://jimzhao2012.github.io/api/classes/CtripUtil.html#method_app_open_url},
       * @param {number} [opt.targetModel=4] 新页面打开方式,4为单页面打开,5为新webview打开
       * @param {boolean} [opt.replace=false] 是否在浏览器history中增加记录
       * @example
       *  //在web环境下, href会跳转至http://m.ctrip.com/webapp/ticket/index, hybrid环境中会打开ticket/index.html#/webapp/ticket/index
       *  Lizard.jump('http://m.ctrip.com/webapp/ticket/index')
       *  //单webview打开线上地址
       *  Lizard.jump('http://m.ctrip.com/webapp/ticket/index',{targetModel:0})
       *  //多webview打开线上,或者设置Lizard.config.multiView 为 on
       *  Lizard.jump('http://m.ctrip.com/webapp/ticket/index',{targetModel:2})
       *  //web环境下会跳转至/webapp/myctrip/orders/allorders,hybrid环境中会打开myctrip/index.html#/webapp/myctrip/orders/allorders
       *  Lizard.jump('/webapp/myctrip/orders/allorders')
       *  //多webview打开hybrid页面
       *  Lizard.jump('/webapp/myctrip/orders/allorders',{targetModel:4})
       *  //跳转至native页面
       *  Lizard.jump('ctrip://wireless/hotel?id=2342342')
       */
      jump:function(url,opt){

      },
      /*
       * @deprecated 2.1 废弃
       * 内部调用goTo,具体参考goTo方法
       * @param url
       * @param opt
       * @method Lizard.go
       */
      go    : function () {
      },

      /**
       * 显示一个全局遮盖层
       * @param {Function} 显示遮盖层时的回调
       * @param {Function} 隐藏遮盖层时的回调
       * @param {Object}   传入参数
       * @method Lizard.showHisCtnrView
       */
      showHisCtnrView: function (onShow, onHide, options) {
        if (!this.curView && !options.pageConfig) return;
        if (!this.curView && options.pageConfig) options.addToHistory = false;
        var oldAnimFlag = this.isAnim, oldAnimName = this.animatName;
        if (this.curView) {
          this.curView.triggerShow = this.curView.triggerHide = options ? (!options.triggerFlag) : true;
          this.curView.triggerHide = options && ('triggerHide' in options) ? (options.triggerHide) : true;
        }
        this.isAnim = (options && options.isAnim) ? true : this.isAnim;
        if (this.isAnim) {
          this.animatName = this.animForwardName;
        }
        var config = _.clone(options.pageConfig ? options.pageConfig : this.curView.config);
        var url = options.pageConfig ? options.pageConfig.pageUrl : this.curView.config.pageUrl;
        config.model.apis = [];
        config.view = { viewport: '' };
        config.controller = 'cPageView';
        config.viewName = options && options.viewName ? options.viewName : url;
        if (_.indexOf(this.ctnrViewNames, config.viewName) == -1) {
          this.ctnrViewNames.push(config.viewName);
        }        
        if (!options || options.addToHistory !== false) {
          if (Lizard.isHybrid) {
            this.endObserver();
            if (encodeURIComponent(url) == window.location.hash.substr(1)) {
              window.location.hash = encodeURIComponent(encodeURIComponent(url));
              url = encodeURIComponent(url);
            } else {
              window.location.hash = encodeURIComponent(url);
            }            
          } else {
            history.pushState({url: url, text: ' <SCRIPT type="text/lizard-config">' + JSON.stringify(config) + '<' + '/SCRIPT>', options: {pushState: true}}, document.title, url);
          }
        }
        this.loadView(url, ' <SCRIPT type="text/lizard-config">' + JSON.stringify(config) + '<' + '/SCRIPT>', { pushState: true, hideloading: true });
        if (Lizard.isHybrid) {
          setTimeout(_.bind(this.startObserver, this), 1);
        }
        var headData = {};
        MessageCenter.unsubscribe('showHisCtnrView');
        MessageCenter.subscribe('showHisCtnrView', function () {
          var self = this;
          this.lizardHisCtnrView = this.curView;
          if (!this.curView.onShow) {
            this.curView.onShow = function () {
              onShow && onShow.apply(this, arguments);
              setTimeout(function () {
                self.animatName = self.animBackwardName;
              }, 10);
            };
            this.curView.onHide = function () {
              onHide && onHide.apply(this, arguments);
              setTimeout(function () {
                self.isAnim = oldAnimFlag;
                self.animatName = oldAnimName;
              }, 10)
            }; 
          }  
          this.curView.show();
          if (self.isAnim) this.curView.onShowed = true
        }, this)
      },

      /**
       * 隐藏遮盖层
       * @method Lizard.hideHisCtnrView
       */
      hideHisCtnrView: function () {
        history.back();
      },
      
      stateObserve: function(callback, scope, args) {
        if (!this.curView) return;
        if (!this._stateCallbacks) this._stateCallbacks = [];
        this._stateCallbacks.push({callback: callback, scope: scope, args: args, view: this.curView});        
      },
      
      _callObserveBack: function () {
        var callbackFunc = this._stateCallbacks.pop();
        if (callbackFunc.view == this.curView) {
          callbackFunc.callback.apply(callbackFunc.scope, callbackFunc.args);            
        }  
      },
      
      interface: function () {
        return {
          'viewReady'      : this.viewReady,
          'showMessage'    : this.showMessage,
          'hideMessage'    : this.hideMessage,
          'showConfirm'    : this.showConfirm,
          'hideConfirm'    : this.hideConfirm,
          'showWarning404' : this.showWarning404,
          'hideWarning404' : this.hideWarning404,
          'showToast'      : this.showToast,
          'hideToast'      : this.hideToast,
          'showLoading'    : this.showLoading,
          'hideLoading'    : this.hideLoading,
          'showHisCtnrView': this.showHisCtnrView,
          'hideHisCtnrView': this.hideHisCtnrView,
          'stateObserve'   : this.stateObserve,
          "goTo"           : this.goTo,
          "goBack"         : this.goBack,
          "forward"        : this.goTo,
          "back"           : this.goBack,
          "go"             : this.go,
          "jump"           : this.jump
        }
      }
    }

    return APP
  })
