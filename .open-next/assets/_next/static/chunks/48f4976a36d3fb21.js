(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},88143,(e,t,r)=>{"use strict";function a({widthInt:e,heightInt:t,blurWidth:r,blurHeight:a,blurDataURL:i,objectFit:s}){let n=r?40*r:e,l=a?40*a:t,o=n&&l?`viewBox='0 0 ${n} ${l}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${o}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${o?"none":"contain"===s?"xMidYMid":"cover"===s?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${i}'/%3E%3C/svg%3E`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImageBlurSvg",{enumerable:!0,get:function(){return a}})},87690,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={VALID_LOADERS:function(){return s},imageConfigDefault:function(){return n}};for(var i in a)Object.defineProperty(r,i,{enumerable:!0,get:a[i]});let s=["default","imgix","cloudinary","akamai","custom"],n={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},8927,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImgProps",{enumerable:!0,get:function(){return o}}),e.r(33525);let a=e.r(88143),i=e.r(87690),s=["-moz-initial","fill","none","scale-down",void 0];function n(e){return void 0!==e.default}function l(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function o({src:e,sizes:t,unoptimized:r=!1,priority:o=!1,preload:d=!1,loading:u,className:c,quality:m,width:f,height:h,fill:p=!1,style:g,overrideSrc:b,onLoad:x,onLoadingComplete:y,placeholder:v="empty",blurDataURL:_,fetchPriority:w,decoding:j="async",layout:N,objectFit:k,objectPosition:P,lazyBoundary:C,lazyRoot:E,...O},S){var R;let M,z,$,{imgConf:I,showAltText:L,blurComplete:A,defaultLoader:U}=S,T=I||i.imageConfigDefault;if("allSizes"in T)M=T;else{let e=[...T.deviceSizes,...T.imageSizes].sort((e,t)=>e-t),t=T.deviceSizes.sort((e,t)=>e-t),r=T.qualities?.sort((e,t)=>e-t);M={...T,allSizes:e,deviceSizes:t,qualities:r}}if(void 0===U)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let D=O.loader||U;delete O.loader,delete O.srcSet;let F="__next_img_default"in D;if(F){if("custom"===M.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=D;D=t=>{let{config:r,...a}=t;return e(a)}}if(N){"fill"===N&&(p=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[N];e&&(g={...g,...e});let r={responsive:"100vw",fill:"100vw"}[N];r&&!t&&(t=r)}let B="",W=l(f),q=l(h);if((R=e)&&"object"==typeof R&&(n(R)||void 0!==R.src)){let t=n(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(z=t.blurWidth,$=t.blurHeight,_=_||t.blurDataURL,B=t.src,!p)if(W||q){if(W&&!q){let e=W/t.width;q=Math.round(t.height*e)}else if(!W&&q){let e=q/t.height;W=Math.round(t.width*e)}}else W=t.width,q=t.height}let Z=!o&&!d&&("lazy"===u||void 0===u);(!(e="string"==typeof e?e:B)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,Z=!1),M.unoptimized&&(r=!0),F&&!M.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let G=l(m),H=Object.assign(p?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:k,objectPosition:P}:{},L?{}:{color:"transparent"},g),X=A||"empty"===v?null:"blur"===v?`url("data:image/svg+xml;charset=utf-8,${(0,a.getImageBlurSvg)({widthInt:W,heightInt:q,blurWidth:z,blurHeight:$,blurDataURL:_||"",objectFit:H.objectFit})}")`:`url("${v}")`,V=s.includes(H.objectFit)?"fill"===H.objectFit?"100% 100%":"cover":H.objectFit,Y=X?{backgroundSize:V,backgroundPosition:H.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:X}:{},J=function({config:e,src:t,unoptimized:r,width:a,quality:i,sizes:s,loader:n}){if(r)return{src:t,srcSet:void 0,sizes:void 0};let{widths:l,kind:o}=function({deviceSizes:e,allSizes:t},r,a){if(a){let r=/(^|\s)(1?\d?\d)vw/g,i=[];for(let e;e=r.exec(a);)i.push(parseInt(e[2]));if(i.length){let r=.01*Math.min(...i);return{widths:t.filter(t=>t>=e[0]*r),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof r?{widths:e,kind:"w"}:{widths:[...new Set([r,2*r].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,a,s),d=l.length-1;return{sizes:s||"w"!==o?s:"100vw",srcSet:l.map((r,a)=>`${n({config:e,src:t,quality:i,width:r})} ${"w"===o?r:a+1}${o}`).join(", "),src:n({config:e,src:t,quality:i,width:l[d]})}}({config:M,src:e,unoptimized:r,width:W,quality:G,sizes:t,loader:D}),K=Z?"lazy":u;return{props:{...O,loading:K,fetchPriority:w,width:W,height:q,decoding:j,className:c,style:{...H,...Y},sizes:J.sizes,srcSet:J.srcSet,src:b||J.src},meta:{unoptimized:r,preload:d||o,placeholder:v,fill:p}}}},98879,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return l}});let a=e.r(71645),i="undefined"==typeof window,s=i?()=>{}:a.useLayoutEffect,n=i?()=>{}:a.useEffect;function l(e){let{headManager:t,reduceComponentsToState:r}=e;function l(){if(t&&t.mountedInstances){let e=a.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(e))}}return i&&(t?.mountedInstances?.add(e.children),l()),s(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),s(()=>(t&&(t._pendingUpdate=l),()=>{t&&(t._pendingUpdate=l)})),n(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return p},defaultHead:function(){return c}};for(var i in a)Object.defineProperty(r,i,{enumerable:!0,get:a[i]});let s=e.r(55682),n=e.r(90809),l=e.r(43476),o=n._(e.r(71645)),d=s._(e.r(98879)),u=e.r(42732);function c(){return[(0,l.jsx)("meta",{charSet:"utf-8"},"charset"),(0,l.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function m(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let f=["name","httpEquiv","charSet","itemProp"];function h(e){let t,r,a,i;return e.reduce(m,[]).reverse().concat(c().reverse()).filter((t=new Set,r=new Set,a=new Set,i={},e=>{let s=!0,n=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){n=!0;let r=e.key.slice(e.key.indexOf("$")+1);t.has(r)?s=!1:t.add(r)}switch(e.type){case"title":case"base":r.has(e.type)?s=!1:r.add(e.type);break;case"meta":for(let t=0,r=f.length;t<r;t++){let r=f[t];if(e.props.hasOwnProperty(r))if("charSet"===r)a.has(r)?s=!1:a.add(r);else{let t=e.props[r],a=i[r]||new Set;("name"!==r||!n)&&a.has(t)?s=!1:(a.add(t),i[r]=a)}}}return s})).reverse().map((e,t)=>{let r=e.key||t;return o.default.cloneElement(e,{key:r})})}let p=function({children:e}){let t=(0,o.useContext)(u.HeadManagerContext);return(0,l.jsx)(d.default,{reduceComponentsToState:h,headManager:t,children:e})};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18556,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return s}});let a=e.r(55682)._(e.r(71645)),i=e.r(87690),s=a.default.createContext(i.imageConfigDefault)},65856,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouterContext",{enumerable:!0,get:function(){return a}});let a=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,r)=>{"use strict";function a(e,t){let r=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e,0):r}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"findClosestQuality",{enumerable:!0,get:function(){return a}})},1948,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return s}});let a=e.r(70965);function i({config:e,src:t,width:r,quality:i}){if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let s=(0,a.findClosestQuality)(i,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${s}${t.startsWith("/_next/static/media/"),""}`}i.__next_img_default=!0;let s=i},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return i}});let a=e.r(71645);function i(e,t){let r=(0,a.useRef)(null),i=(0,a.useRef)(null);return(0,a.useCallback)(a=>{if(null===a){let e=r.current;e&&(r.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(r.current=s(e,a)),t&&(i.current=s(t,a))},[e,t])}function s(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},5500,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Image",{enumerable:!0,get:function(){return v}});let a=e.r(55682),i=e.r(90809),s=e.r(43476),n=i._(e.r(71645)),l=a._(e.r(74080)),o=a._(e.r(25633)),d=e.r(8927),u=e.r(87690),c=e.r(18556);e.r(33525);let m=e.r(65856),f=a._(e.r(1948)),h=e.r(18581),p={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function g(e,t,r,a,i,s,n){let l=e?.src;e&&e["data-loaded-src"]!==l&&(e["data-loaded-src"]=l,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&i(!0),r?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let a=!1,i=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>a,isPropagationStopped:()=>i,persist:()=>{},preventDefault:()=>{a=!0,t.preventDefault()},stopPropagation:()=>{i=!0,t.stopPropagation()}})}a?.current&&a.current(e)}}))}function b(e){return n.use?{fetchPriority:e}:{fetchpriority:e}}"undefined"==typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let x=(0,n.forwardRef)(({src:e,srcSet:t,sizes:r,height:a,width:i,decoding:l,className:o,style:d,fetchPriority:u,placeholder:c,loading:m,unoptimized:f,fill:p,onLoadRef:x,onLoadingCompleteRef:y,setBlurComplete:v,setShowAltText:_,sizesInput:w,onLoad:j,onError:N,...k},P)=>{let C=(0,n.useCallback)(e=>{e&&(N&&(e.src=e.src),e.complete&&g(e,c,x,y,v,f,w))},[e,c,x,y,v,N,f,w]),E=(0,h.useMergedRef)(P,C);return(0,s.jsx)("img",{...k,...b(u),loading:m,width:i,height:a,decoding:l,"data-nimg":p?"fill":"1",className:o,style:d,sizes:r,srcSet:t,src:e,ref:E,onLoad:e=>{g(e.currentTarget,c,x,y,v,f,w)},onError:e=>{_(!0),"empty"!==c&&v(!0),N&&N(e)}})});function y({isAppRouter:e,imgAttributes:t}){let r={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...b(t.fetchPriority)};return e&&l.default.preload?(l.default.preload(t.src,r),null):(0,s.jsx)(o.default,{children:(0,s.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...r},"__nimg-"+t.src+t.srcSet+t.sizes)})}let v=(0,n.forwardRef)((e,t)=>{let r=(0,n.useContext)(m.RouterContext),a=(0,n.useContext)(c.ImageConfigContext),i=(0,n.useMemo)(()=>{let e=p||a||u.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t),i=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r,qualities:i,localPatterns:"undefined"==typeof window?a?.localPatterns:e.localPatterns}},[a]),{onLoad:l,onLoadingComplete:o}=e,h=(0,n.useRef)(l);(0,n.useEffect)(()=>{h.current=l},[l]);let g=(0,n.useRef)(o);(0,n.useEffect)(()=>{g.current=o},[o]);let[b,v]=(0,n.useState)(!1),[_,w]=(0,n.useState)(!1),{props:j,meta:N}=(0,d.getImgProps)(e,{defaultLoader:f.default,imgConf:i,blurComplete:b,showAltText:_});return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(x,{...j,unoptimized:N.unoptimized,placeholder:N.placeholder,fill:N.fill,onLoadRef:h,onLoadingCompleteRef:g,setBlurComplete:v,setShowAltText:w,sizesInput:e.sizes,ref:t}),N.preload?(0,s.jsx)(y,{isAppRouter:!r,imgAttributes:j}):null]})});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},94909,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return u},getImageProps:function(){return d}};for(var i in a)Object.defineProperty(r,i,{enumerable:!0,get:a[i]});let s=e.r(55682),n=e.r(8927),l=e.r(5500),o=s._(e.r(1948));function d(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let u=l.Image},57688,(e,t,r)=>{t.exports=e.r(94909)},75254,e=>{"use strict";var t=e.i(71645);let r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},a=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim();var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let s=(0,t.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:s=2,absoluteStrokeWidth:n,className:l="",children:o,iconNode:d,...u},c)=>(0,t.createElement)("svg",{ref:c,...i,width:r,height:r,stroke:e,strokeWidth:n?24*Number(s)/Number(r):s,className:a("lucide",l),...!o&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(u)&&{"aria-hidden":"true"},...u},[...d.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(o)?o:[o]])),n=(e,i)=>{let n=(0,t.forwardRef)(({className:n,...l},o)=>(0,t.createElement)(s,{ref:o,iconNode:i,className:a(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...l}));return n.displayName=r(e),n};e.s(["default",()=>n],75254)},84443,e=>{"use strict";var t=e.i(43476),r=e.i(97053);let a=r.default.div.withConfig({displayName:"Loader__StyledWrapper",componentId:"sc-ef965c93-0"})`
  .wheel-and-hamster {
    --dur: 1s;
    position: relative;
    width: 12em;
    height: 12em;
    font-size: 14px;
  }

  .wheel,
  .hamster,
  .hamster div,
  .spoke {
    position: absolute;
  }

  .wheel,
  .spoke {
    border-radius: 50%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .wheel {
    background: radial-gradient(100% 100% at center,hsla(0,0%,60%,0) 47.8%,hsl(0,0%,60%) 48%);
    z-index: 2;
  }

  .hamster {
    animation: hamster var(--dur) ease-in-out infinite;
    top: 50%;
    left: calc(50% - 3.5em);
    width: 7em;
    height: 3.75em;
    transform: rotate(4deg) translate(-0.8em,1.85em);
    transform-origin: 50% 0;
    z-index: 1;
  }

  .hamster__head {
    animation: hamsterHead var(--dur) ease-in-out infinite;
    background: hsl(30,90%,55%);
    border-radius: 70% 30% 0 100% / 40% 25% 25% 60%;
    box-shadow: 0 -0.25em 0 hsl(30,90%,80%) inset,
  		0.75em -1.55em 0 hsl(30,90%,90%) inset;
    top: 0;
    left: -2em;
    width: 2.75em;
    height: 2.5em;
    transform-origin: 100% 50%;
  }

  .hamster__ear {
    animation: hamsterEar var(--dur) ease-in-out infinite;
    background: hsl(0,90%,85%);
    border-radius: 50%;
    box-shadow: -0.25em 0 hsl(30,90%,55%) inset;
    top: -0.25em;
    right: -0.25em;
    width: 0.75em;
    height: 0.75em;
    transform-origin: 50% 75%;
  }

  .hamster__eye {
    animation: hamsterEye var(--dur) linear infinite;
    background-color: hsl(0,0%,0%);
    border-radius: 50%;
    top: 0.375em;
    left: 1.25em;
    width: 0.5em;
    height: 0.5em;
  }

  .hamster__nose {
    background: hsl(0,90%,75%);
    border-radius: 35% 65% 85% 15% / 70% 50% 50% 30%;
    top: 0.75em;
    left: 0;
    width: 0.2em;
    height: 0.25em;
  }

  .hamster__body {
    animation: hamsterBody var(--dur) ease-in-out infinite;
    background: hsl(30,90%,90%);
    border-radius: 50% 30% 50% 30% / 15% 60% 40% 40%;
    box-shadow: 0.1em 0.75em 0 hsl(30,90%,55%) inset,
  		0.15em -0.5em 0 hsl(30,90%,80%) inset;
    top: 0.25em;
    left: 2em;
    width: 4.5em;
    height: 3em;
    transform-origin: 17% 50%;
    transform-style: preserve-3d;
  }

  .hamster__limb--fr,
  .hamster__limb--fl {
    clip-path: polygon(0 0,100% 0,70% 80%,60% 100%,0% 100%,40% 80%);
    top: 2em;
    left: 0.5em;
    width: 1em;
    height: 1.5em;
    transform-origin: 50% 0;
  }

  .hamster__limb--fr {
    animation: hamsterFRLimb var(--dur) linear infinite;
    background: linear-gradient(hsl(30,90%,80%) 80%,hsl(0,90%,75%) 80%);
    transform: rotate(15deg) translateZ(-1px);
  }

  .hamster__limb--fl {
    animation: hamsterFLLimb var(--dur) linear infinite;
    background: linear-gradient(hsl(30,90%,90%) 80%,hsl(0,90%,85%) 80%);
    transform: rotate(15deg);
  }

  .hamster__limb--br,
  .hamster__limb--bl {
    border-radius: 0.75em 0.75em 0 0;
    clip-path: polygon(0 0,100% 0,100% 30%,70% 90%,70% 100%,30% 100%,40% 90%,0% 30%);
    top: 1em;
    left: 2.8em;
    width: 1.5em;
    height: 2.5em;
    transform-origin: 50% 30%;
  }

  .hamster__limb--br {
    animation: hamsterBRLimb var(--dur) linear infinite;
    background: linear-gradient(hsl(30,90%,80%) 90%,hsl(0,90%,75%) 90%);
    transform: rotate(-25deg) translateZ(-1px);
  }

  .hamster__limb--bl {
    animation: hamsterBLLimb var(--dur) linear infinite;
    background: linear-gradient(hsl(30,90%,90%) 90%,hsl(0,90%,85%) 90%);
    transform: rotate(-25deg);
  }

  .hamster__tail {
    animation: hamsterTail var(--dur) linear infinite;
    background: hsl(0,90%,85%);
    border-radius: 0.25em 50% 50% 0.25em;
    box-shadow: 0 -0.2em 0 hsl(0,90%,75%) inset;
    top: 1.5em;
    right: -0.5em;
    width: 1em;
    height: 0.5em;
    transform: rotate(30deg) translateZ(-1px);
    transform-origin: 0.25em 0.25em;
  }

  .spoke {
    animation: spoke var(--dur) linear infinite;
    background: radial-gradient(100% 100% at center,hsl(0,0%,60%) 4.8%,hsla(0,0%,60%,0) 5%),
  		linear-gradient(hsla(0,0%,55%,0) 46.9%,hsl(0,0%,65%) 47% 52.9%,hsla(0,0%,65%,0) 53%) 50% 50% / 99% 99% no-repeat;
  }

  /* Animations */
  @keyframes hamster {
    from, to {
      transform: rotate(4deg) translate(-0.8em,1.85em);
    }

    50% {
      transform: rotate(0) translate(-0.8em,1.85em);
    }
  }

  @keyframes hamsterHead {
    from, 25%, 50%, 75%, to {
      transform: rotate(0);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(8deg);
    }
  }

  @keyframes hamsterEye {
    from, 90%, to {
      transform: scaleY(1);
    }

    95% {
      transform: scaleY(0);
    }
  }

  @keyframes hamsterEar {
    from, 25%, 50%, 75%, to {
      transform: rotate(0);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(12deg);
    }
  }

  @keyframes hamsterBody {
    from, 25%, 50%, 75%, to {
      transform: rotate(0);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(-2deg);
    }
  }

  @keyframes hamsterFRLimb {
    from, 25%, 50%, 75%, to {
      transform: rotate(50deg) translateZ(-1px);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(-30deg) translateZ(-1px);
    }
  }

  @keyframes hamsterFLLimb {
    from, 25%, 50%, 75%, to {
      transform: rotate(-30deg);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(50deg);
    }
  }

  @keyframes hamsterBRLimb {
    from, 25%, 50%, 75%, to {
      transform: rotate(-60deg) translateZ(-1px);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(20deg) translateZ(-1px);
    }
  }

  @keyframes hamsterBLLimb {
    from, 25%, 50%, 75%, to {
      transform: rotate(20deg);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(-60deg);
    }
  }

  @keyframes hamsterTail {
    from, 25%, 50%, 75%, to {
      transform: rotate(30deg) translateZ(-1px);
    }

    12.5%, 37.5%, 62.5%, 87.5% {
      transform: rotate(10deg) translateZ(-1px);
    }
  }

  @keyframes spoke {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(-1turn);
    }
  }`;e.s(["default",0,()=>(0,t.jsx)(a,{children:(0,t.jsxs)("div",{"aria-label":"Orange and tan hamster running in a metal wheel",role:"img",className:"wheel-and-hamster",children:[(0,t.jsx)("div",{className:"wheel"}),(0,t.jsx)("div",{className:"hamster",children:(0,t.jsxs)("div",{className:"hamster__body",children:[(0,t.jsxs)("div",{className:"hamster__head",children:[(0,t.jsx)("div",{className:"hamster__ear"}),(0,t.jsx)("div",{className:"hamster__eye"}),(0,t.jsx)("div",{className:"hamster__nose"})]}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--fr"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--fl"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--br"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--bl"}),(0,t.jsx)("div",{className:"hamster__tail"})]})}),(0,t.jsx)("div",{className:"spoke"})]})})])},31343,e=>{"use strict";let t=(0,e.i(75254).default)("play",[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]);e.s(["Play",()=>t],31343)},15209,e=>{"use strict";let t=(0,e.i(75254).default)("move-left",[["path",{d:"M6 8L2 12L6 16",key:"kyvwex"}],["path",{d:"M2 12H22",key:"1m8cig"}]]);e.s(["MoveLeft",()=>t],15209)},41630,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(57688),i=e.i(18566),s=e.i(15209),n=e.i(31343);let l=(0,e.i(75254).default)("info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);var o=e.i(84443);function d(){let e=(0,i.useSearchParams)(),d=(0,i.useRouter)(),u=(0,i.useParams)(),c=u?.id,m=e?.get("enc")??null;e?.get("t");let f=e?.get("season")??"1",h=e?.get("group")??null,p=e?.get("index")??null,[g,b]=(0,r.useState)(null),[x,y]=(0,r.useState)([]),[v,_]=(0,r.useState)(!0),[w,j]=(0,r.useState)(null),[N,k]=(0,r.useState)(Number(f)||1),[P,C]=(0,r.useState)(m?M(m):null),[E,O]=(0,r.useState)(""),[S,R]=(0,r.useState)(null);function M(e){if(!e)return null;let t=String(e).trim();return t?t.startsWith("http://")||t.startsWith("https://")||t.startsWith("/")?t:`/api/stream?enc=${encodeURIComponent(t)}`:null}let z=async(e=1)=>{if(c)try{j(e),O(""),_(!0);let t=await fetch(`/api/series/${encodeURIComponent(c)}?season=${encodeURIComponent(e)}`),r=await t.json();if(!t.ok)return void O(r?.error??"Failed to fetch show");let a={...r??{},data:r?.data??{},seasons_count:r?.seasons_count??r?.seasons??0,season:r?.season??N};b(a),k(a.season??e);let i=[],s=a.data??{};if(Object.entries(s).forEach(([e,t])=>{Array.isArray(t)&&t.forEach((t,r)=>{i.push({...t??{},group:e,idx:r})})}),y(i),h&&null!=p){let e=i.findIndex(e=>e.group===h&&Number(e.idx)===Number(p));-1!==e&&R(e)}else m?R(null):i.length>0&&R(0)}catch(e){console.error("Fetch error:",e),O(e?.message??"Unknown error")}finally{j(null),_(!1)}},$=async(e,t,r)=>{if(!c)throw Error("Missing show id");let a=await fetch(`/api/series/${encodeURIComponent(c)}/token?season=${encodeURIComponent(e)}&group=${encodeURIComponent(t)}&index=${r}`),i=await a.json();if(!a.ok)throw Error(i?.error??"Failed to fetch token");if("string"==typeof i)return M(i);if(i?.url)return M(i.url);if(i?.token)return M(i.token);throw Error("Unexpected token response")};if((0,r.useEffect)(()=>{c&&z(Number(f)||1)},[c,f]),(0,r.useEffect)(()=>{let e=!0;return(async()=>{if(m){if(C(M(m)),h&&null!=p&&x.length>0){let e=x.findIndex(e=>e.group===h&&Number(e.idx)===Number(p));-1!==e&&R(e)}return}if(c&&h&&null!=p)try{_(!0),O("");let t=await $(f,h,Number(p));if(!e)return;if(C(t),x.length>0){let e=x.findIndex(e=>e.group===h&&Number(e.idx)===Number(p));-1!==e&&R(e)}}catch(e){console.error("Token fetch error:",e),O(e?.message??"Failed to load video")}finally{e&&_(!1)}})(),()=>{e=!1}},[c,m,h,p,f,x]),v&&!g)return(0,t.jsx)("div",{className:"w-full h-screen flex items-center justify-center bg-[#0f0f0f] text-white",children:(0,t.jsx)(o.default,{})});if(E&&!g)return(0,t.jsxs)("div",{className:"min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center",children:[(0,t.jsx)("p",{className:"text-red-500 text-xl mb-6 font-bold",children:E}),(0,t.jsx)("button",{onClick:()=>d.back(),className:"px-8 py-3 bg-[#E50914] text-white rounded font-bold hover:bg-[#b00710] transition-colors",children:"Go Back"})]});let I=null!==S&&x[S]?x[S]:null;return(0,t.jsxs)("div",{className:"min-h-screen bg-[#0f0f0f] text-white",children:[(0,t.jsx)("div",{className:"absolute top-0 left-0 w-full z-50 p-6 bg-gradient-to-b from-black/80 to-transparent flex items-center",children:(0,t.jsxs)("button",{onClick:()=>d.push(`/series/${c}`),className:"flex items-center gap-2 text-gray-300 hover:text-white transition-colors group",children:[(0,t.jsx)("div",{className:"bg-black/50 p-2 rounded-full border border-gray-600 group-hover:border-white transition-colors",children:(0,t.jsx)(s.MoveLeft,{size:24})}),(0,t.jsx)("span",{className:"font-bold text-lg drop-shadow-md",children:"Back to Series"})]})}),(0,t.jsxs)("div",{className:"pt-24 pb-20 px-4 md:px-12 max-w-[1600px] mx-auto space-y-12",children:[(0,t.jsxs)("section",{className:"w-full flex flex-col gap-6",children:[(0,t.jsx)("div",{className:"relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-800 ring-1 ring-white/10",children:P?(0,t.jsx)("iframe",{src:P,title:I?.title||"Episode Player",className:"w-full h-full",allowFullScreen:!0,allow:"autoplay; encrypted-media",style:{border:"none"}}):(0,t.jsxs)("div",{className:"w-full h-full flex flex-col items-center justify-center text-gray-500 gap-4",children:[(0,t.jsx)(o.default,{}),(0,t.jsx)("p",{className:"text-sm tracking-widest uppercase",children:"Loading Stream..."})]})}),(0,t.jsxs)("div",{className:"flex flex-col md:flex-row md:items-start justify-between gap-6 animate-slideUp",children:[(0,t.jsxs)("div",{className:"space-y-2 max-w-3xl",children:[(0,t.jsx)("h1",{className:"text-3xl md:text-5xl font-extrabold text-white leading-tight",children:I?.title||g?.show_title||"Loading..."}),(0,t.jsxs)("div",{className:"flex items-center gap-4 text-gray-400 text-sm font-medium",children:[I?.group&&(0,t.jsx)("span",{className:"text-yellow-400",children:I.group}),g?.rating&&(0,t.jsx)("span",{className:"border border-gray-600 px-2 py-0.5 rounded text-xs",children:g.rating}),g?.year&&(0,t.jsx)("span",{children:g.year})]}),(0,t.jsx)("p",{className:"text-gray-300 text-lg leading-relaxed pt-2 max-w-2xl",children:I?.description||g?.description||"No description available."})]}),(0,t.jsx)("div",{className:"flex gap-4"})]})]}),(0,t.jsxs)("section",{className:"space-y-6",children:[(0,t.jsxs)("h2",{className:"text-2xl font-bold text-white flex items-center gap-2",children:[(0,t.jsx)(n.Play,{className:"text-red-600 fill-red-600"}),"Episodes"]}),Object.entries(g?.data??{}).map(([e,r])=>(0,t.jsxs)("div",{className:"space-y-4",children:[Object.keys(g?.data??{}).length>1&&(0,t.jsx)("h3",{className:"text-xl text-gray-400 font-medium pl-2 border-l-4 border-red-600",children:e}),(0,t.jsx)("div",{className:"flex overflow-x-auto gap-4 p-4 pb-6 scrollbar-hide snap-x",children:Array.isArray(r)&&r.length>0?r.map((r,i)=>{let s=x.findIndex(t=>t.group===e&&Number(t.idx)===i),o=-1!==s&&S===s;return(0,t.jsxs)("div",{onClick:()=>{var t;let a,s,n;return t=r.title,-1!==(a=x.findIndex(t=>t.group===e&&Number(t.idx)===Number(i)))&&R(a),s=t?`&t=${encodeURIComponent(t)}`:"",n=N??Number(f)??1,void d.push(`/series/${c}/episode?season=${n}&group=${encodeURIComponent(e)}&index=${i}${s}`)},className:`
                                            snap-start shrink-0 w-[300px] cursor-pointer group relative rounded-lg overflow-hidden transition-all duration-300
                                            ${o?"ring-2 ring-red-600 scale-[1.02]":"hover:scale-105 opacity-80 hover:opacity-100"}
                                        `,children:[(0,t.jsxs)("div",{className:"relative aspect-video bg-zinc-900",children:[r.image_url?(0,t.jsx)(a.default,{src:r.image_url,alt:r.title,fill:!0,className:"object-cover",unoptimized:!0}):(0,t.jsx)("div",{className:"w-full h-full flex items-center justify-center text-zinc-600",children:(0,t.jsx)(l,{})}),(0,t.jsx)("div",{className:"absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",children:(0,t.jsx)("div",{className:"bg-red-600 p-3 rounded-full shadow-lg",children:(0,t.jsx)(n.Play,{fill:"white",className:"text-white ml-1",size:20})})}),o&&(0,t.jsx)("div",{className:"absolute bottom-0 left-0 right-0 h-1 bg-red-600"})]}),(0,t.jsxs)("div",{className:"p-4 bg-[#181818] h-full",children:[(0,t.jsxs)("div",{className:"flex justify-between items-start mb-1",children:[(0,t.jsxs)("h4",{className:`font-bold text-base line-clamp-1 ${o?"text-red-500":"text-white"}`,children:[i+1,". ",r.title]}),(0,t.jsx)("span",{className:"text-xs text-gray-500 font-mono",children:void 0!==r.idx?`${r.idx+1}m`:"45m"})]}),(0,t.jsx)("p",{className:"text-xs text-gray-400 line-clamp-2 leading-relaxed",children:r.description||"No description available for this episode."})]})]},i)}):(0,t.jsx)("p",{className:"text-gray-500",children:"No episodes found."})})]},e))]})]})]})}e.s(["default",()=>d],41630)}]);