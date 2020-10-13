(function(e){function t(t){for(var a,c,o=t[0],i=t[1],u=t[2],d=0,v=[];d<o.length;d++)c=o[d],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&v.push(n[c][0]),n[c]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);l&&l(t);while(v.length)v.shift()();return s.push.apply(s,u||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],a=!0,o=1;o<r.length;o++){var i=r[o];0!==n[i]&&(a=!1)}a&&(s.splice(t--,1),e=c(c.s=r[0]))}return e}var a={},n={app:0},s=[];function c(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=e,c.c=a,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(r,a,function(t){return e[t]}.bind(null,a));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],i=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=i;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},cd49:function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",{attrs:{id:"inspire"}},[a("v-app-bar",{attrs:{app:"","clipped-right":"",flat:"",height:"72"}},[a("v-alert",{attrs:{type:"error",icon:"mdi-alert",dismissible:""},model:{value:e.showingError,callback:function(t){e.showingError=t},expression:"showingError"}},[e._v(e._s(e.error))]),a("v-spacer"),a("v-responsive",{attrs:{"max-width":"156"}},[a("v-text-field",{attrs:{dense:"",flat:"","hide-details":"",rounded:"","solo-inverted":""}})],1)],1),a("v-navigation-drawer",{attrs:{app:"",width:"22em"}},[a("v-navigation-drawer",{attrs:{absolute:"",color:"grey lighten-3","mini-variant":""},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[a("v-avatar",{staticClass:"d-block text-center mx-auto mt-4",attrs:{size:"48"}},[a("img",{attrs:{src:r("cf05")}})]),a("v-divider",{staticClass:"mx-3 my-5"}),a("v-icon",{staticClass:"d-block text-center mx-auto mb-9",attrs:{large:"",color:"primary darken-2"}},[e._v(" mdi-domain ")]),a("v-icon",{staticClass:"d-block text-center mx-auto mb-9",attrs:{large:"",color:"green darken-2"}},[e._v(" mdi-file-tree-outline ")]),a("v-icon",{staticClass:"d-block text-center mx-auto mb-9",attrs:{large:"",color:"red darken-2"}},[e._v(" mdi-file-document-edit ")])],1),a("SubjectsNavigation",{on:{errorOccured:function(t){return e.errorOccured(t)}}})],1),a("v-main",[a("router-view",{on:{errorOccured:function(t){return e.errorOccured(t)}}})],1)],1)},s=[],c=r("d4ec"),o=r("bee2"),i=r("262e"),u=r("2caf"),l=r("9ab4"),d=r("60a3"),v=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pl-14"},[r("v-sheet",{attrs:{color:"grey lighten-5",width:"100%"}},[r("v-text-field",{staticClass:"mx-3",attrs:{label:"Filter"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),r("v-list",{attrs:{dense:""}},[r("v-list-item-group",{attrs:{color:"primary",shaped:""},model:{value:e.subject,callback:function(t){e.subject=t},expression:"subject"}},e._l(e.filteredSubjects(),(function(t,a){return r("v-list-item",{key:a,attrs:{to:{name:"Subject",params:{id:t.id,version:t.latest_version}}}},[r("v-list-item-icon",[r("v-icon",{domProps:{textContent:e._s(e.icon(t))}})],1),r("v-list-item-content",[r("v-list-item-title",{domProps:{textContent:e._s(t.id)}})],1)],1)})),1)],1)],1)},b=[],p=(r("4de4"),r("caad"),r("ac1f"),r("2532"),r("841c"),r("2ca0"),r("99af"),r("bc3a")),f=r.n(p),m=f.a.create({baseURL:"/api/v1"}),h=function(){function e(){Object(c["a"])(this,e)}return Object(o["a"])(e,[{key:"info",value:function(){return m.get("/info")}},{key:"getAllSubjects",value:function(){return m.get("/Subject")}},{key:"getSubjectVersion",value:function(e,t){return m.get("/Subject/".concat(e,"/").concat(t))}}]),e}(),j=new h,g=function(e){Object(i["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.headers=[{text:"Subject",align:"start",value:"id"}],e.subjects=[],e.search="",e.subject="",e}return Object(o["a"])(r,[{key:"mounted",value:function(){var e=this;j.getAllSubjects().then((function(t){e.subjects=t.data})).catch((function(t){e.$emit("errorOccured",t),console.log(t)}))}},{key:"icon",value:function(e){return e.id.startsWith("gemProdT")?"mdi-server":"mdi-domain"}},{key:"filteredSubjects",value:function(){var e=this;return this.subjects.filter((function(t){return t.id.toLowerCase().includes(e.search.toLowerCase())}))}}]),r}(d["b"]);g=Object(l["a"])([Object(d["a"])({components:{}})],g);var O=g,y=O,x=r("2877"),_=r("6544"),w=r.n(_),k=r("132d"),S=r("8860"),V=r("da13"),C=r("5d23"),R=r("1baa"),$=r("34c3"),E=r("8dd9"),L=r("8654"),P=Object(x["a"])(y,v,b,!1,null,null,null),T=P.exports;w()(P,{VIcon:k["a"],VList:S["a"],VListItem:V["a"],VListItemContent:C["a"],VListItemGroup:R["a"],VListItemIcon:$["a"],VListItemTitle:C["b"],VSheet:E["a"],VTextField:L["a"]});var I=function(e){Object(i["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.showingError=!1,e.error="",e.drawer=!0,e}return Object(o["a"])(r,[{key:"errorOccured",value:function(e){this.error=e,this.showingError=!0}}]),r}(d["b"]);I=Object(l["a"])([Object(d["a"])({components:{SubjectsNavigation:T}})],I);var A=I,M=A,F=r("0798"),H=r("7496"),D=r("40dc"),N=r("8212"),q=r("ce7e"),J=r("f6c4"),z=r("f774"),B=r("6b53"),G=r("2fa4"),U=Object(x["a"])(M,n,s,!1,null,null,null),W=U.exports;w()(U,{VAlert:F["a"],VApp:H["a"],VAppBar:D["a"],VAvatar:N["a"],VDivider:q["a"],VIcon:k["a"],VMain:J["a"],VNavigationDrawer:z["a"],VResponsive:B["a"],VSpacer:G["a"],VTextField:L["a"]});var K=r("8c4f"),Q=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},X=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pa-3"},[r("div",{staticClass:"text-h3"},[e._v("Home")])])}],Y=new h,Z=function(e){Object(i["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.subjects=[],e}return Object(o["a"])(r,[{key:"mounted",value:function(){var e=this;Y.getAllSubjects().then((function(t){e.subjects=t.data})).catch((function(e){console.log(e)}))}}]),r}(d["b"]);Z=Object(l["a"])([Object(d["a"])({components:{}})],Z);var ee=Z,te=ee,re=Object(x["a"])(te,Q,X,!1,null,null,null),ae=re.exports,ne=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pa-3"},[null==e.subject?r("v-skeleton-loader",{attrs:{type:"list-item-avatar, divider, list-item-three-line, card-heading, image, actions"}}):e._e(),e.subject?r("div",[r("div",[r("span",{staticClass:"text-h4"},[e._v(e._s(e.subject.subject_id))])]),r("div",e._l(e.versions,(function(t){return r("v-chip",{key:t,staticClass:"ma-2",attrs:{to:{name:"Subject",params:{id:e.subject.subject_id,version:t}},"active-class":"primary"}},[e._v(" "+e._s(t)+" ")])})),1),r("v-data-table",{staticClass:"elevation-1 ma-3",attrs:{dense:"","hide-default-footer":"","disable-pagination":"",headers:e.resourcesHeaders,items:e.subject.references,search:e.searchResources,"item-key":"subject_id","sort-by":"subject_id"},scopedSlots:e._u([{key:"top",fn:function(){return[r("v-text-field",{staticClass:"mx-4",attrs:{label:"Search"},model:{value:e.searchResources,callback:function(t){e.searchResources=t},expression:"searchResources"}})]},proxy:!0}],null,!1,770823929)})],1):e._e()],1)},se=[],ce=new h,oe=function(e){Object(i["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.searchResources="",e.subject=null,e.versions=[],e.resourcesHeaders=[{text:"Reference",value:"resource.description"},{text:"Resource",value:"resource.id"},{text:"Reqs",value:"requirements_count"},{text:"Version",value:"version"}],e}return Object(o["a"])(r,[{key:"onRoute",value:function(){var e=this;this.subject=null,ce.getSubjectVersion(this.$route.params.id,this.$route.params.version).then((function(t){e.subject=t.data,e.versions=e.subject.all_versions.sort(),console.log(e.subject)})).catch((function(t){e.$emit("errorOccured",t.message),console.log(t)}))}}]),r}(d["b"]);Object(l["a"])([Object(d["c"])("$route",{immediate:!0,deep:!0})],oe.prototype,"onRoute",null),oe=Object(l["a"])([Object(d["a"])({components:{}})],oe);var ie=oe,ue=ie,le=r("cc20"),de=r("8fea"),ve=r("3129"),be=Object(x["a"])(ue,ne,se,!1,null,null,null),pe=be.exports;w()(be,{VChip:le["a"],VDataTable:de["a"],VSkeletonLoader:ve["a"],VTextField:L["a"]}),a["a"].use(K["a"]);var fe=[{path:"/",name:"Home",component:ae},{path:"/Subject/:id/:version",name:"Subject",props:!0,component:pe}],me=new K["a"]({mode:"history",base:"/",routes:fe}),he=me,je=r("2f62");a["a"].use(je["a"]);var ge=new je["a"].Store({state:{},mutations:{},actions:{},modules:{}}),Oe=r("f309");a["a"].use(Oe["a"]);var ye=new Oe["a"]({});a["a"].config.productionTip=!1,new a["a"]({router:he,store:ge,vuetify:ye,render:function(e){return e(W)}}).$mount("#app")},cf05:function(e,t,r){e.exports=r.p+"img/logo.901ce1c6.png"}});
//# sourceMappingURL=app.917a1a93.js.map