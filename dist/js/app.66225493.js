(function(e){function t(t){for(var a,c,i=t[0],o=t[1],u=t[2],d=0,v=[];d<i.length;d++)c=i[d],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&v.push(n[c][0]),n[c]=0;for(a in o)Object.prototype.hasOwnProperty.call(o,a)&&(e[a]=o[a]);l&&l(t);while(v.length)v.shift()();return s.push.apply(s,u||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],a=!0,i=1;i<r.length;i++){var o=r[i];0!==n[o]&&(a=!1)}a&&(s.splice(t--,1),e=c(c.s=r[0]))}return e}var a={},n={app:0},s=[];function c(t){if(a[t])return a[t].exports;var r=a[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=e,c.c=a,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(r,a,function(t){return e[t]}.bind(null,a));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=o;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},"579e":function(e,t,r){},ca46:function(e,t,r){"use strict";var a=r("579e"),n=r.n(a);n.a},cd49:function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-app",[a("v-navigation-drawer",{attrs:{app:"",width:"325"}},[a("SubjectsNavigation",{on:{errorOccured:function(t){return e.errorOccured(t)}}})],1),a("v-app-bar",{attrs:{app:""}},[a("v-spacer"),a("span",{staticClass:"font-weight-black"},[e._v("Spegg")]),a("v-avatar",{staticClass:"d-block text-center mx-auto mt-4",attrs:{size:"48"}},[a("img",{attrs:{src:r("cf05")}})])],1),a("v-main",[a("v-container",{attrs:{fluid:""}},[a("router-view")],1)],1),a("v-footer",{attrs:{app:""}})],1)},s=[],c=r("d4ec"),i=r("bee2"),o=r("262e"),u=r("2caf"),l=r("9ab4"),d=r("60a3"),v=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-sheet",{attrs:{color:"grey lighten-5",width:"100%"}},[r("v-text-field",{staticClass:"mx-3",attrs:{label:"Filter"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),r("v-list-group",{attrs:{value:!1,"prepend-icon":"mdi-domain"},scopedSlots:e._u([{key:"activator",fn:function(){return[r("v-list-item-title",[e._v("Anbieter")])]},proxy:!0}])},[r("v-list",{attrs:{dense:""}},[r("v-list-item-group",{attrs:{color:"primary",shaped:""},model:{value:e.subject,callback:function(t){e.subject=t},expression:"subject"}},e._l(e.filteredSubjects("Provider"),(function(t,a){return r("v-list-item",{key:a,attrs:{to:{name:"Subject",params:{id:t.id,version:t.latest_version}}}},[r("v-list-item-content",[r("v-list-item-title",{domProps:{textContent:e._s(t.title)}})],1)],1)})),1)],1)],1),r("v-list-group",{attrs:{value:!1,"prepend-icon":"mdi-domain"},scopedSlots:e._u([{key:"activator",fn:function(){return[r("v-list-item-title",[e._v("Produkttypen")])]},proxy:!0}])},[r("v-list",{attrs:{dense:""}},[r("v-list-item-group",{attrs:{color:"primary",shaped:"",active:"false"},model:{value:e.subject,callback:function(t){e.subject=t},expression:"subject"}},e._l(e.filteredSubjects("Product"),(function(t,a){return r("v-list-item",{key:a,attrs:{to:{name:"Subject",params:{id:t.id,version:t.latest_version}}}},[r("v-list-item-content",[r("v-list-item-title",{domProps:{textContent:e._s(t.title)}})],1)],1)})),1)],1)],1)],1)},b=[],f=(r("4de4"),r("caad"),r("ac1f"),r("2532"),r("841c"),r("2ca0"),r("99af"),r("bc3a")),p=r.n(f),m=p.a.create({baseURL:"/api/v1"}),j=function(){function e(){Object(c["a"])(this,e)}return Object(i["a"])(e,[{key:"info",value:function(){return m.get("/info")}},{key:"getAllSubjects",value:function(){return m.get("/Subject")}},{key:"getSubjectVersion",value:function(e,t){return m.get("/Subject/".concat(e,"/").concat(t))}},{key:"getReference",value:function(e,t,r){return m.get("/Reference/".concat(e,"/").concat(t,"/").concat(r))}}]),e}(),h=new j,_=function(e){Object(o["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.headers=[{text:"Subject",align:"start",value:"id"}],e.subjects=[],e.search="",e.subject="",e}return Object(i["a"])(r,[{key:"mounted",value:function(){var e=this;h.getAllSubjects().then((function(t){e.subjects=t.data})).catch((function(t){e.$emit("errorOccured",t),console.log(t)}))}},{key:"icon",value:function(e){return e.id.startsWith("gemProdT")?"mdi-server":"mdi-domain"}},{key:"filteredSubjects",value:function(e){var t=this;return this.subjects.filter((function(r){return r.id.toLowerCase().includes(t.search.toLowerCase())&&r.type==e}))}}]),r}(d["b"]);_=Object(l["a"])([Object(d["a"])({components:{}})],_);var y=_,O=y,g=r("2877"),x=r("6544"),k=r.n(x),S=r("8860"),w=r("56b0"),V=r("da13"),C=r("5d23"),R=r("1baa"),$=r("8dd9"),P=r("8654"),L=Object(g["a"])(O,v,b,!1,null,null,null),T=L.exports;k()(L,{VList:S["a"],VListGroup:w["a"],VListItem:V["a"],VListItemContent:C["a"],VListItemGroup:R["a"],VListItemTitle:C["b"],VSheet:$["a"],VTextField:P["a"]});var A=function(e){Object(o["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.showingError=!1,e.error="",e.drawer=!0,e}return Object(i["a"])(r,[{key:"errorOccured",value:function(e){this.error=e,this.showingError=!0}}]),r}(d["b"]);A=Object(l["a"])([Object(d["a"])({components:{SubjectsNavigation:T}})],A);var E=A,H=E,q=r("7496"),M=r("40dc"),F=r("8212"),I=r("a523"),B=r("553a"),N=r("f6c4"),D=r("f774"),G=r("2fa4"),J=Object(g["a"])(H,n,s,!1,null,null,null),W=J.exports;k()(J,{VApp:q["a"],VAppBar:M["a"],VAvatar:F["a"],VContainer:I["a"],VFooter:B["a"],VMain:N["a"],VNavigationDrawer:D["a"],VSpacer:G["a"]});var z=r("8c4f"),Q=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},U=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pa-3"},[r("div",{staticClass:"text-h3"},[e._v("Home")])])}],K=new j,X=function(e){Object(o["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.subjects=[],e}return Object(i["a"])(r,[{key:"mounted",value:function(){var e=this;K.getAllSubjects().then((function(t){e.subjects=t.data})).catch((function(e){console.log(e)}))}}]),r}(d["b"]);X=Object(l["a"])([Object(d["a"])({components:{}})],X);var Y=X,Z=Y,ee=Object(g["a"])(Z,Q,U,!1,null,null,null),te=ee.exports,re=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pa-3"},[null==e.subject?r("v-skeleton-loader",{attrs:{type:"list-item-avatar, divider, list-item-three-line, card-heading, image, actions"}}):e._e(),e.subject?r("div",[r("v-breadcrumbs",{attrs:{items:e.breadcrumbs(),divider:"/"}}),r("div",[r("span",{staticClass:"text-h4"},[e._v(e._s(e.subject.title))])]),r("div",e._l(e.versions,(function(t){return r("v-chip",{key:t,staticClass:"ma-2",attrs:{to:{name:"Subject",params:{id:e.subject.subject_id,version:t}},"active-class":"primary"}},[e._v(" "+e._s(t)+" ")])})),1),r("v-data-table",{staticClass:"elevation-1 ma-3",attrs:{dense:"","hide-default-footer":"","disable-pagination":"",headers:e.resourcesHeaders,items:e.subject.references,search:e.searchResources,"item-key":"subject_id","sort-by":"subject_id"},scopedSlots:e._u([{key:"item.requirements_count",fn:function(t){var a=t.item;return[r("v-chip",{staticClass:"ma-2 pill",attrs:{color:"orange",outlined:"",pill:"",to:{name:"Reference",params:{subject_id:e.subject.subject_id,subject_version:e.subject.version,resource_id:a.resource.id}}}},[e._v(" "+e._s(a.requirements_count)+" Requirements ")])]}},{key:"item.resource.id",fn:function(t){var a=t.item;return[a.url.startsWith("http")?r("a",{attrs:{target:"_blank",href:a.url}},[e._v(e._s(a.resource.id))]):r("span",[e._v(e._s(a.resource.id))])]}},{key:"top",fn:function(){return[r("v-text-field",{staticClass:"mx-4",attrs:{label:"Search"},model:{value:e.searchResources,callback:function(t){e.searchResources=t},expression:"searchResources"}})]},proxy:!0}],null,!1,1224930752)})],1):e._e()],1)},ae=[],ne=new j,se=function(e){Object(o["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.searchResources="",e.subject=null,e.versions=[],e.resourcesHeaders=[{text:"Reference",value:"resource.title"},{text:"Resource",value:"resource.id"},{text:"Requirements",value:"requirements_count"},{text:"Version",value:"version"}],e}return Object(i["a"])(r,[{key:"onRoute",value:function(){var e=this;this.subject=null,ne.getSubjectVersion(this.$route.params.id,this.$route.params.version).then((function(t){e.subject=t.data,e.versions=e.subject.all_versions.sort()})).catch((function(t){e.$emit("errorOccured",t.message),console.log(t)}))}},{key:"breadcrumbs",value:function(){var e=[];return e.push({text:"Home",to:"/"}),e.push({text:this.subject.subject_id,to:"/Subject/"+this.subject.subject_id}),e}}]),r}(d["b"]);Object(l["a"])([Object(d["c"])("$route",{immediate:!0,deep:!0})],se.prototype,"onRoute",null),se=Object(l["a"])([Object(d["a"])({components:{}})],se);var ce=se,ie=ce,oe=(r("ca46"),r("2bc5")),ue=r("cc20"),le=r("8fea"),de=r("3129"),ve=Object(g["a"])(ie,re,ae,!1,null,"c0162dd4",null),be=ve.exports;k()(ve,{VBreadcrumbs:oe["a"],VChip:ue["a"],VDataTable:le["a"],VSkeletonLoader:de["a"],VTextField:P["a"]});var fe=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pa-3"},[e.reference?r("div",[r("v-breadcrumbs",{attrs:{items:e.breadcrumbs(),divider:"/"}}),r("p",{staticClass:"text-h4"},[e._v("Anforderungen an "),r("b",[e._v(e._s(e.reference.referred_by.subject_id)+" v"+e._s(e.reference.referred_by.subject_version))])]),r("p",{staticClass:"text-h5"},[e._v("Quelle: "),r("a",{attrs:{target:"_blank",href:e.reference.url}},[e._v(e._s(e.reference.resource_id)+" v"+e._s(e.reference.version))])]),e._l(e.reference.requirements,(function(t,a){return r("v-card",{key:a},[r("v-card-title",[e._v(e._s(t.id)+" "+e._s(t.title))]),r("v-card-text",[r("div",{domProps:{innerHTML:e._s(t.html)}})])],1)}))],2):e._e()])},pe=[],me=new j,je=function(e){Object(o["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.reference=null,e}return Object(i["a"])(r,[{key:"onRoute",value:function(){var e=this;me.getReference(this.$route.params.subject_id,this.$route.params.subject_version,this.$route.params.resource_id).then((function(t){e.reference=t.data})).catch((function(t){e.$emit("errorOccured",t.message),console.log(t)}))}},{key:"breadcrumbs",value:function(){var e=[];return e.push({text:"Home",to:"/"}),e.push({text:this.reference.referred_by.subject_id+" v"+this.reference.referred_by.subject_version,exact:!0,to:{name:"Subject",params:{id:this.reference.referred_by.subject_id,version:this.reference.referred_by.subject_version}}}),e.push({text:this.reference.resource_id}),e}}]),r}(d["b"]);Object(l["a"])([Object(d["c"])("$route",{immediate:!0,deep:!0})],je.prototype,"onRoute",null),je=Object(l["a"])([Object(d["a"])({components:{}})],je);var he=je,_e=he,ye=r("b0af"),Oe=r("99d9"),ge=Object(g["a"])(_e,fe,pe,!1,null,null,null),xe=ge.exports;k()(ge,{VBreadcrumbs:oe["a"],VCard:ye["a"],VCardText:Oe["a"],VCardTitle:Oe["b"]}),a["a"].use(z["a"]);var ke=[{path:"/",name:"Home",component:te},{path:"/Subject/:id/:version",name:"Subject",props:!0,component:be},{path:"/Subject/:subject_id/:subject_version/Reference/:resource_id",name:"Reference",props:!0,component:xe}],Se=new z["a"]({mode:"history",base:"/",routes:ke}),we=Se,Ve=r("2f62");a["a"].use(Ve["a"]);var Ce=new Ve["a"].Store({state:{},mutations:{},actions:{},modules:{}}),Re=r("f309");a["a"].use(Re["a"]);var $e=new Re["a"]({});a["a"].config.productionTip=!1,new a["a"]({router:we,store:Ce,vuetify:$e,render:function(e){return e(W)}}).$mount("#app")},cf05:function(e,t,r){e.exports=r.p+"img/logo.901ce1c6.png"}});
//# sourceMappingURL=app.66225493.js.map