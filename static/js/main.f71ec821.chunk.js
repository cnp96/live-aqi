(this["webpackJsonplive-aqi"]=this["webpackJsonplive-aqi"]||[]).push([[0],{12:function(e,t,n){},16:function(e,t,n){},20:function(e,t,n){"use strict";n.r(t);var c=n(1),o=n.n(c),r=n(5),i=n.n(r),a=(n(12),n(3)),s=n(6),u=n(4),d=function(e,t){switch(t.type){case"update":return Object(u.a)(Object(u.a)({},e),l(t.payload));default:return e}},l=function(e){return e.reduce((function(e,t){return e[t.city]=t.aqi,e}),{})},j=(n(16),n(7)),b=n(0),f=c.memo((function(e){return Object(b.jsx)("div",{className:"card",children:Object(b.jsx)("div",{className:"card-body",children:Object(b.jsxs)("div",{children:[Object(b.jsx)("div",{className:"text-lg bg-".concat((t=e.aqi,t<=50?"good":t<=100?"satisfactory":t<=200?"moderate":t<=300?"poor":t<=400?"very-poor":"severe")),children:e.aqi.toFixed(2)}),Object(b.jsx)("div",{children:Object(j.capitalize)(e.name)})]})})});var t}));function v(){var e,t=Object(c.useReducer)(d,{}),n=Object(a.a)(t,2),o=n[0],r=n[1],i=function t(){return(e=new s.w3cwebsocket("wss://city-ws.herokuapp.com")).onopen=function(){console.log("WebSocket Client Connected")},e.onmessage=function(e){var t=JSON.parse(e.data);r({type:"update",payload:t})},e.onerror=function(t){e.close(3001),console.error(t)},e.onclose=function(n){if(n.code<3e3)var c=setInterval((function(){3===e.readyState?(console.log("Reconnecting to server"),e=t()):clearInterval(c)}),500)},e};return Object(c.useEffect)((function(){return e=i(),function(){e.close(3e3),console.log("Client disconnected")}}),[]),Object(b.jsxs)("div",{className:"app",children:[Object(b.jsx)("h1",{children:"Air Quality Index"}),Object(b.jsx)("div",{className:"overview",children:Object.entries(o).sort((function(e,t){return e[1]<t[1]?-1:1})).map((function(e,t){var n=Object(a.a)(e,2),c=n[0],o=n[1];return Object(b.jsx)(f,{name:c,aqi:o},t)}))})]})}var p=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,21)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,r=t.getLCP,i=t.getTTFB;n(e),c(e),o(e),r(e),i(e)}))};i.a.render(Object(b.jsx)(o.a.StrictMode,{children:Object(b.jsx)(v,{})}),document.getElementById("root")),p()}},[[20,1,2]]]);
//# sourceMappingURL=main.f71ec821.chunk.js.map