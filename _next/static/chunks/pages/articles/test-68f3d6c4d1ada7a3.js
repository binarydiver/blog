(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[974],{3126:function(n,t){function transformRecord(n){let t={},e={};return n&&Object.entries(n).forEach(([n,r])=>{if(t[n])throw Error(`"${n}" has already been declared`);let o=r.render?n.match(/[a-z]+/gi).map(n=>n.charAt(0).toUpperCase()+n.substr(1).toLowerCase()).join(""):void 0;t[n]={...r,render:o},o&&(e[o]=r.render)}),{output:t,components:e}}t.J=function(n){let{output:t,components:e}=transformRecord(n.tags),{output:r,components:o}=transformRecord(n.nodes);return{...n,tags:t,nodes:r,components:{...e,...o}}}},7775:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/articles/test",function(){return e(5030)}])},5030:function(n,t,e){"use strict";e.r(t),e.d(t,{__N_SSG:function(){return a},default:function(){return MarkdocComponent}});var r=e(959),o=e(9132),c=e(3126);let{components:u}=(0,c.J)({});var a=!0;function MarkdocComponent(n){return o.RZ.react(n.markdoc.content,r,{components:{...u,...n.components}})}}},function(n){n.O(0,[318,774,888,179],function(){return n(n.s=7775)}),_N_E=n.O()}]);