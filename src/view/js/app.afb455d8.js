(function(){"use strict";var e={360:function(e,n,t){var r=t(963),i=t(252);function o(e,n,t,r,o,a){var u=(0,i.up)("Login"),l=(0,i.up)("Dashboard");return null==e.userId?((0,i.wg)(),(0,i.j4)(u,{key:0})):((0,i.wg)(),(0,i.j4)(l,{key:1,userId:e.userId},null,8,["userId"]))}var a=t(655),u=t(124),l=t(669),c=t.n(l),s=t.p+"img/steam_logo.9059b4e7.png",f={id:"login",class:"view"},d={id:"login-content"},g=(0,i._)("h1",null,"Login to your Steam account",-1),p=(0,i.Uk)(" Sign in using "),b=(0,i._)("img",{src:s},null,-1),m=(0,i.Uk)(" Steam "),v=[p,b,m],h=(0,i._)("p",{id:"footer"}," This website is not affiliated with Valve Corporation or Steam. You can delete your account on here and all of the data at any time. ",-1);function w(e,n,t,r,o,a){return(0,i.wg)(),(0,i.iD)("div",f,[(0,i._)("div",d,[g,(0,i._)("button",{onClick:n[0]||(n[0]=function(n){return e.login()})},v)]),h])}var y=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return(0,a.ZT)(n,e),Object.defineProperty(n.prototype,"login",{enumerable:!1,configurable:!0,writable:!0,value:function(){window.location.replace("http://localhost:8080/auth/redirect")}}),n}(u.w3),O=y,k=t(744);const j=(0,k.Z)(O,[["render",w]]);var _=j,P=t(577),R={id:"dashboard",class:"view"},C={id:"dashboard-content"},T={id:"dashboard-content-main"};function G(e,n,t,r,o,a){var u=(0,i.up)("Rate"),l=(0,i.up)("Rec");return(0,i.wg)(),(0,i.iD)("div",R,[(0,i._)("header",null,[(0,i._)("button",{onClick:n[0]||(n[0]=function(n){return e.logout()})},"Logout")]),(0,i._)("div",C,[(0,i._)("nav",null,[(0,i._)("ul",null,[(0,i._)("li",{onClick:n[1]||(n[1]=function(n){return e.onClickRate()}),class:(0,P.C_)({active:e.isRate})},"Rate",2),(0,i._)("li",{onClick:n[2]||(n[2]=function(n){return e.onClickRec()}),class:(0,P.C_)({active:!e.isRate})},"Recommend",2)])]),(0,i._)("div",T,[e.isRate?((0,i.wg)(),(0,i.j4)(u,{key:0})):((0,i.wg)(),(0,i.j4)(l,{key:1}))])])])}var D=t(907),Z=(Symbol(),(0,D.MT)({state:{ownedGames:[]},mutations:{addOwnedGame:function(e,n){e.ownedGames.push(n)},clear:function(e){e.ownedGames=[]}}})),I={id:"rate"},S=(0,i._)("h1",null,"Rate",-1);function L(e,n,t,r,o,a){var u=(0,i.up)("GameView");return(0,i.wg)(),(0,i.iD)("div",I,[S,(0,i._)("ul",null,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)(e.games,(function(e){return(0,i.wg)(),(0,i.iD)("li",{key:e.id},[(0,i.Wm)(u,{game:e},null,8,["game"])])})),128))])])}var E={class:"game-view"},x=["src"],A=(0,i._)("div",{class:"game-view-rating-peek"},null,-1),U={class:"game-view-rating-system"},V=["src"],W=["src"];function M(e,n,t,r,o,a){return(0,i.wg)(),(0,i.iD)("figure",E,[(0,i._)("img",{src:"https://cdn.akamai.steamstatic.com/steam/apps/".concat(e.game.id,"/header.jpg")},null,8,x),A,(0,i._)("div",U,[(0,i._)("img",{src:e.getThumbsDownSrc()},null,8,V),(0,i._)("img",{src:e.getThumbsUpSrc()},null,8,W)])])}var Y=t.p+"img/thumbs-up-unclicked.e35f9041.svg",F=t.p+"img/thumbs-up-clicked.895e082f.svg",H=t.p+"img/thumbs-down-unclicked.a95ae13d.svg",K=t.p+"img/thumbs-down-clicked.77f28868.svg",q=function(){function e(){Object.defineProperty(this,"game",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}return e}(),z=function(e){function n(){return null!==e&&e.apply(this,arguments)||this}return(0,a.ZT)(n,e),Object.defineProperty(n.prototype,"getThumbsUpSrc",{enumerable:!1,configurable:!0,writable:!0,value:function(){return 2==this.game.rating?F:Y}}),Object.defineProperty(n.prototype,"getThumbsDownSrc",{enumerable:!1,configurable:!0,writable:!0,value:function(){return 1==this.game.rating?K:H}}),n}(u.w3["with"](q)),B=z;const J=(0,k.Z)(B,[["render",M]]);var N=J,Q=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return Object.defineProperty(n,"games",{enumerable:!0,configurable:!0,writable:!0,value:[]}),n}return(0,a.ZT)(n,e),Object.defineProperty(n.prototype,"mounted",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.loadAllGames()}}),Object.defineProperty(n.prototype,"loadAllGames",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.games=Z.state.ownedGames}}),n=(0,a.gn)([(0,u.Ei)({components:{GameView:N}})],n),n}(u.w3),X=Q;const $=(0,k.Z)(X,[["render",L]]);var ee=$;const ne={id:"rec"},te=(0,i._)("h1",null,"Rec",-1),re=[te];function ie(e,n){return(0,i.wg)(),(0,i.iD)("div",ne,re)}const oe={},ae=(0,k.Z)(oe,[["render",ie]]);var ue=ae,le=function(){function e(){Object.defineProperty(this,"userId",{enumerable:!0,configurable:!0,writable:!0,value:void 0})}return e}(),ce=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return Object.defineProperty(n,"isRate",{enumerable:!0,configurable:!0,writable:!0,value:!0}),n}return(0,a.ZT)(n,e),Object.defineProperty(n.prototype,"mounted",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.getAllGamesWithRatings()}}),Object.defineProperty(n.prototype,"getAllGamesWithRatings",{enumerable:!1,configurable:!0,writable:!0,value:function(){Promise.all([c().get("http://localhost:8080/api/owned-games"),c().get("https://localhost:8080/data/ratings")]).then((function(e){var n=e[0],t=e[1],r=n.data,i=t.data;r.forEach((function(e){var n,t;e.rating=null!==(t=null===(n=i.find((function(n){return n.gameId==e.id})))||void 0===n?void 0:n.rating)&&void 0!==t?t:0,Z.commit("addOwnedGame",e)}))}))}}),Object.defineProperty(n.prototype,"onClickRate",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.isRate=!0}}),Object.defineProperty(n.prototype,"onClickRec",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.isRate=!1}}),Object.defineProperty(n.prototype,"logout",{enumerable:!1,configurable:!0,writable:!0,value:function(){window.location.replace("http://localhost:8080/logout"),Z.commit("clear")}}),n=(0,a.gn)([(0,u.Ei)({components:{Rate:ee,Rec:ue}})],n),n}(u.w3["with"](le)),se=ce;const fe=(0,k.Z)(se,[["render",G]]);var de=fe,ge=function(e){function n(){var n=null!==e&&e.apply(this,arguments)||this;return Object.defineProperty(n,"userId",{enumerable:!0,configurable:!0,writable:!0,value:null}),n}return(0,a.ZT)(n,e),Object.defineProperty(n.prototype,"mounted",{enumerable:!1,configurable:!0,writable:!0,value:function(){this.checkLoggedIn()}}),Object.defineProperty(n.prototype,"checkLoggedIn",{enumerable:!1,configurable:!0,writable:!0,value:function(){var e=this;c().get("http://localhost:8080/auth/check").then((function(n){n.data.user&&(e.userId=n.data.user.id)}))}}),n=(0,a.gn)([(0,u.Ei)({components:{Login:_,Dashboard:de}})],n),n}(u.w3),pe=ge;const be=(0,k.Z)(pe,[["render",o]]);var me=be;(0,r.ri)(me).mount("#app")}},n={};function t(r){var i=n[r];if(void 0!==i)return i.exports;var o=n[r]={exports:{}};return e[r](o,o.exports,t),o.exports}t.m=e,function(){var e=[];t.O=function(n,r,i,o){if(!r){var a=1/0;for(s=0;s<e.length;s++){r=e[s][0],i=e[s][1],o=e[s][2];for(var u=!0,l=0;l<r.length;l++)(!1&o||a>=o)&&Object.keys(t.O).every((function(e){return t.O[e](r[l])}))?r.splice(l--,1):(u=!1,o<a&&(a=o));if(u){e.splice(s--,1);var c=i();void 0!==c&&(n=c)}}return n}o=o||0;for(var s=e.length;s>0&&e[s-1][2]>o;s--)e[s]=e[s-1];e[s]=[r,i,o]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){t.p="/"}(),function(){var e={143:0};t.O.j=function(n){return 0===e[n]};var n=function(n,r){var i,o,a=r[0],u=r[1],l=r[2],c=0;if(a.some((function(n){return 0!==e[n]}))){for(i in u)t.o(u,i)&&(t.m[i]=u[i]);if(l)var s=l(t)}for(n&&n(r);c<a.length;c++)o=a[c],t.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return t.O(s)},r=self["webpackChunksteamrec_ui"]=self["webpackChunksteamrec_ui"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[998],(function(){return t(360)}));r=t.O(r)})();
//# sourceMappingURL=app.afb455d8.js.map