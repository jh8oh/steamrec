(function(){"use strict";var e={40:function(e,n,t){var r=t(963),i=t(252);function o(e,n,t,r,o,u){var a=(0,i.up)("Login"),c=(0,i.up)("Dashboard");return null==e.userId?((0,i.wg)(),(0,i.j4)(a,{key:0})):((0,i.wg)(),(0,i.j4)(c,{key:1,userId:e.userId},null,8,["userId"]))}var u=t(655),a=t(124),c=t(669),l=t.n(c),f=t.p+"img/steam_logo.9059b4e7.png",s={id:"login",class:"view"},d={id:"login-content"},p=(0,i._)("h1",null,"Login to your Steam account",-1),b=(0,i.Uk)(" Sign in using "),v=(0,i._)("img",{src:f},null,-1),h=(0,i.Uk)(" Steam "),g=[b,v,h],w=(0,i._)("p",{id:"footer"}," This website is not affiliated with Valve Corporation or Steam. You can delete your account on here and all of the data at any time. ",-1);function y(e,n,t,r,o,u){return(0,i.wg)(),(0,i.iD)("div",s,[(0,i._)("div",d,[p,(0,i._)("button",{onClick:n[0]||(n[0]=function(n){return e.login()})},g)]),w])}var m=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return(0,u.ZT)(n,e),Object.defineProperty(n.prototype,"login",{enumerable:!1,configurable:!0,writable:!0,value:function(){window.location.replace("http://localhost:8080/auth/redirect")}}),n}(a.w3),k=m,O=t(744);const j=(0,O.Z)(k,[["render",y]]);var R=j,_={id:"dashboard"};function C(e,n,t,r,o,u){var a=(0,i.up)("Rate"),c=(0,i.up)("Rec");return(0,i.wg)(),(0,i.iD)("div",_,[(0,i._)("nav",null,[(0,i._)("ul",null,[(0,i._)("li",{onClick:n[0]||(n[0]=function(n){return e.onClickRate()})},"Rate"),(0,i._)("li",{onClick:n[1]||(n[1]=function(n){return e.onClickRec()})},"Recommend")])]),e.isRate?((0,i.wg)(),(0,i.j4)(a,{key:0})):((0,i.wg)(),(0,i.j4)(c,{key:1}))])}const P={id:"rate"},I=(0,i._)("h1",null,"Rate",-1),Z=[I];function D(e,n){return(0,i.wg)(),(0,i.iD)("div",P,Z)}const T={},L=(0,O.Z)(T,[["render",D]]);var x=L;const S={id:"rec"},E=(0,i._)("h1",null,"Rec",-1),U=[E];function F(e,n){return(0,i.wg)(),(0,i.iD)("div",S,U)}const M={},V=(0,O.Z)(M,[["render",F]]);var Y=V,q=function(){function e(){Object.defineProperty(this,"userId",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}return e}(),z=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return Object.defineProperty(n,"isRate",{enumerable:!0,configurable:!0,writable:!0,value:!0}),n}return(0,u.ZT)(n,e),Object.defineProperty(n.prototype,"onClickRate",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.isRate=!0}}),Object.defineProperty(n.prototype,"onClickRec",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.isRate=!1}}),n=(0,u.gn)([(0,a.Ei)({components:{Rate:x,Rec:Y}})],n),n}(a.w3["with"](q)),A=z;const B=(0,O.Z)(A,[["render",C]]);var G=B,H=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return Object.defineProperty(n,"userId",{enumerable:!0,configurable:!0,writable:!0,value:null}),n}return(0,u.ZT)(n,e),Object.defineProperty(n.prototype,"mounted",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.checkLoggedIn()}}),Object.defineProperty(n.prototype,"checkLoggedIn",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e=this;l().get("http://localhost:8080/auth/check").then((function(n){n.data.user&&(e.userId=n.data.user.id)}))}}),n=(0,u.gn)([(0,a.Ei)({components:{Login:R,Dashboard:G}})],n),n}(a.w3),J=H;const K=(0,O.Z)(J,[["render",o]]);var N=K;(0,r.ri)(N).mount("#app")}},n={};function t(r){var i=n[r];if(void 0!==i)return i.exports;var o=n[r]={exports:{}};return e[r](o,o.exports,t),o.exports}t.m=e,function(){var e=[];t.O=function(n,r,i,o){if(!r){var u=1/0;for(f=0;f<e.length;f++){r=e[f][0],i=e[f][1],o=e[f][2];for(var a=!0,c=0;c<r.length;c++)(!1&o||u>=o)&&Object.keys(t.O).every((function(e){return t.O[e](r[c])}))?r.splice(c--,1):(a=!1,o<u&&(u=o));if(a){e.splice(f--,1);var l=i();void 0!==l&&(n=l)}}return n}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[r,i,o]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.p="/"}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,r){var i,o,u=r[0],a=r[1],c=r[2],l=0;if(u.some((function(n){return 0!==e[n]}))){for(i in a)t.o(a,i)&&(t.m[i]=a[i]);if(c)var f=c(t)}for(n&&n(r);l<u.length;l++)o=u[l],t.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return t.O(f)},r=self["webpackChunksteamrec_ui"]=self["webpackChunksteamrec_ui"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(40)}));r=t.O(r)})();
//# sourceMappingURL=app.765512e2.js.map