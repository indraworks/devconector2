(window.odspNextWebpackJsonp=window.odspNextWebpackJsonp||[]).push([["164"],{"1810":function(e,t,n){"use strict";n.d(t,"n",function(){return i});n.d(t,"t",function(){return s});n.d(t,"e",function(){return o});var r=n(1626),i=new r.e("share"),s=(new r.e("addToShared"),new r.e("embed"),new r.e("comment"),new r.e("removeFromShared"),new r.e("addAsMountPoint"),new r.e("removeAsMountPoint"),new r.e("reportAbuse"),new r.e("requestReview"),new r.e("alertItem")),o=new r.e("alertItem")},"1837":function(e,t,n){"use strict";var r=n(436),i=n(88),s=n(168),o=(function(){function e(e){this._itemUrlHelper=e.itemUrlHelper;this._sharingContextInformation=e.sharingContextInformation}e.prototype.getApiRoot=function(e,t,n){if(this._sharingContextInformation){var i=this._sharingContextInformation,s=i.isFolder,o=i.isListSharing,u=i.itemUrl,a=i.listId,f=i.listItemId,l=i.listUrl,c=i.resourceId,h=i.serverRelativeItemUrl,p=i.uniqueId,d=i.webAbsoluteUrl;if(!this.isListSharingKillswitchActive()&&o)return e.build().webByUrl({webUrl:d}).method("Lists",a);if(p){if(a)return e.build().webByUrl({webUrl:d}).segment("lists").method("getbyid",a).method("GetItemByUniqueId",p);var v=s?"GetFolderById":"GetFileById",m={guid:p};return e.build().webByUrl({webUrl:d}).method(v,m).segment("ListItemAllFields")}return l?e.build().webByUrl({listUrl:l}).method("GetListItem",h):u?e.build().webByUrl({webUrl:d}).method("GetFileByUrl",this._encodingFixEnabled()?u:r.t(u)).segment("ListItemAllFields"):a&&f?e.build().webByUrl({webUrl:d}).method("Lists",a).method("GetItemById",f):e.build().webByUrl({webUrl:d}).method("GetListItemByResourceId",c)}var g;g=t.properties.path?this._itemUrlHelper.getUrlParts({path:t.properties.path}):this._itemUrlHelper.getItemUrlParts(t.key);var y=e.build().webByItemUrl(g).method("Lists",n);this.isListSharingKillswitchActive()?y=t.properties.ID?y.method("GetItemById",t.properties.ID):y.method("GetItemByUniqueId",t.properties.uniqueId):t.isRootFolder||(y=t.properties.ID?y.method("GetItemById",t.properties.ID):y.method("GetItemByUniqueId",t.properties.uniqueId));return y};e.prototype.getFileUrl=function(e){return this._itemUrlHelper.getItemUrlParts(e.key).fullItemUrl};e.prototype.canUseSecurable=function(e){var t=e.properties;return!!t&&(this.isListSharingKillswitchActive()?!!t.ID||!!t.uniqueId:e.isRootFolder?!!e.list&&!!e.list.id:!!t.ID||!!t.uniqueId)};e.getUniqueSharingPrincipals=function(e){if(e){var t=new Set;return e.filter(function(e){if(t.has(e.loginName))return!1;t.add(e.loginName);return!0})}};e.prototype.isListSharingKillswitchActive=function(){return i.e.isActivated("0d6f4387-b53c-48b9-aab6-66369291541d","03/27/2020","List sharing changes in odsp-datasources")};e.prototype._encodingFixEnabled=function(){return s.default.isFeatureEnabled({ODB:1331})};return e})();t.e=o},"2183":function(e,t,n){"use strict";var r=n(0),i=n(69),s=n(1440),o=n(1468),u=n(638),a=n(1837),f=n(1724),l=n(651),c=n(71),h=n(786),p=(function(e){Object(r.__extends)(t,e);function t(t){var n=e.call(this,t)||this;n._itemParentHelper=n.resources.consume(o.e);n._itemUrlHelper=n.resources.consume(u.n);n._sharingContextInformation=n.resources.consume(i.p.optional);n._sharingDataSourceHelperCommon=new a.e({itemUrlHelper:n._itemUrlHelper,sharingContextInformation:n._sharingContextInformation});return n}t.prototype.encodeSharingLink=function(e){if(!e)return e;var t=e.split("?");return l.e(t[0],!0)+(t[1]?"?"+t[1]:"")};t.prototype.getApiRoot=function(e,t){var n=this.getParentListId(t);Object(h.isFeatureEnabled)(h.ShareControlListSharingUI)&&this._sharingContextInformation&&t.isRootFolder&&(this._sharingContextInformation.isListSharing=!0);return this._sharingDataSourceHelperCommon.getApiRoot(e,Object(f.n)(t),n)};t.prototype.getExpirationFromLink=function(e){if(e&&e.indexOf("expiration=")>-1){var t=new c.default(e).getQueryParameter("expiration");t.indexOf("Z")!==t.length-1&&(t=t.replace(/\+/g," ")+" UTC");var n=Date.parse(t);if(n)return new Date(n).toString()}return null};t.prototype.getExpirationFromSharingLinkInfo=function(e){return""!==e?e:null};t.prototype.getFileUrl=function(e){return this._itemUrlHelper.getItemUrlParts(e.key).fullItemUrl};t.prototype.getParentListId=function(e){var t=this.peekUnwrapObservable(this._itemParentHelper.getFacetedAncestorOrSelf(e,"list"));return t?t.list.id:e&&e.properties?e.properties.listId:null};t.prototype.canUseSecurable=function(e){var t=e.properties;return!!t&&(Object(h.isFeatureEnabled)(h.ShareControlListSharingUI)&&e.isRootFolder?!!e.list&&!!e.list.id:!!t.ID||!!t.uniqueId)};return t})(s.n);t.e=p},"2762":function(e,t,n){"use strict";n.r(t);var r=n(0),i=n(47),s=n(325),o=n(1454),u=n(1462),a=n(109),f=n(2183),l=n(638),c=n(114),h=n(1561),p=n(1810),d=n(1718),v=n(69),m=n(3129),g=n(438),y=(function(e){Object(r.__extends)(t,e);function t(t){var n=e.call(this,t)||this,r=t.overrideItem,i=t.scenarioId,o=t.defaultRecipients;n._itemRedeemer=n.resources.consume(m.e);n._itemBeingShared=n.resources.consume(t.focusItemResourceKey);n._selectionHelper=new(n.child(u.e))({overrideItem:r?n.createObservable(t.overrideItem):null,allowMultiSelect:!1,canFallback:!0});n._sharingDataSourceHelper=new(n.managed(f.e));n._urlDataSource=n.resources.consume(s.me);n._itemCommandHelper=n.resources.consume(h.t);n._itemUrlHelper=n.resources.consume(l.n);n._pageContext=n.resources.consume(v.h);n._scenarioId=i;n._defaultRecipients=o;n.name="ShowShareAction";return n}t.prototype.onIsAvailable=function(){var t=this._selectionHelper.firstItem();if(!t)return!1;if(!this._itemCommandHelper.isCommandSupported(t,p.n))return!1;var n=this._itemUrlHelper.getItemUrlParts(t.key);if(n&&n.siteRelation===l.t.crossSite&&!this._pageContext.isNoScriptEnabled)return!1;var r=t.mruState,i=!r||r.canBeShared,s=!!this._sharingDataSourceHelper.getParentListId(t),o=t.properties&&(!!t.properties.ID||!!t.properties.uniqueId);return!!this._itemBeingShared()||e.prototype.onIsAvailable.call(this)&&!this._urlDataSource.isRecycleBin(t.queryType)&&!t.isRootFolder&&!t.list&&i&&s&&o&&!(t.lifeCycleStatus&&t.lifeCycleStatus.isExternal)};t.prototype.onExecute=function(e,t){var n=this;this._itemBeingShared.peek()&&this._itemBeingShared(void 0);var r=this._selectionHelper.firstItem.peek();return this._itemRedeemer.redeemItems([r],this).then(function(){t.data.extraData||(t.data.extraData={});c.e(t.data.extraData,{uniqueId:r.properties?r.properties.uniqueId:void 0,Host:Object(g.e)()});n._itemBeingShared({items:[r],scenarioId:n._scenarioId,defaultRecipients:n._defaultRecipients});return a.n.wrap({resultType:i.e.Success})},function(e){return a.n.reject(e)})};t.prototype.getEngagement=function(){return e.prototype.getEngagement.call(this).withPart(d.e,{item:this._selectionHelper.firstItem.peek()})};return t})(o.e);t.default=y},"3129":function(e,t,n){"use strict";n.d(t,"e",function(){return a});var r=n(109),i=n(47),s=n(18),o=n(325),u=(function(){function e(e,t){this._ticketRedeemer=t.ticketRedeemer}e.prototype.redeemItem=function(e,t,n){return this.redeemItems([e],t,n)};e.prototype.redeemItems=function(e,t,n){return e&&e.some(function(e){return e&&e.tokenNeedsRedeeming})||n?r.n.resolve(this._ticketRedeemer()).then(function(n){return n?n.startRedeem(t,e&&e[0]):{resultType:i.e.Success}}):r.n.resolve({resultType:i.e.Success})};return e})(),a=Object(s.s)("ItemRedeemer",u,{ticketRedeemer:o.ve.async.optional})}}]);