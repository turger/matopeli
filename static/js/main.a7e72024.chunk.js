(this.webpackJsonpmatopeli=this.webpackJsonpmatopeli||[]).push([[0],[,,,,,,,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var a=n(0),c=n(1),r=n.n(c),s=n(4),o=n.n(s),i=(n(10),n(2)),u=(n(11),n(12),function(e){for(var t=e.points,n=e.setPoints,r=[],s=0;s<10;s++){r[s]=[];for(var o=0;o<10;o++)r[s][o]="blank"}var u=function(){return{x:Math.floor(10*Math.random()),y:Math.floor(10*Math.random())}},j=Object(c.useState)(r),d=Object(i.a)(j,2),l=d[0],b=d[1],f=Object(c.useState)([{x:0,y:0}]),p=Object(i.a)(f,2),O=p[0],h=p[1],v=Object(c.useState)("right"),x=Object(i.a)(v,2),m=x[0],y=x[1],k=Object(c.useState)(u),S=Object(i.a)(k,2),N=S[0],w=S[1],g=Object(c.useState)(),E=Object(i.a)(g,2),I=E[0],M=E[1],J=Object(c.useState)(!1),L=Object(i.a)(J,2),B=L[0],G=L[1];document.addEventListener("keydown",(function(e){switch(e.keyCode){case 37:y("left");break;case 38:y("top");break;case 39:y("right");break;case 40:y("bottom")}}),!1);var P=l.map((function(e,t){return Object(a.jsx)("div",{className:"Snake-row",children:e.map((function(e,t){return Object(a.jsx)("div",{className:"tile ".concat(e)},t)}))},t)}));return function(e,t,n){var a=Object(c.useRef)();Object(c.useEffect)((function(){a.current=e}),[e]),Object(c.useEffect)((function(){if(null!==t){var e=setInterval((function(){a.current()}),t);return n(e),function(){return clearInterval(e)}}}),[t,n])}((function(){var e=[];switch(m){case"right":e.push({x:O[0].x,y:(O[0].y+1)%10});break;case"left":e.push({x:O[0].x,y:(O[0].y-1+10)%10});break;case"top":e.push({x:(O[0].x-1+10)%10,y:O[0].y});break;case"bottom":e.push({x:(O[0].x+1)%10,y:O[0].y})}if(function(){var e=O[0];return O.slice(1,-1).find((function(t){return t.x===e.x&&t.y===e.y}))}()){G(!0),clearInterval(I);var a=JSON.parse(localStorage.getItem("snake-points"))||[];a.push(t),localStorage.setItem("snake-points",JSON.stringify(a)),window.dispatchEvent(new Event("storage"))}O.forEach((function(t){e.push(t)})),O[0].x===N.x&&O[0].y===N.y?(w(u),n(t+1)):e.pop(),h(e),function(){var e=r;O.forEach((function(t){e[t.x][t.y]="snake"})),e[N.x][N.y]="food",b(e)}()}),250,M),Object(a.jsxs)("div",{className:"Snake-board",children:[P,B&&Object(a.jsx)("div",{className:"Game-over",children:"Game over!"})]})}),j=(n(13),function(e){var t=e.points;return Object(a.jsxs)("div",{className:"Points",children:[t," pistett\xe4"]})}),d=(n(14),function(){return JSON.parse(localStorage.getItem("snake-points"))||[]}),l=function(){var e=Object(c.useState)(d()),t=Object(i.a)(e,2),n=t[0],r=t[1];window.addEventListener("storage",(function(){r(d())}));var s=n.sort((function(e,t){return t-e}));return Object(a.jsxs)("div",{className:"LeaderBoard",children:[Object(a.jsx)("div",{className:"LeaderBoard-header",children:"Top 5"}),Object(a.jsx)("div",{className:"LeaderBoard-points",children:s.slice(0,5).map((function(e,t){return Object(a.jsxs)("div",{children:[e," pistett\xe4"]},"".concat(e,"-").concat(t))}))})]})};var b=function(){var e=Object(c.useState)(0),t=Object(i.a)(e,2),n=t[0],r=t[1];return Object(a.jsxs)("div",{className:"App",children:[Object(a.jsx)("header",{className:"App-header",children:"Matopeli"}),Object(a.jsxs)("div",{className:"Game",children:[Object(a.jsx)(j,{points:n}),Object(a.jsx)(u,{points:n,setPoints:r})]}),Object(a.jsx)("button",{onClick:function(){return window.location.reload(!1)},children:"Uusi peli"}),Object(a.jsx)(l,{})]})};o.a.render(Object(a.jsx)(r.a.StrictMode,{children:Object(a.jsx)(b,{})}),document.getElementById("root"))}],[[15,1,2]]]);
//# sourceMappingURL=main.a7e72024.chunk.js.map