(function(e){function t(t){for(var s,c,i=t[0],o=t[1],u=t[2],v=0,d=[];v<i.length;v++)c=i[v],Object.prototype.hasOwnProperty.call(n,c)&&n[c]&&d.push(n[c][0]),n[c]=0;for(s in o)Object.prototype.hasOwnProperty.call(o,s)&&(e[s]=o[s]);l&&l(t);while(d.length)d.shift()();return a.push.apply(a,u||[]),r()}function r(){for(var e,t=0;t<a.length;t++){for(var r=a[t],s=!0,i=1;i<r.length;i++){var o=r[i];0!==n[o]&&(s=!1)}s&&(a.splice(t--,1),e=c(c.s=r[0]))}return e}var s={},n={app:0},a=[];function c(t){if(s[t])return s[t].exports;var r=s[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,c),r.l=!0,r.exports}c.m=e,c.c=s,c.d=function(e,t,r){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(c.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)c.d(r,s,function(t){return e[t]}.bind(null,s));return r},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],o=i.push.bind(i);i.push=t,i=i.slice();for(var u=0;u<i.length;u++)t(i[u]);var l=o;a.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("cd49")},6422:function(e,t,r){"use strict";var s=r("fe31"),n=r.n(s);n.a},7659:function(e,t,r){"use strict";var s=r("b9d6"),n=r.n(s);n.a},b9d6:function(e,t,r){},cd49:function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var s=r("2b0e"),n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-app",[s("v-navigation-drawer",{attrs:{app:"",width:"325"}},[s("SubjectsNavigation",{on:{errorOccured:function(t){return e.errorOccured(t)}}})],1),s("v-app-bar",{attrs:{app:"",absolute:""}},[s("v-spacer"),s("span",{staticClass:"font-weight-black"},[e._v("Spegg")]),s("v-avatar",{staticClass:"d-block text-center mx-auto mt-4",attrs:{size:"48"}},[s("img",{attrs:{src:r("cf05")}})])],1),s("v-main",[s("v-container",{attrs:{fluid:""}},[s("router-view")],1)],1)],1)},a=[],c=r("d4ec"),i=r("bee2"),o=r("262e"),u=r("2caf"),l=r("9ab4"),v=r("60a3"),d=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-sheet",{attrs:{color:"grey lighten-5",width:"100%"}},[r("v-text-field",{staticClass:"mx-3",attrs:{label:"Filter"},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),r("v-list-group",{attrs:{value:!1,"prepend-icon":"mdi-domain"},scopedSlots:e._u([{key:"activator",fn:function(){return[r("v-list-item-title",[e._v("Anbieter")])]},proxy:!0}])},[r("v-list",{attrs:{dense:""}},[r("v-list-item-group",{attrs:{color:"primary",shaped:""},model:{value:e.subject,callback:function(t){e.subject=t},expression:"subject"}},e._l(e.filteredSubjects("Provider"),(function(t,s){return r("v-list-item",{key:s,attrs:{to:{name:"Subject",params:{id:t.id,version:t.latest_version}}}},[r("v-list-item-content",[r("v-list-item-title",{domProps:{textContent:e._s(t.title)}})],1)],1)})),1)],1)],1),r("v-list-group",{attrs:{value:!1,"prepend-icon":"mdi-server-security"},scopedSlots:e._u([{key:"activator",fn:function(){return[r("v-list-item-title",[e._v("Produkttypen")])]},proxy:!0}])},[r("v-list",{attrs:{dense:""}},[r("v-list-item-group",{attrs:{color:"primary",shaped:"",active:"false"},model:{value:e.subject,callback:function(t){e.subject=t},expression:"subject"}},e._l(e.filteredSubjects("Product"),(function(t,s){return r("v-list-item",{key:s,attrs:{to:{name:"Subject",params:{id:t.id,version:t.latest_version}}}},[r("v-list-item-content",[r("v-list-item-title",{domProps:{textContent:e._s(t.title)}})],1)],1)})),1)],1)],1)],1)},f=[],p=(r("4de4"),r("caad"),r("ac1f"),r("2532"),r("841c"),r("2ca0"),r("99af"),r("bc3a")),b=r.n(p),m=b.a.create({baseURL:"/api/v1"}),h=function(){function e(){Object(c["a"])(this,e)}return Object(i["a"])(e,[{key:"info",value:function(){return m.get("/info")}},{key:"getAllSubjects",value:function(){return m.get("/Subject")}},{key:"getSubjectVersion",value:function(e,t,r){return r?m.get("/Subject/".concat(e,"/").concat(t,"?compare=").concat(r)):m.get("/Subject/".concat(e,"/").concat(t))}},{key:"getReference",value:function(e,t,r,s){return s?m.get("/Reference/".concat(e,"/").concat(t,"/").concat(r,"?compare=").concat(s)):m.get("/Reference/".concat(e,"/").concat(t,"/").concat(r))}}]),e}(),j=new h,_=function(e){Object(o["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.headers=[{text:"Subject",align:"start",value:"id"}],e.subjects=[],e.search="",e.subject="",e}return Object(i["a"])(r,[{key:"mounted",value:function(){var e=this;j.getAllSubjects().then((function(t){e.subjects=t.data})).catch((function(t){e.$emit("errorOccured",t),console.log(t)}))}},{key:"icon",value:function(e){return e.id.startsWith("gemProdT")?"mdi-server":"mdi-domain"}},{key:"filteredSubjects",value:function(e){var t=this;return this.subjects.filter((function(r){return(r.id.toLowerCase().includes(t.search.toLowerCase())||r.title.toLowerCase().includes(t.search.toLowerCase()))&&r.type==e}))}}]),r}(v["b"]);_=Object(l["a"])([Object(v["a"])({components:{}})],_);var g=_,y=g,V=r("2877"),O=r("6544"),k=r.n(O),x=r("8860"),C=r("56b0"),S=r("da13"),R=r("5d23"),w=r("1baa"),$=r("8dd9"),q=r("8654"),L=Object(V["a"])(y,d,f,!1,null,null,null),P=L.exports;k()(L,{VList:x["a"],VListGroup:C["a"],VListItem:S["a"],VListItemContent:R["a"],VListItemGroup:w["a"],VListItemTitle:R["b"],VSheet:$["a"],VTextField:q["a"]});var T=function(e){Object(o["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.showingError=!1,e.error="",e.drawer=!0,e}return Object(i["a"])(r,[{key:"errorOccured",value:function(e){this.error=e,this.showingError=!0}}]),r}(v["b"]);T=Object(l["a"])([Object(v["a"])({components:{SubjectsNavigation:P}})],T);var A=T,E=A,H=r("7496"),I=r("40dc"),M=r("8212"),B=r("a523"),F=r("f6c4"),z=r("f774"),N=r("2fa4"),D=Object(V["a"])(E,n,a,!1,null,null,null),G=D.exports;k()(D,{VApp:H["a"],VAppBar:I["a"],VAvatar:M["a"],VContainer:B["a"],VMain:F["a"],VNavigationDrawer:z["a"],VSpacer:N["a"]});var J=r("8c4f"),W=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},U=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pa-3"},[r("div",{staticClass:"text-h3"},[e._v("Home")])])}],K=new h,Q=function(e){Object(o["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.subjects=[],e}return Object(i["a"])(r,[{key:"mounted",value:function(){var e=this;K.getAllSubjects().then((function(t){e.subjects=t.data})).catch((function(e){console.log(e)}))}}]),r}(v["b"]);Q=Object(l["a"])([Object(v["a"])({components:{}})],Q);var X=Q,Y=X,Z=Object(V["a"])(Y,W,U,!1,null,null,null),ee=Z.exports,te=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pa-3"},[null==e.subject?r("v-skeleton-loader",{attrs:{type:"list-item-avatar, divider, list-item-three-line, card-heading, image, actions"}}):e._e(),e.subject?r("div",[r("v-breadcrumbs",{attrs:{items:e.breadcrumbs(),divider:"/"}}),r("div",[r("span",{staticClass:"text-h4"},[e._v(e._s(e.subject.title))])]),r("div",e._l(e.versions,(function(t){return r("v-chip",{key:t,staticClass:"ma-2",attrs:{to:{name:"Subject",params:{id:e.subject.subject_id,version:t}},"active-class":"primary"}},[e._v(" "+e._s(t)+" ")])})),1),r("v-container",{attrs:{fluid:""}},[r("v-row",[r("v-col",{attrs:{cols:"3"}},[r("v-select",{attrs:{items:e.versions,"menu-props":"auto",label:"Select version","hide-details":"","single-line":""},model:{value:e.subject.version,callback:function(t){e.$set(e.subject,"version",t)},expression:"subject.version"}})],1),r("v-col",{attrs:{cols:"1",align:"center"}},[r("v-icon",{attrs:{large:""}},[e._v("mdi-compare-horizontal")])],1),r("v-col",{attrs:{cols:"3"}},[r("v-select",{attrs:{items:e.versions,"menu-props":"auto",label:"Select version","hide-details":"","single-line":""},model:{value:e.compareVersion,callback:function(t){e.compareVersion=t},expression:"compareVersion"}})],1),r("v-col",[r("v-btn",{attrs:{depressed:"",disabled:""==e.compareVersion},on:{click:function(t){return e.compare()}}},[e._v("Compare")])],1)],1)],1),r("v-data-table",{staticClass:"elevation-1 ma-3",attrs:{dense:"","hide-default-footer":"","disable-pagination":"",headers:e.resourcesHeaders,items:e.subject.references,search:e.searchResources,"item-class":e.referenceClass,"item-key":"subject_id","sort-by":"subject_id"},scopedSlots:e._u([{key:"item.requirements_count",fn:function(t){var s=t.item;return[s.requirements_count>0?r("v-chip",{staticClass:"ma-2 pill",attrs:{color:"orange",outlined:"",pill:"",to:{name:"Reference",params:{subject_id:e.subject.subject_id,subject_version:e.subject.version,resource_id:s.resource.id}}}},[e._v(" "+e._s(s.requirements_count)+" Requirements "),r("v-icon",{attrs:{right:""}},[e._v(" mdi-chevron-right ")])],1):e._e()]}},{key:"item.resource.title",fn:function(t){var s=t.item;return[r("span",[e._v(e._s(s.resource.title))])]}},{key:"item.resource.id",fn:function(t){var s=t.item;return[s.url.startsWith("http")?r("a",{attrs:{target:"_blank",href:s.url}},[e._v(e._s(s.resource.id))]):r("span",[e._v(e._s(s.resource.id))])]}},{key:"item.version",fn:function(t){var s=t.item;return[r("span",{class:{RemovedVersion:s.diff&&"Removed"==s.diff.type}},[e._v(e._s(s.version))]),s.diff&&s.diff.changes.version?r("span",{staticClass:"RemovedVersion"},[e._v(" "+e._s(s.diff.changes.version))]):e._e()]}},{key:"top",fn:function(){return[r("v-text-field",{staticClass:"mx-4",attrs:{label:"Search"},model:{value:e.searchResources,callback:function(t){e.searchResources=t},expression:"searchResources"}})]},proxy:!0}],null,!1,3444802819)})],1):e._e()],1)},re=[],se=new h,ne=function(e){Object(o["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.searchResources="",e.subject=null,e.versions=[],e.resourcesHeaders=[{text:"Reference",value:"resource.title"},{text:"Resource",value:"resource.id"},{text:"Requirements",value:"requirements_count"},{text:"Version",value:"version"}],e}return Object(i["a"])(r,[{key:"onRoute",value:function(){var e=this;this.subject=null,this.compareVersion=this.$route.query.compare,se.getSubjectVersion(this.$route.params.id,this.$route.params.version,this.compareVersion).then((function(t){e.subject=t.data,e.versions=e.subject.all_versions.sort()})).catch((function(t){e.$emit("errorOccured",t.message),console.log(t)}))}},{key:"breadcrumbs",value:function(){var e=[];return e.push({text:"Home",to:"/"}),e.push({text:this.subject.subject_id,to:"/Subject/"+this.subject.subject_id}),e}},{key:"compare",value:function(){this.$route.query["compare"]!=this.compareVersion&&this.$router.push({name:"Subject",params:{subject_id:this.subject["subject_id"],version:this.subject.version},query:{compare:this.compareVersion}})}},{key:"referenceClass",value:function(e){return null==e.diff?"":"Removed"==e.diff.type?"red lighten-5 Removed":"Changed"==e.diff.type?"yellow lighten-4 Changed":"Added"==e.diff.type?"green lighten-4":void 0}}]),r}(v["b"]);Object(l["a"])([Object(v["c"])("$route",{immediate:!0,deep:!0})],ne.prototype,"onRoute",null),ne=Object(l["a"])([Object(v["a"])({components:{}})],ne);var ae=ne,ce=ae,ie=(r("6422"),r("2bc5")),oe=r("8336"),ue=r("cc20"),le=r("62ad"),ve=r("8fea"),de=r("132d"),fe=r("0fd9"),pe=r("b974"),be=r("3129"),me=Object(V["a"])(ce,te,re,!1,null,"0f7b5d20",null),he=me.exports;k()(me,{VBreadcrumbs:ie["a"],VBtn:oe["a"],VChip:ue["a"],VCol:le["a"],VContainer:B["a"],VDataTable:ve["a"],VIcon:de["a"],VRow:fe["a"],VSelect:pe["a"],VSkeletonLoader:be["a"],VTextField:q["a"]});var je=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"pa-3"},[e.reference?r("div",[r("v-breadcrumbs",{attrs:{items:e.breadcrumbs(),divider:"/"}}),r("p",{staticClass:"text-h4"},[e._v("Requirements "),r("b",[e._v(e._s(e.reference.subject_id)+" v"+e._s(e.reference.subject_version))])]),r("div",e._l(e.versions,(function(t){return r("v-chip",{key:t,staticClass:"ma-2",attrs:{to:{name:"Reference",params:{subject_id:e.reference.subject_id,subject_version:t,resource_id:e.reference.resource.id}},"active-class":"primary"}},[e._v(" "+e._s(t)+" ")])})),1),r("v-container",{attrs:{fluid:""}},[r("v-row",[r("v-col",{attrs:{cols:"3"}},[r("v-select",{attrs:{items:e.versions,"menu-props":"auto",label:"Select version","hide-details":"","single-line":""},model:{value:e.subject.version,callback:function(t){e.$set(e.subject,"version",t)},expression:"subject.version"}})],1),r("v-col",{attrs:{cols:"1",align:"center"}},[r("v-icon",{attrs:{large:""}},[e._v("mdi-compare-horizontal")])],1),r("v-col",{attrs:{cols:"3"}},[r("v-select",{attrs:{items:e.versions,"menu-props":"auto",label:"Select version","hide-details":"","single-line":""},model:{value:e.compareVersion,callback:function(t){e.compareVersion=t},expression:"compareVersion"}})],1),r("v-col",[r("v-btn",{attrs:{depressed:"",disabled:""==e.compareVersion},on:{click:function(t){return e.compare()}}},[e._v("Compare")])],1)],1)],1),r("v-container",{attrs:{fluid:"",align:"right"}},[r("v-row",[r("v-col",{attrs:{cols:"7"}},[r("v-select",{attrs:{items:e.references(),label:"References",solo:""},on:{change:e.changeReference},model:{value:e.selectedReference,callback:function(t){e.selectedReference=t},expression:"selectedReference"}}),e._v(" Link: "),r("a",{attrs:{target:"_blank",href:e.reference.url}},[e._v(e._s(e.reference.resource.id)+" v"+e._s(e.reference.version))])],1)],1),r("v-row",[r("v-col",{attrs:{cols:"7",align:"center"}})],1)],1),e._l(e.reference.requirements,(function(t,s){return r("v-card",{key:s,ref:t.id,refInFor:!0,class:e.requirementClasses(t)},[r("v-card-title",[e._v(e._s(t.id)+" "+e._s(t.title))]),r("v-card-text",[r("div",{domProps:{innerHTML:e._s(t.html)}}),null!=t.diff&&"Changed"==t.diff.type?r("div",{staticClass:"RemovedText",domProps:{innerHTML:e._s(t.diff.changes.html)}}):e._e()])],1)}))],2):e._e()])},_e=[],ge=(r("d81d"),new h),ye=function(e){Object(o["a"])(r,e);var t=Object(u["a"])(r);function r(){var e;return Object(c["a"])(this,r),e=t.apply(this,arguments),e.subject=null,e.reference=null,e.versions=[],e.selectedReference="",e}return Object(i["a"])(r,[{key:"onRoute",value:function(){var e=this;this.selectedReference=this.$route.params.resource_id,this.compareVersion=this.$route.query.compare,ge.getSubjectVersion(this.$route.params.subject_id,this.$route.params.subject_version).then((function(t){return e.subject=t.data,e.versions=e.subject.all_versions.sort(),ge.getReference(e.subject.subject_id,e.subject.version,e.$route.params.resource_id,e.compareVersion)})).then((function(t){e.reference=t.data})).catch((function(t){e.$emit("errorOccured",t.message),console.log(t)}))}},{key:"breadcrumbs",value:function(){var e=[];return e.push({text:"Home",to:"/"}),e.push({text:this.subject.subject_id+" v"+this.subject.version,exact:!0,to:{name:"Subject",params:{id:this.reference.subject_id,version:this.reference.subject_version}}}),e.push({text:this.reference.resource.id}),e}},{key:"anchor",value:function(){return window.location.hash}},{key:"references",value:function(){return null==this.subject?[]:this.subject.references.map((function(e){return{value:e.resource.id,text:"".concat(e.resource.id," - ").concat(e.resource.title)}}))}},{key:"changeReference",value:function(e){this.$router.push({params:{resource_id:e}})}},{key:"compare",value:function(){console.log(this.subject.version),this.$route.query["compare"]==this.compareVersion&&this.subject.version==this.$route.params.subject_version||this.$router.push({name:"Reference",params:{subject_id:this.subject.subject_id,subject_version:this.subject.version,resource_id:this.reference.resource.id},query:{compare:this.compareVersion}})}},{key:"requirementClasses",value:function(e){return null==e.diff?"":"Removed"==e.diff.type?"red lighten-5 Removed":"Changed"==e.diff.type?"yellow lighten-4 Changed":"Added"==e.diff.type?"green lighten-4":void 0}}]),r}(v["b"]);Object(l["a"])([Object(v["c"])("$route",{immediate:!0,deep:!0})],ye.prototype,"onRoute",null),ye=Object(l["a"])([Object(v["a"])({components:{}})],ye);var Ve=ye,Oe=Ve,ke=(r("7659"),r("b0af")),xe=r("99d9"),Ce=Object(V["a"])(Oe,je,_e,!1,null,"089a4570",null),Se=Ce.exports;k()(Ce,{VBreadcrumbs:ie["a"],VBtn:oe["a"],VCard:ke["a"],VCardText:xe["a"],VCardTitle:xe["b"],VChip:ue["a"],VCol:le["a"],VContainer:B["a"],VIcon:de["a"],VRow:fe["a"],VSelect:pe["a"]}),s["a"].use(J["a"]);var Re=[{path:"/",name:"Home",component:ee},{path:"/Subject/:id/:version",name:"Subject",props:!0,component:he},{path:"/Subject/:subject_id/:subject_version/Reference/:resource_id",name:"Reference",props:!0,component:Se}],we=new J["a"]({mode:"history",base:"/",routes:Re}),$e=we,qe=r("2f62");s["a"].use(qe["a"]);var Le=new qe["a"].Store({state:{},mutations:{},actions:{},modules:{}}),Pe=r("f309");s["a"].use(Pe["a"]);var Te=new Pe["a"]({});s["a"].config.productionTip=!1,new s["a"]({router:$e,store:Le,vuetify:Te,render:function(e){return e(G)}}).$mount("#app")},cf05:function(e,t,r){e.exports=r.p+"img/logo.901ce1c6.png"},fe31:function(e,t,r){}});
//# sourceMappingURL=app.d8f664fb.js.map