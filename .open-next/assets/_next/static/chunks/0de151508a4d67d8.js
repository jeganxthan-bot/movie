(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,33525,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"warnOnce",{enumerable:!0,get:function(){return s}});let s=e=>{}},88143,(e,t,r)=>{"use strict";function s({widthInt:e,heightInt:t,blurWidth:r,blurHeight:s,blurDataURL:i,objectFit:n}){let a=r?40*r:e,o=s?40*s:t,l=a&&o?`viewBox='0 0 ${a} ${o}'`:"";return`%3Csvg xmlns='http://www.w3.org/2000/svg' ${l}%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='${l?"none":"contain"===n?"xMidYMid":"cover"===n?"xMidYMid slice":"none"}' style='filter: url(%23b);' href='${i}'/%3E%3C/svg%3E`}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImageBlurSvg",{enumerable:!0,get:function(){return s}})},87690,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={VALID_LOADERS:function(){return n},imageConfigDefault:function(){return a}};for(var i in s)Object.defineProperty(r,i,{enumerable:!0,get:s[i]});let n=["default","imgix","cloudinary","akamai","custom"],a={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:14400,formats:["image/webp"],maximumRedirects:3,dangerouslyAllowLocalIP:!1,dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:[75],unoptimized:!1}},8927,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"getImgProps",{enumerable:!0,get:function(){return l}}),e.r(33525);let s=e.r(88143),i=e.r(87690),n=["-moz-initial","fill","none","scale-down",void 0];function a(e){return void 0!==e.default}function o(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function l({src:e,sizes:t,unoptimized:r=!1,priority:l=!1,preload:d=!1,loading:c,className:f,quality:u,width:m,height:h,fill:p=!1,style:g,overrideSrc:b,onLoad:x,onLoadingComplete:v,placeholder:_="empty",blurDataURL:y,fetchPriority:j,decoding:w="async",layout:S,objectFit:k,objectPosition:N,lazyBoundary:C,lazyRoot:R,...O},z){var P;let E,F,I,{imgConf:A,showAltText:M,blurComplete:L,defaultLoader:$}=z,T=A||i.imageConfigDefault;if("allSizes"in T)E=T;else{let e=[...T.deviceSizes,...T.imageSizes].sort((e,t)=>e-t),t=T.deviceSizes.sort((e,t)=>e-t),r=T.qualities?.sort((e,t)=>e-t);E={...T,allSizes:e,deviceSizes:t,qualities:r}}if(void 0===$)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let B=O.loader||$;delete O.loader,delete O.srcSet;let D="__next_img_default"in B;if(D){if("custom"===E.loader)throw Object.defineProperty(Error(`Image with src "${e}" is missing "loader" prop.
Read more: https://nextjs.org/docs/messages/next-image-missing-loader`),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=B;B=t=>{let{config:r,...s}=t;return e(s)}}if(S){"fill"===S&&(p=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[S];e&&(g={...g,...e});let r={responsive:"100vw",fill:"100vw"}[S];r&&!t&&(t=r)}let U="",q=o(m),W=o(h);if((P=e)&&"object"==typeof P&&(a(P)||void 0!==P.src)){let t=a(e)?e.default:e;if(!t.src)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!t.height||!t.width)throw Object.defineProperty(Error(`An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ${JSON.stringify(t)}`),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(F=t.blurWidth,I=t.blurHeight,y=y||t.blurDataURL,U=t.src,!p)if(q||W){if(q&&!W){let e=q/t.width;W=Math.round(t.height*e)}else if(!q&&W){let e=W/t.height;q=Math.round(t.width*e)}}else q=t.width,W=t.height}let Z=!l&&!d&&("lazy"===c||void 0===c);(!(e="string"==typeof e?e:U)||e.startsWith("data:")||e.startsWith("blob:"))&&(r=!0,Z=!1),E.unoptimized&&(r=!0),D&&!E.dangerouslyAllowSVG&&e.split("?",1)[0].endsWith(".svg")&&(r=!0);let G=o(u),H=Object.assign(p?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:k,objectPosition:N}:{},M?{}:{color:"transparent"},g),V=L||"empty"===_?null:"blur"===_?`url("data:image/svg+xml;charset=utf-8,${(0,s.getImageBlurSvg)({widthInt:q,heightInt:W,blurWidth:F,blurHeight:I,blurDataURL:y||"",objectFit:H.objectFit})}")`:`url("${_}")`,X=n.includes(H.objectFit)?"fill"===H.objectFit?"100% 100%":"cover":H.objectFit,Y=V?{backgroundSize:X,backgroundPosition:H.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:V}:{},J=function({config:e,src:t,unoptimized:r,width:s,quality:i,sizes:n,loader:a}){if(r)return{src:t,srcSet:void 0,sizes:void 0};let{widths:o,kind:l}=function({deviceSizes:e,allSizes:t},r,s){if(s){let r=/(^|\s)(1?\d?\d)vw/g,i=[];for(let e;e=r.exec(s);)i.push(parseInt(e[2]));if(i.length){let r=.01*Math.min(...i);return{widths:t.filter(t=>t>=e[0]*r),kind:"w"}}return{widths:t,kind:"w"}}return"number"!=typeof r?{widths:e,kind:"w"}:{widths:[...new Set([r,2*r].map(e=>t.find(t=>t>=e)||t[t.length-1]))],kind:"x"}}(e,s,n),d=o.length-1;return{sizes:n||"w"!==l?n:"100vw",srcSet:o.map((r,s)=>`${a({config:e,src:t,quality:i,width:r})} ${"w"===l?r:s+1}${l}`).join(", "),src:a({config:e,src:t,quality:i,width:o[d]})}}({config:E,src:e,unoptimized:r,width:q,quality:G,sizes:t,loader:B}),K=Z?"lazy":c;return{props:{...O,loading:K,fetchPriority:j,width:q,height:W,decoding:w,className:f,style:{...H,...Y},sizes:J.sizes,srcSet:J.srcSet,src:b||J.src},meta:{unoptimized:r,preload:d||l,placeholder:_,fill:p}}}},98879,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return o}});let s=e.r(71645),i="undefined"==typeof window,n=i?()=>{}:s.useLayoutEffect,a=i?()=>{}:s.useEffect;function o(e){let{headManager:t,reduceComponentsToState:r}=e;function o(){if(t&&t.mountedInstances){let e=s.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(e))}}return i&&(t?.mountedInstances?.add(e.children),o()),n(()=>(t?.mountedInstances?.add(e.children),()=>{t?.mountedInstances?.delete(e.children)})),n(()=>(t&&(t._pendingUpdate=o),()=>{t&&(t._pendingUpdate=o)})),a(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},25633,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={default:function(){return p},defaultHead:function(){return f}};for(var i in s)Object.defineProperty(r,i,{enumerable:!0,get:s[i]});let n=e.r(55682),a=e.r(90809),o=e.r(43476),l=a._(e.r(71645)),d=n._(e.r(98879)),c=e.r(42732);function f(){return[(0,o.jsx)("meta",{charSet:"utf-8"},"charset"),(0,o.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")]}function u(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===l.default.Fragment?e.concat(l.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}e.r(33525);let m=["name","httpEquiv","charSet","itemProp"];function h(e){let t,r,s,i;return e.reduce(u,[]).reverse().concat(f().reverse()).filter((t=new Set,r=new Set,s=new Set,i={},e=>{let n=!0,a=!1;if(e.key&&"number"!=typeof e.key&&e.key.indexOf("$")>0){a=!0;let r=e.key.slice(e.key.indexOf("$")+1);t.has(r)?n=!1:t.add(r)}switch(e.type){case"title":case"base":r.has(e.type)?n=!1:r.add(e.type);break;case"meta":for(let t=0,r=m.length;t<r;t++){let r=m[t];if(e.props.hasOwnProperty(r))if("charSet"===r)s.has(r)?n=!1:s.add(r);else{let t=e.props[r],s=i[r]||new Set;("name"!==r||!a)&&s.has(t)?n=!1:(s.add(t),i[r]=s)}}}return n})).reverse().map((e,t)=>{let r=e.key||t;return l.default.cloneElement(e,{key:r})})}let p=function({children:e}){let t=(0,l.useContext)(c.HeadManagerContext);return(0,o.jsx)(d.default,{reduceComponentsToState:h,headManager:t,children:e})};("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18556,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"ImageConfigContext",{enumerable:!0,get:function(){return n}});let s=e.r(55682)._(e.r(71645)),i=e.r(87690),n=s.default.createContext(i.imageConfigDefault)},65856,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"RouterContext",{enumerable:!0,get:function(){return s}});let s=e.r(55682)._(e.r(71645)).default.createContext(null)},70965,(e,t,r)=>{"use strict";function s(e,t){let r=e||75;return t?.qualities?.length?t.qualities.reduce((e,t)=>Math.abs(t-r)<Math.abs(e-r)?t:e,0):r}Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"findClosestQuality",{enumerable:!0,get:function(){return s}})},1948,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"default",{enumerable:!0,get:function(){return n}});let s=e.r(70965);function i({config:e,src:t,width:r,quality:i}){if(t.startsWith("/")&&t.includes("?")&&e.localPatterns?.length===1&&"**"===e.localPatterns[0].pathname&&""===e.localPatterns[0].search)throw Object.defineProperty(Error(`Image with src "${t}" is using a query string which is not configured in images.localPatterns.
Read more: https://nextjs.org/docs/messages/next-image-unconfigured-localpatterns`),"__NEXT_ERROR_CODE",{value:"E871",enumerable:!1,configurable:!0});let n=(0,s.findClosestQuality)(i,e);return`${e.path}?url=${encodeURIComponent(t)}&w=${r}&q=${n}${t.startsWith("/_next/static/media/"),""}`}i.__next_img_default=!0;let n=i},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return i}});let s=e.r(71645);function i(e,t){let r=(0,s.useRef)(null),i=(0,s.useRef)(null);return(0,s.useCallback)(s=>{if(null===s){let e=r.current;e&&(r.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(r.current=n(e,s)),t&&(i.current=n(t,s))},[e,t])}function n(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},5500,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"Image",{enumerable:!0,get:function(){return _}});let s=e.r(55682),i=e.r(90809),n=e.r(43476),a=i._(e.r(71645)),o=s._(e.r(74080)),l=s._(e.r(25633)),d=e.r(8927),c=e.r(87690),f=e.r(18556);e.r(33525);let u=e.r(65856),m=s._(e.r(1948)),h=e.r(18581),p={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function g(e,t,r,s,i,n,a){let o=e?.src;e&&e["data-loaded-src"]!==o&&(e["data-loaded-src"]=o,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&i(!0),r?.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let s=!1,i=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>s,isPropagationStopped:()=>i,persist:()=>{},preventDefault:()=>{s=!0,t.preventDefault()},stopPropagation:()=>{i=!0,t.stopPropagation()}})}s?.current&&s.current(e)}}))}function b(e){return a.use?{fetchPriority:e}:{fetchpriority:e}}"undefined"==typeof window&&(globalThis.__NEXT_IMAGE_IMPORTED=!0);let x=(0,a.forwardRef)(({src:e,srcSet:t,sizes:r,height:s,width:i,decoding:o,className:l,style:d,fetchPriority:c,placeholder:f,loading:u,unoptimized:m,fill:p,onLoadRef:x,onLoadingCompleteRef:v,setBlurComplete:_,setShowAltText:y,sizesInput:j,onLoad:w,onError:S,...k},N)=>{let C=(0,a.useCallback)(e=>{e&&(S&&(e.src=e.src),e.complete&&g(e,f,x,v,_,m,j))},[e,f,x,v,_,S,m,j]),R=(0,h.useMergedRef)(N,C);return(0,n.jsx)("img",{...k,...b(c),loading:u,width:i,height:s,decoding:o,"data-nimg":p?"fill":"1",className:l,style:d,sizes:r,srcSet:t,src:e,ref:R,onLoad:e=>{g(e.currentTarget,f,x,v,_,m,j)},onError:e=>{y(!0),"empty"!==f&&_(!0),S&&S(e)}})});function v({isAppRouter:e,imgAttributes:t}){let r={as:"image",imageSrcSet:t.srcSet,imageSizes:t.sizes,crossOrigin:t.crossOrigin,referrerPolicy:t.referrerPolicy,...b(t.fetchPriority)};return e&&o.default.preload?(o.default.preload(t.src,r),null):(0,n.jsx)(l.default,{children:(0,n.jsx)("link",{rel:"preload",href:t.srcSet?void 0:t.src,...r},"__nimg-"+t.src+t.srcSet+t.sizes)})}let _=(0,a.forwardRef)((e,t)=>{let r=(0,a.useContext)(u.RouterContext),s=(0,a.useContext)(f.ImageConfigContext),i=(0,a.useMemo)(()=>{let e=p||s||c.imageConfigDefault,t=[...e.deviceSizes,...e.imageSizes].sort((e,t)=>e-t),r=e.deviceSizes.sort((e,t)=>e-t),i=e.qualities?.sort((e,t)=>e-t);return{...e,allSizes:t,deviceSizes:r,qualities:i,localPatterns:"undefined"==typeof window?s?.localPatterns:e.localPatterns}},[s]),{onLoad:o,onLoadingComplete:l}=e,h=(0,a.useRef)(o);(0,a.useEffect)(()=>{h.current=o},[o]);let g=(0,a.useRef)(l);(0,a.useEffect)(()=>{g.current=l},[l]);let[b,_]=(0,a.useState)(!1),[y,j]=(0,a.useState)(!1),{props:w,meta:S}=(0,d.getImgProps)(e,{defaultLoader:m.default,imgConf:i,blurComplete:b,showAltText:y});return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(x,{...w,unoptimized:S.unoptimized,placeholder:S.placeholder,fill:S.fill,onLoadRef:h,onLoadingCompleteRef:g,setBlurComplete:_,setShowAltText:j,sizesInput:e.sizes,ref:t}),S.preload?(0,n.jsx)(v,{isAppRouter:!r,imgAttributes:w}):null]})});("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},94909,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s={default:function(){return c},getImageProps:function(){return d}};for(var i in s)Object.defineProperty(r,i,{enumerable:!0,get:s[i]});let n=e.r(55682),a=e.r(8927),o=e.r(5500),l=n._(e.r(1948));function d(e){let{props:t}=(0,a.getImgProps)(e,{defaultLoader:l.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[32,48,64,96,128,256,384],qualities:[75],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let c=o.Image},57688,(e,t,r)=>{t.exports=e.r(94909)},84443,e=>{"use strict";var t=e.i(43476),r=e.i(97053);let s=r.default.div.withConfig({displayName:"Loader__StyledWrapper",componentId:"sc-ef965c93-0"})`
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
  }`;e.s(["default",0,()=>(0,t.jsx)(s,{children:(0,t.jsxs)("div",{"aria-label":"Orange and tan hamster running in a metal wheel",role:"img",className:"wheel-and-hamster",children:[(0,t.jsx)("div",{className:"wheel"}),(0,t.jsx)("div",{className:"hamster",children:(0,t.jsxs)("div",{className:"hamster__body",children:[(0,t.jsxs)("div",{className:"hamster__head",children:[(0,t.jsx)("div",{className:"hamster__ear"}),(0,t.jsx)("div",{className:"hamster__eye"}),(0,t.jsx)("div",{className:"hamster__nose"})]}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--fr"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--fl"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--br"}),(0,t.jsx)("div",{className:"hamster__limb hamster__limb--bl"}),(0,t.jsx)("div",{className:"hamster__tail"})]})}),(0,t.jsx)("div",{className:"spoke"})]})})])},75254,e=>{"use strict";var t=e.i(71645);let r=e=>{let t=e.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,r)=>r?r.toUpperCase():t.toLowerCase());return t.charAt(0).toUpperCase()+t.slice(1)},s=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim();var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let n=(0,t.forwardRef)(({color:e="currentColor",size:r=24,strokeWidth:n=2,absoluteStrokeWidth:a,className:o="",children:l,iconNode:d,...c},f)=>(0,t.createElement)("svg",{ref:f,...i,width:r,height:r,stroke:e,strokeWidth:a?24*Number(n)/Number(r):n,className:s("lucide",o),...!l&&!(e=>{for(let t in e)if(t.startsWith("aria-")||"role"===t||"title"===t)return!0})(c)&&{"aria-hidden":"true"},...c},[...d.map(([e,r])=>(0,t.createElement)(e,r)),...Array.isArray(l)?l:[l]])),a=(e,i)=>{let a=(0,t.forwardRef)(({className:a,...o},l)=>(0,t.createElement)(n,{ref:l,iconNode:i,className:s(`lucide-${r(e).replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase()}`,`lucide-${e}`,a),...o}));return a.displayName=r(e),a};e.s(["default",()=>a],75254)},15209,e=>{"use strict";let t=(0,e.i(75254).default)("move-left",[["path",{d:"M6 8L2 12L6 16",key:"kyvwex"}],["path",{d:"M2 12H22",key:"1m8cig"}]]);e.s(["MoveLeft",()=>t],15209)},16015,(e,t,r)=>{},98547,(e,t,r)=>{var s=e.i(47167);e.r(16015);var i=e.r(71645),n=i&&"object"==typeof i&&"default"in i?i:{default:i},a=void 0!==s.default&&s.default.env&&!0,o=function(e){return"[object String]"===Object.prototype.toString.call(e)},l=function(){function e(e){var t=void 0===e?{}:e,r=t.name,s=void 0===r?"stylesheet":r,i=t.optimizeForSpeed,n=void 0===i?a:i;d(o(s),"`name` must be a string"),this._name=s,this._deletedRulePlaceholder="#"+s+"-deleted-rule____{}",d("boolean"==typeof n,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=n,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var l="undefined"!=typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=l?l.getAttribute("content"):null}var t,r=e.prototype;return r.setOptimizeForSpeed=function(e){d("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),d(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},r.isOptimizeForSpeed=function(){return this._optimizeForSpeed},r.inject=function(){var e=this;if(d(!this._injected,"sheet already injected"),this._injected=!0,"undefined"!=typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(a||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"==typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},r.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},r.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},r.insertRule=function(e,t){if(d(o(e),"`insertRule` accepts only strings"),"undefined"==typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var r=this.getSheet();"number"!=typeof t&&(t=r.cssRules.length);try{r.insertRule(e,t)}catch(t){return a||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var s=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,s))}return this._rulesCount++},r.replaceRule=function(e,t){if(this._optimizeForSpeed||"undefined"==typeof window){var r="undefined"!=typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(s){a||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}}else{var s=this._tags[e];d(s,"old rule at index `"+e+"` not found"),s.textContent=t}return e},r.deleteRule=function(e){if("undefined"==typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];d(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},r.flush=function(){this._injected=!1,this._rulesCount=0,"undefined"!=typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},r.cssRules=function(){var e=this;return"undefined"==typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,r){return r?t=t.concat(Array.prototype.map.call(e.getSheetForTag(r).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},r.makeStyleTag=function(e,t,r){t&&d(o(t),"makeStyleTag accepts only strings as second parameter");var s=document.createElement("style");this._nonce&&s.setAttribute("nonce",this._nonce),s.type="text/css",s.setAttribute("data-"+e,""),t&&s.appendChild(document.createTextNode(t));var i=document.head||document.getElementsByTagName("head")[0];return r?i.insertBefore(s,r):i.appendChild(s),s},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var r=0;r<t.length;r++){var s=t[r];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(e,s.key,s)}}(e.prototype,t),e}();function d(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var c=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0},f={};function u(e,t){if(!t)return"jsx-"+e;var r=String(t),s=e+r;return f[s]||(f[s]="jsx-"+c(e+"-"+r)),f[s]}function m(e,t){"undefined"==typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var r=e+t;return f[r]||(f[r]=t.replace(/__jsx-style-dynamic-selector/g,e)),f[r]}var h=function(){function e(e){var t=void 0===e?{}:e,r=t.styleSheet,s=void 0===r?null:r,i=t.optimizeForSpeed,n=void 0!==i&&i;this._sheet=s||new l({name:"styled-jsx",optimizeForSpeed:n}),this._sheet.inject(),s&&"boolean"==typeof n&&(this._sheet.setOptimizeForSpeed(n),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"undefined"==typeof window||this._fromServer||(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var r=this.getIdAndRules(e),s=r.styleId,i=r.rules;if(s in this._instancesCounts){this._instancesCounts[s]+=1;return}var n=i.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[s]=n,this._instancesCounts[s]=1},t.remove=function(e){var t=this,r=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(r in this._instancesCounts,"styleId: `"+r+"` not found"),this._instancesCounts[r]-=1,this._instancesCounts[r]<1){var s=this._fromServer&&this._fromServer[r];s?(s.parentNode.removeChild(s),delete this._fromServer[r]):(this._indices[r].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[r]),delete this._instancesCounts[r]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],r=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return r[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,r;return t=this.cssRules(),void 0===(r=e)&&(r={}),t.map(function(e){var t=e[0],s=e[1];return n.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:r.nonce?r.nonce:void 0,dangerouslySetInnerHTML:{__html:s}})})},t.getIdAndRules=function(e){var t=e.children,r=e.dynamic,s=e.id;if(r){var i=u(s,r);return{styleId:i,rules:Array.isArray(t)?t.map(function(e){return m(i,e)}):[m(i,t)]}}return{styleId:u(s),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),p=i.createContext(null);function g(){return new h}function b(){return i.useContext(p)}p.displayName="StyleSheetContext";var x=n.default.useInsertionEffect||n.default.useLayoutEffect,v="undefined"!=typeof window?g():void 0;function _(e){var t=v||b();return t&&("undefined"==typeof window?t.add(e):x(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}_.dynamic=function(e){return e.map(function(e){return u(e[0],e[1])}).join(" ")},r.StyleRegistry=function(e){var t=e.registry,r=e.children,s=i.useContext(p),a=i.useState(function(){return s||t||g()})[0];return n.default.createElement(p.Provider,{value:a},r)},r.createStyleRegistry=g,r.style=_,r.useStyleRegistry=b},37902,(e,t,r)=>{t.exports=e.r(98547).style},4777,e=>{"use strict";var t=e.i(43476),r=e.i(37902),s=e.i(71645),i=e.i(57688),n=e.i(18566),a=e.i(84443),o=e.i(97053);let l=o.default.div.withConfig({displayName:"ImageLoader__StyledWrapper",componentId:"sc-1d3e5cf6-0"})`
  .loader {
    width: 3rem;
    height: 3rem;
    clear: both;
    margin: 1rem auto;
    border: 2px #fff solid;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
  }

  .loader:after,
  .loader:before {
    content: "";
    border-radius: 50%;
    position: absolute;
    width: inherit;
    height: inherit;
    animation: spVortex 2s infinite linear;
  }

  .loader:before {
    border-top: 0.5rem #fff solid;
    top: -0.1875rem;
    left: calc(-50% - 0.1875rem);
    transform-origin: right center;
  }

  .loader:after {
    border-bottom: 0.5rem #fff solid;
    top: 0.1875rem;
    right: calc(-50% - 0.1875rem);
    transform-origin: left center;
  }

  @keyframes spVortex {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(359deg);
    }
  }`,d=()=>(0,t.jsx)(l,{children:(0,t.jsx)("div",{className:"loader"})});function c(e){let{src:r,alt:n,fill:a=!1,width:o,height:l,sizes:c,style:f,className:u,unoptimized:m}=e,[h,p]=(0,s.useState)(!0);return(0,t.jsxs)("div",{className:u,style:{position:"relative",width:a?"100%":o,height:a?"100%":l,...f,overflow:"hidden"},children:[h&&(0,t.jsx)("div",{style:{position:"absolute",inset:0,display:"flex",justifyContent:"center",alignItems:"center",background:"rgba(0,0,0,0.05)",zIndex:10},children:(0,t.jsx)(d,{})}),(0,t.jsx)(i.default,{src:r,alt:n,fill:a,width:a?void 0:o,height:a?void 0:l,sizes:c,unoptimized:m,onLoadingComplete:()=>p(!1),style:{objectFit:"cover",width:"100%",height:"100%"}})]})}var f=e.i(15209);let u=o.default.div.withConfig({displayName:"TextLoader__StyledWrapper",componentId:"sc-f7cd23ca-0"})`
  .loader {
    display: block;
    --height-of-loader: 4px;
    --loader-color: #0071e2;
    width: 130px;
    height: var(--height-of-loader);
    border-radius: 30px;
    background-color: rgba(0,0,0,0.2);
    position: relative;
  }

  .loader::before {
    content: "";
    position: absolute;
    background: var(--loader-color);
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    border-radius: 30px;
    animation: moving 1s ease-in-out infinite;
    ;
  }

  @keyframes moving {
    50% {
      width: 100%;
    }

    100% {
      width: 0;
      right: 0;
      left: unset;
    }
  }`,m=()=>(0,t.jsx)(u,{children:(0,t.jsx)("div",{className:"loader"})});function h(){let e=(0,n.useParams)(),o=e?.id,l=(0,n.useRouter)(),[d,u]=(0,s.useState)(null),[h,p]=(0,s.useState)(!0),[g,b]=(0,s.useState)(""),[x,v]=(0,s.useState)(null),_=e=>{if(!e)return 0;if("number"==typeof e.seasons_count)return e.seasons_count;if("string"==typeof e.seasons_count){let t=e.seasons_count.match(/\d+/);return t?Number(t[0]):0}return 0};(0,s.useEffect)(()=>{if(!window.matchMedia("(min-width: 1024px)").matches)return;let e=document.body.style.overflow,t=document.body.style.overscrollBehavior;return document.body.style.overflow="hidden",document.body.style.overscrollBehavior="none",()=>{document.body.style.overflow=e,document.body.style.overscrollBehavior=t}},[]);let y=async(e=1)=>{v(e);try{let t,r=await fetch(`/api/series/${encodeURIComponent(o)}?season=${e}`),s=await r.json();if(!r.ok)return void b(s?.error??"Failed to fetch show");u((t=e=>Array.isArray(e)?e:"string"==typeof e&&e.trim()?e.split(",").map(e=>e.trim()).filter(Boolean):[],{_id:s._id,show_title:s.show_title,year:s.year,rating:s.rating,description:s.description,series_logo:s.series_logo,fanart:s.fanart||s.background||s.fanart_url||s.backdrop||"",seasons_count:s.seasons_count??s.seasons,creators:t(s.creators),cast:t(s.cast),starring:t(s.starring),show_characteristics:t(s.show_characteristics),genres:t(s.genres),audio:t(s.audio),subtitles:t(s.subtitles),season:s.season??1,data:s.data??{}}))}catch(e){b(e?.message??"Unknown error")}finally{p(!1),v(null)}};return((0,s.useEffect)(()=>{o&&y(1)},[o]),h)?(0,t.jsx)("div",{className:"w-full h-screen flex items-center justify-center",children:(0,t.jsx)(a.default,{})}):g?(0,t.jsx)("p",{className:"p-6 text-red-500",children:g}):d?(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 relative min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden",children:[(0,t.jsxs)("div",{style:{backgroundImage:d.fanart?`url("${d.fanart}")`:"none"},className:"jsx-cf4e733dfb405fd4 fixed inset-0 bg-cover bg-center z-0 transition-opacity duration-1000",children:[(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent z-10"}),(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent z-10"})]}),(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 relative z-30 p-6 flex justify-between items-center",children:(0,t.jsx)("button",{onClick:()=>l.push("/"),className:"jsx-cf4e733dfb405fd4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all",children:(0,t.jsx)(f.MoveLeft,{size:24})})}),(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 relative z-20 flex flex-col lg:flex-row px-6 md:px-16 pb-12 gap-12",children:[(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 flex-1 lg:max-w-[60%] pt-10",children:[d.series_logo?(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 mb-8",children:(0,t.jsx)(i.default,{src:d.series_logo,alt:d.show_title,width:400,height:150,className:"w-full max-w-[220px] md:max-w-[350px] object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]",unoptimized:!0})}):(0,t.jsx)("h1",{className:"jsx-cf4e733dfb405fd4 text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase whitespace-normal break-words",children:d.show_title}),(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 flex items-center gap-6 text-xl font-medium text-gray-300 mb-8 flex-wrap",children:[d.year&&(0,t.jsx)("span",{className:"jsx-cf4e733dfb405fd4",children:d.year}),d.rating&&(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 flex items-center gap-2",children:[(0,t.jsx)("span",{className:"jsx-cf4e733dfb405fd4",children:d.rating}),(0,t.jsx)("span",{className:"jsx-cf4e733dfb405fd4 bg-[#f5c518] text-black text-[10px] font-bold px-1 rounded-sm",children:"IMDb"})]}),_(d)>0&&(0,t.jsxs)("span",{className:"jsx-cf4e733dfb405fd4",children:[_(d)," Seasons"]})]}),d.show_characteristics&&d.show_characteristics.length>0&&(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 mb-8",children:[(0,t.jsx)("p",{className:"jsx-cf4e733dfb405fd4 text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3",children:"Characteristics"}),(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 flex flex-wrap gap-2",children:d.show_characteristics.map((e,r)=>(0,t.jsx)("span",{className:"jsx-cf4e733dfb405fd4 bg-white/10 backdrop-blur-md border border-white/5 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors",children:e},r))})]}),d.starring&&d.starring.length>0&&(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 mb-8",children:[(0,t.jsx)("p",{className:"jsx-cf4e733dfb405fd4 text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3",children:"Starring"}),(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 flex flex-wrap gap-2",children:d.starring.map((e,r)=>(0,t.jsx)("span",{className:"jsx-cf4e733dfb405fd4 bg-white/10 backdrop-blur-md border border-white/5 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors",children:e},r))})]}),d.creators&&d.creators.length>0&&(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 mb-8",children:[(0,t.jsx)("p",{className:"jsx-cf4e733dfb405fd4 text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3",children:"Creators"}),(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 flex flex-wrap gap-2",children:d.creators.map((e,r)=>(0,t.jsxs)("span",{className:"jsx-cf4e733dfb405fd4 text-lg text-gray-300 font-medium",children:[e,r<(d.creators?.length??0)-1?", ":""]},r))})]}),(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 mb-10",children:[(0,t.jsx)("p",{className:"jsx-cf4e733dfb405fd4 text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3",children:"Summary"}),(0,t.jsx)("p",{className:"jsx-cf4e733dfb405fd4 text-lg text-gray-300 leading-relaxed max-w-2xl line-clamp-6 md:line-clamp-none",children:d.description})]})]}),(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 w-full lg:w-[450px] z-30",children:(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 bg-black/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col max-h-[calc(100vh-120px)] shadow-2xl",children:[_(d)>0&&(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 mb-6 relative",children:[(0,t.jsx)("select",{value:d.season,onChange:e=>y(Number(e.target.value)),className:"jsx-cf4e733dfb405fd4 w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5 appearance-none focus:outline-none focus:ring-2 focus:ring-white/20 transition-all cursor-pointer font-bold text-lg",children:Array.from({length:_(d)}).map((e,r)=>(0,t.jsxs)("option",{value:r+1,className:"jsx-cf4e733dfb405fd4 bg-[#1a1a1a]",children:["Season ",r+1]},r+1))}),(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400",children:(0,t.jsx)("svg",{width:"12",height:"12",viewBox:"0 0 12 12",fill:"none",xmlns:"http://www.w3.org/2000/svg",className:"jsx-cf4e733dfb405fd4",children:(0,t.jsx)("path",{d:"M2.5 4.5L6 8L9.5 4.5",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"jsx-cf4e733dfb405fd4"})})})]}),(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 flex-1 overflow-y-auto pr-2 custom-scrollbar",children:x?(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 flex items-center justify-center py-20",children:(0,t.jsx)(m,{})}):(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 space-y-4",children:Object.entries(d.data??{}).map(([e,r])=>r.map((r,s)=>(0,t.jsxs)("div",{onClick:()=>{let t=d.season??1,i=r.title?`&t=${encodeURIComponent(r.title)}`:"";l.push(`/series/${o}/episode?season=${t}&group=${encodeURIComponent(e)}&index=${s}${i}`)},className:"jsx-cf4e733dfb405fd4 group flex gap-4 p-3 rounded-2xl hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/5",children:[(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 relative w-28 h-20 md:w-32 md:h-24 flex-shrink-0 bg-gray-900 rounded-xl overflow-hidden shadow-lg",children:[r.image_url?(0,t.jsx)(c,{src:r.image_url,alt:r.title,fill:!0,className:"object-cover group-hover:scale-110 transition-transform duration-500",unoptimized:!0}):(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 w-full h-full flex items-center justify-center text-[10px] text-gray-500",children:"No Image"}),(0,t.jsx)("div",{className:"jsx-cf4e733dfb405fd4 absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"}),(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-md text-[10px] font-bold",children:["EP ",s+1]})]}),(0,t.jsxs)("div",{className:"jsx-cf4e733dfb405fd4 flex-1 py-1",children:[(0,t.jsxs)("h4",{className:"jsx-cf4e733dfb405fd4 font-bold text-sm md:text-base mb-1 line-clamp-2 leading-snug group-hover:text-white transition-colors",children:[s+1,". ",r.title]}),(0,t.jsx)("p",{className:"jsx-cf4e733dfb405fd4 text-gray-500 text-xs line-clamp-2 md:line-clamp-3 leading-relaxed",children:r.description||"No description available for this episode."})]})]},`${e}-${s}`)))})})]})})]}),(0,t.jsx)(r.default,{id:"cf4e733dfb405fd4",children:".custom-scrollbar::-webkit-scrollbar{width:4px}.custom-scrollbar::-webkit-scrollbar-track{background:0 0}.custom-scrollbar::-webkit-scrollbar-thumb{background:#ffffff1a;border-radius:10px}.custom-scrollbar::-webkit-scrollbar-thumb:hover{background:#fff3}"})]}):(0,t.jsx)("p",{className:"p-6 text-gray-500",children:"No show found"})}e.s(["default",()=>h],4777)}]);