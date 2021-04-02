(window.odspNextWebpackJsonp=window.odspNextWebpackJsonp||[]).push([["68"],{"1450":function(e,t,n){"use strict";n.r(t);n.d(t,"ItemType",function(){return r});var r;(function(e){e[e.File=0]="File";e[e.Folder=1]="Folder";e[e.Media=2]="Media";e[e.OneNote=3]="OneNote";e[e.Unknown=4]="Unknown";e[e.Error=5]="Error";e[e.App=6]="App";e[e.Subsite=7]="Subsite";e[e.Shortcut=8]="Shortcut"})(r||(r={}));t.default=r},"1790":function(e,t,n){"use strict";var r=n(0),i=n(109),s=n(1440),o=n(382),u=(function(e){Object(r.__extends)(t,e);function t(t){var n=e.call(this,t)||this;n._getModule=t.getModule;n._path=t.path;n._getExecutorParams=t.getExecutorParams;n._bundleLoader=n.resources.consume(o.e);n._bundleLoader.queueLoad(n._path,n._getModule).done();return n}t.prototype.execute=function(e,t){var n=this;return this._path?this._loadExecutorType().then(function(r){return"function"!=typeof r?i.n.wrapError(new Error("Cannot create action from "+r+": "+n._path)):i.n.as(n._getExecutorParams()).then(function(s){var o=new(n.resources.injected(r))(s);return i.n.as(o.execute(e,t))})}):i.n.wrapError(new Error("Cannot create action from nothing: "+this._path))};t.prototype._loadExecutorType=function(){var e=this._bundleLoader.loadNow(this._path,this._getModule);this._loadExecutorType=function(){return e};return e};return t})(s.n);t.e=u},"1806":function(e,t,n){"use strict";var r=n(0),i=n(1790),s=(function(e){Object(r.__extends)(t,e);function t(t){void 0===t&&(t={});var n=e.call(this,t)||this;n._loader=new(n.managed(i.e))({path:n.getExecutorPath(),getModule:n.getModuleFactory(),getExecutorParams:function(){return n.selectionHelper.resolveSelection().then(function(e){return n.getExecutorParameters({selection:e})})}});return n}t.prototype.onExecute=function(e,t){return this._loader.execute(e,t)};return t})(n(1898).e);t.e=s},"1898":function(e,t,n){"use strict";var r=n(0),i=n(1454),s=n(1561),o=n(1462),u=(function(e){Object(r.__extends)(t,e);function t(t){void 0===t&&(t={});var n=e.call(this,t)||this;n.itemCommandHelper=new(n.managed(s.e));n.selectionHelper=new(n.child(o.e))(Object(r.__assign)(Object(r.__assign)({},n.getSelectionOptions()),{overrideItem:t.item}));return n}t.prototype.getSelectionOptions=function(){return{}};return t})(i.e);t.e=u},"2096":function(e,t,n){"use strict";n.d(t,"n",function(){return i});n.d(t,"e",function(){return s});n.d(t,"t",function(){return o});var r=n(1626),i=new r.e("upload"),s=new r.e("download"),o=new r.e("sync")},"2739":function(e,t,n){"use strict";n.d(t,"e",function(){return u});var r=n(903),i=n(1450),s=n(168),o=n(28);function u(e,t,n){if(e.type===i.default.OneNote)return!1;if(e.list||e.subsite)return!1;return!(!s.default.isFeatureEnabled({ODB:831,ODC:"UseDownloadMicroservice"})||n||!e.urls[r.e.downloadAsZip]||!e.urls[r.e.itemUrl]||0===e.childCount||e.type!==i.default.Folder)||!e.isRootFolder&&(!!t&&((!t||!t.list||t.list.templateType!==o.n.webPageLibrary)&&(e.type===i.default.File||e.type===i.default.Media||e.type===i.default.Unknown)))}},"3442":function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(109),s=n(1806),o=n(787),u=n(786),a=n(1468),f=n(231),l=n(903),c=n(325),h=n(2739),p=n(1561),d=n(2096),v=n(1724),m=n(61),g=(function(e){Object(r.__extends)(t,e);function t(t){void 0===t&&(t={});var n=e.call(this,t)||this;n.name="Download";n._urlDataSource=n.resources.consume(c.me);n._currentItem=n.resources.consume(o.s);n._itemParentHelper=n.resources.consume(a.e);n._itemCommandHelper=n.resources.consume(p.t);return n}t.prototype.getExecutorPath=function(){return"./DownloadExecutor"};t.prototype.getModuleFactory=function(){return function(){return i.n.resolve(n.e("69").then(n.bind(null,3545)))}};t.prototype.getSelectionOptions=function(){var e=Object(u.isFeatureEnabled)(u.DownloadAsZip);return{allowMultiSelect:e,canFallback:e}};t.prototype.getExecutorParameters=function(){return{selectionHelper:this.selectionHelper,currentItem:this._currentItem.peek(),actionName:this.name}};t.prototype.onIsAvailable=function(){var e=this,t=this._currentItem();if(!t)return!1;var n=this._urlDataSource.getKeyParams(t.key),r=this._urlDataSource.getQueryType(n);if(this._urlDataSource.isRecycleBin(r))return!1;var i=this.selectionHelper.selection(),s=i&&i.length>1;if(s&&(!Object(u.isFeatureEnabled)(u.DownloadAsZip)||i[0]&&i[0]&&i[0].peek()&&!i[0].peek().urls[l.t.itemUrl]||!i[0].peek().urls[l.t.downloadAsZip]))return!1;var o=i.filter(function(t){return t&&e._canDownloadItem(t)}),a=o.length,c=o.filter(function(e){return e&&e.peek().urls[l.t.itemUrl]&&e.peek().urls[l.t.itemUrl]});return!(s&&c&&a>c.length)&&(a>1||a&&(!!this.unwrapObservable(this._itemParentHelper.getFacetedAncestorOrSelf(o[0].peek(),"list"))||o[0].peek().type===f.e.Folder))};t.prototype._canDownloadItem=function(e){var t=e();if(3===t.itemStatus||4===t.itemStatus)return!1;if(!m.e.hasItemPermission(t,m.e.openItems))return!1;var n=this.unwrapObservable(this._itemParentHelper.getFacetedAncestorOrSelf(t,"list"));return this._itemCommandHelper.isCommandSupported(t,d.e)&&h.e(Object(v.n)(t),Object(v.n)(n),!1)};return t})(s.e);t.default=g}}]);