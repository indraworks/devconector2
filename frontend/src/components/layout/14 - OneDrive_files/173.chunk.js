(window.odspNextWebpackJsonp=window.odspNextWebpackJsonp||[]).push([["173"],{"3039":function(e,t,n){"use strict";n.d(t,"e",function(){return i});var r=n(1626),i=(new r.e("play"),new r.e("rotate"),new r.e("editCaption"),new r.e("editTags"),new r.e("removeTags"),new r.e("viewOriginal"));new r.e("applyOfficeLens"),new r.e("removeOfficeLens"),new r.e("addToAlbum"),new r.e("removeFromAlbum"),new r.e("addPhotosToAlbum")},"3956":function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(109),s=n(1454),o=n(1561),u=n(1462),a=n(1954),f=n(3039),l=(function(e){Object(r.__extends)(t,e);function t(t){var n=e.call(this,t)||this;n.name="ViewOriginal";n._itemCommandHelper=new(n.managed(o.e));n._selectionHelper=new(n.child(u.e))({allowMultiSelect:!1,canFallback:!1,overrideItem:t.item});n._url=n.observables.pureCompute(function(){var e=n._selectionHelper.firstItem(),t=e&&e.photo&&e.photo.originalUrl;return t&&t.replace(/#/g,"%23")});n._navigationAction=new(n.managed(a.e))({url:n._url,target:"_blank"});return n}t.prototype.onIsAvailable=function(){var e=this._selectionHelper.firstItem();return!!e&&!!this._url()&&this._itemCommandHelper.isCommandSupported(e,f.e)};t.prototype.onExecute=function(e,t){return this._url.peek()?this._navigationAction.execute(e):i.n.reject({})};return t})(s.e);t.default=l}}]);