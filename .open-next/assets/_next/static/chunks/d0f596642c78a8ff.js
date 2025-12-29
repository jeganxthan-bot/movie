(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},88143,(e,t,r)=>{"use strict";function a({widthInt:e,heightInt:t,blurWidth:r,blurHeight:a,blurDataURL:s,objectFit:i}){let n=r?40*r:e,o=a?40*a:t,l=n&&o?`viewBox='0 0 ${n} ${o}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${l}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${l?"none":"contain"===i?"xMidYMid":"cover"===i?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${s}'/%3E%3C/svg%3E`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImageBlurSvg",{enumerable:!0,get:function(){return a}})},87690,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return n}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});let i=["default","imgix","cloudinary","akamai","custom"],n={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},8927,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImgProps",{enumerable:!0,get:function(){return l}}),e.r(33525);let a=e.r(88143),s=e.r(87690),i=["-moz-initial","fill","none","scale-down",void 0];function n(e){return void 0!==e.default}function o(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function l({src:e,sizes:t,unoptimized:r=!1,priority:l=!1,preload:d=!1,loading:c,className:u,quality:f,width:m,height:h,fill:p=!1,style:g,overrideSrc:b,onLoad:v,onLoadingComplete:x,placeholder:w="empty",blurDataURL:y,fetchPriority:j,decoding:_="async",layout:N,objectFit:k,objectPosition:P,lazyBoundary:C,lazyRoot:S,...E},O){var z;let R,M,I,{imgConf:$,showAltText:A,blurComplete:L,defaultLoader:T}=O,U=$||s.imageConfigDefault;if("allSizes"in U)R=U;else{let e=[...U.deviceSizes,...U.imageSizes].sort((e,t)=>e-t),t=U.deviceSizes.sort((e,t)=>e-t),r=U.qualities?.sort((e,t)=>e-t);R={...U,allSizes:e,deviceSizes:t,qualities:r}}if(void 0===T)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let D=E.loader||T;delete E.loader,delete E.srcSet;let B="__next_img_default"in D;if(B){if("custom"===R.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=D;D=t=>{let{config:r,...a}=t;return e(a)}}if(N){"fill"===N&&(p=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[N];e&&(g={...g,...e});let r={responsive:"100vw",fill:"100vw"}[N];r&&!t&&(t=r)}let F="",W=o(m),Z=o(h);if((z=e)&&"object"==typeof z&&(n(z)||void 0!==z.src)){let t=n(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(M=t.blurWidth,I=t.blurHeight,y=y||t.blurDataURL,F=t.src,!p)if(W||Z){if(W&&!Z){let e=W/t.width;Z=Math.round(t.height*e)}else if(!W&&Z){let e=Z/t.height;W=Math.round(t.width*e)}}else W=t.width,Z=t.height}let q=!l&&!d&&("lazy"===c||void 0===c);(!(e="string"==typeof e?e:F)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,q=!1),R.unoptimized&&(r=!0),B&&!R.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let H=o(f),G=Object.assign(p?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:k,objectPosition:P}:{},A?{}:{color:"transparent"},g),K=L||"empty"===w?null:"blur"===w?`url("data:image/svg+xml;charset=utf-8,${(0,a.getImageBlurSvg)({widthInt:W,heightInt:Z,blurWidth:M,blurHeight:I,blurDataURL:y||"",objectFit:G.objectFit})}")`:`url("${w}")`,Q=i.includes(G.objectFit)?"fill"===G.objectFit?"100% 100%":"cover":G.objectFit,V=K?{backgroundSize:Q,backgroundPosition:G.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:K}:{},X=function({config:e,src:t,unoptimized:r,width:a,quality:s,sizes:i,loader:n}){if(r)return{src:t,srcSet:void 0,sizes:void 0};let{widths:o,kind:l}=function({deviceSizes:e,allSizes:t},r,a){if(a){let r=/(^|\s)(1?\d?\d)vw/g,s=[];for(let e;e=r.exec(a);)s.push(parseInt(e[2]));if(s.length){let r=.01*Math.min(...s);return{widths:t.filter(t=>t>=e[0]*r),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof r?{widths:e,kind:"w"}:{widths:[...new Set([r,2*r].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,a,i),d=o.length-1;return{sizes:i||"w"!==l?i:"100vw",srcSet:o.map((r,a)=>`${n({config:e,src:t,quality:s,width:r})} ${"w"===l?r:a+1}${l}`).join(", "),src:n({config:e,src:t,quality:s,width:o[d]})}}({config:R,src:e,unoptimized:r,width:W,quality:H,sizes:t,loader:D}),J=q?"lazy":c;return{props:{...E,loading:J,fetchPriority:j,width:W,height:Z,decoding:_,className:u,style:{...G,...V},sizes:X.sizes,srcSet:X.srcSet,src:b||X.src},meta:{unoptimized:r,preload:d||l,placeholder:w,fill:p}}}},98879,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return o}});let a=e.r(71645),s="undefined"==typeof window,i=s?()=>{}:a.useLayoutEffect,n=s?()=>{}:a.useEffect;function o(e){let{headManager:t,reduceComponentsToState:r}=e;function o(){if(t&&t.mountedInstances){let e=a.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(e))}}return s&&(t?.mountedInstances?.add(e.children),o()),i(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),i(()=>(t&&(t._pendingUpdate=o),()=>{t&&(t._pendingUpdate=o)})),n(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return p},defaultHead:function(){return u}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});let i=e.r(55682),n=e.r(90809),o=e.r(43476),l=n._(e.r(71645)),d=i._(e.r(98879)),c=e.r(42732);function u(){return[(0,o.jsx)("meta",{charSet:"utf-8"},"charset"),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function f(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===l.default.Fragment?e.concat(l.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let m=["name","httpEquiv","charSet","itemProp"];function h(e){let t,r,a,s;return e.reduce(f,[]).reverse().concat(u().reverse()).filter((t=new Set,r=new Set,a=new Set,s={},e=>{let i=!0,n=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){n=!0;let r=e.key.slice(e.key.indexOf("$")+1);t.has(r)?i=!1:t.add(r)}switch(e.type){case"title":case"base":r.has(e.type)?i=!1:r.add(e.type);break;case"meta":for(let t=0,r=m.length;t<r;t++){let r=m[t];if(e.props.hasOwnProperty(r))if("charSet"===r)a.has(r)?i=!1:a.add(r);else{let t=e.props[r],a=s[r]||new Set;("name"!==r||!n)&&a.has(t)?i=!1:(a.add(t),s[r]=a)}}}return i})).reverse().map((e,t)=>{let r=e.key||t;return l.default.cloneElement(e,{key:r})})}let p=function({children:e}){let t=(0,l.useContext)(c.HeadManagerContext);return(0,o.jsx)(d.default,{reduceComponentsToState:h,headManager:t,children:e})};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18556,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let a=e.r(55682)._(e.r(71645)),s=e.r(87690),i=a.default.createContext(s.imageConfigDefault)},65856,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouterContext",{enumerable:!0,get:function(){return a}});let a=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,r)=>{"use strict";function a(e,t){let r=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e,0):r}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"findClosestQuality",{enumerable:!0,get:function(){return a}})},1948,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return i}});let a=e.r(70965);function s({config:e,src:t,width:r,quality:s}){if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let i=(0,a.findClosestQuality)(s,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${i}${t.startsWith("/_next/static/media/"),""}`}s.__next_img_default=!0;let i=s},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return s}});let a=e.r(71645);function s(e,t){let r=(0,a.useRef)(null),s=(0,a.useRef)(null);return(0,a.useCallback)(a=>{if(null===a){let e=r.current;e&&(r.current=null,e());let t=s.current;t&&(s.current=null,t())}else e&&(r.current=i(e,a)),t&&(s.current=i(t,a))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},5500,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Image",{enumerable:!0,get:function(){return w}});let a=e.r(55682),s=e.r(90809),i=e.r(43476),n=s._(e.r(71645)),o=a._(e.r(74080)),l=a._(e.r(25633)),d=e.r(8927),c=e.r(87690),u=e.r(18556);e.r(33525);let f=e.r(65856),m=a._(e.r(1948)),h=e.r(18581),p={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function g(e,t,r,a,s,i,n){let o=e?.src;e&&e["data-loaded-src"]!==o&&(e["data-loaded-src"]=o,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&s(!0),r?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let a=!1,s=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>a,isPropagationStopped:()=>s,persist:()=>{},preventDefault:()=>{a=!0,t.preventDefault()},stopPropagation:()=>{s=!0,t.stopPropagation()}})}a?.current&&a.current(e)}}))}function b(e){return n.use?{fetchPriority:e}:{fetchpriority:e}}"undefined"==typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let v=(0,n.forwardRef)(({src:e,srcSet:t,sizes:r,height:a,width:s,decoding:o,className:l,style:d,fetchPriority:c,placeholder:u,loading:f,unoptimized:m,fill:p,onLoadRef:v,onLoadingCompleteRef:x,setBlurComplete:w,setShowAltText:y,sizesInput:j,onLoad:_,onError:N,...k},P)=>{let C=(0,n.useCallback)(e=>{e&&(N&&(e.src=e.src),e.complete&&g(e,u,v,x,w,m,j))},[e,u,v,x,w,N,m,j]),S=(0,h.useMergedRef)(P,C);return(0,i.jsx)("img",{...k,...b(c),loading:f,width:s,height:a,decoding:o,"data-nimg":p?"fill":"1",className:l,style:d,sizes:r,srcSet:t,src:e,ref:S,onLoad:e=>{g(e.currentTarget,u,v,x,w,m,j)},onError:e=>{y(!0),"empty"!==u&&w(!0),N&&N(e)}})});function x({isAppRouter:e,imgAttributes:t}){let r={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...b(t.fetchPriority)};return e&&o.default.preload?(o.default.preload(t.src,r),null):(0,i.jsx)(l.default,{children:(0,i.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...r},"__nimg-"+t.src+t.srcSet+t.sizes)})}let w=(0,n.forwardRef)((e,t)=>{let r=(0,n.useContext)(f.RouterContext),a=(0,n.useContext)(u.ImageConfigContext),s=(0,n.useMemo)(()=>{let e=p||a||c.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t),s=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r,qualities:s,localPatterns:"undefined"==typeof window?a?.localPatterns:e.localPatterns}},[a]),{onLoad:o,onLoadingComplete:l}=e,h=(0,n.useRef)(o);(0,n.useEffect)(()=>{h.current=o},[o]);let g=(0,n.useRef)(l);(0,n.useEffect)(()=>{g.current=l},[l]);let[b,w]=(0,n.useState)(!1),[y,j]=(0,n.useState)(!1),{props:_,meta:N}=(0,d.getImgProps)(e,{defaultLoader:m.default,imgConf:s,blurComplete:b,showAltText:y});return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(v,{..._,unoptimized:N.unoptimized,placeholder:N.placeholder,fill:N.fill,onLoadRef:h,onLoadingCompleteRef:g,setBlurComplete:w,setShowAltText:j,sizesInput:e.sizes,ref:t}),N.preload?(0,i.jsx)(x,{isAppRouter:!r,imgAttributes:_}):null]})});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},94909,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return c},getImageProps:function(){return d}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});let i=e.r(55682),n=e.r(8927),o=e.r(5500),l=i._(e.r(1948));function d(e){let{props:t}=(0,n.getImgProps)(e,{defaultLoader:l.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let c=o.Image},57688,(e,t,r)=>{t.exports=e.r(94909)},75254,e=>{"use strict";var t=e.i(71645);let r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},a=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim();var s={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,t.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:i=2,absoluteStrokeWidth:n,className:o="",children:l,iconNode:d,...c},u)=>(0,t.createElement)("svg",{ref:u,...s,width:r,height:r,stroke:e,strokeWidth:n?24*Number(i)/Number(r):i,className:a("lucide",o),...!l&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(c)&&{"aria-hidden":"true"},...c},[...d.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(l)?l:[l]])),n=(e,s)=>{let n=(0,t.forwardRef)(({className:n,...o},l)=>(0,t.createElement)(i,{ref:l,iconNode:s,className:a(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,n),...o}));return n.displayName=r(e),n};e.s(["default",()=>n],75254)},84443,e=>{"use strict";var t=e.i(43476),r=e.i(97053);let a=r.default.div.withConfig({displayName:"Loader__StyledWrapper",componentId:"sc-ef965c93-0"})`
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
  }`;e.s(["default",0,()=>(0,t.jsx)(a,{children:(0,t.jsxs)("div",{"aria-label":"Orange and tan hamster running in a metal wheel",role:"img",className:"wheel-and-hamster",children:[(0,t.jsx)("div",{className:"wheel"}),(0,t.jsx)("div",{className:"hamster",children:(0,t.jsxs)("div",{className:"hamster__body",children:[(0,t.jsxs)("div",{className:"hamster__head",children:[(0,t.jsx)("div",{className:"hamster__ear"}),(0,t.jsx)("div",{className:"hamster__eye"}),(0,t.jsx)("div",{className:"hamster__nose"})]}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--fr"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--fl"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--br"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--bl"}),(0,t.jsx)("div",{className:"hamster__tail"})]})}),(0,t.jsx)("div",{className:"spoke"})]})})])},31343,e=>{"use strict";let t=(0,e.i(75254).default)("play",[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]]);e.s(["Play",()=>t],31343)},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={assign:function(){return l},searchParamsToUrlQuery:function(){return i},urlQueryToSearchParams:function(){return o}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});function i(e){let t={};for(let[r,a]of e.entries()){let e=t[r];void 0===e?t[r]=a:Array.isArray(e)?e.push(a):t[r]=[e,a]}return t}function n(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function o(e){let t=new URLSearchParams;for(let[r,a]of Object.entries(e))if(Array.isArray(a))for(let e of a)t.append(r,n(e));else t.set(r,n(a));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,a]of r.entries())e.append(t,a)}return e}},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={formatUrl:function(){return o},formatWithValidation:function(){return d},urlObjectKeys:function(){return l}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});let i=e.r(90809)._(e.r(98183)),n=/https?|ftp|gopher|file/;function o(e){let{auth:t,hostname:r}=e,a=e.protocol||"",s=e.pathname||"",o=e.hash||"",l=e.query||"",d=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?d=t+e.host:r&&(d=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(d+=":"+e.port)),l&&"object"==typeof l&&(l=String(i.urlQueryToSearchParams(l)));let c=e.search||l&&`?${l}`||"";return a&&!a.endsWith(":")&&(a+=":"),e.slashes||(!a||n.test(a))&&!1!==d?(d="//"+(d||""),s&&"/"!==s[0]&&(s="/"+s)):d||(d=""),o&&"#"!==o[0]&&(o="#"+o),c&&"?"!==c[0]&&(c="?"+c),s=s.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${a}${d}${s}${c}${o}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function d(e){return o(e)}},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={DecodeError:function(){return b},MiddlewareNotFoundError:function(){return y},MissingStaticPage:function(){return w},NormalizeError:function(){return v},PageNotFoundError:function(){return x},SP:function(){return p},ST:function(){return g},WEB_VITALS:function(){return i},execOnce:function(){return n},getDisplayName:function(){return u},getLocationOrigin:function(){return d},getURL:function(){return c},isAbsoluteUrl:function(){return l},isResSent:function(){return f},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return m},stringifyError:function(){return j}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function n(e){let t,r=!1;return(...a)=>(r||(r=!0,t=e(...a)),t)}let o=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>o.test(e);function d(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function c(){let{href:e}=window.location,t=d();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function m(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let a=await e.getInitialProps(t);if(r&&f(r))return a;if(!a)throw Object.defineProperty(Error(`"${u(e)}.getInitialProps()" should resolve to an object. But found "${a}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return a}let p="undefined"!=typeof performance,g=p&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class b extends Error{}class v extends Error{}class x extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class w extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class y extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function j(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let a=e.r(18967),s=e.r(52817);function i(e){if(!(0,a.isAbsoluteUrl)(e))return!0;try{let t=(0,a.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,s.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return a}});let a=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a={default:function(){return b},useLinkStatus:function(){return x}};for(var s in a)Object.defineProperty(r,s,{enumerable:!0,get:a[s]});let i=e.r(90809),n=e.r(43476),o=i._(e.r(71645)),l=e.r(95057),d=e.r(8372),c=e.r(18581),u=e.r(18967),f=e.r(5550);e.r(33525);let m=e.r(91949),h=e.r(73668),p=e.r(9396);function g(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}function b(t){var r;let a,s,i,[l,b]=(0,o.useOptimistic)(m.IDLE_LINK_STATUS),x=(0,o.useRef)(null),{href:w,as:y,children:j,prefetch:_=null,passHref:N,replace:k,shallow:P,scroll:C,onClick:S,onMouseEnter:E,onTouchStart:O,legacyBehavior:z=!1,onNavigate:R,ref:M,unstable_dynamicOnHover:I,...$}=t;a=j,z&&("string"==typeof a||"number"==typeof a)&&(a=(0,n.jsx)("a",{children:a}));let A=o.default.useContext(d.AppRouterContext),L=!1!==_,T=!1!==_?null===(r=_)||"auto"===r?p.FetchStrategy.PPR:p.FetchStrategy.Full:p.FetchStrategy.PPR,{href:U,as:D}=o.default.useMemo(()=>{let e=g(w);return{href:e,as:y?g(y):e}},[w,y]);if(z){if(a?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});s=o.default.Children.only(a)}let B=z?s&&"object"==typeof s&&s.ref:M,F=o.default.useCallback(e=>(null!==A&&(x.current=(0,m.mountLinkInstance)(e,U,A,T,L,b)),()=>{x.current&&((0,m.unmountLinkForCurrentNavigation)(x.current),x.current=null),(0,m.unmountPrefetchableInstance)(e)}),[L,U,A,T,b]),W={ref:(0,c.useMergedRef)(F,B),onClick(t){z||"function"!=typeof S||S(t),z&&s.props&&"function"==typeof s.props.onClick&&s.props.onClick(t),!A||t.defaultPrevented||function(t,r,a,s,i,n,l){if("undefined"!=typeof window){let d,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){i&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:u}=e.r(99781);o.default.startTransition(()=>{u(a||r,i?"replace":"push",n??!0,s.current)})}}(t,U,D,x,k,C,R)},onMouseEnter(e){z||"function"!=typeof E||E(e),z&&s.props&&"function"==typeof s.props.onMouseEnter&&s.props.onMouseEnter(e),A&&L&&(0,m.onNavigationIntent)(e.currentTarget,!0===I)},onTouchStart:function(e){z||"function"!=typeof O||O(e),z&&s.props&&"function"==typeof s.props.onTouchStart&&s.props.onTouchStart(e),A&&L&&(0,m.onNavigationIntent)(e.currentTarget,!0===I)}};return(0,u.isAbsoluteUrl)(D)?W.href=D:z&&!N&&("a"!==s.type||"href"in s.props)||(W.href=(0,f.addBasePath)(D)),i=z?o.default.cloneElement(s,W):(0,n.jsx)("a",{...$,...W,children:a}),(0,n.jsx)(v.Provider,{value:l,children:i})}e.r(84508);let v=(0,o.createContext)(m.IDLE_LINK_STATUS),x=()=>(0,o.useContext)(v);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},16802,e=>{"use strict";var t=e.i(43476),r=e.i(97053);let a=r.default.div.withConfig({displayName:"NextPage__StyledNextPage",componentId:"sc-115b409a-0"})`
  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    color: transparent;
    text-transform: uppercase;
    border: 0.1vw solid rgb(50, 50, 50);
    box-shadow: 0 0 0.5vw black, 0 0 0.5vw 0.1vw transparent,
      0vw 0 2vw -0.5vw black, 0vw 0 2vw -0.5vw black,
      0 -1vw 1vw -1vw transparent inset;
    padding: 0.4vw 0.55vw;
    width: 8vw;
    height: 2vw;
    border-radius: 0.2vw;
    cursor: pointer;
    text-shadow: 0.05vw 0 0 white;
    font-size: 0.8vw;
    position: relative;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.8);
    letter-spacing: 0.2vw;
    transition: 0.5s;
  }

  /* Disabled mode (no hover effects) */
  .submit.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
    background: rgba(70, 70, 70, 0.4);
  }

  .submit:after,
  .submit:before {
    content: "next";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: transparent;
    font-size: 0.8vw;
    text-transform: uppercase;
    letter-spacing: 5.2vw;
    transition: 0.5s;
  }

  .submit:after {
    text-shadow: 1.8vw 1.8vw 1.2vw white;
  }

  .submit:before {
    text-shadow: 1.8vw -2vw 1.2vw white;
    transition: 0.8s;
  }

  .submit:hover:not(.disabled):after,
  .submit:focus:not(.disabled):after {
    letter-spacing: 0.28vw;
    text-shadow: 0.08vw 0vw 0 white;
  }

  .submit:hover:not(.disabled):before,
  .submit:focus:not(.disabled):before {
    letter-spacing: 0.28vw;
    text-shadow: 0.08vw 0vw 0.08vw white;
  }

  .submit:hover:not(.disabled),
  .submit:focus:not(.disabled) {
    box-shadow: 0 0 2vw black, 0 0 1.2vw 0.1vw black,
      4vw 0 2vw -0.5vw rgb(255, 0, 105), -4vw 0 2vw -0.5vw rgb(255, 0, 105),
      0 -1vw 1vw -1vw rgb(255, 0, 105) inset;
    transform: scale(1.15);
    background: rgba(0, 0, 0, 0.2);
    font-size: 1.25vw;
    letter-spacing: 1.28vw;
    padding: 0.4vw 1vw;
    text-shadow: 0 0 2vw white;
    border-bottom: 0.1vw solid rgb(255, 0, 105);
  }
  @media (max-width: 568px) {
    .submit {
      width: 20vw;
      height: 10vw;
      font-size: 3.5vw;
      padding: 2vw 4vw;
      letter-spacing: 1vw;
      border-radius: 1vw;
    }

    .submit:hover:not(.disabled),
    .submit:focus:not(.disabled) {
      font-size: 4vw;
      letter-spacing: 2vw;
      transform: scale(1.05);
    }
  }
`;e.s(["default",0,({onClick:e,disabled:r})=>(0,t.jsx)(a,{children:(0,t.jsx)("button",{className:`submit ${r?"disabled":""}`,onClick:r?void 0:e,disabled:r,children:"next"})})])},57757,e=>{"use strict";var t=e.i(43476),r=e.i(97053);let a=r.default.div.withConfig({displayName:"PrevPage__StyledPrevPage",componentId:"sc-47cb0df0-0"})`
  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    color: transparent;
    text-transform: uppercase;
    border: 0.1vw solid rgb(50, 50, 50);
    box-shadow: 0 0 0.5vw black, 0 0 0.5vw 0.1vw transparent,
      0vw 0 2vw -0.5vw black, 0vw 0 2vw -0.5vw black,
      0 -1vw 1vw -1vw transparent inset;
    padding: 0.4vw 0.55vw;
    width: 8vw;
    height: 2vw;
    border-radius: 0.2vw;
    cursor: pointer;
    text-shadow: 0.05vw 0 0 white;
    font-size: 0.8vw;
    position: relative;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.8);
    letter-spacing: 0.2vw;
    transition: 0.5s;
  }

  /* Disabled mode (no hover effects) */
  .submit.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
    background: rgba(70, 70, 70, 0.4);
  }

  /* Use attr(data-label) so pseudo content is read from DOM and cannot mismatch */
  .submit::after,
  .submit::before {
    content: attr(data-label);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: transparent;
    font-size: 0.8vw;
    text-transform: uppercase;
    /* reduced letter-spacing so initial render is stable */
    letter-spacing: 5.2vw;
    transition: 0.5s;
  }

  .submit::after {
    text-shadow: 1.8vw 1.8vw 1.2vw white;
  }

  .submit::before {
    text-shadow: 1.8vw -2vw 1.2vw white;
    transition: 0.8s;
  }

  .submit:hover:not(.disabled)::after,
  .submit:focus:not(.disabled)::after {
    letter-spacing: 0.28vw;
    text-shadow: 0.08vw 0vw 0 white;
  }

  .submit:hover:not(.disabled)::before,
  .submit:focus:not(.disabled)::before {
    letter-spacing: 0.28vw;
    text-shadow: 0.08vw 0vw 0.08vw white;
  }

  .submit:hover:not(.disabled),
  .submit:focus:not(.disabled) {
    box-shadow: 0 0 2vw black, 0 0 1.2vw 0.1vw black,
      4vw 0 2vw -0.5vw rgb(255, 0, 105),
      -4vw 0 2vw -0.5vw rgb(255, 0, 105),
      0 -1vw 1vw -1vw rgb(255, 0, 105) inset;
    transform: scale(1.15);
    background: rgba(0, 0, 0, 0.2);
    font-size: 1.25vw;
    letter-spacing: 1.28vw;
    padding: 0.4vw 1vw;
    text-shadow: 0 0 2vw white;
    border-bottom: 0.1vw solid rgb(255, 0, 105);
  }
      @media (max-width: 568px) {
    .submit {
      width: 20vw;
      height: 10vw;
      font-size: 3.5vw;
      padding: 2vw 4vw;
      letter-spacing: 1vw;
      border-radius: 1vw;
    }


    .submit:hover:not(.disabled),
    .submit:focus:not(.disabled) {
      font-size: 4vw;
      letter-spacing: 2vw;
      transform: scale(1.05);
    }
  }
`;e.s(["default",0,({onClick:e,disabled:r=!1})=>(0,t.jsx)(a,{children:(0,t.jsx)("button",{className:`submit ${r?"disabled":""}`,onClick:r?void 0:e,disabled:r,"aria-disabled":r,"data-label":"prev",type:"button",children:"prev"})})])},55672,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(22016),s=e.i(57688),i=e.i(75254);let n=(0,i.default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]),o=(0,i.default)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]),l=(0,i.default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function d({searchQuery:e,setSearchQuery:i,suggestions:d=[],handleSuggestionClick:c,transparent:u=!1}){let[f,m]=(0,r.useState)(!1);return(0,t.jsxs)("nav",{className:`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 transition-all duration-300 ${u?"bg-gradient-to-b from-black/90 to-transparent":"bg-black/90 border-b border-gray-800"}`,children:[(0,t.jsxs)("div",{className:"flex items-center gap-4 md:gap-8",children:[(0,t.jsx)("button",{className:"md:hidden text-white",onClick:()=>m(!f),children:f?(0,t.jsx)(l,{size:24}):(0,t.jsx)(o,{size:24})}),(0,t.jsxs)("div",{className:"hidden md:flex items-center gap-6 text-sm text-gray-300 font-medium",children:[(0,t.jsx)(a.default,{href:"/",className:"text-white font-bold hover:text-gray-200 transition",children:"Home"}),(0,t.jsx)(a.default,{href:"/series",className:"hover:text-gray-200 transition",children:"Series"})]})]}),f&&(0,t.jsxs)("div",{className:"absolute top-full left-0 right-0 bg-black/95 border-b border-gray-800 p-4 flex flex-col gap-4 md:hidden animate-fadeIn",children:[(0,t.jsx)(a.default,{href:"/",className:"text-white font-bold text-lg hover:text-gray-200",onClick:()=>m(!1),children:"Home"}),(0,t.jsx)(a.default,{href:"/series",className:"text-gray-300 font-medium text-lg hover:text-white",onClick:()=>m(!1),children:"Series"})]}),(0,t.jsx)("div",{className:"flex items-center gap-4 text-white",children:(0,t.jsxs)("div",{className:"relative group",children:[(0,t.jsx)(n,{className:"w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors"}),(0,t.jsx)("input",{type:"text",placeholder:"Titles, people, genres",value:e,onChange:e=>{i(e.target.value)},className:"bg-black/60 border border-transparent group-focus-within:border-white/50 text-sm text-white pl-10 pr-4 py-1.5 w-[160px] md:w-[240px] focus:w-[280px] rounded-sm focus:outline-none transition-all duration-300"}),d.length>0&&e.length>=2&&c&&(0,t.jsx)("div",{className:"absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-sm shadow-xl overflow-hidden z-50",children:d.map(e=>(0,t.jsxs)("div",{onClick:()=>c(e),className:"flex items-center gap-3 p-2 hover:bg-zinc-800 cursor-pointer transition-colors",children:[(0,t.jsx)("div",{className:"w-8 h-12 relative flex-shrink-0 bg-zinc-800",children:e.poster||e.fanart?(0,t.jsx)(s.default,{src:e.poster||e.fanart||"/fallback.jpg",alt:e.show_title,fill:!0,className:"object-cover"}):(0,t.jsx)("div",{className:"w-full h-full flex items-center justify-center text-xs text-gray-500",children:"No Img"})}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-sm text-white font-medium truncate",children:e.show_title}),(0,t.jsx)("p",{className:"text-xs text-zinc-400",children:e.year})]})]},e._id))})]})})]})}e.s(["default",()=>d],55672)},31713,e=>{"use strict";var t=e.i(43476),r=e.i(71645),a=e.i(57688),s=e.i(22016),i=e.i(18566),n=e.i(75254);let o=(0,n.default)("clapperboard",[["path",{d:"M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3Z",key:"1tn4o7"}],["path",{d:"m6.2 5.3 3.1 3.9",key:"iuk76l"}],["path",{d:"m12.4 3.4 3.1 4",key:"6hsd6n"}],["path",{d:"M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z",key:"ltgou9"}]]);var l=e.i(84443),d=e.i(16802),c=e.i(57757);let u=(0,n.default)("arrow-left",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]),f=(0,n.default)("arrow-right",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]),m=(0,n.default)("trending-up",[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]]),h=(0,n.default)("star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]]);function p({seriesList:e,searchQuery:s,setSearchQuery:n}){let o=(0,i.useRouter)(),l=(0,r.useRef)(null);return e&&0!==e.length?(0,t.jsxs)("div",{className:"w-full relative py-8 px-0",children:[(0,t.jsx)("div",{className:"flex flex-col md:flex-row md:items-center justify-between px-4 md:px-8 mb-4 gap-6",children:(0,t.jsx)("div",{className:"flex items-center gap-8 text-gray-400 text-sm font-medium",children:(0,t.jsxs)("div",{className:"flex items-center gap-2 text-white text-xl font-bold",children:[(0,t.jsx)(m,{className:"text-white"}),(0,t.jsx)("span",{children:"Trends Now"})]})})}),(0,t.jsxs)("div",{className:"relative group",children:[(0,t.jsx)("button",{onClick:()=>{l.current&&l.current.scrollBy({left:-300,behavior:"smooth"})},className:"absolute left-0 top-0 bottom-0 z-20 bg-black/50 hover:bg-black/80 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-12",children:(0,t.jsx)(u,{size:32})}),(0,t.jsx)("div",{ref:l,className:"flex overflow-x-auto gap-4 px-4 md:px-8 py-8 scrollbar-hide scroll-smooth",children:e.map(e=>(0,t.jsxs)("div",{onClick:()=>o.push(`/series/${e._id}`),className:"flex-shrink-0 w-[200px] md:w-[240px] cursor-pointer group/card transition-transform duration-300 hover:scale-105",children:[(0,t.jsxs)("div",{className:"relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg border border-transparent group-hover/card:border-gray-600",children:[(0,t.jsx)(a.default,{src:e.poster||e.fanart||"/fallback.jpg",alt:e.show_title,fill:!0,className:"object-cover"}),e.rating&&(0,t.jsxs)("div",{className:"absolute top-2 right-2 bg-black/60 text-yellow-400 text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1",children:[(0,t.jsx)(h,{size:10,fill:"currentColor"})," ",e.rating]})]}),(0,t.jsxs)("div",{className:"mt-3",children:[(0,t.jsx)("h3",{className:"text-white font-bold text-lg truncate group-hover/card:text-red-500 transition-colors",children:e.show_title}),(0,t.jsx)("div",{className:"flex items-center gap-3 text-xs text-gray-500 mt-1",children:(0,t.jsx)("span",{children:e.year||"2021"})})]})]},e._id))}),(0,t.jsx)("button",{onClick:()=>{l.current&&l.current.scrollBy({left:300,behavior:"smooth"})},className:"absolute right-0 top-0 bottom-0 z-20 bg-black/50 hover:bg-black/80 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-12",children:(0,t.jsx)(f,{size:32})})]})]}):null}var g=e.i(31343);function b({shows:e}){let[i,n]=(0,r.useState)(0);return((0,r.useEffect)(()=>{if(!e||0===e.length)return;let t=setInterval(()=>{n(t=>(t+1)%e.length)},5e3);return()=>clearInterval(t)},[e]),e&&0!==e.length)?(0,t.jsxs)("div",{className:"relative w-full h-screen overflow-hidden group",children:[e.map((r,n)=>{let o="translate-x-full opacity-0";return n===i?o="translate-x-0 opacity-100 z-10":n===(i-1+e.length)%e.length&&(o="-translate-x-full opacity-0"),(0,t.jsxs)("div",{className:`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${o}`,children:[(0,t.jsxs)("div",{className:"absolute inset-0 w-full h-full",children:[(0,t.jsx)(a.default,{src:r.fanart||r.poster||"/fallback.jpg",alt:r.show_title,fill:!0,className:"object-cover",priority:n===i}),(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/30 to-transparent"}),(0,t.jsx)("div",{className:"absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"})]}),(0,t.jsxs)("div",{className:"relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl space-y-6",children:[(0,t.jsxs)("div",{className:"flex items-center space-x-4 text-sm md:text-base text-gray-300 font-medium",children:[(0,t.jsxs)("span",{className:"text-yellow-400 font-bold flex items-center gap-1",children:["★ ",r.rating||"N/A"]}),(0,t.jsx)("span",{children:r.year}),r.seasons&&(0,t.jsxs)("span",{children:[r.seasons," Season",Number(r.seasons)>1?"s":""]})]}),(0,t.jsx)("div",{className:"animate-slideUp delay-100",children:r.series_logo?(0,t.jsx)("div",{className:"relative w-[300px] md:w-[500px] h-32 md:h-48 mb-4",children:(0,t.jsx)(a.default,{src:r.series_logo,alt:r.show_title,fill:!0,className:"object-contain object-left"})}):(0,t.jsx)("h1",{className:"text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-xl uppercase",children:r.show_title})}),(0,t.jsx)("p",{className:"text-gray-200 text-lg md:text-xl line-clamp-3 max-w-2xl drop-shadow-md",children:r.description}),(0,t.jsx)("div",{className:"flex items-center space-x-4 pt-4",children:(0,t.jsxs)(s.default,{href:`/series/${r._id}`,className:"flex items-center gap-2 px-8 py-3 bg-[#E50914] hover:bg-[#b00710] text-white rounded font-bold text-lg transition-colors",children:[(0,t.jsx)(g.Play,{fill:"currentColor",size:20}),"WATCH"]})})]})]},r._id)}),(0,t.jsx)("div",{className:"absolute bottom-10 right-10 flex gap-2 z-20",children:e.map((e,r)=>(0,t.jsx)("button",{onClick:()=>n(r),className:"relative h-1 w-10 bg-gray-600/50 rounded-full overflow-hidden",children:(0,t.jsx)("div",{className:`absolute inset-y-0 left-0 bg-white transition-all duration-300 ${r===i?"w-full":"w-0"}`})},r))})]}):null}var v=e.i(55672);let x=async()=>{try{let e=await fetch("/api/popular");if(!e.ok)throw Error(`Failed to fetch popular series: ${e.status}`);return await e.json()}catch(e){return console.error("getPopularSeries error:",e),[]}};function w(){let e=(0,i.useRouter)(),[n,u]=(0,r.useState)([]),[f,m]=(0,r.useState)(!1),[h,g]=(0,r.useState)(""),[w,y]=(0,r.useState)(""),[j,_]=(0,r.useState)([]),[N,k]=(0,r.useState)(!1),[P,C]=(0,r.useState)(""),S=(0,r.useRef)(0),E=(0,r.useRef)(null),O=(0,r.useRef)(null),[z,R]=(0,r.useState)(1),[M,I]=(0,r.useState)([]);(0,r.useEffect)(()=>{x().then(e=>{e&&e.length>0&&I(e)})},[]);let $=async e=>{O.current&&O.current.abort(),O.current=new AbortController;let t=O.current.signal;k(!0),C("");try{let r=await fetch(`/api/series?search=${encodeURIComponent(e)}`,{signal:t}),a=await r.json();if(!r.ok)return void _([]);let s=Array.isArray(a.results)?a.results:[];_(s)}catch(e){if(e?.name==="AbortError")return;_([])}finally{k(!1)}},A=async(e="")=>{let t=++S.current;E.current&&E.current.abort(),E.current=new AbortController;let r=E.current.signal;m(!0),g("");try{let a,s,i,n=e?`/api/series?show_title=${encodeURIComponent(e)}`:"/api/shows";if(a=await fetch(n,{signal:r}),s=await a.json(),!a.ok){(s?.error||a.status,t===S.current)&&(u([]),m(!1));return}let o=[];Array.isArray(s)?o=s:Array.isArray(s.results)?o=s.results:s._id&&(o=[{_id:String(s._id),show_title:s.show_title??"",poster:s.poster??"",series_logo:s.series_logo??"",description:s.description??"",seasons:s.seasons??"",year:s.year??""}]),t===S.current&&(i=o,u(i))}catch(e){if(e?.name==="AbortError")return;console.error("fetchShows error:",e),t===S.current&&u([])}finally{t===S.current&&m(!1)}};(0,r.useEffect)(()=>{let e=setTimeout(()=>{A(w),w.length>=2?$(w):_([])},300);return()=>clearTimeout(e)},[w]);let L=(z-1)*18,T=n.slice(L,L+18),U=Math.max(1,Math.ceil(n.length/18));return!f||n.length||M.length?(0,t.jsxs)("div",{className:"relative min-h-screen bg-[#0f0f0f] text-white",children:[(0,t.jsx)(v.default,{searchQuery:w,setSearchQuery:y,suggestions:j,handleSuggestionClick:t=>{_([]),y(""),e.push(`/series/${t._id}`)},transparent:!0}),M.length>0&&(0,t.jsx)(b,{shows:M}),(0,t.jsxs)("div",{className:"relative z-20 pb-20 space-y-8 bg-gradient-to-b from-transparent via-[#0f0f0f] to-[#0f0f0f] -mt-32 pt-32",children:[(0,t.jsx)("div",{className:"px-0",children:(0,t.jsx)(p,{seriesList:M,searchQuery:w,setSearchQuery:y})}),(0,t.jsx)("div",{className:"px-4 md:px-8 mt-10",children:(0,t.jsx)("div",{className:"flex items-center justify-between border-b border-gray-800 pb-2 mb-6",children:(0,t.jsx)("div",{className:"flex items-center gap-4",children:(0,t.jsxs)("h2",{className:"text-xl md:text-2xl font-bold text-white flex items-center gap-2",children:[(0,t.jsx)(o,{className:"text-red-600"}),"Movies & Series"]})})})}),(0,t.jsxs)("div",{className:"px-4 md:px-8 min-h-[400px]",children:[f&&0===n.length?(0,t.jsx)("div",{className:"flex justify-center p-10",children:(0,t.jsx)(l.default,{})}):n.length>0?(0,t.jsx)("div",{id:"shows-grid",className:"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full",children:T.map(e=>(0,t.jsxs)(s.default,{href:`/series/${e._id}`,className:"relative w-full cursor-pointer group transform transition-transform duration-300 hover:scale-105 hover:z-30",children:[(0,t.jsx)("div",{className:"w-full aspect-[2/3] overflow-hidden rounded-md shadow-lg bg-zinc-900/50",children:e.poster?(0,t.jsx)(a.default,{src:e.poster,alt:e.show_title,fill:!0,className:"object-cover transition-opacity duration-300",sizes:"(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"}):e.series_logo?(0,t.jsx)(a.default,{src:e.series_logo,alt:e.show_title,fill:!0,className:"object-contain p-4"}):(0,t.jsx)("div",{className:"w-full h-full flex items-center justify-center",children:(0,t.jsx)("span",{className:"text-zinc-600 text-xs",children:"No image"})})}),(0,t.jsxs)("div",{className:"absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 rounded-md",children:[(0,t.jsx)("h3",{className:"text-white font-bold text-sm leading-tight mb-1 drop-shadow-md",children:e.show_title}),(0,t.jsx)("div",{className:"flex items-center justify-between text-[10px] text-gray-200 font-medium",children:(0,t.jsx)("span",{children:e.year})})]})]},e._id))}):(0,t.jsxs)("div",{className:"text-center text-gray-500 py-20",children:['No results found for "',w,'"']}),n.length>0&&(0,t.jsxs)("div",{className:"mt-12 flex items-center justify-center gap-6 pb-10",children:[(0,t.jsx)(c.default,{onClick:()=>{z>1&&(R(e=>e-1),setTimeout(()=>{document.getElementById("shows-grid")?.scrollIntoView({behavior:"smooth"})},80))},disabled:1===z}),(0,t.jsxs)("div",{className:"text-gray-400 text-sm font-medium",children:[(0,t.jsx)("span",{className:"text-white",children:z})," / ",U]}),(0,t.jsx)(d.default,{onClick:()=>{z<U&&(R(e=>e+1),setTimeout(()=>{document.getElementById("shows-grid")?.scrollIntoView({behavior:"smooth"})},80))},disabled:z>=U})]})]})]})]}):(0,t.jsx)("div",{className:"w-full h-screen bg-[#0f0f0f] flex items-center justify-center",children:(0,t.jsx)(l.default,{})})}e.s(["default",()=>w,"getPopularSeries",0,x],31713)}]);