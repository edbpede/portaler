var I="top",X="bottom",Y="right",N="left",mt="auto",Ve=[I,X,Y,N],Ae="start",ke="end",lr="clippingParents",Ut="viewport",Pe="popper",dr="reference",Et=Ve.reduce(function(e,t){return e.concat([t+"-"+Ae,t+"-"+ke])},[]),Ft=[].concat(Ve,[mt]).reduce(function(e,t){return e.concat([t,t+"-"+Ae,t+"-"+ke])},[]),vr="beforeRead",mr="read",hr="afterRead",gr="beforeMain",yr="main",br="afterMain",wr="beforeWrite",Or="write",xr="afterWrite",Ar=[vr,mr,hr,gr,yr,br,wr,Or,xr];function te(e){return e?(e.nodeName||"").toLowerCase():null}function F(e){if(e==null)return window;if(e.toString()!=="[object Window]"){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function he(e){var t=F(e).Element;return e instanceof t||e instanceof Element}function z(e){var t=F(e).HTMLElement;return e instanceof t||e instanceof HTMLElement}function ht(e){if(typeof ShadowRoot>"u")return!1;var t=F(e).ShadowRoot;return e instanceof t||e instanceof ShadowRoot}function Er(e){var t=e.state;Object.keys(t.elements).forEach(function(r){var n=t.styles[r]||{},a=t.attributes[r]||{},s=t.elements[r];!z(s)||!te(s)||(Object.assign(s.style,n),Object.keys(a).forEach(function(f){var c=a[f];c===!1?s.removeAttribute(f):s.setAttribute(f,c===!0?"":c)}))})}function Tr(e){var t=e.state,r={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,r.popper),t.styles=r,t.elements.arrow&&Object.assign(t.elements.arrow.style,r.arrow),function(){Object.keys(t.elements).forEach(function(n){var a=t.elements[n],s=t.attributes[n]||{},f=Object.keys(t.styles.hasOwnProperty(n)?t.styles[n]:r[n]),c=f.reduce(function(u,l){return u[l]="",u},{});!z(a)||!te(a)||(Object.assign(a.style,c),Object.keys(s).forEach(function(u){a.removeAttribute(u)}))})}}const qt={name:"applyStyles",enabled:!0,phase:"write",fn:Er,effect:Tr,requires:["computeStyles"]};function ee(e){return e.split("-")[0]}var me=Math.max,tt=Math.min,Ee=Math.round;function pt(){var e=navigator.userAgentData;return e!=null&&e.brands&&Array.isArray(e.brands)?e.brands.map(function(t){return t.brand+"/"+t.version}).join(" "):navigator.userAgent}function zt(){return!/^((?!chrome|android).)*safari/i.test(pt())}function Te(e,t,r){t===void 0&&(t=!1),r===void 0&&(r=!1);var n=e.getBoundingClientRect(),a=1,s=1;t&&z(e)&&(a=e.offsetWidth>0&&Ee(n.width)/e.offsetWidth||1,s=e.offsetHeight>0&&Ee(n.height)/e.offsetHeight||1);var f=he(e)?F(e):window,c=f.visualViewport,u=!zt()&&r,l=(n.left+(u&&c?c.offsetLeft:0))/a,p=(n.top+(u&&c?c.offsetTop:0))/s,b=n.width/a,x=n.height/s;return{width:b,height:x,top:p,right:l+b,bottom:p+x,left:l,x:l,y:p}}function gt(e){var t=Te(e),r=e.offsetWidth,n=e.offsetHeight;return Math.abs(t.width-r)<=1&&(r=t.width),Math.abs(t.height-n)<=1&&(n=t.height),{x:e.offsetLeft,y:e.offsetTop,width:r,height:n}}function Xt(e,t){var r=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(r&&ht(r)){var n=t;do{if(n&&e.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function oe(e){return F(e).getComputedStyle(e)}function Dr(e){return["table","td","th"].indexOf(te(e))>=0}function fe(e){return((he(e)?e.ownerDocument:e.document)||window.document).documentElement}function nt(e){return te(e)==="html"?e:e.assignedSlot||e.parentNode||(ht(e)?e.host:null)||fe(e)}function Tt(e){return!z(e)||oe(e).position==="fixed"?null:e.offsetParent}function Cr(e){var t=/firefox/i.test(pt()),r=/Trident/i.test(pt());if(r&&z(e)){var n=oe(e);if(n.position==="fixed")return null}var a=nt(e);for(ht(a)&&(a=a.host);z(a)&&["html","body"].indexOf(te(a))<0;){var s=oe(a);if(s.transform!=="none"||s.perspective!=="none"||s.contain==="paint"||["transform","perspective"].indexOf(s.willChange)!==-1||t&&s.willChange==="filter"||t&&s.filter&&s.filter!=="none")return a;a=a.parentNode}return null}function Ie(e){for(var t=F(e),r=Tt(e);r&&Dr(r)&&oe(r).position==="static";)r=Tt(r);return r&&(te(r)==="html"||te(r)==="body"&&oe(r).position==="static")?t:r||Cr(e)||t}function yt(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function Be(e,t,r){return me(e,tt(t,r))}function Lr(e,t,r){var n=Be(e,t,r);return n>r?r:n}function Yt(){return{top:0,right:0,bottom:0,left:0}}function _t(e){return Object.assign({},Yt(),e)}function Gt(e,t){return t.reduce(function(r,n){return r[n]=e,r},{})}var Sr=function(t,r){return t=typeof t=="function"?t(Object.assign({},r.rects,{placement:r.placement})):t,_t(typeof t!="number"?t:Gt(t,Ve))};function Mr(e){var t,r=e.state,n=e.name,a=e.options,s=r.elements.arrow,f=r.modifiersData.popperOffsets,c=ee(r.placement),u=yt(c),l=[N,Y].indexOf(c)>=0,p=l?"height":"width";if(!(!s||!f)){var b=Sr(a.padding,r),x=gt(s),h=u==="y"?I:N,w=u==="y"?X:Y,g=r.rects.reference[p]+r.rects.reference[u]-f[u]-r.rects.popper[p],y=f[u]-r.rects.reference[u],E=Ie(s),D=E?u==="y"?E.clientHeight||0:E.clientWidth||0:0,L=g/2-y/2,i=b[h],A=D-x[p]-b[w],v=D/2-x[p]/2+L,C=Be(i,v,A),B=u;r.modifiersData[n]=(t={},t[B]=C,t.centerOffset=C-v,t)}}function Rr(e){var t=e.state,r=e.options,n=r.element,a=n===void 0?"[data-popper-arrow]":n;a!=null&&(typeof a=="string"&&(a=t.elements.popper.querySelector(a),!a)||Xt(t.elements.popper,a)&&(t.elements.arrow=a))}const Pr={name:"arrow",enabled:!0,phase:"main",fn:Mr,effect:Rr,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function De(e){return e.split("-")[1]}var Br={top:"auto",right:"auto",bottom:"auto",left:"auto"};function jr(e,t){var r=e.x,n=e.y,a=t.devicePixelRatio||1;return{x:Ee(r*a)/a||0,y:Ee(n*a)/a||0}}function Dt(e){var t,r=e.popper,n=e.popperRect,a=e.placement,s=e.variation,f=e.offsets,c=e.position,u=e.gpuAcceleration,l=e.adaptive,p=e.roundOffsets,b=e.isFixed,x=f.x,h=x===void 0?0:x,w=f.y,g=w===void 0?0:w,y=typeof p=="function"?p({x:h,y:g}):{x:h,y:g};h=y.x,g=y.y;var E=f.hasOwnProperty("x"),D=f.hasOwnProperty("y"),L=N,i=I,A=window;if(l){var v=Ie(r),C="clientHeight",B="clientWidth";if(v===F(r)&&(v=fe(r),oe(v).position!=="static"&&c==="absolute"&&(C="scrollHeight",B="scrollWidth")),v=v,a===I||(a===N||a===Y)&&s===ke){i=X;var P=b&&v===A&&A.visualViewport?A.visualViewport.height:v[C];g-=P-n.height,g*=u?1:-1}if(a===N||(a===I||a===X)&&s===ke){L=Y;var M=b&&v===A&&A.visualViewport?A.visualViewport.width:v[B];h-=M-n.width,h*=u?1:-1}}var j=Object.assign({position:c},l&&Br),R=p===!0?jr({x:h,y:g},F(r)):{x:h,y:g};if(h=R.x,g=R.y,u){var S;return Object.assign({},j,(S={},S[i]=D?"0":"",S[L]=E?"0":"",S.transform=(A.devicePixelRatio||1)<=1?"translate("+h+"px, "+g+"px)":"translate3d("+h+"px, "+g+"px, 0)",S))}return Object.assign({},j,(t={},t[i]=D?g+"px":"",t[L]=E?h+"px":"",t.transform="",t))}function $r(e){var t=e.state,r=e.options,n=r.gpuAcceleration,a=n===void 0?!0:n,s=r.adaptive,f=s===void 0?!0:s,c=r.roundOffsets,u=c===void 0?!0:c,l={placement:ee(t.placement),variation:De(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:a,isFixed:t.options.strategy==="fixed"};t.modifiersData.popperOffsets!=null&&(t.styles.popper=Object.assign({},t.styles.popper,Dt(Object.assign({},l,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:f,roundOffsets:u})))),t.modifiersData.arrow!=null&&(t.styles.arrow=Object.assign({},t.styles.arrow,Dt(Object.assign({},l,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:u})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})}const kr={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:$r,data:{}};var Qe={passive:!0};function Hr(e){var t=e.state,r=e.instance,n=e.options,a=n.scroll,s=a===void 0?!0:a,f=n.resize,c=f===void 0?!0:f,u=F(t.elements.popper),l=[].concat(t.scrollParents.reference,t.scrollParents.popper);return s&&l.forEach(function(p){p.addEventListener("scroll",r.update,Qe)}),c&&u.addEventListener("resize",r.update,Qe),function(){s&&l.forEach(function(p){p.removeEventListener("scroll",r.update,Qe)}),c&&u.removeEventListener("resize",r.update,Qe)}}const Vr={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Hr,data:{}};var Ir={left:"right",right:"left",bottom:"top",top:"bottom"};function et(e){return e.replace(/left|right|bottom|top/g,function(t){return Ir[t]})}var Nr={start:"end",end:"start"};function Ct(e){return e.replace(/start|end/g,function(t){return Nr[t]})}function bt(e){var t=F(e),r=t.pageXOffset,n=t.pageYOffset;return{scrollLeft:r,scrollTop:n}}function wt(e){return Te(fe(e)).left+bt(e).scrollLeft}function Wr(e,t){var r=F(e),n=fe(e),a=r.visualViewport,s=n.clientWidth,f=n.clientHeight,c=0,u=0;if(a){s=a.width,f=a.height;var l=zt();(l||!l&&t==="fixed")&&(c=a.offsetLeft,u=a.offsetTop)}return{width:s,height:f,x:c+wt(e),y:u}}function Ur(e){var t,r=fe(e),n=bt(e),a=(t=e.ownerDocument)==null?void 0:t.body,s=me(r.scrollWidth,r.clientWidth,a?a.scrollWidth:0,a?a.clientWidth:0),f=me(r.scrollHeight,r.clientHeight,a?a.scrollHeight:0,a?a.clientHeight:0),c=-n.scrollLeft+wt(e),u=-n.scrollTop;return oe(a||r).direction==="rtl"&&(c+=me(r.clientWidth,a?a.clientWidth:0)-s),{width:s,height:f,x:c,y:u}}function Ot(e){var t=oe(e),r=t.overflow,n=t.overflowX,a=t.overflowY;return/auto|scroll|overlay|hidden/.test(r+a+n)}function Kt(e){return["html","body","#document"].indexOf(te(e))>=0?e.ownerDocument.body:z(e)&&Ot(e)?e:Kt(nt(e))}function je(e,t){var r;t===void 0&&(t=[]);var n=Kt(e),a=n===((r=e.ownerDocument)==null?void 0:r.body),s=F(n),f=a?[s].concat(s.visualViewport||[],Ot(n)?n:[]):n,c=t.concat(f);return a?c:c.concat(je(nt(f)))}function lt(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function Fr(e,t){var r=Te(e,!1,t==="fixed");return r.top=r.top+e.clientTop,r.left=r.left+e.clientLeft,r.bottom=r.top+e.clientHeight,r.right=r.left+e.clientWidth,r.width=e.clientWidth,r.height=e.clientHeight,r.x=r.left,r.y=r.top,r}function Lt(e,t,r){return t===Ut?lt(Wr(e,r)):he(t)?Fr(t,r):lt(Ur(fe(e)))}function qr(e){var t=je(nt(e)),r=["absolute","fixed"].indexOf(oe(e).position)>=0,n=r&&z(e)?Ie(e):e;return he(n)?t.filter(function(a){return he(a)&&Xt(a,n)&&te(a)!=="body"}):[]}function zr(e,t,r,n){var a=t==="clippingParents"?qr(e):[].concat(t),s=[].concat(a,[r]),f=s[0],c=s.reduce(function(u,l){var p=Lt(e,l,n);return u.top=me(p.top,u.top),u.right=tt(p.right,u.right),u.bottom=tt(p.bottom,u.bottom),u.left=me(p.left,u.left),u},Lt(e,f,n));return c.width=c.right-c.left,c.height=c.bottom-c.top,c.x=c.left,c.y=c.top,c}function Jt(e){var t=e.reference,r=e.element,n=e.placement,a=n?ee(n):null,s=n?De(n):null,f=t.x+t.width/2-r.width/2,c=t.y+t.height/2-r.height/2,u;switch(a){case I:u={x:f,y:t.y-r.height};break;case X:u={x:f,y:t.y+t.height};break;case Y:u={x:t.x+t.width,y:c};break;case N:u={x:t.x-r.width,y:c};break;default:u={x:t.x,y:t.y}}var l=a?yt(a):null;if(l!=null){var p=l==="y"?"height":"width";switch(s){case Ae:u[l]=u[l]-(t[p]/2-r[p]/2);break;case ke:u[l]=u[l]+(t[p]/2-r[p]/2);break}}return u}function He(e,t){t===void 0&&(t={});var r=t,n=r.placement,a=n===void 0?e.placement:n,s=r.strategy,f=s===void 0?e.strategy:s,c=r.boundary,u=c===void 0?lr:c,l=r.rootBoundary,p=l===void 0?Ut:l,b=r.elementContext,x=b===void 0?Pe:b,h=r.altBoundary,w=h===void 0?!1:h,g=r.padding,y=g===void 0?0:g,E=_t(typeof y!="number"?y:Gt(y,Ve)),D=x===Pe?dr:Pe,L=e.rects.popper,i=e.elements[w?D:x],A=zr(he(i)?i:i.contextElement||fe(e.elements.popper),u,p,f),v=Te(e.elements.reference),C=Jt({reference:v,element:L,strategy:"absolute",placement:a}),B=lt(Object.assign({},L,C)),P=x===Pe?B:v,M={top:A.top-P.top+E.top,bottom:P.bottom-A.bottom+E.bottom,left:A.left-P.left+E.left,right:P.right-A.right+E.right},j=e.modifiersData.offset;if(x===Pe&&j){var R=j[a];Object.keys(M).forEach(function(S){var W=[Y,X].indexOf(S)>=0?1:-1,U=[I,X].indexOf(S)>=0?"y":"x";M[S]+=R[U]*W})}return M}function Xr(e,t){t===void 0&&(t={});var r=t,n=r.placement,a=r.boundary,s=r.rootBoundary,f=r.padding,c=r.flipVariations,u=r.allowedAutoPlacements,l=u===void 0?Ft:u,p=De(n),b=p?c?Et:Et.filter(function(w){return De(w)===p}):Ve,x=b.filter(function(w){return l.indexOf(w)>=0});x.length===0&&(x=b);var h=x.reduce(function(w,g){return w[g]=He(e,{placement:g,boundary:a,rootBoundary:s,padding:f})[ee(g)],w},{});return Object.keys(h).sort(function(w,g){return h[w]-h[g]})}function Yr(e){if(ee(e)===mt)return[];var t=et(e);return[Ct(e),t,Ct(t)]}function _r(e){var t=e.state,r=e.options,n=e.name;if(!t.modifiersData[n]._skip){for(var a=r.mainAxis,s=a===void 0?!0:a,f=r.altAxis,c=f===void 0?!0:f,u=r.fallbackPlacements,l=r.padding,p=r.boundary,b=r.rootBoundary,x=r.altBoundary,h=r.flipVariations,w=h===void 0?!0:h,g=r.allowedAutoPlacements,y=t.options.placement,E=ee(y),D=E===y,L=u||(D||!w?[et(y)]:Yr(y)),i=[y].concat(L).reduce(function(re,_){return re.concat(ee(_)===mt?Xr(t,{placement:_,boundary:p,rootBoundary:b,padding:l,flipVariations:w,allowedAutoPlacements:g}):_)},[]),A=t.rects.reference,v=t.rects.popper,C=new Map,B=!0,P=i[0],M=0;M<i.length;M++){var j=i[M],R=ee(j),S=De(j)===Ae,W=[I,X].indexOf(R)>=0,U=W?"width":"height",k=He(t,{placement:j,boundary:p,rootBoundary:b,altBoundary:x,padding:l}),H=W?S?Y:N:S?X:I;A[U]>v[U]&&(H=et(H));var $=et(H),K=[];if(s&&K.push(k[R]<=0),c&&K.push(k[H]<=0,k[$]<=0),K.every(function(re){return re})){P=j,B=!1;break}C.set(j,K)}if(B)for(var J=w?3:1,ce=function(_){var ne=i.find(function(ge){var ie=C.get(ge);if(ie)return ie.slice(0,_).every(function(ye){return ye})});if(ne)return P=ne,"break"},Q=J;Q>0;Q--){var pe=ce(Q);if(pe==="break")break}t.placement!==P&&(t.modifiersData[n]._skip=!0,t.placement=P,t.reset=!0)}}const Gr={name:"flip",enabled:!0,phase:"main",fn:_r,requiresIfExists:["offset"],data:{_skip:!1}};function St(e,t,r){return r===void 0&&(r={x:0,y:0}),{top:e.top-t.height-r.y,right:e.right-t.width+r.x,bottom:e.bottom-t.height+r.y,left:e.left-t.width-r.x}}function Mt(e){return[I,Y,X,N].some(function(t){return e[t]>=0})}function Kr(e){var t=e.state,r=e.name,n=t.rects.reference,a=t.rects.popper,s=t.modifiersData.preventOverflow,f=He(t,{elementContext:"reference"}),c=He(t,{altBoundary:!0}),u=St(f,n),l=St(c,a,s),p=Mt(u),b=Mt(l);t.modifiersData[r]={referenceClippingOffsets:u,popperEscapeOffsets:l,isReferenceHidden:p,hasPopperEscaped:b},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":b})}const Jr={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Kr};function Qr(e,t,r){var n=ee(e),a=[N,I].indexOf(n)>=0?-1:1,s=typeof r=="function"?r(Object.assign({},t,{placement:e})):r,f=s[0],c=s[1];return f=f||0,c=(c||0)*a,[N,Y].indexOf(n)>=0?{x:c,y:f}:{x:f,y:c}}function Zr(e){var t=e.state,r=e.options,n=e.name,a=r.offset,s=a===void 0?[0,0]:a,f=Ft.reduce(function(p,b){return p[b]=Qr(b,t.rects,s),p},{}),c=f[t.placement],u=c.x,l=c.y;t.modifiersData.popperOffsets!=null&&(t.modifiersData.popperOffsets.x+=u,t.modifiersData.popperOffsets.y+=l),t.modifiersData[n]=f}const en={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:Zr};function tn(e){var t=e.state,r=e.name;t.modifiersData[r]=Jt({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})}const rn={name:"popperOffsets",enabled:!0,phase:"read",fn:tn,data:{}};function nn(e){return e==="x"?"y":"x"}function an(e){var t=e.state,r=e.options,n=e.name,a=r.mainAxis,s=a===void 0?!0:a,f=r.altAxis,c=f===void 0?!1:f,u=r.boundary,l=r.rootBoundary,p=r.altBoundary,b=r.padding,x=r.tether,h=x===void 0?!0:x,w=r.tetherOffset,g=w===void 0?0:w,y=He(t,{boundary:u,rootBoundary:l,padding:b,altBoundary:p}),E=ee(t.placement),D=De(t.placement),L=!D,i=yt(E),A=nn(i),v=t.modifiersData.popperOffsets,C=t.rects.reference,B=t.rects.popper,P=typeof g=="function"?g(Object.assign({},t.rects,{placement:t.placement})):g,M=typeof P=="number"?{mainAxis:P,altAxis:P}:Object.assign({mainAxis:0,altAxis:0},P),j=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,R={x:0,y:0};if(v){if(s){var S,W=i==="y"?I:N,U=i==="y"?X:Y,k=i==="y"?"height":"width",H=v[i],$=H+y[W],K=H-y[U],J=h?-B[k]/2:0,ce=D===Ae?C[k]:B[k],Q=D===Ae?-B[k]:-C[k],pe=t.elements.arrow,re=h&&pe?gt(pe):{width:0,height:0},_=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:Yt(),ne=_[W],ge=_[U],ie=Be(0,C[k],re[k]),ye=L?C[k]/2-J-ie-ne-M.mainAxis:ce-ie-ne-M.mainAxis,se=L?-C[k]/2+J+ie+ge+M.mainAxis:Q+ie+ge+M.mainAxis,be=t.elements.arrow&&Ie(t.elements.arrow),We=be?i==="y"?be.clientTop||0:be.clientLeft||0:0,Ce=(S=j?.[i])!=null?S:0,Ue=H+ye-Ce-We,Fe=H+se-Ce,Le=Be(h?tt($,Ue):$,H,h?me(K,Fe):K);v[i]=Le,R[i]=Le-H}if(c){var Se,qe=i==="x"?I:N,ze=i==="x"?X:Y,ae=v[A],ue=A==="y"?"height":"width",Me=ae+y[qe],le=ae-y[ze],Re=[I,N].indexOf(E)!==-1,Xe=(Se=j?.[A])!=null?Se:0,Ye=Re?Me:ae-C[ue]-B[ue]-Xe+M.altAxis,_e=Re?ae+C[ue]+B[ue]-Xe-M.altAxis:le,Ge=h&&Re?Lr(Ye,ae,_e):Be(h?Ye:Me,ae,h?_e:le);v[A]=Ge,R[A]=Ge-ae}t.modifiersData[n]=R}}const on={name:"preventOverflow",enabled:!0,phase:"main",fn:an,requiresIfExists:["offset"]};function sn(e){return{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}}function un(e){return e===F(e)||!z(e)?bt(e):sn(e)}function fn(e){var t=e.getBoundingClientRect(),r=Ee(t.width)/e.offsetWidth||1,n=Ee(t.height)/e.offsetHeight||1;return r!==1||n!==1}function cn(e,t,r){r===void 0&&(r=!1);var n=z(t),a=z(t)&&fn(t),s=fe(t),f=Te(e,a,r),c={scrollLeft:0,scrollTop:0},u={x:0,y:0};return(n||!n&&!r)&&((te(t)!=="body"||Ot(s))&&(c=un(t)),z(t)?(u=Te(t,!0),u.x+=t.clientLeft,u.y+=t.clientTop):s&&(u.x=wt(s))),{x:f.left+c.scrollLeft-u.x,y:f.top+c.scrollTop-u.y,width:f.width,height:f.height}}function pn(e){var t=new Map,r=new Set,n=[];e.forEach(function(s){t.set(s.name,s)});function a(s){r.add(s.name);var f=[].concat(s.requires||[],s.requiresIfExists||[]);f.forEach(function(c){if(!r.has(c)){var u=t.get(c);u&&a(u)}}),n.push(s)}return e.forEach(function(s){r.has(s.name)||a(s)}),n}function ln(e){var t=pn(e);return Ar.reduce(function(r,n){return r.concat(t.filter(function(a){return a.phase===n}))},[])}function dn(e){var t;return function(){return t||(t=new Promise(function(r){Promise.resolve().then(function(){t=void 0,r(e())})})),t}}function vn(e){var t=e.reduce(function(r,n){var a=r[n.name];return r[n.name]=a?Object.assign({},a,n,{options:Object.assign({},a.options,n.options),data:Object.assign({},a.data,n.data)}):n,r},{});return Object.keys(t).map(function(r){return t[r]})}var Rt={placement:"bottom",modifiers:[],strategy:"absolute"};function Pt(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return!t.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function mn(e){e===void 0&&(e={});var t=e,r=t.defaultModifiers,n=r===void 0?[]:r,a=t.defaultOptions,s=a===void 0?Rt:a;return function(c,u,l){l===void 0&&(l=s);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},Rt,s),modifiersData:{},elements:{reference:c,popper:u},attributes:{},styles:{}},b=[],x=!1,h={state:p,setOptions:function(E){var D=typeof E=="function"?E(p.options):E;g(),p.options=Object.assign({},s,p.options,D),p.scrollParents={reference:he(c)?je(c):c.contextElement?je(c.contextElement):[],popper:je(u)};var L=ln(vn([].concat(n,p.options.modifiers)));return p.orderedModifiers=L.filter(function(i){return i.enabled}),w(),h.update()},forceUpdate:function(){if(!x){var E=p.elements,D=E.reference,L=E.popper;if(Pt(D,L)){p.rects={reference:cn(D,Ie(L),p.options.strategy==="fixed"),popper:gt(L)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(M){return p.modifiersData[M.name]=Object.assign({},M.data)});for(var i=0;i<p.orderedModifiers.length;i++){if(p.reset===!0){p.reset=!1,i=-1;continue}var A=p.orderedModifiers[i],v=A.fn,C=A.options,B=C===void 0?{}:C,P=A.name;typeof v=="function"&&(p=v({state:p,options:B,name:P,instance:h})||p)}}}},update:dn(function(){return new Promise(function(y){h.forceUpdate(),y(p)})}),destroy:function(){g(),x=!0}};if(!Pt(c,u))return h;h.setOptions(l).then(function(y){!x&&l.onFirstUpdate&&l.onFirstUpdate(y)});function w(){p.orderedModifiers.forEach(function(y){var E=y.name,D=y.options,L=D===void 0?{}:D,i=y.effect;if(typeof i=="function"){var A=i({state:p,name:E,instance:h,options:L}),v=function(){};b.push(A||v)}})}function g(){b.forEach(function(y){return y()}),b=[]}return h}}var hn=[Vr,rn,kr,qt,en,Gr,on,Pr,Jr],gn=mn({defaultModifiers:hn}),yn="tippy-box",Qt="tippy-content",bn="tippy-backdrop",Zt="tippy-arrow",er="tippy-svg-arrow",ve={passive:!0,capture:!0},tr=function(){return document.body};function st(e,t,r){if(Array.isArray(e)){var n=e[t];return n??(Array.isArray(r)?r[t]:r)}return e}function xt(e,t){var r={}.toString.call(e);return r.indexOf("[object")===0&&r.indexOf(t+"]")>-1}function rr(e,t){return typeof e=="function"?e.apply(void 0,t):e}function Bt(e,t){if(t===0)return e;var r;return function(n){clearTimeout(r),r=setTimeout(function(){e(n)},t)}}function wn(e){return e.split(/\s+/).filter(Boolean)}function xe(e){return[].concat(e)}function jt(e,t){e.indexOf(t)===-1&&e.push(t)}function On(e){return e.filter(function(t,r){return e.indexOf(t)===r})}function xn(e){return e.split("-")[0]}function rt(e){return[].slice.call(e)}function $t(e){return Object.keys(e).reduce(function(t,r){return e[r]!==void 0&&(t[r]=e[r]),t},{})}function $e(){return document.createElement("div")}function it(e){return["Element","Fragment"].some(function(t){return xt(e,t)})}function An(e){return xt(e,"NodeList")}function En(e){return xt(e,"MouseEvent")}function Tn(e){return!!(e&&e._tippy&&e._tippy.reference===e)}function Dn(e){return it(e)?[e]:An(e)?rt(e):Array.isArray(e)?e:rt(document.querySelectorAll(e))}function ut(e,t){e.forEach(function(r){r&&(r.style.transitionDuration=t+"ms")})}function kt(e,t){e.forEach(function(r){r&&r.setAttribute("data-state",t)})}function Cn(e){var t,r=xe(e),n=r[0];return n!=null&&(t=n.ownerDocument)!=null&&t.body?n.ownerDocument:document}function Ln(e,t){var r=t.clientX,n=t.clientY;return e.every(function(a){var s=a.popperRect,f=a.popperState,c=a.props,u=c.interactiveBorder,l=xn(f.placement),p=f.modifiersData.offset;if(!p)return!0;var b=l==="bottom"?p.top.y:0,x=l==="top"?p.bottom.y:0,h=l==="right"?p.left.x:0,w=l==="left"?p.right.x:0,g=s.top-n+b>u,y=n-s.bottom-x>u,E=s.left-r+h>u,D=r-s.right-w>u;return g||y||E||D})}function ft(e,t,r){var n=t+"EventListener";["transitionend","webkitTransitionEnd"].forEach(function(a){e[n](a,r)})}function Ht(e,t){for(var r=t;r;){var n;if(e.contains(r))return!0;r=r.getRootNode==null||(n=r.getRootNode())==null?void 0:n.host}return!1}var Z={isTouch:!1},Vt=0;function Sn(){Z.isTouch||(Z.isTouch=!0,window.performance&&document.addEventListener("mousemove",nr))}function nr(){var e=performance.now();e-Vt<20&&(Z.isTouch=!1,document.removeEventListener("mousemove",nr)),Vt=e}function Mn(){var e=document.activeElement;if(Tn(e)){var t=e._tippy;e.blur&&!t.state.isVisible&&e.blur()}}function Rn(){document.addEventListener("touchstart",Sn,ve),window.addEventListener("blur",Mn)}var Pn=typeof window<"u"&&typeof document<"u",Bn=Pn?!!window.msCrypto:!1,jn={animateFill:!1,followCursor:!1,inlinePositioning:!1,sticky:!1},$n={allowHTML:!1,animation:"fade",arrow:!0,content:"",inertia:!1,maxWidth:350,role:"tooltip",theme:"",zIndex:9999},G=Object.assign({appendTo:tr,aria:{content:"auto",expanded:"auto"},delay:0,duration:[300,250],getReferenceClientRect:null,hideOnClick:!0,ignoreAttributes:!1,interactive:!1,interactiveBorder:2,interactiveDebounce:0,moveTransition:"",offset:[0,10],onAfterUpdate:function(){},onBeforeUpdate:function(){},onCreate:function(){},onDestroy:function(){},onHidden:function(){},onHide:function(){},onMount:function(){},onShow:function(){},onShown:function(){},onTrigger:function(){},onUntrigger:function(){},onClickOutside:function(){},placement:"top",plugins:[],popperOptions:{},render:null,showOnCreate:!1,touch:!0,trigger:"mouseenter focus",triggerTarget:null},jn,$n),kn=Object.keys(G),Hn=function(t){var r=Object.keys(t);r.forEach(function(n){G[n]=t[n]})};function ir(e){var t=e.plugins||[],r=t.reduce(function(n,a){var s=a.name,f=a.defaultValue;if(s){var c;n[s]=e[s]!==void 0?e[s]:(c=G[s])!=null?c:f}return n},{});return Object.assign({},e,r)}function Vn(e,t){var r=t?Object.keys(ir(Object.assign({},G,{plugins:t}))):kn,n=r.reduce(function(a,s){var f=(e.getAttribute("data-tippy-"+s)||"").trim();if(!f)return a;if(s==="content")a[s]=f;else try{a[s]=JSON.parse(f)}catch{a[s]=f}return a},{});return n}function It(e,t){var r=Object.assign({},t,{content:rr(t.content,[e])},t.ignoreAttributes?{}:Vn(e,t.plugins));return r.aria=Object.assign({},G.aria,r.aria),r.aria={expanded:r.aria.expanded==="auto"?t.interactive:r.aria.expanded,content:r.aria.content==="auto"?t.interactive?null:"describedby":r.aria.content},r}var In=function(){return"innerHTML"};function dt(e,t){e[In()]=t}function Nt(e){var t=$e();return e===!0?t.className=Zt:(t.className=er,it(e)?t.appendChild(e):dt(t,e)),t}function Wt(e,t){it(t.content)?(dt(e,""),e.appendChild(t.content)):typeof t.content!="function"&&(t.allowHTML?dt(e,t.content):e.textContent=t.content)}function vt(e){var t=e.firstElementChild,r=rt(t.children);return{box:t,content:r.find(function(n){return n.classList.contains(Qt)}),arrow:r.find(function(n){return n.classList.contains(Zt)||n.classList.contains(er)}),backdrop:r.find(function(n){return n.classList.contains(bn)})}}function ar(e){var t=$e(),r=$e();r.className=yn,r.setAttribute("data-state","hidden"),r.setAttribute("tabindex","-1");var n=$e();n.className=Qt,n.setAttribute("data-state","hidden"),Wt(n,e.props),t.appendChild(r),r.appendChild(n),a(e.props,e.props);function a(s,f){var c=vt(t),u=c.box,l=c.content,p=c.arrow;f.theme?u.setAttribute("data-theme",f.theme):u.removeAttribute("data-theme"),typeof f.animation=="string"?u.setAttribute("data-animation",f.animation):u.removeAttribute("data-animation"),f.inertia?u.setAttribute("data-inertia",""):u.removeAttribute("data-inertia"),u.style.maxWidth=typeof f.maxWidth=="number"?f.maxWidth+"px":f.maxWidth,f.role?u.setAttribute("role",f.role):u.removeAttribute("role"),(s.content!==f.content||s.allowHTML!==f.allowHTML)&&Wt(l,e.props),f.arrow?p?s.arrow!==f.arrow&&(u.removeChild(p),u.appendChild(Nt(f.arrow))):u.appendChild(Nt(f.arrow)):p&&u.removeChild(p)}return{popper:t,onUpdate:a}}ar.$$tippy=!0;var Nn=1,Ze=[],ct=[];function Wn(e,t){var r=It(e,Object.assign({},G,ir($t(t)))),n,a,s,f=!1,c=!1,u=!1,l=!1,p,b,x,h=[],w=Bt(Ue,r.interactiveDebounce),g,y=Nn++,E=null,D=On(r.plugins),L={isEnabled:!0,isVisible:!1,isDestroyed:!1,isMounted:!1,isShown:!1},i={id:y,reference:e,popper:$e(),popperInstance:E,props:r,state:L,plugins:D,clearDelayTimeouts:Ye,setProps:_e,setContent:Ge,show:or,hide:sr,hideWithInteractivity:ur,enable:Re,disable:Xe,unmount:fr,destroy:cr};if(!r.render)return i;var A=r.render(i),v=A.popper,C=A.onUpdate;v.setAttribute("data-tippy-root",""),v.id="tippy-"+i.id,i.popper=v,e._tippy=i,v._tippy=i;var B=D.map(function(o){return o.fn(i)}),P=e.hasAttribute("aria-expanded");return be(),J(),H(),$("onCreate",[i]),r.showOnCreate&&Me(),v.addEventListener("mouseenter",function(){i.props.interactive&&i.state.isVisible&&i.clearDelayTimeouts()}),v.addEventListener("mouseleave",function(){i.props.interactive&&i.props.trigger.indexOf("mouseenter")>=0&&W().addEventListener("mousemove",w)}),i;function M(){var o=i.props.touch;return Array.isArray(o)?o:[o,0]}function j(){return M()[0]==="hold"}function R(){var o;return!!((o=i.props.render)!=null&&o.$$tippy)}function S(){return g||e}function W(){var o=S().parentNode;return o?Cn(o):document}function U(){return vt(v)}function k(o){return i.state.isMounted&&!i.state.isVisible||Z.isTouch||p&&p.type==="focus"?0:st(i.props.delay,o?0:1,G.delay)}function H(o){o===void 0&&(o=!1),v.style.pointerEvents=i.props.interactive&&!o?"":"none",v.style.zIndex=""+i.props.zIndex}function $(o,d,m){if(m===void 0&&(m=!0),B.forEach(function(O){O[o]&&O[o].apply(O,d)}),m){var T;(T=i.props)[o].apply(T,d)}}function K(){var o=i.props.aria;if(o.content){var d="aria-"+o.content,m=v.id,T=xe(i.props.triggerTarget||e);T.forEach(function(O){var V=O.getAttribute(d);if(i.state.isVisible)O.setAttribute(d,V?V+" "+m:m);else{var q=V&&V.replace(m,"").trim();q?O.setAttribute(d,q):O.removeAttribute(d)}})}}function J(){if(!(P||!i.props.aria.expanded)){var o=xe(i.props.triggerTarget||e);o.forEach(function(d){i.props.interactive?d.setAttribute("aria-expanded",i.state.isVisible&&d===S()?"true":"false"):d.removeAttribute("aria-expanded")})}}function ce(){W().removeEventListener("mousemove",w),Ze=Ze.filter(function(o){return o!==w})}function Q(o){if(!(Z.isTouch&&(u||o.type==="mousedown"))){var d=o.composedPath&&o.composedPath()[0]||o.target;if(!(i.props.interactive&&Ht(v,d))){if(xe(i.props.triggerTarget||e).some(function(m){return Ht(m,d)})){if(Z.isTouch||i.state.isVisible&&i.props.trigger.indexOf("click")>=0)return}else $("onClickOutside",[i,o]);i.props.hideOnClick===!0&&(i.clearDelayTimeouts(),i.hide(),c=!0,setTimeout(function(){c=!1}),i.state.isMounted||ne())}}}function pe(){u=!0}function re(){u=!1}function _(){var o=W();o.addEventListener("mousedown",Q,!0),o.addEventListener("touchend",Q,ve),o.addEventListener("touchstart",re,ve),o.addEventListener("touchmove",pe,ve)}function ne(){var o=W();o.removeEventListener("mousedown",Q,!0),o.removeEventListener("touchend",Q,ve),o.removeEventListener("touchstart",re,ve),o.removeEventListener("touchmove",pe,ve)}function ge(o,d){ye(o,function(){!i.state.isVisible&&v.parentNode&&v.parentNode.contains(v)&&d()})}function ie(o,d){ye(o,d)}function ye(o,d){var m=U().box;function T(O){O.target===m&&(ft(m,"remove",T),d())}if(o===0)return d();ft(m,"remove",b),ft(m,"add",T),b=T}function se(o,d,m){m===void 0&&(m=!1);var T=xe(i.props.triggerTarget||e);T.forEach(function(O){O.addEventListener(o,d,m),h.push({node:O,eventType:o,handler:d,options:m})})}function be(){j()&&(se("touchstart",Ce,{passive:!0}),se("touchend",Fe,{passive:!0})),wn(i.props.trigger).forEach(function(o){if(o!=="manual")switch(se(o,Ce),o){case"mouseenter":se("mouseleave",Fe);break;case"focus":se(Bn?"focusout":"blur",Le);break;case"focusin":se("focusout",Le);break}})}function We(){h.forEach(function(o){var d=o.node,m=o.eventType,T=o.handler,O=o.options;d.removeEventListener(m,T,O)}),h=[]}function Ce(o){var d,m=!1;if(!(!i.state.isEnabled||Se(o)||c)){var T=((d=p)==null?void 0:d.type)==="focus";p=o,g=o.currentTarget,J(),!i.state.isVisible&&En(o)&&Ze.forEach(function(O){return O(o)}),o.type==="click"&&(i.props.trigger.indexOf("mouseenter")<0||f)&&i.props.hideOnClick!==!1&&i.state.isVisible?m=!0:Me(o),o.type==="click"&&(f=!m),m&&!T&&le(o)}}function Ue(o){var d=o.target,m=S().contains(d)||v.contains(d);if(!(o.type==="mousemove"&&m)){var T=ue().concat(v).map(function(O){var V,q=O._tippy,we=(V=q.popperInstance)==null?void 0:V.state;return we?{popperRect:O.getBoundingClientRect(),popperState:we,props:r}:null}).filter(Boolean);Ln(T,o)&&(ce(),le(o))}}function Fe(o){var d=Se(o)||i.props.trigger.indexOf("click")>=0&&f;if(!d){if(i.props.interactive){i.hideWithInteractivity(o);return}le(o)}}function Le(o){i.props.trigger.indexOf("focusin")<0&&o.target!==S()||i.props.interactive&&o.relatedTarget&&v.contains(o.relatedTarget)||le(o)}function Se(o){return Z.isTouch?j()!==o.type.indexOf("touch")>=0:!1}function qe(){ze();var o=i.props,d=o.popperOptions,m=o.placement,T=o.offset,O=o.getReferenceClientRect,V=o.moveTransition,q=R()?vt(v).arrow:null,we=O?{getBoundingClientRect:O,contextElement:O.contextElement||S()}:e,At={name:"$$tippy",enabled:!0,phase:"beforeWrite",requires:["computeStyles"],fn:function(Ke){var Oe=Ke.state;if(R()){var pr=U(),ot=pr.box;["placement","reference-hidden","escaped"].forEach(function(Je){Je==="placement"?ot.setAttribute("data-placement",Oe.placement):Oe.attributes.popper["data-popper-"+Je]?ot.setAttribute("data-"+Je,""):ot.removeAttribute("data-"+Je)}),Oe.attributes.popper={}}}},de=[{name:"offset",options:{offset:T}},{name:"preventOverflow",options:{padding:{top:2,bottom:2,left:5,right:5}}},{name:"flip",options:{padding:5}},{name:"computeStyles",options:{adaptive:!V}},At];R()&&q&&de.push({name:"arrow",options:{element:q,padding:3}}),de.push.apply(de,d?.modifiers||[]),i.popperInstance=gn(we,v,Object.assign({},d,{placement:m,onFirstUpdate:x,modifiers:de}))}function ze(){i.popperInstance&&(i.popperInstance.destroy(),i.popperInstance=null)}function ae(){var o=i.props.appendTo,d,m=S();i.props.interactive&&o===tr||o==="parent"?d=m.parentNode:d=rr(o,[m]),d.contains(v)||d.appendChild(v),i.state.isMounted=!0,qe()}function ue(){return rt(v.querySelectorAll("[data-tippy-root]"))}function Me(o){i.clearDelayTimeouts(),o&&$("onTrigger",[i,o]),_();var d=k(!0),m=M(),T=m[0],O=m[1];Z.isTouch&&T==="hold"&&O&&(d=O),d?n=setTimeout(function(){i.show()},d):i.show()}function le(o){if(i.clearDelayTimeouts(),$("onUntrigger",[i,o]),!i.state.isVisible){ne();return}if(!(i.props.trigger.indexOf("mouseenter")>=0&&i.props.trigger.indexOf("click")>=0&&["mouseleave","mousemove"].indexOf(o.type)>=0&&f)){var d=k(!1);d?a=setTimeout(function(){i.state.isVisible&&i.hide()},d):s=requestAnimationFrame(function(){i.hide()})}}function Re(){i.state.isEnabled=!0}function Xe(){i.hide(),i.state.isEnabled=!1}function Ye(){clearTimeout(n),clearTimeout(a),cancelAnimationFrame(s)}function _e(o){if(!i.state.isDestroyed){$("onBeforeUpdate",[i,o]),We();var d=i.props,m=It(e,Object.assign({},d,$t(o),{ignoreAttributes:!0}));i.props=m,be(),d.interactiveDebounce!==m.interactiveDebounce&&(ce(),w=Bt(Ue,m.interactiveDebounce)),d.triggerTarget&&!m.triggerTarget?xe(d.triggerTarget).forEach(function(T){T.removeAttribute("aria-expanded")}):m.triggerTarget&&e.removeAttribute("aria-expanded"),J(),H(),C&&C(d,m),i.popperInstance&&(qe(),ue().forEach(function(T){requestAnimationFrame(T._tippy.popperInstance.forceUpdate)})),$("onAfterUpdate",[i,o])}}function Ge(o){i.setProps({content:o})}function or(){var o=i.state.isVisible,d=i.state.isDestroyed,m=!i.state.isEnabled,T=Z.isTouch&&!i.props.touch,O=st(i.props.duration,0,G.duration);if(!(o||d||m||T)&&!S().hasAttribute("disabled")&&($("onShow",[i],!1),i.props.onShow(i)!==!1)){if(i.state.isVisible=!0,R()&&(v.style.visibility="visible"),H(),_(),i.state.isMounted||(v.style.transition="none"),R()){var V=U(),q=V.box,we=V.content;ut([q,we],0)}x=function(){var de;if(!(!i.state.isVisible||l)){if(l=!0,v.offsetHeight,v.style.transition=i.props.moveTransition,R()&&i.props.animation){var at=U(),Ke=at.box,Oe=at.content;ut([Ke,Oe],O),kt([Ke,Oe],"visible")}K(),J(),jt(ct,i),(de=i.popperInstance)==null||de.forceUpdate(),$("onMount",[i]),i.props.animation&&R()&&ie(O,function(){i.state.isShown=!0,$("onShown",[i])})}},ae()}}function sr(){var o=!i.state.isVisible,d=i.state.isDestroyed,m=!i.state.isEnabled,T=st(i.props.duration,1,G.duration);if(!(o||d||m)&&($("onHide",[i],!1),i.props.onHide(i)!==!1)){if(i.state.isVisible=!1,i.state.isShown=!1,l=!1,f=!1,R()&&(v.style.visibility="hidden"),ce(),ne(),H(!0),R()){var O=U(),V=O.box,q=O.content;i.props.animation&&(ut([V,q],T),kt([V,q],"hidden"))}K(),J(),i.props.animation?R()&&ge(T,i.unmount):i.unmount()}}function ur(o){W().addEventListener("mousemove",w),jt(Ze,w),w(o)}function fr(){i.state.isVisible&&i.hide(),i.state.isMounted&&(ze(),ue().forEach(function(o){o._tippy.unmount()}),v.parentNode&&v.parentNode.removeChild(v),ct=ct.filter(function(o){return o!==i}),i.state.isMounted=!1,$("onHidden",[i]))}function cr(){i.state.isDestroyed||(i.clearDelayTimeouts(),i.unmount(),We(),delete e._tippy,i.state.isDestroyed=!0,$("onDestroy",[i]))}}function Ne(e,t){t===void 0&&(t={});var r=G.plugins.concat(t.plugins||[]);Rn();var n=Object.assign({},t,{plugins:r}),a=Dn(e),s=a.reduce(function(f,c){var u=c&&Wn(c,n);return u&&f.push(u),f},[]);return it(e)?s[0]:s}Ne.defaultProps=G;Ne.setDefaultProps=Hn;Ne.currentInput=Z;Object.assign({},qt,{effect:function(t){var r=t.state,n={popper:{position:r.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};Object.assign(r.elements.popper.style,n.popper),r.styles=n,r.elements.arrow&&Object.assign(r.elements.arrow.style,n.arrow)}});Ne.setDefaultProps({render:ar});document.addEventListener("DOMContentLoaded",()=>{document.querySelectorAll(".tooltip-wrapper").forEach(t=>{const r=t.querySelector(".tooltip-trigger"),n=t.querySelector("#tooltip-content");r&&n&&Ne(r,{content:n.innerHTML,allowHTML:!0,theme:"light",placement:"bottom",animation:"fade",duration:200,delay:[200,0],interactive:!0,appendTo:document.body})})});
