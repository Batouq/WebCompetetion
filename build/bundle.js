var app=function(){"use strict";function t(){}function e(t){return t()}function n(){return Object.create(null)}function s(t){t.forEach(e)}function o(t){return"function"==typeof t}function r(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let c,l;function i(t,e){return c||(c=document.createElement("a")),c.href=e,t===c.href}function a(t,e){t.appendChild(e)}function u(t,e,n){t.insertBefore(e,n||null)}function f(t){t.parentNode.removeChild(t)}function d(t){return document.createElement(t)}function g(t){return document.createTextNode(t)}function h(){return g(" ")}function p(t,e,n,s){return t.addEventListener(e,n,s),()=>t.removeEventListener(e,n,s)}function m(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function v(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function b(t,e){t.value=null==e?"":e}function $(t,e,n,s){null===n?t.style.removeProperty(e):t.style.setProperty(e,n,s?"important":"")}function x(t,e,n){t.classList[n?"add":"remove"](e)}function y(t){l=t}function _(t){(function(){if(!l)throw new Error("Function called outside component initialization");return l})().$$.on_mount.push(t)}const w=[],k=[],I=[],L=[],A=Promise.resolve();let D=!1;function M(t){I.push(t)}const E=new Set;let F=0;function z(){const t=l;do{for(;F<w.length;){const t=w[F];F++,y(t),P(t.$$)}for(y(null),w.length=0,F=0;k.length;)k.pop()();for(let t=0;t<I.length;t+=1){const e=I[t];E.has(e)||(E.add(e),e())}I.length=0}while(w.length);for(;L.length;)L.pop()();D=!1,E.clear(),y(t)}function P(t){if(null!==t.fragment){t.update(),s(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}const T=new Set;function q(t,e){t&&t.i&&(T.delete(t),t.i(e))}function G(t,e,n,s){if(t&&t.o){if(T.has(t))return;T.add(t),undefined.c.push((()=>{T.delete(t),s&&(n&&t.d(1),s())})),t.o(e)}else s&&s()}function R(t){t&&t.c()}function S(t,n,r,c){const{fragment:l,on_mount:i,on_destroy:a,after_update:u}=t.$$;l&&l.m(n,r),c||M((()=>{const n=i.map(e).filter(o);a?a.push(...n):s(n),t.$$.on_mount=[]})),u.forEach(M)}function C(t,e){const n=t.$$;null!==n.fragment&&(s(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function N(t,e){-1===t.$$.dirty[0]&&(w.push(t),D||(D=!0,A.then(z)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function O(e,o,r,c,i,a,u,d=[-1]){const g=l;y(e);const h=e.$$={fragment:null,ctx:null,props:a,update:t,not_equal:i,bound:n(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(o.context||(g?g.$$.context:[])),callbacks:n(),dirty:d,skip_bound:!1,root:o.target||g.$$.root};u&&u(h.root);let p=!1;if(h.ctx=r?r(e,o.props||{},((t,n,...s)=>{const o=s.length?s[0]:n;return h.ctx&&i(h.ctx[t],h.ctx[t]=o)&&(!h.skip_bound&&h.bound[t]&&h.bound[t](o),p&&N(e,t)),n})):[],h.update(),p=!0,s(h.before_update),h.fragment=!!c&&c(h.ctx),o.target){if(o.hydrate){const t=function(t){return Array.from(t.childNodes)}(o.target);h.fragment&&h.fragment.l(t),t.forEach(f)}else h.fragment&&h.fragment.c();o.intro&&q(e.$$.fragment),S(e,o.target,o.anchor,o.customElement),z()}y(g)}class j{$destroy(){C(this,1),this.$destroy=t}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}function H(e){let n,s,o,r,c,l,g,p,v,b,$,x,y,_,w,k,I,L,A,D,M,E,F;return{c(){n=d("nav"),s=d("img"),r=h(),c=d("ul"),l=d("li"),g=d("img"),v=h(),b=d("li"),$=d("img"),y=h(),_=d("li"),w=d("img"),I=h(),L=d("li"),A=d("img"),M=h(),E=d("img"),m(s,"class","logo  svelte-1bfb2yb"),i(s.src,o=U)||m(s,"src",o),m(s,"alt",""),m(g,"class","hoverr svg svelte-1bfb2yb"),i(g.src,p=W)||m(g,"src",p),m(g,"alt","grid"),m(l,"class","list--item svelte-1bfb2yb"),m($,"class","hoverr svg svelte-1bfb2yb"),i($.src,x=K)||m($,"src",x),m($,"alt",""),m(b,"class","list--item svelte-1bfb2yb"),m(w,"class","hoverr svg svelte-1bfb2yb"),i(w.src,k=B)||m(w,"src",k),m(w,"alt",""),m(_,"class","list--item svelte-1bfb2yb"),m(A,"class","svg hoverr svelte-1bfb2yb"),i(A.src,D=Q)||m(A,"src",D),m(A,"alt","setting"),m(L,"class","list--item svelte-1bfb2yb"),m(c,"class","list--container svelte-1bfb2yb"),m(E,"class","logout svg svelte-1bfb2yb"),i(E.src,F=J)||m(E,"src",F),m(E,"alt","sign out"),m(n,"class","nav--container svelte-1bfb2yb")},m(t,e){u(t,n,e),a(n,s),a(n,r),a(n,c),a(c,l),a(l,g),a(c,v),a(c,b),a(b,$),a(c,y),a(c,_),a(_,w),a(c,I),a(c,L),a(L,A),a(n,M),a(n,E)},p:t,i:t,o:t,d(t){t&&f(n)}}}let J="Icons/logout_FILL0_wght400_GRAD0_opsz48.svg",U="Icons/logo-white.png",W="Icons/grid_view_FILL0_wght400_GRAD0_opsz48.svg",B="Icons/school_FILL0_wght400_GRAD0_opsz48.svg",K="Icons/checklist_FILL0_wght400_GRAD0_opsz48.svg",Q="Icons/settings_FILL0_wght400_GRAD0_opsz48.svg";class V extends j{constructor(t){super(),O(this,t,null,H,r,{})}}function X(e){let n,s,o,r,c,l;return{c(){n=d("div"),s=d("div"),o=d("img"),c=h(),l=d("div"),l.innerHTML='<h1 class="svelte-xx1x04">User Name #2222</h1> \n    <h2 class="svelte-xx1x04">King Fahd University of Petroleum and Minerals</h2> \n    <h2 class="svelte-xx1x04">Software Engineering - senior</h2>',i(o.src,r=Y)||m(o,"src",r),m(o,"alt","Profile image"),m(s,"class","profile--image svelte-xx1x04"),m(l,"class","profile--info svelte-xx1x04"),m(n,"class","profile--container svelte-xx1x04")},m(t,e){u(t,n,e),a(n,s),a(s,o),a(n,c),a(n,l)},p:t,i:t,o:t,d(t){t&&f(n)}}}let Y="Icons/person.png";class Z extends j{constructor(t){super(),O(this,t,null,X,r,{})}}function tt(t,e,n){const s=t.slice();return s[7]=e[n],s[8]=e,s[9]=n,s}function et(t){let e,n,o,r,c,l,b,y,_,w,k,I,L,A,D=t[7].text+"";function M(){t[5].call(n,t[8],t[9])}function E(){return t[6](t[9])}return{c(){e=d("div"),n=d("input"),o=h(),r=d("span"),c=g(D),l=h(),b=d("span"),y=d("img"),w=h(),k=d("br"),I=h(),m(n,"style",""),m(n,"type","checkbox"),m(r,"class","svelte-14blos0"),x(r,"checked",t[7].status),m(y,"class","trash svelte-14blos0"),i(y.src,_=st)||m(y,"src",_),m(y,"alt",""),m(y,"width","40px"),m(y,"height","20pxpx"),$(y,"float","right"),$(y,"cursor","pointer"),m(e,"class","item svelte-14blos0")},m(s,i){u(s,e,i),a(e,n),n.checked=t[7].status,a(e,o),a(e,r),a(r,c),a(e,l),a(e,b),a(b,y),a(e,w),a(e,k),a(e,I),L||(A=[p(n,"change",M),p(b,"click",E)],L=!0)},p(e,s){t=e,2&s&&(n.checked=t[7].status),2&s&&D!==(D=t[7].text+"")&&v(c,D),2&s&&x(r,"checked",t[7].status)},d(t){t&&f(e),L=!1,s(A)}}}function nt(e){let n,r,c,l,i,g,v,x,y,_=e[1],w=[];for(let t=0;t<_.length;t+=1)w[t]=et(tt(e,_,t));return{c(){n=d("div"),r=d("input"),c=h(),l=d("button"),l.textContent="Add",i=h(),g=d("br"),v=h();for(let t=0;t<w.length;t+=1)w[t].c();$(r,"width","30rem"),$(r,"height","2rem"),$(r,"margin-bottom","1.5rem"),$(r,"border","1px soild #6ac977 "),m(r,"type","text"),m(r,"placeholder","new todo item.."),m(l,"class","addbtn svelte-14blos0"),m(n,"class","container svelte-14blos0")},m(t,s){u(t,n,s),a(n,r),b(r,e[0]),a(n,c),a(n,l),a(n,i),a(n,g),a(n,v);for(let t=0;t<w.length;t+=1)w[t].m(n,null);x||(y=[p(r,"input",e[4]),p(l,"click",(function(){o(e[2](e[0]))&&e[2](e[0]).apply(this,arguments)}))],x=!0)},p(t,[s]){if(e=t,1&s&&r.value!==e[0]&&b(r,e[0]),10&s){let t;for(_=e[1],t=0;t<_.length;t+=1){const o=tt(e,_,t);w[t]?w[t].p(o,s):(w[t]=et(o),w[t].c(),w[t].m(n,null))}for(;t<w.length;t+=1)w[t].d(1);w.length=_.length}},i:t,o:t,d(t){t&&f(n),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(w,t),x=!1,s(y)}}}let st="Icons/delete_FILL0_wght400_GRAD0_opsz48.svg";function ot(t,e,n){let s="",o=[{text:"Write my first post",status:!0},{text:"Upload the post to the blog",status:!1},{text:"Publish the post at Facebook",status:!1}];function r(t){o.splice(t,1),n(1,o)}return[s,o,function(){n(1,o=[...o,{text:s,status:!1}]),n(0,s="")},r,function(){s=this.value,n(0,s)},function(t,e){t[e].status=this.checked,n(1,o)},t=>r(t)]}class rt extends j{constructor(t){super(),O(this,t,ot,nt,r,{})}}function ct(e){let n,s,o,r,c,l;return c=new rt({}),{c(){n=d("div"),s=d("h1"),s.textContent="Todo list",o=h(),r=d("div"),R(c.$$.fragment),m(s,"class","svelte-11eiwt9"),m(r,"class","todo--pre--list svelte-11eiwt9"),m(n,"class","todo--pre--container svelte-11eiwt9")},m(t,e){u(t,n,e),a(n,s),a(n,o),a(n,r),S(c,r,null),l=!0},p:t,i(t){l||(q(c.$$.fragment,t),l=!0)},o(t){G(c.$$.fragment,t),l=!1},d(t){t&&f(n),C(c)}}}function lt(t){return[]}class it extends j{constructor(t){super(),O(this,t,lt,ct,r,{})}}function at(e){let n,s,o,r,c,l,i,p,b,$,x,y,_,w,k,I,L,A=gt(e[0])+"",D=ht(e[0])+"",M=pt(e[0])+"",E=ut(e[0])+"",F=ft(e[0])+"",z=dt(e[0])+"";return{c(){n=d("div"),s=d("h1"),s.textContent="Time and Date",o=h(),r=d("div"),c=d("span"),l=g(A),i=g(":"),p=g(D),b=h(),$=g(M),x=h(),y=d("span"),_=g(E),w=h(),k=g(F),I=h(),L=g(z),m(s,"class","svelte-3eqtv2"),m(c,"class","time svelte-3eqtv2"),m(y,"class","date svelte-3eqtv2"),m(r,"class","date-time svelte-3eqtv2"),m(n,"class","container svelte-3eqtv2")},m(t,e){u(t,n,e),a(n,s),a(n,o),a(n,r),a(r,c),a(c,l),a(c,i),a(c,p),a(c,b),a(c,$),a(r,x),a(r,y),a(y,_),a(y,w),a(y,k),a(y,I),a(y,L)},p(t,[e]){1&e&&A!==(A=gt(t[0])+"")&&v(l,A),1&e&&D!==(D=ht(t[0])+"")&&v(p,D),1&e&&M!==(M=pt(t[0])+"")&&v($,M),1&e&&E!==(E=ut(t[0])+"")&&v(_,E),1&e&&F!==(F=ft(t[0])+"")&&v(k,F),1&e&&z!==(z=dt(t[0])+"")&&v(L,z)},i:t,o:t,d(t){t&&f(n)}}}function ut(t){return["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][t.getDay()]}function ft(t){return["January","February","March","April","May","June","July","August","September","October","November","December"][t.getMonth()]}function dt(t){return t.getDate()}function gt(t){return t.getHours()%12||12}function ht(t){return t.getMinutes()<10?"0"+t.getMinutes():t.getMinutes()}function pt(t){return t.getHours()<12?"AM":"PM"}function mt(t,e,n){let s=new Date;return _((()=>{const t=setInterval((()=>{n(0,s=new Date)}),1e3);return()=>{clearInterval(t)}})),[s]}class vt extends j{constructor(t){super(),O(this,t,mt,at,r,{})}}function bt(e){let n,s,o,r,c,l,i,g,p,v,b;return o=new V({}),l=new it({}),g=new Z({}),v=new vt({}),{c(){n=d("main"),s=d("div"),R(o.$$.fragment),r=h(),c=d("div"),R(l.$$.fragment),i=h(),R(g.$$.fragment),p=h(),R(v.$$.fragment),m(c,"class","thepages-containers svelte-1242roa"),m(s,"class","container svelte-1242roa")},m(t,e){u(t,n,e),a(n,s),S(o,s,null),a(s,r),a(s,c),S(l,c,null),a(c,i),S(g,c,null),a(c,p),S(v,c,null),b=!0},p:t,i(t){b||(q(o.$$.fragment,t),q(l.$$.fragment,t),q(g.$$.fragment,t),q(v.$$.fragment,t),b=!0)},o(t){G(o.$$.fragment,t),G(l.$$.fragment,t),G(g.$$.fragment,t),G(v.$$.fragment,t),b=!1},d(t){t&&f(n),C(o),C(l),C(g),C(v)}}}return new class extends j{constructor(t){super(),O(this,t,null,bt,r,{})}}({target:document.body,props:{name:"world"}})}();
//# sourceMappingURL=bundle.js.map