(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return a}});let n=e.r(71645);function a(e,t){let r=(0,n.useRef)(null),a=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(r.current=i(e,n)),t&&(a.current=i(t,n))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},88143,(e,t,r)=>{"use strict";function n({widthInt:e,heightInt:t,blurWidth:r,blurHeight:n,blurDataURL:a,objectFit:i}){let s=r?40*r:e,o=n?40*n:t,l=s&&o?`viewBox='0 0 ${s} ${o}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${l}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${l?"none":"contain"===i?"xMidYMid":"cover"===i?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${a}'/%3E%3C/svg%3E`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImageBlurSvg",{enumerable:!0,get:function(){return n}})},87690,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={VALID_LOADERS:function(){return i},imageConfigDefault:function(){return s}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=["default","imgix","cloudinary","akamai","custom"],s={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},8927,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImgProps",{enumerable:!0,get:function(){return l}}),e.r(33525);let n=e.r(88143),a=e.r(87690),i=["-moz-initial","fill","none","scale-down",void 0];function s(e){return void 0!==e.default}function o(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function l({src:e,sizes:t,unoptimized:r=!1,priority:l=!1,preload:d=!1,loading:u,className:c,quality:f,width:m,height:h,fill:p=!1,style:g,overrideSrc:b,onLoad:v,onLoadingComplete:w,placeholder:y="empty",blurDataURL:x,fetchPriority:_,decoding:j="async",layout:P,objectFit:k,objectPosition:N,lazyBoundary:C,lazyRoot:E,...O},S){var R;let z,M,T,{imgConf:A,showAltText:I,blurComplete:$,defaultLoader:L}=S,U=A||a.imageConfigDefault;if("allSizes"in U)z=U;else{let e=[...U.deviceSizes,...U.imageSizes].sort((e,t)=>e-t),t=U.deviceSizes.sort((e,t)=>e-t),r=U.qualities?.sort((e,t)=>e-t);z={...U,allSizes:e,deviceSizes:t,qualities:r}}if(void 0===L)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let D=O.loader||L;delete O.loader,delete O.srcSet;let F="__next_img_default"in D;if(F){if("custom"===z.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=D;D=t=>{let{config:r,...n}=t;return e(n)}}if(P){"fill"===P&&(p=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[P];e&&(g={...g,...e});let r={responsive:"100vw",fill:"100vw"}[P];r&&!t&&(t=r)}let B="",W=o(m),q=o(h);if((R=e)&&"object"==typeof R&&(s(R)||void 0!==R.src)){let t=s(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(M=t.blurWidth,T=t.blurHeight,x=x||t.blurDataURL,B=t.src,!p)if(W||q){if(W&&!q){let e=W/t.width;q=Math.round(t.height*e)}else if(!W&&q){let e=q/t.height;W=Math.round(t.width*e)}}else W=t.width,q=t.height}let Z=!l&&!d&&("lazy"===u||void 0===u);(!(e="string"==typeof e?e:B)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,Z=!1),z.unoptimized&&(r=!0),F&&!z.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let G=o(f),K=Object.assign(p?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:k,objectPosition:N}:{},I?{}:{color:"transparent"},g),X=$||"empty"===y?null:"blur"===y?`url("data:image/svg+xml;charset=utf-8,${(0,n.getImageBlurSvg)({widthInt:W,heightInt:q,blurWidth:M,blurHeight:T,blurDataURL:x||"",objectFit:K.objectFit})}")`:`url("${y}")`,H=i.includes(K.objectFit)?"fill"===K.objectFit?"100% 100%":"cover":K.objectFit,Q=X?{backgroundSize:H,backgroundPosition:K.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:X}:{},V=function({config:e,src:t,unoptimized:r,width:n,quality:a,sizes:i,loader:s}){if(r)return{src:t,srcSet:void 0,sizes:void 0};let{widths:o,kind:l}=function({deviceSizes:e,allSizes:t},r,n){if(n){let r=/(^|\s)(1?\d?\d)vw/g,a=[];for(let e;e=r.exec(n);)a.push(parseInt(e[2]));if(a.length){let r=.01*Math.min(...a);return{widths:t.filter(t=>t>=e[0]*r),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof r?{widths:e,kind:"w"}:{widths:[...new Set([r,2*r].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,n,i),d=o.length-1;return{sizes:i||"w"!==l?i:"100vw",srcSet:o.map((r,n)=>`${s({config:e,src:t,quality:a,width:r})} ${"w"===l?r:n+1}${l}`).join(", "),src:s({config:e,src:t,quality:a,width:o[d]})}}({config:z,src:e,unoptimized:r,width:W,quality:G,sizes:t,loader:D}),J=Z?"lazy":u;return{props:{...O,loading:J,fetchPriority:_,width:W,height:q,decoding:j,className:c,style:{...K,...Q},sizes:V.sizes,srcSet:V.srcSet,src:b||V.src},meta:{unoptimized:r,preload:d||l,placeholder:y,fill:p}}}},98879,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return o}});let n=e.r(71645),a="undefined"==typeof window,i=a?()=>{}:n.useLayoutEffect,s=a?()=>{}:n.useEffect;function o(e){let{headManager:t,reduceComponentsToState:r}=e;function o(){if(t&&t.mountedInstances){let e=n.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(e))}}return a&&(t?.mountedInstances?.add(e.children),o()),i(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),i(()=>(t&&(t._pendingUpdate=o),()=>{t&&(t._pendingUpdate=o)})),s(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return p},defaultHead:function(){return c}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=e.r(55682),s=e.r(90809),o=e.r(43476),l=s._(e.r(71645)),d=i._(e.r(98879)),u=e.r(42732);function c(){return[(0,o.jsx)("meta",{charSet:"utf-8"},"charset"),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function f(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===l.default.Fragment?e.concat(l.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let m=["name","httpEquiv","charSet","itemProp"];function h(e){let t,r,n,a;return e.reduce(f,[]).reverse().concat(c().reverse()).filter((t=new Set,r=new Set,n=new Set,a={},e=>{let i=!0,s=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){s=!0;let r=e.key.slice(e.key.indexOf("$")+1);t.has(r)?i=!1:t.add(r)}switch(e.type){case"title":case"base":r.has(e.type)?i=!1:r.add(e.type);break;case"meta":for(let t=0,r=m.length;t<r;t++){let r=m[t];if(e.props.hasOwnProperty(r))if("charSet"===r)n.has(r)?i=!1:n.add(r);else{let t=e.props[r],n=a[r]||new Set;("name"!==r||!s)&&n.has(t)?i=!1:(n.add(t),a[r]=n)}}}return i})).reverse().map((e,t)=>{let r=e.key||t;return l.default.cloneElement(e,{key:r})})}let p=function({children:e}){let t=(0,l.useContext)(u.HeadManagerContext);return(0,o.jsx)(d.default,{reduceComponentsToState:h,headManager:t,children:e})};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18556,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return i}});let n=e.r(55682)._(e.r(71645)),a=e.r(87690),i=n.default.createContext(a.imageConfigDefault)},65856,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouterContext",{enumerable:!0,get:function(){return n}});let n=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,r)=>{"use strict";function n(e,t){let r=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e,0):r}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"findClosestQuality",{enumerable:!0,get:function(){return n}})},1948,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return i}});let n=e.r(70965);function a({config:e,src:t,width:r,quality:a}){if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let i=(0,n.findClosestQuality)(a,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${i}${t.startsWith("/_next/static/media/"),""}`}a.__next_img_default=!0;let i=a},5500,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Image",{enumerable:!0,get:function(){return y}});let n=e.r(55682),a=e.r(90809),i=e.r(43476),s=a._(e.r(71645)),o=n._(e.r(74080)),l=n._(e.r(25633)),d=e.r(8927),u=e.r(87690),c=e.r(18556);e.r(33525);let f=e.r(65856),m=n._(e.r(1948)),h=e.r(18581),p={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function g(e,t,r,n,a,i,s){let o=e?.src;e&&e["data-loaded-src"]!==o&&(e["data-loaded-src"]=o,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&a(!0),r?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let n=!1,a=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>n,isPropagationStopped:()=>a,persist:()=>{},preventDefault:()=>{n=!0,t.preventDefault()},stopPropagation:()=>{a=!0,t.stopPropagation()}})}n?.current&&n.current(e)}}))}function b(e){return s.use?{fetchPriority:e}:{fetchpriority:e}}"undefined"==typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let v=(0,s.forwardRef)(({src:e,srcSet:t,sizes:r,height:n,width:a,decoding:o,className:l,style:d,fetchPriority:u,placeholder:c,loading:f,unoptimized:m,fill:p,onLoadRef:v,onLoadingCompleteRef:w,setBlurComplete:y,setShowAltText:x,sizesInput:_,onLoad:j,onError:P,...k},N)=>{let C=(0,s.useCallback)(e=>{e&&(P&&(e.src=e.src),e.complete&&g(e,c,v,w,y,m,_))},[e,c,v,w,y,P,m,_]),E=(0,h.useMergedRef)(N,C);return(0,i.jsx)("img",{...k,...b(u),loading:f,width:a,height:n,decoding:o,"data-nimg":p?"fill":"1",className:l,style:d,sizes:r,srcSet:t,src:e,ref:E,onLoad:e=>{g(e.currentTarget,c,v,w,y,m,_)},onError:e=>{x(!0),"empty"!==c&&y(!0),P&&P(e)}})});function w({isAppRouter:e,imgAttributes:t}){let r={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...b(t.fetchPriority)};return e&&o.default.preload?(o.default.preload(t.src,r),null):(0,i.jsx)(l.default,{children:(0,i.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...r},"__nimg-"+t.src+t.srcSet+t.sizes)})}let y=(0,s.forwardRef)((e,t)=>{let r=(0,s.useContext)(f.RouterContext),n=(0,s.useContext)(c.ImageConfigContext),a=(0,s.useMemo)(()=>{let e=p||n||u.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t),a=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r,qualities:a,localPatterns:"undefined"==typeof window?n?.localPatterns:e.localPatterns}},[n]),{onLoad:o,onLoadingComplete:l}=e,h=(0,s.useRef)(o);(0,s.useEffect)(()=>{h.current=o},[o]);let g=(0,s.useRef)(l);(0,s.useEffect)(()=>{g.current=l},[l]);let[b,y]=(0,s.useState)(!1),[x,_]=(0,s.useState)(!1),{props:j,meta:P}=(0,d.getImgProps)(e,{defaultLoader:m.default,imgConf:a,blurComplete:b,showAltText:x});return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(v,{...j,unoptimized:P.unoptimized,placeholder:P.placeholder,fill:P.fill,onLoadRef:h,onLoadingCompleteRef:g,setBlurComplete:y,setShowAltText:_,sizesInput:e.sizes,ref:t}),P.preload?(0,i.jsx)(w,{isAppRouter:!r,imgAttributes:j}):null]})});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},94909,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return u},getImageProps:function(){return d}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=e.r(55682),s=e.r(8927),o=e.r(5500),l=i._(e.r(1948));function d(e){let{props:t}=(0,s.getImgProps)(e,{defaultLoader:l.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let u=o.Image},57688,(e,t,r)=>{t.exports=e.r(94909)},84443,e=>{"use strict";var t=e.i(43476),r=e.i(97053);let n=r.default.div.withConfig({displayName:"Loader__StyledWrapper",componentId:"sc-ef965c93-0"})`
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
  }`;e.s(["default",0,()=>(0,t.jsx)(n,{children:(0,t.jsxs)("div",{"aria-label":"Orange and tan hamster running in a metal wheel",role:"img",className:"wheel-and-hamster",children:[(0,t.jsx)("div",{className:"wheel"}),(0,t.jsx)("div",{className:"hamster",children:(0,t.jsxs)("div",{className:"hamster__body",children:[(0,t.jsxs)("div",{className:"hamster__head",children:[(0,t.jsx)("div",{className:"hamster__ear"}),(0,t.jsx)("div",{className:"hamster__eye"}),(0,t.jsx)("div",{className:"hamster__nose"})]}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--fr"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--fl"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--br"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--bl"}),(0,t.jsx)("div",{className:"hamster__tail"})]})}),(0,t.jsx)("div",{className:"spoke"})]})})])},75254,e=>{"use strict";var t=e.i(71645);let r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},n=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim();var a={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let i=(0,t.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:i=2,absoluteStrokeWidth:s,className:o="",children:l,iconNode:d,...u},c)=>(0,t.createElement)("svg",{ref:c,...a,width:r,height:r,stroke:e,strokeWidth:s?24*Number(i)/Number(r):i,className:n("lucide",o),...!l&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(u)&&{"aria-hidden":"true"},...u},[...d.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(l)?l:[l]])),s=(e,a)=>{let s=(0,t.forwardRef)(({className:s,...o},l)=>(0,t.createElement)(i,{ref:l,iconNode:a,className:n(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,s),...o}));return s.displayName=r(e),s};e.s(["default",()=>s],75254)},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return i},urlQueryToSearchParams:function(){return o}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});function i(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function s(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function o(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,s(e));else t.set(r,s(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return o},formatWithValidation:function(){return d},urlObjectKeys:function(){return l}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=e.r(90809)._(e.r(98183)),s=/https?|ftp|gopher|file/;function o(e){let{auth:t,hostname:r}=e,n=e.protocol||"",a=e.pathname||"",o=e.hash||"",l=e.query||"",d=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?d=t+e.host:r&&(d=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(d+=":"+e.port)),l&&"object"==typeof l&&(l=String(i.urlQueryToSearchParams(l)));let u=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||s.test(n))&&!1!==d?(d="//"+(d||""),a&&"/"!==a[0]&&(a="/"+a)):d||(d=""),o&&"#"!==o[0]&&(o="#"+o),u&&"?"!==u[0]&&(u="?"+u),a=a.replace(/[?#]/g,encodeURIComponent),u=u.replace("#","%23"),`${n}${d}${a}${u}${o}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function d(e){return o(e)}},18967,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return b},MiddlewareNotFoundError:function(){return x},MissingStaticPage:function(){return y},NormalizeError:function(){return v},PageNotFoundError:function(){return w},SP:function(){return p},ST:function(){return g},WEB_VITALS:function(){return i},execOnce:function(){return s},getDisplayName:function(){return c},getLocationOrigin:function(){return d},getURL:function(){return u},isAbsoluteUrl:function(){return l},isResSent:function(){return f},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return m},stringifyError:function(){return _}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function s(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let o=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>o.test(e);function d(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function u(){let{href:e}=window.location,t=d();return e.substring(t.length)}function c(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function m(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&f(r))return n;if(!n)throw Object.defineProperty(Error(`"${c(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E394",enumerable:!1,configurable:!0});return n}let p="undefined"!=typeof performance,g=p&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class b extends Error{}class v extends Error{}class w extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class y extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class x extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function _(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let n=e.r(18967),a=e.r(52817);function i(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,a.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return b},useLinkStatus:function(){return w}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=e.r(90809),s=e.r(43476),o=i._(e.r(71645)),l=e.r(95057),d=e.r(8372),u=e.r(18581),c=e.r(18967),f=e.r(5550);e.r(33525);let m=e.r(91949),h=e.r(73668),p=e.r(9396);function g(e){return"string"==typeof e?e:(0,l.formatUrl)(e)}function b(t){var r;let n,a,i,[l,b]=(0,o.useOptimistic)(m.IDLE_LINK_STATUS),w=(0,o.useRef)(null),{href:y,as:x,children:_,prefetch:j=null,passHref:P,replace:k,shallow:N,scroll:C,onClick:E,onMouseEnter:O,onTouchStart:S,legacyBehavior:R=!1,onNavigate:z,ref:M,unstable_dynamicOnHover:T,...A}=t;n=_,R&&("string"==typeof n||"number"==typeof n)&&(n=(0,s.jsx)("a",{children:n}));let I=o.default.useContext(d.AppRouterContext),$=!1!==j,L=!1!==j?null===(r=j)||"auto"===r?p.FetchStrategy.PPR:p.FetchStrategy.Full:p.FetchStrategy.PPR,{href:U,as:D}=o.default.useMemo(()=>{let e=g(y);return{href:e,as:x?g(x):e}},[y,x]);if(R){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});a=o.default.Children.only(n)}let F=R?a&&"object"==typeof a&&a.ref:M,B=o.default.useCallback(e=>(null!==I&&(w.current=(0,m.mountLinkInstance)(e,U,I,L,$,b)),()=>{w.current&&((0,m.unmountLinkForCurrentNavigation)(w.current),w.current=null),(0,m.unmountPrefetchableInstance)(e)}),[$,U,I,L,b]),W={ref:(0,u.useMergedRef)(B,F),onClick(t){R||"function"!=typeof E||E(t),R&&a.props&&"function"==typeof a.props.onClick&&a.props.onClick(t),!I||t.defaultPrevented||function(t,r,n,a,i,s,l){if("undefined"!=typeof window){let d,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,h.isLocalURL)(r)){i&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),l){let e=!1;if(l({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:c}=e.r(99781);o.default.startTransition(()=>{c(n||r,i?"replace":"push",s??!0,a.current)})}}(t,U,D,w,k,C,z)},onMouseEnter(e){R||"function"!=typeof O||O(e),R&&a.props&&"function"==typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),I&&$&&(0,m.onNavigationIntent)(e.currentTarget,!0===T)},onTouchStart:function(e){R||"function"!=typeof S||S(e),R&&a.props&&"function"==typeof a.props.onTouchStart&&a.props.onTouchStart(e),I&&$&&(0,m.onNavigationIntent)(e.currentTarget,!0===T)}};return(0,c.isAbsoluteUrl)(D)?W.href=D:R&&!P&&("a"!==a.type||"href"in a.props)||(W.href=(0,f.addBasePath)(D)),i=R?o.default.cloneElement(a,W):(0,s.jsx)("a",{...A,...W,children:n}),(0,s.jsx)(v.Provider,{value:l,children:i})}e.r(84508);let v=(0,o.createContext)(m.IDLE_LINK_STATUS),w=()=>(0,o.useContext)(v);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},57757,e=>{"use strict";var t=e.i(43476),r=e.i(97053);let n=r.default.div.withConfig({displayName:"PrevPage__StyledPrevPage",componentId:"sc-47cb0df0-0"})`
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
`;e.s(["default",0,({onClick:e,disabled:r=!1})=>(0,t.jsx)(n,{children:(0,t.jsx)("button",{className:`submit ${r?"disabled":""}`,onClick:r?void 0:e,disabled:r,"aria-disabled":r,"data-label":"prev",type:"button",children:"prev"})})])},16802,e=>{"use strict";var t=e.i(43476),r=e.i(97053);let n=r.default.div.withConfig({displayName:"NextPage__StyledNextPage",componentId:"sc-115b409a-0"})`
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
`;e.s(["default",0,({onClick:e,disabled:r})=>(0,t.jsx)(n,{children:(0,t.jsx)("button",{className:`submit ${r?"disabled":""}`,onClick:r?void 0:e,disabled:r,children:"next"})})])},55672,e=>{"use strict";var t=e.i(43476),r=e.i(71645),n=e.i(22016),a=e.i(57688),i=e.i(75254);let s=(0,i.default)("search",[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]]),o=(0,i.default)("menu",[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]]),l=(0,i.default)("x",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);function d({searchQuery:e,setSearchQuery:i,suggestions:d=[],handleSuggestionClick:u,transparent:c=!1}){let[f,m]=(0,r.useState)(!1);return(0,t.jsxs)("nav",{className:`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 transition-all duration-300 ${c?"bg-gradient-to-b from-black/90 to-transparent":"bg-black/90 border-b border-gray-800"}`,children:[(0,t.jsxs)("div",{className:"flex items-center gap-4 md:gap-8",children:[(0,t.jsx)("button",{className:"md:hidden text-white",onClick:()=>m(!f),children:f?(0,t.jsx)(l,{size:24}):(0,t.jsx)(o,{size:24})}),(0,t.jsxs)("div",{className:"hidden md:flex items-center gap-6 text-sm text-gray-300 font-medium",children:[(0,t.jsx)(n.default,{href:"/",className:"text-white font-bold hover:text-gray-200 transition",children:"Home"}),(0,t.jsx)(n.default,{href:"/series",className:"hover:text-gray-200 transition",children:"Series"})]})]}),f&&(0,t.jsxs)("div",{className:"absolute top-full left-0 right-0 bg-black/95 border-b border-gray-800 p-4 flex flex-col gap-4 md:hidden animate-fadeIn",children:[(0,t.jsx)(n.default,{href:"/",className:"text-white font-bold text-lg hover:text-gray-200",onClick:()=>m(!1),children:"Home"}),(0,t.jsx)(n.default,{href:"/series",className:"text-gray-300 font-medium text-lg hover:text-white",onClick:()=>m(!1),children:"Series"})]}),(0,t.jsx)("div",{className:"flex items-center gap-4 text-white",children:(0,t.jsxs)("div",{className:"relative group",children:[(0,t.jsx)(s,{className:"w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors"}),(0,t.jsx)("input",{type:"text",placeholder:"Titles, people, genres",value:e,onChange:e=>{i(e.target.value)},className:"bg-black/60 border border-transparent group-focus-within:border-white/50 text-sm text-white pl-10 pr-4 py-1.5 w-[160px] md:w-[240px] focus:w-[280px] rounded-sm focus:outline-none transition-all duration-300"}),d.length>0&&e.length>=2&&u&&(0,t.jsx)("div",{className:"absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-sm shadow-xl overflow-hidden z-50",children:d.map(e=>(0,t.jsxs)("div",{onClick:()=>u(e),className:"flex items-center gap-3 p-2 hover:bg-zinc-800 cursor-pointer transition-colors",children:[(0,t.jsx)("div",{className:"w-8 h-12 relative flex-shrink-0 bg-zinc-800",children:e.poster||e.fanart?(0,t.jsx)(a.default,{src:e.poster||e.fanart||"/fallback.jpg",alt:e.show_title,fill:!0,className:"object-cover"}):(0,t.jsx)("div",{className:"w-full h-full flex items-center justify-center text-xs text-gray-500",children:"No Img"})}),(0,t.jsxs)("div",{className:"min-w-0",children:[(0,t.jsx)("p",{className:"text-sm text-white font-medium truncate",children:e.show_title}),(0,t.jsx)("p",{className:"text-xs text-zinc-400",children:e.year})]})]},e._id))})]})})]})}e.s(["default",()=>d],55672)},9782,e=>{"use strict";var t=e.i(43476),r=e.i(71645),n=e.i(22016),a=e.i(57688),i=e.i(18566),s=e.i(84443),o=e.i(57757),l=e.i(16802),d=e.i(55672);function u(){let e=(0,i.useRouter)(),[u,c]=(0,r.useState)([]),[f,m]=(0,r.useState)(!1),[h,p]=(0,r.useState)(""),[g,b]=(0,r.useState)([]),v=(0,r.useRef)(0),w=(0,r.useRef)(null),y=(0,r.useRef)(null),[x,_]=(0,r.useState)(1),j=async e=>{y.current&&y.current.abort(),y.current=new AbortController;let t=y.current.signal;try{let r=await fetch(`/api/series?search=${encodeURIComponent(e)}`,{signal:t}),n=await r.json();if(!r.ok)return void b([]);let a=Array.isArray(n.results)?n.results:[];b(a)}catch(e){if(e?.name==="AbortError")return;b([])}},P=async(e="")=>{let t=++v.current;w.current&&w.current.abort(),w.current=new AbortController;let r=w.current.signal;m(!0);try{let n,a,i,s=e?`/api/series?show_title=${encodeURIComponent(e)}`:"/api/shows";if(n=await fetch(s,{signal:r}),a=await n.json(),!n.ok){t===v.current&&(c([]),m(!1));return}let o=[];Array.isArray(a)?o=a:Array.isArray(a.results)?o=a.results:a._id&&(o=[{_id:String(a._id),show_title:a.show_title??"",poster:a.poster??"",series_logo:a.series_logo??"",description:a.description??"",seasons:a.seasons??"",year:a.year??""}]),t===v.current&&(i=o,c(i))}catch(e){if(e?.name==="AbortError")return;t===v.current&&c([])}finally{t===v.current&&m(!1)}};(0,r.useEffect)(()=>{let e=setTimeout(()=>{P(h),h.length>=2?j(h):b([])},300);return()=>clearTimeout(e)},[h]);let k=(x-1)*24,N=u.slice(k,k+24),C=Math.max(1,Math.ceil(u.length/24));return(0,t.jsxs)("div",{className:"min-h-screen bg-[#0f0f0f] text-white",children:[(0,t.jsx)(d.default,{searchQuery:h,setSearchQuery:p,suggestions:g,handleSuggestionClick:t=>{b([]),p(""),e.push(`/series/${t._id}`)},transparent:!1}),(0,t.jsxs)("div",{className:"pt-24 px-4 md:px-8 pb-20 max-w-[1800px] mx-auto",children:[(0,t.jsx)("h1",{className:"text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-4",children:"All Series"}),f&&0===u.length?(0,t.jsx)("div",{className:"flex justify-center py-20",children:(0,t.jsx)(s.default,{})}):u.length>0?(0,t.jsx)("div",{className:"grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6",children:N.map(e=>(0,t.jsxs)(n.default,{href:`/series/${e._id}`,className:"relative w-full cursor-pointer group hover:scale-105 transition-transform duration-300",children:[(0,t.jsx)("div",{className:"w-full aspect-[2/3] overflow-hidden rounded-md shadow-lg bg-zinc-900 border border-transparent group-hover:border-zinc-700",children:e.poster?(0,t.jsx)(a.default,{src:e.poster,alt:e.show_title,fill:!0,className:"object-cover",sizes:"(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"}):(0,t.jsx)("div",{className:"w-full h-full flex items-center justify-center text-zinc-600 text-xs",children:"No image"})}),(0,t.jsxs)("div",{className:"mt-2",children:[(0,t.jsx)("h3",{className:"text-sm font-bold text-gray-200 truncate group-hover:text-white",children:e.show_title}),(0,t.jsx)("p",{className:"text-xs text-gray-500",children:e.year})]})]},e._id))}):(0,t.jsx)("div",{className:"text-center text-gray-500 py-20",children:"No series found."}),u.length>0&&(0,t.jsxs)("div",{className:"mt-12 flex items-center justify-center gap-6",children:[(0,t.jsx)(o.default,{onClick:()=>{x>1&&(_(e=>e-1),setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"})},80))},disabled:1===x}),(0,t.jsxs)("div",{className:"text-gray-400 text-sm font-medium",children:[(0,t.jsx)("span",{className:"text-white",children:x})," / ",C]}),(0,t.jsx)(l.default,{onClick:()=>{x<C&&(_(e=>e+1),setTimeout(()=>{window.scrollTo({top:0,behavior:"smooth"})},80))},disabled:x>=C})]})]})]})}e.s(["default",()=>u])}]);