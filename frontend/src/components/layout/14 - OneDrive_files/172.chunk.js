(window.odspNextWebpackJsonp=window.odspNextWebpackJsonp||[]).push([["172"],{"3454":function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(1454),s=n(1718),o=n(787),u=n(1462),a=n(786),f=n(136),l=n(1920),c=(function(e){Object(r.__extends)(t,e);function t(t){var n=e.call(this,t)||this;n.name="ViewInFolderAction";var r=n.resources;n._actionMap=r.consume(o.e);n._itemSelectionHelper=new(n.child(u.e))({allowMultiSelect:!1,canFallback:!1});n._navigationAction=new(n.managed(n._actionMap.NavigationAction))({url:n.createPureComputed(function(){return n._itemSelectionHelper.firstItem()&&n._itemSelectionHelper.firstItem().parentLink})});Object(f.e)()&&(n._openInDesktopAction=new(n.managed(n._actionMap.OpenInDesktopAction))({openRelation:2,item:n._itemSelectionHelper.firstItem,actionType:l.e.OpenFileLocation}));return n}t.prototype.onExecute=function(e,t){return this._openInDesktopAction?this._openInDesktopAction.execute(e):this._navigationAction.execute(e)};t.prototype.onIsAvailable=function(){return!(this._openInDesktopAction&&!this._openInDesktopAction.isAvailable())&&(Object(a.isFeatureEnabled)(a.EnableViewInFolder)&&this._navigationAction.isAvailable())};t.prototype.getEngagement=function(){return e.prototype.getEngagement.call(this).withPart(s.e,{item:this._itemSelectionHelper.firstItem.peek()})};return t})(i.e);t.default=c}}]);