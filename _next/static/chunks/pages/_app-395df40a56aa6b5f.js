(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[888],{2639:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/_app",function(){return r(9017)}])},8530:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Image",{enumerable:!0,get:function(){return p}});let i=r(1351),n=r(5815),o=n._(r(959)),a=i._(r(422)),l=i._(r(6052)),s=r(8900),u=r(6284),d=r(1022);r(7630);let c=r(7026),f=i._(r(6299)),g={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0};function handleLoading(e,t,r,i,n,o){let a=null==e?void 0:e.src;if(!e||e["data-loaded-src"]===a)return;e["data-loaded-src"]=a;let l="decode"in e?e.decode():Promise.resolve();l.catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&n(!0),null==r?void 0:r.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let i=!1,n=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>i,isPropagationStopped:()=>n,persist:()=>{},preventDefault:()=>{i=!0,t.preventDefault()},stopPropagation:()=>{n=!0,t.stopPropagation()}})}(null==i?void 0:i.current)&&i.current(e)}})}function getDynamicProps(e){let[t,r]=o.version.split("."),i=parseInt(t,10),n=parseInt(r,10);return i>18||18===i&&n>=3?{fetchPriority:e}:{fetchpriority:e}}let m=(0,o.forwardRef)((e,t)=>{let{src:r,srcSet:i,sizes:n,height:a,width:l,decoding:s,className:u,style:d,fetchPriority:c,placeholder:f,loading:g,unoptimized:m,fill:p,onLoadRef:h,onLoadingCompleteRef:v,setBlurComplete:b,setShowAltText:x,onLoad:_,onError:w,...y}=e;return o.default.createElement("img",{...y,...getDynamicProps(c),loading:g,width:l,height:a,decoding:s,"data-nimg":p?"fill":"1",className:u,style:d,sizes:n,srcSet:i,src:r,ref:(0,o.useCallback)(e=>{t&&("function"==typeof t?t(e):"object"==typeof t&&(t.current=e)),e&&(w&&(e.src=e.src),e.complete&&handleLoading(e,f,h,v,b,m))},[r,f,h,v,b,w,m,t]),onLoad:e=>{let t=e.currentTarget;handleLoading(t,f,h,v,b,m)},onError:e=>{x(!0),"empty"!==f&&b(!0),w&&w(e)}})});function ImagePreload(e){let{isAppRouter:t,imgAttributes:r}=e,i={as:"image",imageSrcSet:r.srcSet,imageSizes:r.sizes,crossOrigin:r.crossOrigin,referrerPolicy:r.referrerPolicy,...getDynamicProps(r.fetchPriority)};return t&&a.default.preload?(a.default.preload(r.src,i),null):o.default.createElement(l.default,null,o.default.createElement("link",{key:"__nimg-"+r.src+r.srcSet+r.sizes,rel:"preload",href:r.srcSet?void 0:r.src,...i}))}let p=(0,o.forwardRef)((e,t)=>{let r=(0,o.useContext)(c.RouterContext),i=(0,o.useContext)(d.ImageConfigContext),n=(0,o.useMemo)(()=>{let e=g||i||u.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r}},[i]),{onLoad:a,onLoadingComplete:l}=e,p=(0,o.useRef)(a);(0,o.useEffect)(()=>{p.current=a},[a]);let h=(0,o.useRef)(l);(0,o.useEffect)(()=>{h.current=l},[l]);let[v,b]=(0,o.useState)(!1),[x,_]=(0,o.useState)(!1),{props:w,meta:y}=(0,s.getImgProps)(e,{defaultLoader:f.default,imgConf:n,blurComplete:v,showAltText:x});return o.default.createElement(o.default.Fragment,null,o.default.createElement(m,{...w,unoptimized:y.unoptimized,placeholder:y.placeholder,fill:y.fill,onLoadRef:p,onLoadingCompleteRef:h,setBlurComplete:b,setShowAltText:_,ref:t}),y.priority?o.default.createElement(ImagePreload,{isAppRouter:!r,imgAttributes:w}):null)});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8900:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return getImgProps}}),r(7630);let i=r(7),n=r(6284);function isStaticRequire(e){return void 0!==e.default}function getInt(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function getImgProps(e,t){var r;let o,a,l,{src:s,sizes:u,unoptimized:d=!1,priority:c=!1,loading:f,className:g,quality:m,width:p,height:h,fill:v=!1,style:b,onLoad:x,onLoadingComplete:_,placeholder:w="empty",blurDataURL:y,fetchPriority:S,layout:j,objectFit:P,objectPosition:E,lazyBoundary:I,lazyRoot:C,...k}=e,{imgConf:z,showAltText:N,blurComplete:O,defaultLoader:R}=t,L=z||n.imageConfigDefault;if("allSizes"in L)o=L;else{let e=[...L.deviceSizes,...L.imageSizes].sort((e,t)=>e-t),t=L.deviceSizes.sort((e,t)=>e-t);o={...L,allSizes:e,deviceSizes:t}}let M=k.loader||R;delete k.loader,delete k.srcSet;let D="__next_img_default"in M;if(D){if("custom"===o.loader)throw Error('Image with src "'+s+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader')}else{let e=M;M=t=>{let{config:r,...i}=t;return e(i)}}if(j){"fill"===j&&(v=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[j];e&&(b={...b,...e});let t={responsive:"100vw",fill:"100vw"}[j];t&&!u&&(u=t)}let A="",B=getInt(p),F=getInt(h);if("object"==typeof(r=s)&&(isStaticRequire(r)||void 0!==r.src)){let e=isStaticRequire(s)?s.default:s;if(!e.src)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e));if(!e.height||!e.width)throw Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e));if(a=e.blurWidth,l=e.blurHeight,y=y||e.blurDataURL,A=e.src,!v){if(B||F){if(B&&!F){let t=B/e.width;F=Math.round(e.height*t)}else if(!B&&F){let t=F/e.height;B=Math.round(e.width*t)}}else B=e.width,F=e.height}}let G=!c&&("lazy"===f||void 0===f);(!(s="string"==typeof s?s:A)||s.startsWith("data:")||s.startsWith("blob:"))&&(d=!0,G=!1),o.unoptimized&&(d=!0),D&&s.endsWith(".svg")&&!o.dangerouslyAllowSVG&&(d=!0),c&&(S="high");let W=getInt(m),q=Object.assign(v?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:P,objectPosition:E}:{},N?{}:{color:"transparent"},b),T=O||"empty"===w?null:"blur"===w?'url("data:image/svg+xml;charset=utf-8,'+(0,i.getImageBlurSvg)({widthInt:B,heightInt:F,blurWidth:a,blurHeight:l,blurDataURL:y||"",objectFit:q.objectFit})+'")':'url("'+w+'")',U=T?{backgroundSize:q.objectFit||"cover",backgroundPosition:q.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:T}:{},J=function(e){let{config:t,src:r,unoptimized:i,width:n,quality:o,sizes:a,loader:l}=e;if(i)return{src:r,srcSet:void 0,sizes:void 0};let{widths:s,kind:u}=function(e,t,r){let{deviceSizes:i,allSizes:n}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let i;i=e.exec(r);i)t.push(parseInt(i[2]));if(t.length){let e=.01*Math.min(...t);return{widths:n.filter(t=>t>=i[0]*e),kind:"w"}}return{widths:n,kind:"w"}}if("number"!=typeof t)return{widths:i,kind:"w"};let o=[...new Set([t,2*t].map(e=>n.find(t=>t>=e)||n[n.length-1]))];return{widths:o,kind:"x"}}(t,n,a),d=s.length-1;return{sizes:a||"w"!==u?a:"100vw",srcSet:s.map((e,i)=>l({config:t,src:r,quality:o,width:e})+" "+("w"===u?e:i+1)+u).join(", "),src:l({config:t,src:r,quality:o,width:s[d]})}}({config:o,src:s,unoptimized:d,width:B,quality:W,sizes:u,loader:M}),V={...k,loading:G?"lazy":f,fetchPriority:S,width:B,height:F,decoding:"async",className:g,style:{...q,...U},sizes:J.sizes,srcSet:J.srcSet,src:J.src},X={unoptimized:d,priority:c,placeholder:w,fill:v};return{props:V,meta:X}}},7:function(e,t){"use strict";function getImageBlurSvg(e){let{widthInt:t,heightInt:r,blurWidth:i,blurHeight:n,blurDataURL:o,objectFit:a}=e,l=i?40*i:t,s=n?40*n:r,u=l&&s?"viewBox='0 0 "+l+" "+s+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+u+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(u?"none":"contain"===a?"xMidYMid":"cover"===a?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+o+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return getImageBlurSvg}})},8203:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{unstable_getImgProps:function(){return unstable_getImgProps},default:function(){return s}});let i=r(1351),n=r(8900),o=r(7630),a=r(8530),l=i._(r(6299)),unstable_getImgProps=e=>{(0,o.warnOnce)("Warning: unstable_getImgProps() is experimental and may change or be removed at any time. Use at your own risk.");let{props:t}=(0,n.getImgProps)(e,{defaultLoader:l.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}},s=a.Image},6299:function(e,t){"use strict";function defaultLoader(e){let{config:t,src:r,width:i,quality:n}=e;return t.path+"?url="+encodeURIComponent(r)+"&w="+i+"&q="+(n||75)}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return r}}),defaultLoader.__next_img_default=!0;let r=defaultLoader},9017:function(e,t,r){"use strict";r.r(t),r.d(t,{default:function(){return App}});var i=r(1527);r(2093);var footer=()=>(0,i.jsx)("footer",{className:"max-w-5xl mx-auto p-2 text-center",children:(0,i.jsx)("p",{children:"\xa9 2023 Jason Park"})}),n=r(7858),o=r.n(n),a=r(959),navigation=e=>{let{title:t}=e,[r,n]=(0,a.useState)();return(0,a.useEffect)(()=>{n(document.documentElement.classList.contains("dark"))},[]),(0,i.jsx)("div",{className:"border-b",children:(0,i.jsx)("div",{className:"max-w-5xl mx-auto",children:(0,i.jsxs)("div",{className:"flex",children:[(0,i.jsx)("div",{className:"flex-auto",children:(0,i.jsx)("nav",{className:"p-4 text-center",children:(0,i.jsx)("h1",{className:"text-3xl",children:t})})}),(0,i.jsx)("div",{className:"flex-initial flex items-center",children:(0,i.jsx)("button",{type:"button",title:"dark mode",className:"text-white bg-blue-500 hover:bg-blue-600 rounded-full p-2 me-2 dark:bg-slate-300 dark:hover:bg-slate-400",onClick:()=>{r?(localStorage.setItem("theme","light"),document.documentElement.classList.remove("dark"),n(!1)):(localStorage.setItem("theme","dark"),document.documentElement.classList.add("dark"),n(!0))},children:(0,i.jsx)(o(),{src:r?"/light.png":"/dark.png",width:32,height:32,alt:"dark mode toggle icon"})})})]})})})},layout=e=>{let{children:t}=e;return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(navigation,{title:"binarydiver"}),(0,i.jsx)("main",{className:"max-w-5xl mx-auto py-2",children:t}),(0,i.jsx)(footer,{})]})};function App(e){let{Component:t,pageProps:r}=e,n=t.getLayout||(e=>(0,i.jsx)(layout,{children:e}));return n((0,i.jsx)(t,{...r}))}},2093:function(){},7858:function(e,t,r){e.exports=r(8203)}},function(e){var __webpack_exec__=function(t){return e(e.s=t)};e.O(0,[774,179],function(){return __webpack_exec__(2639),__webpack_exec__(1032)}),_N_E=e.O()}]);