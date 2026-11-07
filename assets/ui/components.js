var p=(t,e,o)=>()=>{if(o)throw o[0];try{return t&&(e=t(t=0)),e}catch(r){throw o=[r],r}};var Yi=(t,e)=>()=>{try{return e||t((e={exports:{}}).exports,e),e.exports}catch(o){throw e=0,o}};var zr=p(()=>{});var Er,Be=p(()=>{Er=()=>({checkValidity(t){let e=t.input,o={message:"",isValid:!0,invalidKeys:[]};if(!e)return o;let r=!0;if("checkValidity"in e&&(r=e.checkValidity()),r)return o;if(o.isValid=!1,"validationMessage"in e&&(o.message=e.validationMessage),!("validity"in e))return o.invalidKeys.push("customError"),o;for(let a in e.validity){if(a==="valid")continue;let i=a;e.validity[i]&&o.invalidKeys.push(i)}return o}})});var De,me=p(()=>{De=class extends Event{constructor(){super("wa-invalid",{bubbles:!0,cancelable:!1,composed:!0})}}});var Ki,Gi,kr,c,$r,_r,Pr,Mr,R=p(()=>{Ki=Object.defineProperty,Gi=Object.getOwnPropertyDescriptor,kr=t=>{throw TypeError(t)},c=(t,e,o,r)=>{for(var a=r>1?void 0:r?Gi(e,o):e,i=t.length-1,n;i>=0;i--)(n=t[i])&&(a=(r?n(e,o,a):n(a))||a);return r&&a&&Ki(e,o,a),a},$r=(t,e,o)=>e.has(t)||kr("Cannot "+o),_r=(t,e,o)=>($r(t,e,"read from private field"),o?o.call(t):e.get(t)),Pr=(t,e,o)=>e.has(t)?kr("Cannot add the same private member more than once"):e instanceof WeakSet?e.add(t):e.set(t,o),Mr=(t,e,o,r)=>($r(t,e,"write to private field"),r?r.call(t,o):e.set(t,o),o)});var qe,Ne,Mo,Fr,he,Rr,z,Or,Fo,Ro=p(()=>{qe=globalThis,Ne=qe.ShadowRoot&&(qe.ShadyCSS===void 0||qe.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Mo=Symbol(),Fr=new WeakMap,he=class{constructor(e,o,r){if(this._$cssResult$=!0,r!==Mo)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=o}get styleSheet(){let e=this.o,o=this.t;if(Ne&&e===void 0){let r=o!==void 0&&o.length===1;r&&(e=Fr.get(o)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Fr.set(o,e))}return e}toString(){return this.cssText}},Rr=t=>new he(typeof t=="string"?t:t+"",void 0,Mo),z=(t,...e)=>{let o=t.length===1?t[0]:e.reduce((r,a,i)=>r+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(a)+t[i+1],t[0]);return new he(o,t,Mo)},Or=(t,e)=>{if(Ne)t.adoptedStyleSheets=e.map(o=>o instanceof CSSStyleSheet?o:o.styleSheet);else for(let o of e){let r=document.createElement("style"),a=qe.litNonce;a!==void 0&&r.setAttribute("nonce",a),r.textContent=o.cssText,t.appendChild(r)}},Fo=Ne?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let o="";for(let r of e.cssRules)o+=r.cssText;return Rr(o)})(t):t});var Qi,Zi,Ji,tn,en,on,Ue,Tr,rn,an,pe,fe,He,Ir,mt,we=p(()=>{Ro();Ro();({is:Qi,defineProperty:Zi,getOwnPropertyDescriptor:Ji,getOwnPropertyNames:tn,getOwnPropertySymbols:en,getPrototypeOf:on}=Object),Ue=globalThis,Tr=Ue.trustedTypes,rn=Tr?Tr.emptyScript:"",an=Ue.reactiveElementPolyfillSupport,pe=(t,e)=>t,fe={toAttribute(t,e){switch(e){case Boolean:t=t?rn:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let o=t;switch(e){case Boolean:o=t!==null;break;case Number:o=t===null?null:Number(t);break;case Object:case Array:try{o=JSON.parse(t)}catch{o=null}}return o}},He=(t,e)=>!Qi(t,e),Ir={attribute:!0,type:String,converter:fe,reflect:!1,useDefault:!1,hasChanged:He};Symbol.metadata??=Symbol("metadata"),Ue.litPropertyMetadata??=new WeakMap;mt=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,o=Ir){if(o.state&&(o.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((o=Object.create(o)).wrapped=!0),this.elementProperties.set(e,o),!o.noAccessor){let r=Symbol(),a=this.getPropertyDescriptor(e,r,o);a!==void 0&&Zi(this.prototype,e,a)}}static getPropertyDescriptor(e,o,r){let{get:a,set:i}=Ji(this.prototype,e)??{get(){return this[o]},set(n){this[o]=n}};return{get:a,set(n){let s=a?.call(this);i?.call(this,n),this.requestUpdate(e,s,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Ir}static _$Ei(){if(this.hasOwnProperty(pe("elementProperties")))return;let e=on(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(pe("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(pe("properties"))){let o=this.properties,r=[...tn(o),...en(o)];for(let a of r)this.createProperty(a,o[a])}let e=this[Symbol.metadata];if(e!==null){let o=litPropertyMetadata.get(e);if(o!==void 0)for(let[r,a]of o)this.elementProperties.set(r,a)}this._$Eh=new Map;for(let[o,r]of this.elementProperties){let a=this._$Eu(o,r);a!==void 0&&this._$Eh.set(a,o)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){let o=[];if(Array.isArray(e)){let r=new Set(e.flat(1/0).reverse());for(let a of r)o.unshift(Fo(a))}else e!==void 0&&o.push(Fo(e));return o}static _$Eu(e,o){let r=o.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),this.renderRoot!==void 0&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){let e=new Map,o=this.constructor.elementProperties;for(let r of o.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){let e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Or(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,o,r){this._$AK(e,r)}_$ET(e,o){let r=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,r);if(a!==void 0&&r.reflect===!0){let i=(r.converter?.toAttribute!==void 0?r.converter:fe).toAttribute(o,r.type);this._$Em=e,i==null?this.removeAttribute(a):this.setAttribute(a,i),this._$Em=null}}_$AK(e,o){let r=this.constructor,a=r._$Eh.get(e);if(a!==void 0&&this._$Em!==a){let i=r.getPropertyOptions(a),n=typeof i.converter=="function"?{fromAttribute:i.converter}:i.converter?.fromAttribute!==void 0?i.converter:fe;this._$Em=a;let s=n.fromAttribute(o,i.type);this[a]=s??this._$Ej?.get(a)??s,this._$Em=null}}requestUpdate(e,o,r,a=!1,i){if(e!==void 0){let n=this.constructor;if(a===!1&&(i=this[e]),r??=n.getPropertyOptions(e),!((r.hasChanged??He)(i,o)||r.useDefault&&r.reflect&&i===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,o,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,o,{useDefault:r,reflect:a,wrapped:i},n){r&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??o??this[e]),i!==!0||n!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(o=void 0),this._$AL.set(e,o)),a===!0&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(o){Promise.reject(o)}let e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[a,i]of this._$Ep)this[a]=i;this._$Ep=void 0}let r=this.constructor.elementProperties;if(r.size>0)for(let[a,i]of r){let{wrapped:n}=i,s=this[a];n!==!0||this._$AL.has(a)||s===void 0||this.C(a,void 0,i,s)}}let e=!1,o=this._$AL;try{e=this.shouldUpdate(o),e?(this.willUpdate(o),this._$EO?.forEach(r=>r.hostUpdate?.()),this.update(o)):this._$EM()}catch(r){throw e=!1,this._$EM(),r}e&&this._$AE(o)}willUpdate(e){}_$AE(e){this._$EO?.forEach(o=>o.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(o=>this._$ET(o,this[o])),this._$EM()}updated(e){}firstUpdated(e){}};mt.elementStyles=[],mt.shadowRootOptions={mode:"open"},mt[pe("elementProperties")]=new Map,mt[pe("finalized")]=new Map,an?.({ReactiveElement:mt}),(Ue.reactiveElementVersions??=[]).push("2.1.2")});function Kr(t,e){if(!Do(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Dr!==void 0?Dr.createHTML(e):e}function Mt(t,e,o=t,r){if(e===pt)return e;let a=r!==void 0?o._$Co?.[r]:o._$Cl,i=be(e)?void 0:e._$litDirective$;return a?.constructor!==i&&(a?._$AO?.(!1),i===void 0?a=void 0:(a=new i(t),a._$AT(t,o,r)),r!==void 0?(o._$Co??=[])[r]=a:o._$Cl=a),a!==void 0&&(e=Mt(t,a._$AS(t,e.values),a,r)),e}var To,Br,We,Dr,Io,ht,Bo,nn,Pt,ve,be,Do,Vr,Oo,ge,qr,Nr,$t,Ur,Hr,jr,qo,A,Xr,Yr,pt,M,Wr,_t,Gr,ye,Ve,Jt,Ft,je,Xe,Ye,Ke,Qr,sn,Zr,yt=p(()=>{To=globalThis,Br=t=>t,We=To.trustedTypes,Dr=We?We.createPolicy("lit-html",{createHTML:t=>t}):void 0,Io="$lit$",ht=`lit$${Math.random().toFixed(9).slice(2)}$`,Bo="?"+ht,nn=`<${Bo}>`,Pt=document,ve=()=>Pt.createComment(""),be=t=>t===null||typeof t!="object"&&typeof t!="function",Do=Array.isArray,Vr=t=>Do(t)||typeof t?.[Symbol.iterator]=="function",Oo=`[ 	
\f\r]`,ge=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qr=/-->/g,Nr=/>/g,$t=RegExp(`>|${Oo}(?:([^\\s"'>=/]+)(${Oo}*=${Oo}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ur=/'/g,Hr=/"/g,jr=/^(?:script|style|textarea|title)$/i,qo=t=>(e,...o)=>({_$litType$:t,strings:e,values:o}),A=qo(1),Xr=qo(2),Yr=qo(3),pt=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),Wr=new WeakMap,_t=Pt.createTreeWalker(Pt,129);Gr=(t,e)=>{let o=t.length-1,r=[],a,i=e===2?"<svg>":e===3?"<math>":"",n=ge;for(let s=0;s<o;s++){let l=t[s],d,u,h=-1,f=0;for(;f<l.length&&(n.lastIndex=f,u=n.exec(l),u!==null);)f=n.lastIndex,n===ge?u[1]==="!--"?n=qr:u[1]!==void 0?n=Nr:u[2]!==void 0?(jr.test(u[2])&&(a=RegExp("</"+u[2],"g")),n=$t):u[3]!==void 0&&(n=$t):n===$t?u[0]===">"?(n=a??ge,h=-1):u[1]===void 0?h=-2:(h=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?$t:u[3]==='"'?Hr:Ur):n===Hr||n===Ur?n=$t:n===qr||n===Nr?n=ge:(n=$t,a=void 0);let w=n===$t&&t[s+1].startsWith("/>")?" ":"";i+=n===ge?l+nn:h>=0?(r.push(d),l.slice(0,h)+Io+l.slice(h)+ht+w):l+ht+(h===-2?s:w)}return[Kr(t,i+(t[o]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]},ye=class t{constructor({strings:e,_$litType$:o},r){let a;this.parts=[];let i=0,n=0,s=e.length-1,l=this.parts,[d,u]=Gr(e,o);if(this.el=t.createElement(d,r),_t.currentNode=this.el.content,o===2||o===3){let h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(a=_t.nextNode())!==null&&l.length<s;){if(a.nodeType===1){if(a.hasAttributes())for(let h of a.getAttributeNames())if(h.endsWith(Io)){let f=u[n++],w=a.getAttribute(h).split(ht),g=/([.?@])?(.*)/.exec(f);l.push({type:1,index:i,name:g[2],strings:w,ctor:g[1]==="."?je:g[1]==="?"?Xe:g[1]==="@"?Ye:Ft}),a.removeAttribute(h)}else h.startsWith(ht)&&(l.push({type:6,index:i}),a.removeAttribute(h));if(jr.test(a.tagName)){let h=a.textContent.split(ht),f=h.length-1;if(f>0){a.textContent=We?We.emptyScript:"";for(let w=0;w<f;w++)a.append(h[w],ve()),_t.nextNode(),l.push({type:2,index:++i});a.append(h[f],ve())}}}else if(a.nodeType===8)if(a.data===Bo)l.push({type:2,index:i});else{let h=-1;for(;(h=a.data.indexOf(ht,h+1))!==-1;)l.push({type:7,index:i}),h+=ht.length-1}i++}}static createElement(e,o){let r=Pt.createElement("template");return r.innerHTML=e,r}};Ve=class{constructor(e,o){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=o}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){let{el:{content:o},parts:r}=this._$AD,a=(e?.creationScope??Pt).importNode(o,!0);_t.currentNode=a;let i=_t.nextNode(),n=0,s=0,l=r[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new Jt(i,i.nextSibling,this,e):l.type===1?d=new l.ctor(i,l.name,l.strings,this,e):l.type===6&&(d=new Ke(i,this,e)),this._$AV.push(d),l=r[++s]}n!==l?.index&&(i=_t.nextNode(),n++)}return _t.currentNode=Pt,a}p(e){let o=0;for(let r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,o),o+=r.strings.length-2):r._$AI(e[o])),o++}},Jt=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,o,r,a){this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=e,this._$AB=o,this._$AM=r,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode,o=this._$AM;return o!==void 0&&e?.nodeType===11&&(e=o.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,o=this){e=Mt(this,e,o),be(e)?e===M||e==null||e===""?(this._$AH!==M&&this._$AR(),this._$AH=M):e!==this._$AH&&e!==pt&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Vr(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==M&&be(this._$AH)?this._$AA.nextSibling.data=e:this.T(Pt.createTextNode(e)),this._$AH=e}$(e){let{values:o,_$litType$:r}=e,a=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=ye.createElement(Kr(r.h,r.h[0]),this.options)),r);if(this._$AH?._$AD===a)this._$AH.p(o);else{let i=new Ve(a,this),n=i.u(this.options);i.p(o),this.T(n),this._$AH=i}}_$AC(e){let o=Wr.get(e.strings);return o===void 0&&Wr.set(e.strings,o=new ye(e)),o}k(e){Do(this._$AH)||(this._$AH=[],this._$AR());let o=this._$AH,r,a=0;for(let i of e)a===o.length?o.push(r=new t(this.O(ve()),this.O(ve()),this,this.options)):r=o[a],r._$AI(i),a++;a<o.length&&(this._$AR(r&&r._$AB.nextSibling,a),o.length=a)}_$AR(e=this._$AA.nextSibling,o){for(this._$AP?.(!1,!0,o);e!==this._$AB;){let r=Br(e).nextSibling;Br(e).remove(),e=r}}setConnected(e){this._$AM===void 0&&(this._$Cv=e,this._$AP?.(e))}},Ft=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,o,r,a,i){this.type=1,this._$AH=M,this._$AN=void 0,this.element=e,this.name=o,this._$AM=a,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=M}_$AI(e,o=this,r,a){let i=this.strings,n=!1;if(i===void 0)e=Mt(this,e,o,0),n=!be(e)||e!==this._$AH&&e!==pt,n&&(this._$AH=e);else{let s=e,l,d;for(e=i[0],l=0;l<i.length-1;l++)d=Mt(this,s[r+l],o,l),d===pt&&(d=this._$AH[l]),n||=!be(d)||d!==this._$AH[l],d===M?e=M:e!==M&&(e+=(d??"")+i[l+1]),this._$AH[l]=d}n&&!a&&this.j(e)}j(e){e===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}},je=class extends Ft{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===M?void 0:e}},Xe=class extends Ft{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==M)}},Ye=class extends Ft{constructor(e,o,r,a,i){super(e,o,r,a,i),this.type=5}_$AI(e,o=this){if((e=Mt(this,e,o,0)??M)===pt)return;let r=this._$AH,a=e===M&&r!==M||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==M&&(r===M||a);a&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}},Ke=class{constructor(e,o,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=o,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){Mt(this,e)}},Qr={M:Io,P:ht,A:Bo,C:1,L:Gr,R:Ve,D:Vr,V:Mt,I:Jt,H:Ft,N:Xe,U:Ye,B:je,F:Ke},sn=To.litHtmlPolyfillSupport;sn?.(ye,Jt),(To.litHtmlVersions??=[]).push("3.3.3");Zr=(t,e,o)=>{let r=o?.renderBefore??e,a=r._$litPart$;if(a===void 0){let i=o?.renderBefore??null;r._$litPart$=a=new Jt(e.insertBefore(ve(),i),i,void 0,o??{})}return a._$AI(t),a}});var No,Ct,ln,Jr=p(()=>{we();we();yt();yt();No=globalThis,Ct=class extends mt{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){let o=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Zr(o,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return pt}};Ct._$litElement$=!0,Ct.finalized=!0,No.litElementHydrateSupport?.({LitElement:Ct});ln=No.litElementPolyfillSupport;ln?.({LitElement:Ct});(No.litElementVersions??=[]).push("4.2.2")});var ta=p(()=>{});var k=p(()=>{we();yt();Jr();ta()});var T,ea=p(()=>{T=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)}});function m(t){return(e,o)=>typeof o=="object"?dn(t,e,o):((r,a,i)=>{let n=a.hasOwnProperty(i);return a.constructor.createProperty(i,r),n?Object.getOwnPropertyDescriptor(a,i):void 0})(t,e,o)}var cn,dn,Uo=p(()=>{we();cn={attribute:!0,type:String,converter:fe,reflect:!1,hasChanged:He},dn=(t=cn,e,o)=>{let{kind:r,metadata:a}=o,i=globalThis.litPropertyMetadata.get(a);if(i===void 0&&globalThis.litPropertyMetadata.set(a,i=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),i.set(o.name,t),r==="accessor"){let{name:n}=o;return{set(s){let l=e.get.call(this);e.set.call(this,s),this.requestUpdate(n,l,t,!0,s)},init(s){return s!==void 0&&this.C(n,void 0,t,s),s}}}if(r==="setter"){let{name:n}=o;return function(s){let l=this[n];e.call(this,s),this.requestUpdate(n,l,t,!0,s)}}throw Error("Unsupported decorator location: "+r)}});function Rt(t){return m({...t,state:!0,attribute:!1})}var oa=p(()=>{Uo();});var ra=p(()=>{});var Ot,te=p(()=>{Ot=(t,e,o)=>(o.configurable=!0,o.enumerable=!0,Reflect.decorate&&typeof e!="object"&&Object.defineProperty(t,e,o),o)});function N(t,e){return(o,r,a)=>{let i=n=>n.renderRoot?.querySelector(t)??null;if(e){let{get:n,set:s}=typeof r=="object"?o:a??(()=>{let l=Symbol();return{get(){return this[l]},set(d){this[l]=d}}})();return Ot(o,r,{get(){let l=n.call(this);return l===void 0&&(l=i(this),(l!==null||this.hasUpdated)&&s.call(this,l)),l}})}return Ot(o,r,{get(){return i(this)}})}}var aa=p(()=>{te();});var ia=p(()=>{te();});var na=p(()=>{te();});var sa=p(()=>{te();});var la=p(()=>{te();});var j=p(()=>{ea();Uo();oa();ra();aa();ia();na();sa();la()});function hn(t){return t.replace(/[A-Z]/g,e=>`-${e.toLowerCase()}`)}function ca(t){let{property:e,value:o,element:r}=t;if(o){let a=r.getAttribute("style")||"";a&&(a.match(mn)||(a+=";"),a+=" ");let i=`${e}: ${o}`;return a.includes(i)?void 0:`${a}${i};`}return null}var un,mn,Ge,P,I=p(()=>{R();k();k();j();un=z`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden],
  :host([hidden]) {
    display: none !important;
  }
`,mn=/;\s+$/;P=class extends Ct{constructor(){super(),Pr(this,Ge,!1),this.initialReflectedProperties=new Map,this.didSSR=!!this.shadowRoot,this.customStates={set:(e,o)=>{if(this.internals?.states)try{o?this.internals.states.add(e):this.internals.states.delete(e)}catch(r){if(String(r).includes("must start with '--'"))console.error("Your browser implements an outdated version of CustomStateSet. Consider using a polyfill");else throw r}},has:e=>{if(!this.internals?.states)return!1;try{return this.internals.states.has(e)}catch{return!1}}};try{this.internals=this.attachInternals()}catch{console.error("Element internals are not supported in your browser. Consider using a polyfill")}this.customStates.set("wa-defined",!0);let t=this.constructor;for(let[e,o]of t.elementProperties)o.default==="inherit"&&o.initial!==void 0&&typeof e=="string"&&this.customStates.set(`initial-${e}-${o.initial}`,!0)}static get styles(){let t=Array.isArray(this.css)?this.css:this.css?[this.css]:[];return[un,...t]}connectedCallback(){super.connectedCallback(),this.didSSR||this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `)),this.didSSR&&this.updateComplete.then(()=>{this.shadowRoot?.prepend(document.createComment(` Web Awesome: https://webawesome.com/docs/components/${this.localName.replace("wa-","")} `))})}attributeChangedCallback(t,e,o){_r(this,Ge)||(this.constructor.elementProperties.forEach((r,a)=>{r.reflect&&this[a]!=null&&this.initialReflectedProperties.set(a,this[a])}),Mr(this,Ge,!0)),super.attributeChangedCallback(t,e,o)}willUpdate(t){super.willUpdate(t),this.initialReflectedProperties.forEach((e,o)=>{t.has(o)&&this[o]==null&&(this[o]=e)})}firstUpdated(t){super.firstUpdated(t),this.didSSR&&this.shadowRoot?.querySelectorAll("slot").forEach(e=>{e.dispatchEvent(new Event("slotchange",{bubbles:!0,composed:!1,cancelable:!1}))})}update(t){try{super.update(t)}catch(e){if(this.didSSR&&!this.hasUpdated){let o=new Event("lit-hydration-error",{bubbles:!0,composed:!0,cancelable:!1});o.error=e,this.dispatchEvent(o)}throw e}}setStyle(t,e){if(!this.style){let o=ca({property:hn(t),value:e,element:this});o&&this.setAttribute("style",o);return}this.style[t]=e}setStyleProperty(t,e){if(!this.style){let o=ca({property:t,value:e,element:this});o&&this.setAttribute("style",o);return}this.style.setProperty(t,e)}relayNativeEvent(t,e){t.stopImmediatePropagation(),this.dispatchEvent(new t.constructor(t.type,{...t,...e}))}};Ge=new WeakMap;c([m()],P.prototype,"dir",2);c([m()],P.prototype,"lang",2);c([m({type:Boolean,reflect:!0,attribute:"did-ssr"})],P.prototype,"didSSR",2)});var pn,it,Qe=p(()=>{me();I();R();k();j();pn=()=>({observedAttributes:["custom-error"],checkValidity(t){let e={message:"",isValid:!0,invalidKeys:[]};return t.customError&&(e.message=t.customError,e.isValid=!1,e.invalidKeys=["customError"]),e}}),it=class extends P{constructor(){super(),this.name=null,this.disabled=!1,this.required=!1,this.assumeInteractionOn=["input"],this.validators=[],this.valueHasChanged=!1,this.hasInteracted=!1,this.customError=null,this.emittedEvents=[],this.emitInvalid=t=>{t.target===this&&(this.hasInteracted=!0,this.dispatchEvent(new De))},this.handleInteraction=t=>{let e=this.emittedEvents;e.includes(t.type)||e.push(t.type),e.length===this.assumeInteractionOn?.length&&(this.hasInteracted=!0)},"addEventListener"in this&&this.addEventListener("invalid",this.emitInvalid)}static get validators(){return[pn()]}static get observedAttributes(){let t=new Set(super.observedAttributes||[]);for(let e of this.validators)if(e.observedAttributes)for(let o of e.observedAttributes)t.add(o);return[...t]}connectedCallback(){super.connectedCallback(),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.updateValidity()}):this.updateValidity(),this.assumeInteractionOn.forEach(t=>{this.addEventListener?.(t,this.handleInteraction)})}firstUpdated(...t){super.firstUpdated(...t),this.updateValidity()}willUpdate(t){if(!!1&&t.has("customError")&&(this.customError||(this.customError=null),this.setCustomValidity(this.customError||"")),t.has("value")||t.has("disabled")||t.has("defaultValue")){let e=this.value;this.updateFormValue(e)}t.has("disabled")&&(this.customStates.set("disabled",this.disabled),(this.hasAttribute("disabled")||!!1&&!this.matches(":disabled"))&&this.toggleAttribute("disabled",this.disabled)),super.willUpdate(t),this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>this.updateValidity()):this.updateValidity()}updateFormValue(t){if(Array.isArray(t)){if(this.name){let e=new FormData;for(let o of t)e.append(this.name,o);this.setValue(e,e)}}else this.setValue(t,t)}get labels(){return this.internals.labels}getForm(){return this.internals.form}set form(t){t?this.setAttribute("form",t):this.removeAttribute("form")}get form(){return this.internals.form}get validity(){return this.internals.validity}get willValidate(){return this.internals.willValidate}get validationMessage(){return this.internals.validationMessage}checkValidity(){return this.updateValidity(),this.internals.checkValidity()}reportValidity(){return this.updateValidity(),this.hasInteracted=!0,this.internals.reportValidity()}get validationTarget(){return this.input||void 0}setValidity(...t){let e=t[0],o=t[1],r=t[2];r||(r=this.validationTarget),this.internals.setValidity(e,o,r||void 0),this.requestUpdate("validity"),this.setCustomStates()}setCustomStates(){let t=!!this.required,e=this.internals.validity.valid,o=this.hasInteracted;this.customStates.set("required",t),this.customStates.set("optional",!t),this.customStates.set("invalid",!e),this.customStates.set("valid",e),this.customStates.set("user-invalid",!e&&o),this.customStates.set("user-valid",e&&o)}setCustomValidity(t){if(!t){this.customError=null,this.setValidity({});return}this.customError=t,this.setValidity({customError:!0},t,this.validationTarget)}formResetCallback(){this.resetValidity(),this.hasInteracted=!1,this.valueHasChanged=!1,this.emittedEvents=[],this.updateValidity()}formDisabledCallback(t){this.disabled=t,this.updateValidity()}formStateRestoreCallback(t,e){this.didSSR&&!this.hasUpdated?this.updateComplete.then(()=>{this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity()}):(this.value=t,e==="restore"&&this.resetValidity(),this.updateValidity())}setValue(...t){let[e,o]=t;this.internals.setFormValue(e,o)}get allValidators(){let t=this.constructor.validators||[],e=this.validators||[];return[...t,...e]}resetValidity(){this.setCustomValidity(""),this.setValidity({})}updateValidity(){if(this.disabled||this.hasAttribute("disabled")||!this.willValidate){this.resetValidity();return}let t=this.allValidators;if(!t?.length)return;let e={customError:!!this.customError},o=this.validationTarget||this.input||void 0,r="";for(let a of t){let{isValid:i,message:n,invalidKeys:s}=a.checkValidity(this);i||(r||(r=n),s?.length>=0&&s.forEach(l=>e[l]=!0))}r||(r=this.validationMessage),this.setValidity(e,r,o)}};it.formAssociated=!0;c([m({reflect:!0})],it.prototype,"name",2);c([m({type:Boolean})],it.prototype,"disabled",2);c([m({state:!0,attribute:!1})],it.prototype,"valueHasChanged",2);c([m({state:!0,attribute:!1})],it.prototype,"hasInteracted",2);c([m({attribute:"custom-error",reflect:!0})],it.prototype,"customError",2);c([m({attribute:!1,state:!0,type:Object})],it.prototype,"validity",1)});function ee(t,e){e in da&&!ua.has(`${t}:${e}`)&&(ua.add(`${t}:${e}`),console.warn(`[${t}] size="${e}" is deprecated. Use size="${da[e]}" instead. The long-form value will be removed in the next major version.`))}var da,ua,xt=p(()=>{da={small:"s",medium:"m",large:"l"},ua=new Set});var Lt,nt=p(()=>{Lt=class{constructor(t,...e){this.slotNames=[],this.handleSlotChange=o=>{let r=o.target;(this.slotNames.includes("[default]")&&!r.name||r.name&&this.slotNames.includes(r.name))&&this.host.requestUpdate()},(this.host=t).addController(this),this.slotNames=e}hasDefaultSlot(){return this.host.childNodes?[...this.host.childNodes].some(t=>{if(t.nodeType===Node.TEXT_NODE&&t.textContent.trim()!=="")return!0;if(t.nodeType===Node.ELEMENT_NODE){let e=t;if(e.tagName.toLowerCase()==="wa-visually-hidden")return!1;if(!e.hasAttribute("slot"))return!0}return!1}):!1}hasNamedSlot(t){return this.host.querySelector?.(`:scope > [slot="${t}"]`)!==null}test(t,e){return e&&this.host.didSSR&&!this.host.hasUpdated?!!this.host[e]:t==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(t)}hostConnected(){let t=this.host.shadowRoot;t&&"addEventListener"in t&&t.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){let t=this.host.shadowRoot;t&&"removeEventListener"in t&&t.removeEventListener("slotchange",this.handleSlotChange)}}});var Ze,oe=p(()=>{k();Ze=z`
  :host([size='xs']) {
    font-size: var(--wa-font-size-xs);
  }

  :host([size='s']),
  :host([size='small']) {
    font-size: var(--wa-font-size-s);
  }

  :host([size='m']),
  :host([size='medium']) {
    font-size: var(--wa-font-size-m);
  }

  :host([size='l']),
  :host([size='large']) {
    font-size: var(--wa-font-size-l);
  }

  :host([size='xl']) {
    font-size: var(--wa-font-size-xl);
  }
`});var ma,Je=p(()=>{k();ma=z`
  @layer wa-component {
    :host {
      display: inline-block;

      /* Workaround because Chrome doesn't like :host(:has()) below
       * https://issues.chromium.org/issues/40062355
       * Firefox doesn't like this nested rule, so both are needed */
      &:has(wa-badge) {
        position: relative;
      }
    }

    /* Apply relative positioning only when needed to position wa-badge
     * This avoids creating a new stacking context for every button */
    :host(:has(wa-badge)) {
      position: relative;
    }
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    transition-property: background, border, box-shadow, color, opacity, transform;
    transition-duration: var(--wa-transition-fast);
    transition-timing-function: var(--wa-transition-easing);
    transform-origin: center;
    cursor: pointer;
    padding: 0 var(--wa-form-control-padding-inline);
    font-family: inherit;
    font-size: inherit;
    font-weight: var(--wa-font-weight-action);
    height: var(--wa-form-control-height);
    width: 100%;

    background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));

    border-color: transparent;
    color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-form-control-border-radius));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-form-control-border-radius));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-form-control-border-radius));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-form-control-border-radius));
    border-style: var(--wa-form-control-border-style);
    border-width: var(--wa-form-control-border-width);
  }

  /* Hover and active transforms */
  .button:not(.disabled):not(.loading) {
    @media (hover: hover) {
      &:hover {
        transform: var(--wa-button-transform-hover);
      }
    }
    &:active {
      transform: var(--wa-button-transform-active);
    }

    @media (prefers-reduced-motion: reduce) {
      &:hover,
      &:active {
        transform: none;
      }
    }
  }

  /* Appearance modifiers */
  :host([appearance='plain']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: transparent;
      border-color: var(--wa-color-border-loud, var(--wa-color-neutral-border-loud));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
        background-color: var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet));
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-quiet, var(--wa-color-neutral-on-quiet));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-quiet, var(--wa-color-neutral-fill-quiet)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='filled-outlined']) {
    /* Indentation overrides for grouping outlined */
    margin-inline-start: var(--_button-horizontal-indent-outlined);
    margin-block-start: var(--_button-vertical-indent-outlined);

    .button {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal));
      border-color: var(--wa-color-border-normal, var(--wa-color-neutral-border-normal));
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      color: var(--wa-color-on-normal, var(--wa-color-neutral-on-normal));
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-normal, var(--wa-color-neutral-fill-normal)),
        var(--wa-color-mix-active)
      );
    }
  }

  :host([appearance='accent']) {
    /* Indentation overrides for grouping */
    margin-inline-start: var(--_button-horizontal-indent);
    margin-block-start: var(--_button-vertical-indent);

    .button {
      color: var(--wa-color-on-loud, var(--wa-color-neutral-on-loud));
      background-color: var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud));
      border-color: transparent;
    }
    @media (hover: hover) {
      .button:not(.disabled):not(.loading):hover {
        background-color: color-mix(
          in oklab,
          var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
          var(--wa-color-mix-hover)
        );
      }
    }
    .button:not(.disabled):not(.loading):active {
      background-color: color-mix(
        in oklab,
        var(--wa-color-fill-loud, var(--wa-color-neutral-fill-loud)),
        var(--wa-color-mix-active)
      );
    }
  }

  /* Focus states */
  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--wa-focus-ring);
    outline-offset: var(--wa-focus-ring-offset);
  }

  /* Disabled state */
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;

    /* When disabled, prevent mouse events from bubbling up from children */
    .button {
      pointer-events: none;
    }
  }

  /* Keep it last so Safari doesn't stop parsing this block */
  .button::-moz-focus-inner {
    border: 0;
  }

  /* Icon buttons */
  .button.is-icon-button {
    outline-offset: 2px;
    width: var(--wa-form-control-height);
    aspect-ratio: 1;
  }

  /* Icon buttons with a caret need to grow to fit both the icon and the caret */
  .button.is-icon-button.caret {
    width: auto;
    aspect-ratio: auto;
    min-width: var(--wa-form-control-height);
  }

  /* Pill modifier */
  :host([pill]) .button {
    border-start-start-radius: var(--_button-start-start-radius, var(--wa-border-radius-pill));
    border-start-end-radius: var(--_button-start-end-radius, var(--wa-border-radius-pill));
    border-end-start-radius: var(--_button-end-start-radius, var(--wa-border-radius-pill));
    border-end-end-radius: var(--_button-end-end-radius, var(--wa-border-radius-pill));
  }

  /*
   * Label
   */

  .start,
  .end {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .label {
    display: inline-block;
  }

  .is-icon-button .label {
    display: flex;
    justify-content: center;
  }

  .label::slotted(wa-icon) {
    align-self: center;
  }

  /*
   * Caret modifier
   */

  wa-icon[part='caret'] {
    display: flex;
    align-self: center;
    align-items: center;

    &::part(svg) {
      width: 0.875em;
      height: 0.875em;
    }

    .button:has(&) .end {
      display: none;
    }
  }

  /*
   * Loading modifier
   */

  .loading {
    position: relative;
    cursor: wait;

    .start,
    .label,
    .end,
    .caret {
      /* Hidden with opacity, not visibility, so the label stays in the accessibility tree */
      opacity: 0;

      /* Unlike visibility: hidden, opacity leaves the content clickable */
      pointer-events: none;
    }

    wa-spinner {
      --indicator-color: currentColor;
      --track-color: color-mix(in oklab, currentColor, transparent 90%);

      position: absolute;
      font-size: 1em;
      height: 1em;
      width: 1em;
      top: calc(50% - 0.5em);
      left: calc(50% - 0.5em);
    }
  }

  /*
   * Badges
   */

  .button ::slotted(wa-badge) {
    border-color: var(--wa-color-surface-default);
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  :host(:dir(rtl)) ::slotted(wa-badge) {
    translate: -50% -50%;
  }

  /*
  * Button spacing
  */

  slot[name='start']::slotted(*) {
    margin-inline-end: 0.75em;
  }

  slot[name='end']::slotted(*),
  .button:not(.visually-hidden-label) [part='caret'] {
    margin-inline-start: 0.75em;
  }
`});var ha,to=p(()=>{k();ha=z`
  :where(:root),
  .wa-neutral,
  :host([variant='neutral']) {
    --wa-color-fill-loud: var(--wa-color-neutral-fill-loud);
    --wa-color-fill-normal: var(--wa-color-neutral-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-neutral-fill-quiet);
    --wa-color-border-loud: var(--wa-color-neutral-border-loud);
    --wa-color-border-normal: var(--wa-color-neutral-border-normal);
    --wa-color-border-quiet: var(--wa-color-neutral-border-quiet);
    --wa-color-on-loud: var(--wa-color-neutral-on-loud);
    --wa-color-on-normal: var(--wa-color-neutral-on-normal);
    --wa-color-on-quiet: var(--wa-color-neutral-on-quiet);
  }

  .wa-brand,
  :host([variant='brand']) {
    --wa-color-fill-loud: var(--wa-color-brand-fill-loud);
    --wa-color-fill-normal: var(--wa-color-brand-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-brand-fill-quiet);
    --wa-color-border-loud: var(--wa-color-brand-border-loud);
    --wa-color-border-normal: var(--wa-color-brand-border-normal);
    --wa-color-border-quiet: var(--wa-color-brand-border-quiet);
    --wa-color-on-loud: var(--wa-color-brand-on-loud);
    --wa-color-on-normal: var(--wa-color-brand-on-normal);
    --wa-color-on-quiet: var(--wa-color-brand-on-quiet);
  }

  .wa-success,
  :host([variant='success']) {
    --wa-color-fill-loud: var(--wa-color-success-fill-loud);
    --wa-color-fill-normal: var(--wa-color-success-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-success-fill-quiet);
    --wa-color-border-loud: var(--wa-color-success-border-loud);
    --wa-color-border-normal: var(--wa-color-success-border-normal);
    --wa-color-border-quiet: var(--wa-color-success-border-quiet);
    --wa-color-on-loud: var(--wa-color-success-on-loud);
    --wa-color-on-normal: var(--wa-color-success-on-normal);
    --wa-color-on-quiet: var(--wa-color-success-on-quiet);
  }

  .wa-warning,
  :host([variant='warning']) {
    --wa-color-fill-loud: var(--wa-color-warning-fill-loud);
    --wa-color-fill-normal: var(--wa-color-warning-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-warning-fill-quiet);
    --wa-color-border-loud: var(--wa-color-warning-border-loud);
    --wa-color-border-normal: var(--wa-color-warning-border-normal);
    --wa-color-border-quiet: var(--wa-color-warning-border-quiet);
    --wa-color-on-loud: var(--wa-color-warning-on-loud);
    --wa-color-on-normal: var(--wa-color-warning-on-normal);
    --wa-color-on-quiet: var(--wa-color-warning-on-quiet);
  }

  .wa-danger,
  :host([variant='danger']) {
    --wa-color-fill-loud: var(--wa-color-danger-fill-loud);
    --wa-color-fill-normal: var(--wa-color-danger-fill-normal);
    --wa-color-fill-quiet: var(--wa-color-danger-fill-quiet);
    --wa-color-border-loud: var(--wa-color-danger-border-loud);
    --wa-color-border-normal: var(--wa-color-danger-border-normal);
    --wa-color-border-quiet: var(--wa-color-danger-border-quiet);
    --wa-color-on-loud: var(--wa-color-danger-on-loud);
    --wa-color-on-normal: var(--wa-color-danger-on-normal);
    --wa-color-on-quiet: var(--wa-color-danger-on-quiet);
  }
`});function D(t,e){let o={waitUntilFirstUpdate:!1,...e};return(r,a)=>{let{update:i}=r,n=Array.isArray(t)?t:[t];r.update=function(s){n.forEach(l=>{let d=l;if(s.has(d)){let u=s.get(d),h=this[d];u!==h&&(!o.waitUntilFirstUpdate||this.hasUpdated)&&this[a](u,h)}}),i.call(this,s)}}}var V=p(()=>{});function Ce(...t){t.map(e=>{let o=e.$code.toLowerCase();re.has(o)?re.set(o,Object.assign(Object.assign({},re.get(o)),e)):re.set(o,e),wt||(wt=e)}),fa()}function fa(){pa&&(Wo=document.documentElement.dir||"ltr",Vo=document.documentElement.lang||navigator.language),[...Ho.keys()].map(t=>{typeof t.requestUpdate=="function"&&t.requestUpdate()})}var Ho,re,wt,Wo,Vo,pa,eo,oo=p(()=>{Ho=new Set,re=new Map,Wo="ltr",Vo="en",pa=typeof MutationObserver<"u"&&typeof document<"u"&&typeof document.documentElement<"u";if(pa){let t=new MutationObserver(fa);Wo=document.documentElement.dir||"ltr",Vo=document.documentElement.lang||navigator.language,t.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]})}eo=class{constructor(e){this.host=e,this.host.addController(this)}hostConnected(){Ho.add(this.host)}hostDisconnected(){Ho.delete(this.host)}dir(){return`${this.host.dir||Wo}`.toLowerCase()}lang(){let e=`${this.host.lang||Vo}`.toLowerCase().replace(/_/g,"-");try{return new Intl.Locale(e),e}catch{return wt?wt.$code.toLowerCase():"en"}}getTranslationData(e){var o,r;let a;try{a=new Intl.Locale(e.replace(/_/g,"-"))}catch{return{locale:void 0,language:"",region:"",primary:void 0,secondary:void 0}}let i=a.language.toLowerCase(),n=(r=(o=a.region)===null||o===void 0?void 0:o.toLowerCase())!==null&&r!==void 0?r:"",s=re.get(`${i}-${n}`),l=re.get(i);return{locale:a,language:i,region:n,primary:s,secondary:l}}exists(e,o){var r;let{primary:a,secondary:i}=this.getTranslationData((r=o.lang)!==null&&r!==void 0?r:this.lang());return o=Object.assign({includeFallback:!1},o),!!(a&&a[e]||i&&i[e]||o.includeFallback&&wt&&wt[e])}term(e,...o){let{primary:r,secondary:a}=this.getTranslationData(this.lang()),i;if(r&&r[e])i=r[e];else if(a&&a[e])i=a[e];else if(wt&&wt[e])i=wt[e];else return console.error(`No translation found for: ${String(e)}`),String(e);return typeof i=="function"?i(...o):i}date(e,o){return e=new Date(e),new Intl.DateTimeFormat(this.lang(),o).format(e)}number(e,o){return e=Number(e),isNaN(e)?"":new Intl.NumberFormat(this.lang(),o).format(e)}relativeTime(e,o,r){return new Intl.RelativeTimeFormat(this.lang(),r).format(e,o)}}});var wa,ga,ae=p(()=>{oo();wa={$code:"en",$name:"English",$dir:"ltr",allTagsRemoved:"All tags removed",am:"AM",autosizeColumn:"Autosize column",captions:"Captions",carousel:"Carousel",chooseDate:"Choose date",chooseDecade:"Choose decade",chooseMonth:"Choose month",chooseTime:"Choose time",chooseYear:"Choose year",clearEntry:"Clear entry",clearFilter:"Clear filter",clearSort:"Clear sort",close:"Close",closeCalendar:"Close calendar",closeTimeInput:"Close time picker",collapseRow:"Collapse row",columnMenu:"Column options",columnMovedToPosition:(t,e,o)=>`${t} moved to position ${e} of ${o}`,columns:"Columns",compactPageXOfY:(t,e)=>`${t} of ${e}`,completed:"Completed",copied:"Copied",copy:"Copy",createOption:t=>`Create "${t}"`,currentlyPlaying:"currently playing",currentValue:"Current value",date:"Date",datePickerKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the calendar.",day:"Day",dayPeriod:"AM/PM",decrement:"Decrement",deselectAllRows:"Deselect all rows",disabled:"Disabled",dropFileHere:"Drop file here or click to browse",dropFilesHere:"Drop files here or click to browse",empty:"Empty",endDate:"End date",enterFullscreen:"Enter fullscreen",error:"Error",exitFullscreen:"Exit fullscreen",expandRow:"Expand row",filterByColumn:t=>`Filter by ${t}`,filterFrom:"From",filterMax:"Max",filterMin:"Min",filterTo:"To",firstPage:"First page",goToSlide:(t,e)=>`Go to slide ${t} of ${e}`,hideColumn:"Hide column",hidePassword:"Hide password",hour:"Hour",incompleteDate:"Enter a valid date.",increment:"Increment",jumpBackwardX:t=>`Jump back ${t} pages`,jumpForwardX:t=>`Jump forward ${t} pages`,lastPage:"Last page",loading:"Loading",locked:"Locked",minute:"Minute",month:"Month",moreOptions:"More Options",mute:"Mute",nextDecade:"Next decade",nextMonth:"Next month",nextPage:"Next page",nextSlide:"Next slide",nextVideo:"Next Video",nextYear:"Next year",noData:"No data",noOptions:"No options",noResults:"No matching results",notCompleted:"Not completed",now:"Now",numCharacters:t=>t===1?"1 character":`${t} characters`,numCharactersRemaining:t=>t===1?"1 character remaining":`${t} characters remaining`,numOptionsAvailable:t=>t===0?"No options available":t===1?"1 option available":`${t} options available`,numOptionsSelected:t=>t===0?"No options selected":t===1?"1 option selected":`${t} options selected`,numRowsCopied:t=>t===1?"1 row copied":`${t} rows copied`,numRowsSelected:t=>t===1?"1 row selected":`${t} rows selected`,optionPosition:(t,e,o)=>`${t}, ${e} of ${o}`,optionsLoadError:"Options could not be loaded",pageXOfY:(t,e)=>`Page ${t} of ${e}`,pagination:"Pagination",pause:"Pause",pauseAnimation:"Pause animation",pictureInPicture:"Picture in picture",pinLeft:"Pin left",pinRight:"Pin right",play:"Play",playAnimation:"Play animation",playbackSpeed:"Playback speed",playlist:"Playlist",pm:"PM",previousDecade:"Previous decade",previousMonth:"Previous month",previousPage:"Previous page",previousSlide:"Previous slide",previousVideo:"Previous video",previousYear:"Previous year",progress:"Progress",rangeTooLong:t=>t===1?"Select a range no longer than 1 day":`Select a range no longer than ${t} days`,rangeTooShort:t=>t===1?"Select a range at least 1 day long":`Select a range at least ${t} days long`,readonly:"Read-only",remove:"Remove",resetColumns:"Reset columns",resize:"Resize",resizeColumn:"Resize column",rowsPerPage:"Rows per page",scrollableRegion:"Scrollable region",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",search:"Search",second:"Second",seek:"Seek",seekProgress:(t,e)=>`${t} of ${e}`,selectAColorFromTheScreen:"Select a color from the screen",selectAllRows:"Select all rows",selected:"Selected",selectedDateLabel:t=>`Selected: ${t}`,selectedRangeLabel:t=>`Selected range: ${t}`,selectGroup:"Select group",selectionCleared:"Selection cleared",selectRow:"Select row",showingNofMRows:(t,e)=>`Showing ${t} of ${e} rows`,showingXtoYofZ:(t,e,o)=>`${t}\u2013${e} of ${o}`,showPassword:"Show password",slideNum:t=>`Slide ${t}`,sortAscending:"Sort ascending",sortColumn:"Sort column",sortDescending:"Sort descending",startDate:"Start date",steps:"Steps",stepXOfY:(t,e)=>`Step ${t} of ${e}`,tagAdded:t=>`${t} added`,tagAlreadyAdded:t=>`${t} is already added`,tagInputKeyboardHelp:"Press Backspace or Delete to remove this tag.",tagRemoved:t=>`${t} removed`,time:"Time",timeInputKeyboardHelp:"Use arrow keys to change values; press Alt+Down Arrow to open the time picker.",today:"Today",toggleColorFormat:"Toggle color format",tooFewTags:t=>t===1?"Add at least 1 tag":`Add at least ${t} tags`,tooManyTags:t=>t===1?"Add no more than 1 tag":`Add no more than ${t} tags`,unmute:"Unmute",unpin:"Unpin",unpinColumn:"Unpin column",videoPlayer:"Video player",volume:"Volume",year:"Year",zoomIn:"Zoom in",zoomOut:"Zoom out"};Ce(wa);ga=wa});var X,Z=p(()=>{ae();oo();oo();X=class extends eo{lang(){return this.host.didSSR&&!this.host.hasUpdated?this.host.lang||"en":super.lang()}};Ce(ga)});var va,ba,ro,ya=p(()=>{va={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ba=t=>(...e)=>({_$litDirective$:t,values:e}),ro=class{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,o,r){this._$Ct=e,this._$AM=o,this._$Ci=r}_$AS(e,o){return this.update(e,o)}update(e,o){return this.render(...o)}}});var Tt,Ca=p(()=>{yt();ya();Tt=ba(class extends ro{constructor(t){if(super(t),t.type!==va.ATTRIBUTE||t.name!=="class"||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(let r in e)e[r]&&!this.nt?.has(r)&&this.st.add(r);return this.render(e)}let o=t.element.classList;for(let r of this.st)r in e||(o.remove(r),this.st.delete(r));for(let r in e){let a=!!e[r];a===this.st.has(r)||this.nt?.has(r)||(a?(o.add(r),this.st.add(r)):(o.remove(r),this.st.delete(r)))}return pt}})});var ao=p(()=>{Ca()});var F,xa=p(()=>{yt();F=t=>t??M});var xe=p(()=>{xa()});var Sa,fn,jo,La,Xo,io,ql,Nl,Aa=p(()=>{yt();Sa=Symbol.for(""),fn=t=>{if(t?.r===Sa)return t?._$litStatic$},jo=(t,...e)=>({_$litStatic$:e.reduce((o,r,a)=>o+(i=>{if(i._$litStatic$!==void 0)return i._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${i}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(r)+t[a+1],t[0]),r:Sa}),La=new Map,Xo=t=>(e,...o)=>{let r=o.length,a,i,n=[],s=[],l,d=0,u=!1;for(;d<r;){for(l=e[d];d<r&&(i=o[d],(a=fn(i))!==void 0);)l+=a+e[++d],u=!0;d!==r&&s.push(i),n.push(l),d++}if(d===r&&n.push(e[r]),u){let h=n.join("$$lit$$");(e=La.get(h))===void 0&&(n.raw=n,La.set(h,e=n)),o=s}return t(e,...o)},io=Xo(A),ql=Xo(Xr),Nl=Xo(Yr)});var za=p(()=>{Aa()});var y,Yo=p(()=>{Be();Qe();me();xt();nt();oe();Je();to();V();Z();R();j();ao();xe();za();y=class extends it{constructor(){super(...arguments),this.assumeInteractionOn=["click"],this.hasSlotController=new Lt(this,"[default]","start","end"),this.localize=new X(this),this.invalid=!1,this.isIconButton=!1,this.title="",this.variant="neutral",this.appearance="accent",this.size="m",this.withCaret=!1,this.withStart=!1,this.withEnd=!1,this.disabled=!1,this.loading=!1,this.pill=!1,this.type="button"}static get validators(){return[...super.validators,Er()]}handleSizeChange(){ee(this.localName,this.size)}constructLightDOMButton(){let t=document.createElement("button");for(let e of this.attributes)e.name!=="style"&&t.setAttribute(e.name,e.value);return t.type=this.type,t.style.position="absolute !important",t.style.width="0 !important",t.style.height="0 !important",t.style.clipPath="inset(50%) !important",t.style.overflow="hidden !important",t.style.whiteSpace="nowrap !important",this.name&&(t.name=this.name),t.value=this.value||"",t}handleClick(t){if(this.disabled||this.loading){t.preventDefault(),t.stopImmediatePropagation();return}if(this.type!=="submit"&&this.type!=="reset"||!this.getForm())return;let o=this.constructLightDOMButton();this.parentElement?.append(o),o.click(),o.remove()}handleInvalid(){this.dispatchEvent(new De)}handleLabelSlotChange(){let t=this.labelSlot.assignedNodes({flatten:!0}),e=!1,o=!1,r=!1,a=!1;[...t].forEach(i=>{if(i.nodeType===Node.ELEMENT_NODE){let n=i;n.localName==="wa-icon"?(o=!0,e||(e=n.label!==void 0)):a=!0}else i.nodeType===Node.TEXT_NODE&&(i.textContent?.trim()||"").length>0&&(r=!0)}),this.isIconButton=o&&!r&&!a,this.customStates.set("icon-button",this.isIconButton),this.isIconButton&&!e&&console.warn('Icon buttons must have a label for screen readers. Add <wa-icon label="..."> to remove this warning.',this)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.customStates.set("disabled",this.disabled),this.updateValidity()}handleHrefChange(){this.customStates.set("link",this.isLink())}handleLoadingChange(){this.customStates.set("loading",this.loading)}setValue(...t){}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}render(){let t=this.isLink(),e=t?jo`a`:jo`button`;return io`
      <${e}
        part="base button"
        class=${Tt({button:!0,caret:this.withCaret,disabled:this.disabled,loading:this.loading,rtl:this.localize.dir()==="rtl","has-label":this.hasSlotController.test("[default]"),"has-start":this.hasSlotController.test("start","withStart"),"has-end":this.hasSlotController.test("end","withEnd"),"is-icon-button":this.isIconButton})}
        ?disabled=${F(t?void 0:this.disabled)}
        type=${F(t?void 0:this.type)}
        title=${this.title}
        name=${F(t?void 0:this.name)}
        value=${F(t?void 0:this.value)}
        href=${F(t?this.href:void 0)}
        target=${F(t?this.target:void 0)}
        download=${F(t?this.download:void 0)}
        rel=${F(t&&this.rel?this.rel:void 0)}
        role=${F(t?void 0:"button")}
        aria-disabled=${F(t&&this.disabled?"true":void 0)}
        aria-busy=${this.loading?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="start" part="start" class="start"></slot>
        <slot part="label" class="label" @slotchange=${this.handleLabelSlotChange}></slot>
        <slot name="end" part="end" class="end"></slot>
        ${this.withCaret?io`
                <wa-icon part="caret" class="caret" library="system" name="chevron-down" variant="solid"></wa-icon>
              `:""}
        ${this.loading?io`<wa-spinner part="spinner"></wa-spinner>`:""}
      </${e}>
    `}};y.shadowRootOptions={...it.shadowRootOptions,delegatesFocus:!0};y.css=[ma,ha,Ze];c([N(".button")],y.prototype,"button",2);c([N("slot:not([name])")],y.prototype,"labelSlot",2);c([Rt()],y.prototype,"invalid",2);c([Rt()],y.prototype,"isIconButton",2);c([m()],y.prototype,"title",2);c([m({reflect:!0})],y.prototype,"variant",2);c([m({reflect:!0})],y.prototype,"appearance",2);c([m({reflect:!0})],y.prototype,"size",2);c([D("size")],y.prototype,"handleSizeChange",1);c([m({attribute:"with-caret",type:Boolean,reflect:!0})],y.prototype,"withCaret",2);c([m({attribute:"with-start",type:Boolean})],y.prototype,"withStart",2);c([m({attribute:"with-end",type:Boolean})],y.prototype,"withEnd",2);c([m({type:Boolean})],y.prototype,"disabled",2);c([m({type:Boolean,reflect:!0})],y.prototype,"loading",2);c([m({type:Boolean,reflect:!0})],y.prototype,"pill",2);c([m()],y.prototype,"type",2);c([m({reflect:!0})],y.prototype,"name",2);c([m({reflect:!0})],y.prototype,"value",2);c([m({reflect:!0})],y.prototype,"href",2);c([m()],y.prototype,"target",2);c([m()],y.prototype,"rel",2);c([m()],y.prototype,"download",2);c([m({attribute:"formaction"})],y.prototype,"formAction",2);c([m({attribute:"formenctype"})],y.prototype,"formEnctype",2);c([m({attribute:"formmethod"})],y.prototype,"formMethod",2);c([m({attribute:"formnovalidate",type:Boolean})],y.prototype,"formNoValidate",2);c([m({attribute:"formtarget"})],y.prototype,"formTarget",2);c([D("disabled",{waitUntilFirstUpdate:!0})],y.prototype,"handleDisabledChange",1);c([D("href")],y.prototype,"handleHrefChange",1);c([D("loading",{waitUntilFirstUpdate:!0})],y.prototype,"handleLoadingChange",1);y=c([T("wa-button")],y);y.disableWarning?.("change-in-update")});var Ea,no=p(()=>{k();Ea=z`
  :host {
    --track-width: 2px;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);
    --speed: 2s;
    --size: 1em;

    /*
      Resizing a spinner element using anything but font-size will break the animation because the animation uses em
      units. Therefore, if a spinner is used in a flex container without \`flex: none\` applied, the spinner can
      grow/shrink and break the animation. The use of \`flex: none\` on the host element prevents this by always having
      the spinner sized according to its actual dimensions.
    */
    flex: none;
    display: inline-flex;
    width: var(--size);
    height: var(--size);
  }

  svg {
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    animation: spin var(--speed) linear infinite;
  }

  .track,
  .indicator {
    --radius: calc(var(--size) / 2 - var(--track-width) / 2);
    --circumference: calc(var(--radius) * 2 * 3.141592654);

    cx: calc(var(--size) / 2);
    cy: calc(var(--size) / 2);
    r: var(--radius);
    fill: none;
    stroke-width: var(--track-width);
  }

  .track {
    stroke: var(--track-color);
  }

  .indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: calc(0.597 * var(--circumference)), calc(0.796 * var(--circumference));
    stroke-dashoffset: calc(-0.04 * var(--circumference));
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: calc(0.008 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.278 * var(--circumference));
    }
    100% {
      stroke-dasharray: calc(0.716 * var(--circumference)), calc(1.194 * var(--circumference));
      stroke-dashoffset: calc(-0.987 * var(--circumference));
    }
  }
`});var Ko,Go=p(()=>{no();I();Z();R();k();j();Ko=class extends P{constructor(){super(...arguments),this.localize=new X(this)}render(){return A`
      <svg
        part="base spinner"
        role="progressbar"
        aria-label=${this.localize.term("loading")}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle class="track" />
        <circle class="indicator" />
      </svg>
    `}};Ko.css=Ea;Ko=c([T("wa-spinner")],Ko)});var ka,It=p(()=>{ka=class extends Event{constructor(){super("wa-error",{bubbles:!0,cancelable:!1,composed:!0})}}});var $a,Bt=p(()=>{$a=class extends Event{constructor(){super("wa-load",{bubbles:!0,cancelable:!1,composed:!0})}}});var _a,Dt=p(()=>{k();_a=z`
  :host {
    --primary-color: currentColor;
    --primary-opacity: 1;
    --secondary-color: currentColor;
    --secondary-opacity: 0.4;
    --rotate-angle: 0deg;

    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: -0.125em;
  }

  /* #region Canvas — the box the icon is centered within (mirrors Font Awesome's icon canvas). Orthogonal to font-size. */

  /* Fixed width (default): 1.25em × 1em (20 × 16px) */
  :host(:not([canvas])),
  :host([canvas='fixed']) {
    width: 1.25em;
    height: 1em;
    min-width: 1.25em; /* <-- this is what Safari respects for intrinsic */
    min-height: 1em;
  }

  /* Auto: hug the icon's width. \`auto-width\` is the deprecated alias for canvas="auto". */
  :host([canvas='auto']),
  :host([auto-width]:not([canvas])) {
    width: auto;
    height: 1em;
  }

  /* Square: 1.25em × 1.25em (20 × 20px) */
  :host([canvas='square']) {
    width: 1.25em;
    height: 1.25em;
    min-width: 1.25em;
    min-height: 1.25em;
  }

  /* Roomy: 1.5em × 1.5em (24 × 24px) */
  :host([canvas='roomy']) {
    width: 1.5em;
    height: 1.5em;
    min-width: 1.5em;
    min-height: 1.5em;
  }

  /* #endregion */

  svg {
    /* NOTE: Avoid setting fill here. A stylesheet rule beats SVG presentation attributes, breaking stroke-based
       libraries like Lucide (fill="none" stroke="currentColor") and attribute-based mutators (issue #1733). The default
       library applies fill="currentColor" in its mutator instead. */
    height: 1em;
    overflow: visible;
    width: auto;

    /* Duotone colors with path-specific opacity fallback */
    path[data-duotone-primary] {
      color: var(--primary-color);
      opacity: var(--path-opacity, var(--primary-opacity));
    }

    path[data-duotone-secondary] {
      color: var(--secondary-color);
      opacity: var(--path-opacity, var(--secondary-opacity));
    }
  }

  /* Rotation */
  :host([rotate]) {
    transform: rotate(var(--rotate-angle, 0deg));
  }

  /* Flipping */
  :host([flip='x']) {
    transform: scaleX(-1);
  }
  :host([flip='y']) {
    transform: scaleY(-1);
  }
  :host([flip='both']) {
    transform: scale(-1, -1);
  }

  /* Rotation and Flipping combined */
  :host([rotate][flip='x']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleX(-1);
  }
  :host([rotate][flip='y']) {
    transform: rotate(var(--rotate-angle, 0deg)) scaleY(-1);
  }
  :host([rotate][flip='both']) {
    transform: rotate(var(--rotate-angle, 0deg)) scale(-1, -1);
  }

  /* #region Animations — ported from Font Awesome 7.3 (--fa-* props mapped to wa-icon's --* names) */

  :host([animation='beat']) {
    animation-name: beat;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='bounce']) {
    animation-name: bounce;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
  }

  :host([animation='fade']) {
    animation-name: fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='beat-fade']) {
    animation-name: beat-fade;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip']) {
    animation-name: flip;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.5s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='flip-360']) {
    animation-name: flip-360;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='shake']) {
    animation-name: shake;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.75s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
  }

  :host([animation='spin']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-pulse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, steps(8));
  }

  /* spin-reverse is FA's reverse modifier expressed as a standalone value; reverse any spin via --animation-direction: reverse */
  :host([animation='spin-reverse']) {
    animation-name: spin;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, reverse);
    animation-duration: var(--animation-duration, 2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap']) {
    animation-name: spin-snap;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-4']) {
    animation-name: spin-snap-4;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 2.4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='spin-snap-8']) {
    animation-name: spin-snap-8;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 4s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='buzz']) {
    animation-name: buzz;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.6s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, linear);
  }

  :host([animation='wag']) {
    animation-name: wag;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: bottom center;
  }

  :host([animation='float']) {
    animation-name: float;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 3s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-in-out);
    will-change: transform;
  }

  :host([animation='swing']) {
    animation-name: swing;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 1.2s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
    transform-origin: top center;
  }

  :host([animation='jello']) {
    animation-name: jello;
    animation-delay: var(--animation-delay, 0s);
    animation-direction: var(--animation-direction, normal);
    animation-duration: var(--animation-duration, 0.9s);
    animation-iteration-count: var(--animation-iteration-count, infinite);
    animation-timing-function: var(--animation-timing, ease-out);
  }

  @media (prefers-reduced-motion: reduce) {
    :host([animation='beat']),
    :host([animation='bounce']),
    :host([animation='fade']),
    :host([animation='beat-fade']),
    :host([animation='flip']),
    :host([animation='flip-360']),
    :host([animation='shake']),
    :host([animation='spin']),
    :host([animation='spin-pulse']),
    :host([animation='spin-reverse']),
    :host([animation='spin-snap']),
    :host([animation='spin-snap-4']),
    :host([animation='spin-snap-8']),
    :host([animation='buzz']),
    :host([animation='wag']),
    :host([animation='float']),
    :host([animation='swing']),
    :host([animation='jello']) {
      animation: none !important;
      transition: none !important;
    }
  }

  /* #endregion */

  /* #region Keyframes — ported verbatim from Font Awesome 7.3 */

  @keyframes beat {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    45% {
      transform: scale(calc(1.22 * var(--beat-scale, 1.22)));
    }
    65% {
      transform: scale(calc(1.25 * var(--beat-scale, 1.25)));
    }
    90% {
      transform: scale(1);
    }
  }

  @keyframes bounce {
    0% {
      transform: scale(1, 1) translateY(0);
      /* No fallback by design (ported from FA 7.3): the first segment uses the user's --animation-timing or the CSS
         initial ease, while the explicit cubic-beziers on later stops drive the bounce physics. */
      animation-timing-function: var(--animation-timing);
    }
    14% {
      transform: scale(var(--bounce-start-scale-x, 1.06), var(--bounce-start-scale-y, 0.94))
        translateY(var(--bounce-anticipation, 3px));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    32% {
      transform: scale(var(--bounce-jump-scale-x, 0.94), var(--bounce-jump-scale-y, 1.12))
        translateY(calc(-1 * var(--bounce-height, 0.5em)));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    52% {
      transform: scale(1, 1) translateY(calc(-1 * var(--bounce-height, 0.5em) * 1.1));
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    70% {
      transform: scale(var(--bounce-land-scale-x, 1.06), var(--bounce-land-scale-y, 0.92)) translateY(0);
      animation-timing-function: cubic-bezier(0.33, 0.33, 0.66, 1);
    }
    85% {
      transform: scale(0.98, 1.04) translateY(calc(-2px * var(--bounce-rebound, 1)));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: scale(1, 1) translateY(0);
    }
  }

  @keyframes fade {
    0% {
      opacity: 1;
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    40% {
      opacity: var(--fade-opacity, 0.4);
      transform: scale(0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes beat-fade {
    0% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    25% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    45% {
      opacity: 1;
      transform: scale(var(--beat-fade-scale, 1.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    65% {
      opacity: calc(var(--beat-fade-opacity, 0.4) + 0.4);
      transform: scale(var(--beat-fade-scale, 1.28));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    100% {
      opacity: var(--beat-fade-opacity, 0.4);
      transform: scale(1);
    }
  }

  @keyframes flip {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    35% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: linear;
    }
    65% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.5));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    92% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes flip-360 {
    0% {
      transform: perspective(2em) scale(1) rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.4, 1);
    }
    8% {
      transform: perspective(2em) scale(var(--flip-anticipation-scale, 0.95))
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), 0deg);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    50% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), calc(var(--flip-angle, -360deg) * 0.6));
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    80% {
      transform: perspective(2em) scale(1)
        rotate3d(
          var(--flip-x, 0),
          var(--flip-y, 1),
          var(--flip-z, 0),
          calc(var(--flip-angle, -360deg) * var(--flip-overshoot, 1.04))
        );
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: perspective(2em) scale(1)
        rotate3d(var(--flip-x, 0), var(--flip-y, 1), var(--flip-z, 0), var(--flip-angle, -360deg));
    }
  }

  @keyframes shake {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(35deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    20% {
      transform: rotate(-22deg) translateX(-1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    35% {
      transform: rotate(15deg) translateX(1px);
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    50% {
      transform: rotate(-9deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    65% {
      transform: rotate(5deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    78% {
      transform: rotate(-3deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    90% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    12% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    16.67% {
      transform: rotate(60deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    28.67% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    33.33% {
      transform: rotate(120deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    45.33% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    62% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    66.67% {
      transform: rotate(240deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    78.67% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    83.33% {
      transform: rotate(300deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    95.33% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-4 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    15% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    40% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    65% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    90% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes spin-snap-8 {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    9% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    12.5% {
      transform: rotate(45deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    21.5% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    25% {
      transform: rotate(90deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    34% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    37.5% {
      transform: rotate(135deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    46.5% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: rotate(180deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    59% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    62.5% {
      transform: rotate(225deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    71.5% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    75% {
      transform: rotate(270deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    84% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    87.5% {
      transform: rotate(315deg);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
    96.5% {
      transform: rotate(360deg);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes buzz {
    0% {
      transform: translateX(0) rotate(0deg);
      animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);
    }
    5% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.5deg);
    }
    10% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.5deg);
    }
    15% {
      transform: translateX(var(--buzz-distance, 4px)) rotate(0.3deg);
    }
    20% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px))) rotate(-0.3deg);
    }
    25% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.7)) rotate(0.2deg);
    }
    30% {
      transform: translateX(calc(-1 * var(--buzz-distance, 4px) * 0.7)) rotate(-0.2deg);
    }
    35% {
      transform: translateX(calc(var(--buzz-distance, 4px) * 0.4)) rotate(0.1deg);
    }
    40% {
      transform: translateX(0) rotate(0deg);
    }
    100% {
      transform: translateX(0) rotate(0deg);
    }
  }

  @keyframes wag {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    12% {
      transform: rotate(var(--wag-angle, 12deg));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    24% {
      transform: rotate(2deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    36% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.85));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    48% {
      transform: rotate(1deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.6, 1);
    }
    58% {
      transform: rotate(calc(var(--wag-angle, 12deg) * 0.6));
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    15% {
      transform: translateY(calc(-0.4 * var(--float-height, 6px))) translateX(var(--float-drift, 1px))
        rotate(var(--float-tilt, 1deg)) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    35% {
      transform: translateY(calc(-1 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-stretch-x, 0.98), var(--float-stretch-y, 1.03));
      animation-timing-function: cubic-bezier(0.5, 0, 0.5, 0);
    }
    50% {
      transform: translateY(calc(-0.92 * var(--float-height, 6px))) translateX(calc(-0.5 * var(--float-drift, 1px)))
        rotate(calc(-0.5 * var(--float-tilt, 1deg))) scale(0.995, 1.01);
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 0.33);
    }
    70% {
      transform: translateY(calc(-0.3 * var(--float-height, 6px))) translateX(calc(-1 * var(--float-drift, 1px)))
        rotate(calc(-1 * var(--float-tilt, 1deg))) scale(1, 1);
      animation-timing-function: cubic-bezier(0.33, 0.66, 0.66, 1);
    }
    90% {
      transform: translateY(calc(0.05 * var(--float-height, 6px))) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
      animation-timing-function: cubic-bezier(0.33, 0, 0.66, 1);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(0deg)
        scale(var(--float-squash-x, 1.02), var(--float-squash-y, 0.98));
    }
  }

  @keyframes swing {
    0% {
      transform: rotate(0deg);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    8% {
      transform: rotate(var(--swing-angle, 22deg));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    18% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.85));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    28% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.65));
      animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);
    }
    38% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.45));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: rotate(calc(var(--swing-angle, 22deg) * 0.25));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    56% {
      transform: rotate(calc(-1 * var(--swing-angle, 22deg) * 0.1));
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    64% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  @keyframes jello {
    0% {
      transform: scale(1, 1);
      animation-timing-function: cubic-bezier(0.2, 0, 0.8, 1);
    }
    12% {
      transform: scale(var(--jello-scale-x, 1.15), calc(2 - var(--jello-scale-x, 1.15)));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    24% {
      transform: scale(calc(2 - var(--jello-scale-y, 1.12)), var(--jello-scale-y, 1.12));
      animation-timing-function: cubic-bezier(0.3, 0, 0.7, 1);
    }
    36% {
      transform: scale(
        calc(1 + (var(--jello-scale-x, 1.15) - 1) * 0.5),
        calc(2 - (1 + (var(--jello-scale-x, 1.15) - 1) * 0.5))
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    48% {
      transform: scale(
        calc(2 - (1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)),
        calc(1 + (var(--jello-scale-y, 1.12) - 1) * 0.3)
      );
      animation-timing-function: cubic-bezier(0.4, 0, 0.6, 1);
    }
    58% {
      transform: scale(1.02, 0.98);
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }
    68% {
      transform: scale(1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }

  /* #endregion */
`});function Pa(){return wn.replace(/\/$/,"")}function gn(t){Qo=t}function Ma(){if(!Qo){let t=document.querySelector("[data-fa-kit-code]");t&&gn(t.getAttribute("data-fa-kit-code")||"")}return Qo}var wn,Qo,qt=p(()=>{wn="",Qo=""});function vn(t,e,o){let r="solid";return e==="chisel"&&(r="chisel-regular"),e==="etch"&&(r="etch-solid"),e==="graphite"&&(r="graphite-thin"),e==="jelly"&&(r="jelly-regular",o==="duo-regular"&&(r="jelly-duo-regular"),o==="fill-regular"&&(r="jelly-fill-regular")),e==="jelly-duo"&&(r="jelly-duo-regular"),e==="jelly-fill"&&(r="jelly-fill-regular"),e==="notdog"&&(o==="solid"&&(r="notdog-solid"),o==="duo-solid"&&(r="notdog-duo-solid")),e==="notdog-duo"&&(r="notdog-duo-solid"),e==="slab"&&((o==="solid"||o==="regular")&&(r="slab-regular"),o==="press-regular"&&(r="slab-press-regular")),e==="slab-press"&&(r="slab-press-regular"),e==="slab-duo"&&(r="slab-duo-regular"),e==="slab-press-duo"&&(r="slab-press-duo-regular"),e==="thumbprint"&&(r="thumbprint-light"),e==="utility"&&(r="utility-semibold"),e==="utility-duo"&&(r="utility-duo-semibold"),e==="utility-fill"&&(r="utility-fill-semibold"),e==="whiteboard"&&(r="whiteboard-semibold"),e==="mosaic"&&(r="mosaic-solid"),e==="pixel"&&(r="pixel-regular"),e==="vellum"&&(r="vellum-solid"),e==="classic"&&(o==="thin"&&(r="thin"),o==="light"&&(r="light"),o==="regular"&&(r="regular"),o==="solid"&&(r="solid")),e==="duotone"&&(o==="thin"&&(r="duotone-thin"),o==="light"&&(r="duotone-light"),o==="regular"&&(r="duotone-regular"),o==="solid"&&(r="duotone")),e==="sharp"&&(o==="thin"&&(r="sharp-thin"),o==="light"&&(r="sharp-light"),o==="regular"&&(r="sharp-regular"),o==="solid"&&(r="sharp-solid")),e==="sharp-duotone"&&(o==="thin"&&(r="sharp-duotone-thin"),o==="light"&&(r="sharp-duotone-light"),o==="regular"&&(r="sharp-duotone-regular"),o==="solid"&&(r="sharp-duotone-solid")),e==="brands"&&(r="brands"),r}function bn(t,e,o){let r=vn(t,e,o),a=Pa();if(a)return`${a}/${r}/${t}.svg`;let i=Ma();return i.length>0?`https://ka-p.fontawesome.com/releases/v${Fa}/svgs/${r}/${t}.svg?token=${encodeURIComponent(i)}`:`https://ka-f.fontawesome.com/releases/v${Fa}/svgs/${r}/${t}.svg`}var Fa,yn,Ra,Nt=p(()=>{qt();Fa="7.3.0";yn={name:"default",resolver:(t,e="classic",o="solid")=>bn(t,e,o),mutator:(t,e)=>{if(t.hasAttribute("fill")||t.setAttribute("fill","currentColor"),e?.family&&!t.hasAttribute("data-duotone-initialized")){let{family:o,variant:r}=e;if(o==="duotone"||o==="sharp-duotone"||o==="notdog-duo"||o==="notdog"&&r==="duo-solid"||o==="jelly-duo"||o==="jelly"&&r==="duo-regular"||o==="utility-duo"||o==="slab-duo"||o==="slab-press-duo"||o==="thumbprint"){let a=[...t.querySelectorAll("path")],i=a.find(s=>!s.hasAttribute("opacity")),n=a.find(s=>s.hasAttribute("opacity"));if(!i||!n)return;if(i.setAttribute("data-duotone-primary",""),n.setAttribute("data-duotone-secondary",""),e.swapOpacity&&i&&n){let s=n.getAttribute("opacity")||"0.4";i.style.setProperty("--path-opacity",s),n.style.setProperty("--path-opacity","1")}t.setAttribute("data-duotone-initialized","")}}}},Ra=yn});function Cn(t){return`data:image/svg+xml,${encodeURIComponent(t)}`}var Zo,xn,Oa,Ut=p(()=>{Zo={solid:{"arrow-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7-105.4-105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/></svg>',"arrow-up":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3 160 480c0 17.7 14.3 32 32 32s32-14.3 32-32l0-370.7 105.4 105.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"/></svg>',backward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M236.3 107.1C247.9 96 265 92.9 279.7 99.2C294.4 105.5 304 120 304 136L304 272.3L476.3 107.2C487.9 96 505 92.9 519.7 99.2C534.4 105.5 544 120 544 136L544 504C544 520 534.4 534.5 519.7 540.8C505 547.1 487.9 544 476.3 532.9L304 367.7L304 504C304 520 294.4 534.5 279.7 540.8C265 547.1 247.9 544 236.3 532.9L44.3 348.9C36.5 341.3 32 330.9 32 320C32 309.1 36.5 298.7 44.3 291.1L236.3 107.1z"/></svg>',"backward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M491 100.8C478.1 93.8 462.3 94.5 450 102.6L192 272.1L192 128C192 110.3 177.7 96 160 96C142.3 96 128 110.3 128 128L128 512C128 529.7 142.3 544 160 544C177.7 544 192 529.7 192 512L192 367.9L450 537.5C462.3 545.6 478 546.3 491 539.3C504 532.3 512 518.8 512 504.1L512 136.1C512 121.4 503.9 107.9 491 100.9z"/></svg>',bars:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.3.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) Copyright 2026 Fonticons, Inc. --><path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/></svg>',"angles-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M77.3 256 214.7 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256zm192 0L406.7 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L269.3 256z"/></svg>',"angles-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M434.7 256 297.3 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L434.7 256zm-192 0L105.3 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256z"/></svg>',check:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M434.8 70.1c14.3 10.4 17.5 30.4 7.1 44.7l-256 352c-5.5 7.6-14 12.3-23.4 13.1s-18.5-2.7-25.1-9.3l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l101.5 101.5 234-321.7c10.4-14.3 30.4-17.5 44.7-7.1z"/></svg>',"chevron-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M201.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 338.7 54.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/></svg>',"chevron-left":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>',"chevron-right":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M311.1 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L243.2 256 73.9 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>',circle:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0z"/></svg>',"closed-captioning":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M64 192C64 156.7 92.7 128 128 128L512 128C547.3 128 576 156.7 576 192L576 448C576 483.3 547.3 512 512 512L128 512C92.7 512 64 483.3 64 448L64 192zM216 272L248 272C252.4 272 256 275.6 256 280C256 293.3 266.7 304 280 304C293.3 304 304 293.3 304 280C304 249.1 278.9 224 248 224L216 224C185.1 224 160 249.1 160 280L160 360C160 390.9 185.1 416 216 416L248 416C278.9 416 304 390.9 304 360C304 346.7 293.3 336 280 336C266.7 336 256 346.7 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 280C208 275.6 211.6 272 216 272zM384 280C384 275.6 387.6 272 392 272L424 272C428.4 272 432 275.6 432 280C432 293.3 442.7 304 456 304C469.3 304 480 293.3 480 280C480 249.1 454.9 224 424 224L392 224C361.1 224 336 249.1 336 280L336 360C336 390.9 361.1 416 392 416L424 416C454.9 416 480 390.9 480 360C480 346.7 469.3 336 456 336C442.7 336 432 346.7 432 360C432 364.4 428.4 368 424 368L392 368C387.6 368 384 364.4 384 360L384 280z"/></svg>',"closed-captioning-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M39 39.1C48.4 29.7 63.6 29.7 72.9 39.1L161.8 128L512 128C547.3 128 576 156.7 576 192L576 448C576 473.5 561.1 495.4 539.6 505.8L601 567.1C610.4 576.5 610.4 591.7 601 601C591.6 610.3 576.4 610.4 567.1 601L39 73.1C29.7 63.7 29.7 48.5 39 39.1zM384 350.1L384 279.9C384 275.5 387.6 271.9 392 271.9L424 271.9C428.4 271.9 432 275.5 432 279.9C432 293.2 442.7 303.9 456 303.9C469.3 303.9 480 293.2 480 279.9C480 249 454.9 223.9 424 223.9L392 223.9C361.1 223.9 336 249 336 279.9L336 302.1L384 350.1zM445.5 411.6C465.7 403.2 480 383.2 480 359.9C480 346.6 469.3 335.9 456 335.9C442.7 335.9 432 346.6 432 359.9C432 364.3 428.4 367.9 424 367.9L401.8 367.9L445.5 411.6zM162.3 264.1C160.8 269.1 160 274.5 160 280L160 360C160 390.9 185.1 416 216 416L248 416C266.1 416 282.1 407.5 292.4 394.2L410.2 512L128 512C92.7 512 64 483.3 64 448L64 192C64 184.2 65.4 176.7 68 169.8L162.3 264.1zM256.1 357.9C256 358.6 256 359.3 256 360C256 364.4 252.4 368 248 368L216 368C211.6 368 208 364.4 208 360L208 309.8L256.1 357.9z"/></svg>',compress:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M160 64c0-17.7-14.3-32-32-32S96 46.3 96 64l0 64-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l96 0c17.7 0 32-14.3 32-32l0-96zM32 320c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0 0 64c0 17.7 14.3 32 32 32s32-14.3 32-32l0-96c0-17.7-14.3-32-32-32l-96 0zM352 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0 0-64zM320 320c-17.7 0-32 14.3-32 32l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32l0-64 64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0z"/></svg>',ellipsis:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M96 320C96 289.1 121.1 264 152 264C182.9 264 208 289.1 208 320C208 350.9 182.9 376 152 376C121.1 376 96 350.9 96 320zM264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320zM488 264C518.9 264 544 289.1 544 320C544 350.9 518.9 376 488 376C457.1 376 432 350.9 432 320C432 289.1 457.1 264 488 264z"/></svg>',"ellipsis-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M320 208C289.1 208 264 182.9 264 152C264 121.1 289.1 96 320 96C350.9 96 376 121.1 376 152C376 182.9 350.9 208 320 208zM320 432C350.9 432 376 457.1 376 488C376 518.9 350.9 544 320 544C289.1 544 264 518.9 264 488C264 457.1 289.1 432 320 432zM376 320C376 350.9 350.9 376 320 376C289.1 376 264 350.9 264 320C264 289.1 289.1 264 320 264C350.9 264 376 289.1 376 320z"/></svg>',expand:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 96C110.3 96 96 110.3 96 128L96 224C96 241.7 110.3 256 128 256C145.7 256 160 241.7 160 224L160 160L224 160C241.7 160 256 145.7 256 128C256 110.3 241.7 96 224 96L128 96zM160 416C160 398.3 145.7 384 128 384C110.3 384 96 398.3 96 416L96 512C96 529.7 110.3 544 128 544L224 544C241.7 544 256 529.7 256 512C256 494.3 241.7 480 224 480L160 480L160 416zM416 96C398.3 96 384 110.3 384 128C384 145.7 398.3 160 416 160L480 160L480 224C480 241.7 494.3 256 512 256C529.7 256 544 241.7 544 224L544 128C544 110.3 529.7 96 512 96L416 96zM544 416C544 398.3 529.7 384 512 384C494.3 384 480 398.3 480 416L480 480L416 480C398.3 480 384 494.3 384 512C384 529.7 398.3 544 416 544L512 544C529.7 544 544 529.7 544 512L544 416z"/></svg>',eyedropper:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M341.6 29.2l-101.6 101.6-9.4-9.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-9.4-9.4 101.6-101.6c39-39 39-102.2 0-141.1s-102.2-39-141.1 0zM55.4 323.3c-15 15-23.4 35.4-23.4 56.6l0 42.4-26.6 39.9c-8.5 12.7-6.8 29.6 4 40.4s27.7 12.5 40.4 4l39.9-26.6 42.4 0c21.2 0 41.6-8.4 56.6-23.4l109.4-109.4-45.3-45.3-109.4 109.4c-3 3-7.1 4.7-11.3 4.7l-36.1 0 0-36.1c0-4.2 1.7-8.3 4.7-11.3l109.4-109.4-45.3-45.3-109.4 109.4z"/></svg>',filter:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M32 64C19.1 64 7.4 71.8 2.4 83.8S.2 109.5 9.4 118.6L192 301.3 192 416c0 8.5 3.4 16.6 9.4 22.6l64 64c9.2 9.2 22.9 11.9 34.9 6.9S320 492.9 320 480l0-178.7 182.6-182.6c9.2-9.2 11.9-22.9 6.9-34.9S492.9 64 480 64L32 64z"/></svg>',forward:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M403.7 107.1C392.1 96 375 92.9 360.3 99.2C345.6 105.5 336 120 336 136L336 272.3L163.7 107.2C152.1 96 135 92.9 120.3 99.2C105.6 105.5 96 120 96 136L96 504C96 520 105.6 534.5 120.3 540.8C135 547.1 152.1 544 163.7 532.9L336 367.7L336 504C336 520 345.6 534.5 360.3 540.8C375 547.1 392.1 544 403.7 532.9L595.7 348.9C603.6 341.4 608 330.9 608 320C608 309.1 603.5 298.7 595.7 291.1L403.7 107.1z"/></svg>',file:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M192 64C156.7 64 128 92.7 128 128L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 234.5C512 217.5 505.3 201.2 493.3 189.2L386.7 82.7C374.7 70.7 358.5 64 341.5 64L192 64zM453.5 240L360 240C346.7 240 336 229.3 336 216L336 122.5L453.5 240z"/></svg>',"file-audio":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM389.8 307.7C380.7 301.4 368.3 303.6 362 312.7C355.7 321.8 357.9 334.2 367 340.5C390.9 357.2 406.4 384.8 406.4 416C406.4 447.2 390.8 474.9 367 491.5C357.9 497.8 355.7 510.3 362 519.3C368.3 528.3 380.8 530.6 389.8 524.3C423.9 500.5 446.4 460.8 446.4 416C446.4 371.2 424 331.5 389.8 307.7zM208 376C199.2 376 192 383.2 192 392L192 440C192 448.8 199.2 456 208 456L232 456L259.2 490C262.2 493.8 266.8 496 271.7 496L272 496C280.8 496 288 488.8 288 480L288 352C288 343.2 280.8 336 272 336L271.7 336C266.8 336 262.2 338.2 259.2 342L232 376L208 376zM336 448.2C336 458.9 346.5 466.4 354.9 459.8C367.8 449.5 376 433.7 376 416C376 398.3 367.8 382.5 354.9 372.2C346.5 365.5 336 373.1 336 383.8L336 448.3z"/></svg>',"file-code":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM282.2 359.6C290.8 349.5 289.7 334.4 279.6 325.8C269.5 317.2 254.4 318.3 245.8 328.4L197.8 384.4C190.1 393.4 190.1 406.6 197.8 415.6L245.8 471.6C254.4 481.7 269.6 482.8 279.6 474.2C289.6 465.6 290.8 450.4 282.2 440.4L247.6 400L282.2 359.6zM394.2 328.4C385.6 318.3 370.4 317.2 360.4 325.8C350.4 334.4 349.2 349.6 357.8 359.6L392.4 400L357.8 440.4C349.2 450.5 350.3 465.6 360.4 474.2C370.5 482.8 385.6 481.7 394.2 471.6L442.2 415.6C449.9 406.6 449.9 393.4 442.2 384.4L394.2 328.4z"/></svg>',"file-excel":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM292 330.7C284.6 319.7 269.7 316.7 258.7 324C247.7 331.3 244.7 346.3 252 357.3L291.2 416L252 474.7C244.6 485.7 247.6 500.6 258.7 508C269.8 515.4 284.6 512.4 292 501.3L320 459.3L348 501.3C355.4 512.3 370.3 515.3 381.3 508C392.3 500.7 395.3 485.7 388 474.7L348.8 416L388 357.3C395.4 346.3 392.4 331.4 381.3 324C370.2 316.6 355.4 319.6 348 330.7L320 372.7L292 330.7z"/></svg>',"file-image":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM256 320C256 302.3 241.7 288 224 288C206.3 288 192 302.3 192 320C192 337.7 206.3 352 224 352C241.7 352 256 337.7 256 320zM220.6 512L419.4 512C435.2 512 448 499.2 448 483.4C448 476.1 445.2 469 440.1 463.7L343.3 361.9C337.3 355.6 328.9 352 320.1 352L319.8 352C311 352 302.7 355.6 296.6 361.9L199.9 463.7C194.8 469 192 476.1 192 483.4C192 499.2 204.8 512 220.6 512z"/></svg>',"file-pdf":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 64C92.7 64 64 92.7 64 128L64 512C64 547.3 92.7 576 128 576L208 576L208 464C208 428.7 236.7 400 272 400L448 400L448 234.5C448 217.5 441.3 201.2 429.3 189.2L322.7 82.7C310.7 70.7 294.5 64 277.5 64L128 64zM389.5 240L296 240C282.7 240 272 229.3 272 216L272 122.5L389.5 240zM272 444C261 444 252 453 252 464L252 592C252 603 261 612 272 612C283 612 292 603 292 592L292 564L304 564C337.1 564 364 537.1 364 504C364 470.9 337.1 444 304 444L272 444zM304 524L292 524L292 484L304 484C315 484 324 493 324 504C324 515 315 524 304 524zM400 444C389 444 380 453 380 464L380 592C380 603 389 612 400 612L432 612C460.7 612 484 588.7 484 560L484 496C484 467.3 460.7 444 432 444L400 444zM420 572L420 484L432 484C438.6 484 444 489.4 444 496L444 560C444 566.6 438.6 572 432 572L420 572zM508 464L508 592C508 603 517 612 528 612C539 612 548 603 548 592L548 548L576 548C587 548 596 539 596 528C596 517 587 508 576 508L548 508L548 484L576 484C587 484 596 475 596 464C596 453 587 444 576 444L528 444C517 444 508 453 508 464z"/></svg>',"file-powerpoint":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM280 320C266.7 320 256 330.7 256 344L256 488C256 501.3 266.7 512 280 512C293.3 512 304 501.3 304 488L304 464L328 464C367.8 464 400 431.8 400 392C400 352.2 367.8 320 328 320L280 320zM328 416L304 416L304 368L328 368C341.3 368 352 378.7 352 392C352 405.3 341.3 416 328 416z"/></svg>',"file-video":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM208 368L208 464C208 481.7 222.3 496 240 496L336 496C353.7 496 368 481.7 368 464L368 440L403 475C406.2 478.2 410.5 480 415 480C424.4 480 432 472.4 432 463L432 368.9C432 359.5 424.4 351.9 415 351.9C410.5 351.9 406.2 353.7 403 356.9L368 391.9L368 367.9C368 350.2 353.7 335.9 336 335.9L240 335.9C222.3 335.9 208 350.2 208 367.9z"/></svg>',"file-word":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM263.4 338.8C260.5 325.9 247.7 317.7 234.8 320.6C221.9 323.5 213.7 336.3 216.6 349.2L248.6 493.2C250.9 503.7 260 511.4 270.8 512C281.6 512.6 291.4 505.9 294.8 495.6L320 419.9L345.2 495.6C348.6 505.8 358.4 512.5 369.2 512C380 511.5 389.1 503.8 391.4 493.2L423.4 349.2C426.3 336.3 418.1 323.4 405.2 320.6C392.3 317.8 379.4 325.9 376.6 338.8L363.4 398.2L342.8 336.4C339.5 326.6 330.4 320 320 320C309.6 320 300.5 326.6 297.2 336.4L276.6 398.2L263.4 338.8z"/></svg>',"file-zipper":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M128 128C128 92.7 156.7 64 192 64L341.5 64C358.5 64 374.8 70.7 386.8 82.7L493.3 189.3C505.3 201.3 512 217.6 512 234.6L512 512C512 547.3 483.3 576 448 576L192 576C156.7 576 128 547.3 128 512L128 128zM336 122.5L336 216C336 229.3 346.7 240 360 240L453.5 240L336 122.5zM192 136C192 149.3 202.7 160 216 160L264 160C277.3 160 288 149.3 288 136C288 122.7 277.3 112 264 112L216 112C202.7 112 192 122.7 192 136zM192 232C192 245.3 202.7 256 216 256L264 256C277.3 256 288 245.3 288 232C288 218.7 277.3 208 264 208L216 208C202.7 208 192 218.7 192 232zM256 304L224 304C206.3 304 192 318.3 192 336L192 384C192 410.5 213.5 432 240 432C266.5 432 288 410.5 288 384L288 336C288 318.3 273.7 304 256 304zM240 368C248.8 368 256 375.2 256 384C256 392.8 248.8 400 240 400C231.2 400 224 392.8 224 384C224 375.2 231.2 368 240 368z"/></svg>',"forward-step":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M21 36.8c12.9-7 28.7-6.3 41 1.8L320 208.1 320 64c0-17.7 14.3-32 32-32s32 14.3 32 32l0 384c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-144.1-258 169.6c-12.3 8.1-28 8.8-41 1.8S0 454.7 0 440L0 72C0 57.3 8.1 43.8 21 36.8z"/></svg>',gauge:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm320 96c0-26.9-16.5-49.9-40-59.3L280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 172.7c-23.5 9.5-40 32.5-40 59.3 0 35.3 28.7 64 64 64s64-28.7 64-64zM144 176a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-16 80a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm288 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM400 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>',gear:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M259.1 73.5C262.1 58.7 275.2 48 290.4 48L350.2 48C365.4 48 378.5 58.7 381.5 73.5L396 143.5C410.1 149.5 423.3 157.2 435.3 166.3L503.1 143.8C517.5 139 533.3 145 540.9 158.2L570.8 210C578.4 223.2 575.7 239.8 564.3 249.9L511 297.3C511.9 304.7 512.3 312.3 512.3 320C512.3 327.7 511.8 335.3 511 342.7L564.4 390.2C575.8 400.3 578.4 417 570.9 430.1L541 481.9C533.4 495 517.6 501.1 503.2 496.3L435.4 473.8C423.3 482.9 410.1 490.5 396.1 496.6L381.7 566.5C378.6 581.4 365.5 592 350.4 592L290.6 592C275.4 592 262.3 581.3 259.3 566.5L244.9 496.6C230.8 490.6 217.7 482.9 205.6 473.8L137.5 496.3C123.1 501.1 107.3 495.1 99.7 481.9L69.8 430.1C62.2 416.9 64.9 400.3 76.3 390.2L129.7 342.7C128.8 335.3 128.4 327.7 128.4 320C128.4 312.3 128.9 304.7 129.7 297.3L76.3 249.8C64.9 239.7 62.3 223 69.8 209.9L99.7 158.1C107.3 144.9 123.1 138.9 137.5 143.7L205.3 166.2C217.4 157.1 230.6 149.5 244.6 143.4L259.1 73.5zM320.3 400C364.5 399.8 400.2 363.9 400 319.7C399.8 275.5 363.9 239.8 319.7 240C275.5 240.2 239.8 276.1 240 320.3C240.2 364.5 276.1 400.2 320.3 400z"/></svg>',"grip-vertical":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M128 40c0-22.1-17.9-40-40-40L40 0C17.9 0 0 17.9 0 40L0 88c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zm0 192c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM0 424l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 40c0-22.1-17.9-40-40-40L232 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48zM192 232l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40zM320 424c0-22.1-17.9-40-40-40l-48 0c-22.1 0-40 17.9-40 40l0 48c0 22.1 17.9 40 40 40l48 0c22.1 0 40-17.9 40-40l0-48z"/></svg>',indeterminate:'<svg part="indeterminate-icon" class="icon" viewBox="0 0 16 16"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round"><g stroke="currentColor" stroke-width="2"><g transform="translate(2.285714 6.857143)"><path d="M10.2857143,1.14285714 L1.14285714,1.14285714"/></g></g></g></svg>',"magnifying-glass":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376C296.3 401.1 253.9 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>',minus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32z"/></svg>',pause:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M48 32C21.5 32 0 53.5 0 80L0 432c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48L48 32zm224 0c-26.5 0-48 21.5-48 48l0 352c0 26.5 21.5 48 48 48l64 0c26.5 0 48-21.5 48-48l0-352c0-26.5-21.5-48-48-48l-64 0z"/></svg>',"picture-in-picture":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M448 32c35.3 0 64 28.7 64 64l0 112-64 0 0-112-384 0 0 320 144 0 0 64-144 0-6.5-.3c-30.1-3.1-54.1-27-57.1-57.1L0 416 0 96C0 62.9 25.2 35.6 57.5 32.3L64 32 448 32zm16 224c26.5 0 48 21.5 48 48l0 128c0 26.5-21.5 48-48 48l-160 0c-26.5 0-48-21.5-48-48l0-128c0-26.5 21.5-48 48-48l160 0z"/></svg>',play:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M91.2 36.9c-12.4-6.8-27.4-6.5-39.6 .7S32 57.9 32 72l0 368c0 14.1 7.5 27.2 19.6 34.4s27.2 7.5 39.6 .7l336-184c12.8-7 20.8-20.5 20.8-35.1s-8-28.1-20.8-35.1l-336-184z"/></svg>',"play-circle":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zM188.3 147.1c-7.6 4.2-12.3 12.3-12.3 20.9l0 176c0 8.7 4.7 16.7 12.3 20.9s16.8 4.1 24.3-.5l144-88c7.1-4.4 11.5-12.1 11.5-20.5s-4.4-16.1-11.5-20.5l-144-88c-7.4-4.5-16.7-4.7-24.3-.5z"/></svg>',plus:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M309.5-18.9c-4.1-8-12.4-13.1-21.4-13.1s-17.3 5.1-21.4 13.1L193.1 125.3 33.2 150.7c-8.9 1.4-16.3 7.7-19.1 16.3s-.5 18 5.8 24.4l114.4 114.5-25.2 159.9c-1.4 8.9 2.3 17.9 9.6 23.2s16.9 6.1 25 2L288.1 417.6 432.4 491c8 4.1 17.7 3.3 25-2s11-14.2 9.6-23.2L441.7 305.9 556.1 191.4c6.4-6.4 8.6-15.8 5.8-24.4s-10.1-14.9-19.1-16.3L383 125.3 309.5-18.9z"/></svg>',"table-columns":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 128 0 0-256-128 0zm320 0l-128 0 0 256 128 0 0-256z"/></svg>',thumbtack:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M32 32C32 14.3 46.3 0 64 0L320 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-29.5 0 10.3 134.1c37.1 21.2 65.8 56.4 78.2 99.7l3.8 13.4c2.8 9.7 .8 20-5.2 28.1S362 352 352 352L32 352c-10 0-19.5-4.7-25.5-12.7s-8-18.4-5.2-28.1L5 297.8c12.4-43.3 41-78.5 78.2-99.7L93.5 64 64 64C46.3 64 32 49.7 32 32zM160 400l64 0 0 112c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-112z"/></svg>',"up-down":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M406.6 502.6l96-96c9.2-9.2 11.9-22.9 6.9-34.9S492.9 352 480 352l-64 0 0-320c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 320-64 0c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l96 96c12.5 12.5 32.8 12.5 45.3 0zM150.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-96 96c-9.2 9.2-11.9 22.9-6.9 34.9S19.1 160 32 160l64 0 0 320c0 17.7 14.3 32 32 32s32-14.3 32-32l0-320 64 0c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-96-96z"/></svg>',upload:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free 7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M352 173.3L352 384C352 401.7 337.7 416 320 416C302.3 416 288 401.7 288 384L288 173.3L246.6 214.7C234.1 227.2 213.8 227.2 201.3 214.7C188.8 202.2 188.8 181.9 201.3 169.4L297.3 73.4C309.8 60.9 330.1 60.9 342.6 73.4L438.6 169.4C451.1 181.9 451.1 202.2 438.6 214.7C426.1 227.2 405.8 227.2 393.3 214.7L352 173.3zM320 464C364.2 464 400 428.2 400 384L480 384C515.3 384 544 412.7 544 448L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 448C96 412.7 124.7 384 160 384L240 384C240 428.2 275.8 464 320 464zM464 488C477.3 488 488 477.3 488 464C488 450.7 477.3 440 464 440C450.7 440 440 450.7 440 464C440 477.3 450.7 488 464 488z"/></svg>',user:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M224 248a120 120 0 1 0 0-240 120 120 0 1 0 0 240zm-29.7 56C95.8 304 16 383.8 16 482.3 16 498.7 29.3 512 45.7 512l356.6 0c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3l-59.4 0z"/></svg>',volume:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-low":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM380.6 181.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/></svg>',"volume-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM367 175c-9.4 9.4-9.4 24.6 0 33.9l47 47-47 47c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l47-47 47 47c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-47-47 47-47c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-47 47-47-47c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',xmark:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M55.1 73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L147.2 256 9.9 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192.5 301.3 329.9 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.8 256 375.1 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192.5 210.7 55.1 73.4z"/></svg>'},regular:{calendar:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M216 64C229.3 64 240 74.7 240 88L240 128L400 128L400 88C400 74.7 410.7 64 424 64C437.3 64 448 74.7 448 88L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 88C192 74.7 202.7 64 216 64zM216 176L160 176C151.2 176 144 183.2 144 192L144 240L496 240L496 192C496 183.2 488.8 176 480 176L216 176zM144 288L144 480C144 488.8 151.2 496 160 496L480 496C488.8 496 496 488.8 496 480L496 288L144 288z"/></svg>',"circle-question":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M464 256a208 208 0 1 0 -416 0 208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0 256 256 0 1 1 -512 0zm256-80c-17.7 0-32 14.3-32 32 0 13.3-10.7 24-24 24s-24-10.7-24-24c0-44.2 35.8-80 80-80s80 35.8 80 80c0 47.2-36 67.2-56 74.5l0 3.8c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-8.1c0-20.5 14.8-35.2 30.1-40.2 6.4-2.1 13.2-5.5 18.2-10.3 4.3-4.2 7.7-10 7.7-19.6 0-17.7-14.3-32-32-32zM224 368a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>',"circle-xmark":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464a256 256 0 1 0 0-512 256 256 0 1 0 0 512zM167 167c-9.4 9.4-9.4 24.6 0 33.9l55 55-55 55c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l55-55 55 55c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-55-55 55-55c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-55 55-55-55c-9.4-9.4-24.6-9.4-33.9 0z"/></svg>',clock:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><!--!Font Awesome Free v7.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc.--><path d="M528 320C528 434.9 434.9 528 320 528C205.1 528 112 434.9 112 320C112 205.1 205.1 112 320 112C434.9 112 528 205.1 528 320zM64 320C64 461.4 178.6 576 320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"/></svg>',copy:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M384 336l-192 0c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l133.5 0c4.2 0 8.3 1.7 11.3 4.7l58.5 58.5c3 3 4.7 7.1 4.7 11.3L400 320c0 8.8-7.2 16-16 16zM192 384l192 0c35.3 0 64-28.7 64-64l0-197.5c0-17-6.7-33.3-18.7-45.3L370.7 18.7C358.7 6.7 342.5 0 325.5 0L192 0c-35.3 0-64 28.7-64 64l0 256c0 35.3 28.7 64 64 64zM64 128c-35.3 0-64 28.7-64 64L0 448c0 35.3 28.7 64 64 64l192 0c35.3 0 64-28.7 64-64l0-16-48 0 0 16c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16l0-256c0-8.8 7.2-16 16-16l16 0 0-48-16 0z"/></svg>',eye:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M288 80C222.8 80 169.2 109.6 128.1 147.7 89.6 183.5 63 226 49.4 256 63 286 89.6 328.5 128.1 364.3 169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256 513 226 486.4 183.5 447.9 147.7 406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1 3.3 7.9 3.3 16.7 0 24.6-14.9 35.7-46.2 87.7-93 131.1-47.1 43.7-111.8 80.6-192.6 80.6S142.5 443.2 95.4 399.4c-46.8-43.5-78.1-95.4-93-131.1-3.3-7.9-3.3-16.7 0-24.6 14.9-35.7 46.2-87.7 93-131.1zM288 336c44.2 0 80-35.8 80-80 0-29.6-16.1-55.5-40-69.3-1.4 59.7-49.6 107.9-109.3 109.3 13.8 23.9 39.7 40 69.3 40zm-79.6-88.4c2.5 .3 5 .4 7.6 .4 35.3 0 64-28.7 64-64 0-2.6-.2-5.1-.4-7.6-37.4 3.9-67.2 33.7-71.1 71.1zm45.6-115c10.8-3 22.2-4.5 33.9-4.5 8.8 0 17.5 .9 25.8 2.6 .3 .1 .5 .1 .8 .2 57.9 12.2 101.4 63.7 101.4 125.2 0 70.7-57.3 128-128 128-61.6 0-113-43.5-125.2-101.4-1.8-8.6-2.8-17.5-2.8-26.6 0-11 1.4-21.8 4-32 .2-.7 .3-1.3 .5-1.9 11.9-43.4 46.1-77.6 89.5-89.5z"/></svg>',"eye-slash":'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M41-24.9c-9.4-9.4-24.6-9.4-33.9 0S-2.3-.3 7 9.1l528 528c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-96.4-96.4c2.7-2.4 5.4-4.8 8-7.2 46.8-43.5 78.1-95.4 93-131.1 3.3-7.9 3.3-16.7 0-24.6-14.9-35.7-46.2-87.7-93-131.1-47.1-43.7-111.8-80.6-192.6-80.6-56.8 0-105.6 18.2-146 44.2L41-24.9zM176.9 111.1c32.1-18.9 69.2-31.1 111.1-31.1 65.2 0 118.8 29.6 159.9 67.7 38.5 35.7 65.1 78.3 78.6 108.3-13.6 30-40.2 72.5-78.6 108.3-3.1 2.8-6.2 5.6-9.4 8.4L393.8 328c14-20.5 22.2-45.3 22.2-72 0-70.7-57.3-128-128-128-26.7 0-51.5 8.2-72 22.2l-39.1-39.1zm182 182l-108-108c11.1-5.8 23.7-9.1 37.1-9.1 44.2 0 80 35.8 80 80 0 13.4-3.3 26-9.1 37.1zM103.4 173.2l-34-34c-32.6 36.8-55 75.8-66.9 104.5-3.3 7.9-3.3 16.7 0 24.6 14.9 35.7 46.2 87.7 93 131.1 47.1 43.7 111.8 80.6 192.6 80.6 37.3 0 71.2-7.9 101.5-20.6L352.2 422c-20 6.4-41.4 10-64.2 10-65.2 0-118.8-29.6-159.9-67.7-38.5-35.7-65.1-78.3-78.6-108.3 10.4-23.1 28.6-53.6 54-82.8z"/></svg>',star:'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--! Font Awesome Free 7.0.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc. --><path d="M288.1-32c9 0 17.3 5.1 21.4 13.1L383 125.3 542.9 150.7c8.9 1.4 16.3 7.7 19.1 16.3s.5 18-5.8 24.4L441.7 305.9 467 465.8c1.4 8.9-2.3 17.9-9.6 23.2s-17 6.1-25 2L288.1 417.6 143.8 491c-8 4.1-17.7 3.3-25-2s-11-14.2-9.6-23.2L134.4 305.9 20 191.4c-6.4-6.4-8.6-15.8-5.8-24.4s10.1-14.9 19.1-16.3l159.9-25.4 73.6-144.2c4.1-8 12.4-13.1 21.4-13.1zm0 76.8L230.3 158c-3.5 6.8-10 11.6-17.6 12.8l-125.5 20 89.8 89.9c5.4 5.4 7.9 13.1 6.7 20.7l-19.8 125.5 113.3-57.6c6.8-3.5 14.9-3.5 21.8 0l113.3 57.6-19.8-125.5c-1.2-7.6 1.3-15.3 6.7-20.7l89.8-89.9-125.5-20c-7.6-1.2-14.1-6-17.6-12.8L288.1 44.8z"/></svg>'}},xn={name:"system",resolver:(t,e="classic",o="solid")=>{let a=Zo[o][t]??Zo.regular[t]??Zo.regular["circle-question"];return a?Cn(a):""},mutator:t=>{t.hasAttribute("fill")||t.setAttribute("fill","currentColor")}},Oa=xn});function Ia(t){Ta.add(t)}function Ba(t){Ta.delete(t)}function so(t){return Sn.find(e=>e.name===t)}function Da(){return Ln}var Ln,Sn,Ta,Ht=p(()=>{Nt();Ut();Ln="classic",Sn=[Ra,Oa],Ta=new Set});var Mc,qa,Na=p(()=>{yt();({I:Mc}=Qr),qa=(t,e)=>e===void 0?t?._$litType$!==void 0:t?._$litType$===e});var Ua=p(()=>{Na()});var Le,lo,Jo,tr,O,ie=p(()=>{It();Bt();Dt();V();I();Ht();R();k();j();Ua();Le=Symbol(),lo=Symbol(),tr=new Map,O=class extends P{constructor(){super(...arguments),this.svg=null,this.autoWidth=!1,this.swapOpacity=!1,this.label="",this.library="default",this.rotate=0,this.resolveIcon=async(t,e)=>{let o;if(e?.spriteSheet){this.hasUpdated||await this.updateComplete,this.svg=A`<svg part="svg">
        <use part="use" href="${t}"></use>
      </svg>`,await this.updateComplete;let r=this.shadowRoot.querySelector("[part='svg']");return typeof e.mutator=="function"&&e.mutator(r,this),this.svg}try{if(o=await fetch(t,{mode:"cors"}),!o.ok)return o.status===410?Le:lo}catch{return lo}try{let r=document.createElement("div");r.innerHTML=await o.text();let a=r.firstElementChild;if(a?.tagName?.toLowerCase()!=="svg")return Le;Jo||(Jo=new DOMParser);let n=Jo.parseFromString(a.outerHTML,"text/html").body.querySelector("svg");return n?(n.part.add("svg"),document.adoptNode(n)):Le}catch{return Le}}}connectedCallback(){super.connectedCallback(),Ia(this)}firstUpdated(t){super.firstUpdated(t),this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`),this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),Ba(this)}async getIconSource(){let t=so(this.library),e=this.family||Da();if(this.name&&t){let o=this.canvas==="auto"||this.autoWidth,r;try{r=await t.resolver(this.name,e,this.variant,o)}catch{r=void 0}return{url:r,fromLibrary:!0}}return{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){let{url:t,fromLibrary:e}=await this.getIconSource(),o=e?so(this.library):void 0;if(!t){this.svg=null;return}let r=tr.get(t);r||(r=this.resolveIcon(t,o),tr.set(t,r));let a=await r;a===lo&&tr.delete(t);let i=await this.getIconSource();if(t===i.url){if(qa(a)){this.svg=a;return}switch(a){case lo:case Le:this.svg=null,this.dispatchEvent(new ka);break;default:this.svg=a.cloneNode(!0),o?.mutator?.(this.svg,this),this.dispatchEvent(new $a)}}}willUpdate(t){return this.style||this.setStyleProperty("--rotate-angle",`${this.rotate}deg`),super.willUpdate(t)}updated(t){super.updated(t);let e=so(this.library);this.hasAttribute("rotate")&&this.style.setProperty("--rotate-angle",`${this.rotate}deg`);let o=this.shadowRoot?.querySelector("svg");o&&e?.mutator?.(o,this)}render(){return this.hasUpdated?this.svg:A`<svg part="svg" width="16" height="16" viewBox="0 0 16 16"></svg>`}};O.css=_a;c([Rt()],O.prototype,"svg",2);c([m({reflect:!0})],O.prototype,"name",2);c([m({reflect:!0})],O.prototype,"family",2);c([m({reflect:!0})],O.prototype,"variant",2);c([m({reflect:!0})],O.prototype,"canvas",2);c([m({attribute:"auto-width",type:Boolean,reflect:!0})],O.prototype,"autoWidth",2);c([m({attribute:"swap-opacity",type:Boolean,reflect:!0})],O.prototype,"swapOpacity",2);c([m()],O.prototype,"src",2);c([m()],O.prototype,"label",2);c([m({reflect:!0})],O.prototype,"library",2);c([m({type:Number,reflect:!0})],O.prototype,"rotate",2);c([m({type:String,reflect:!0})],O.prototype,"flip",2);c([m({type:String,reflect:!0})],O.prototype,"animation",2);c([D("label")],O.prototype,"handleLabelChange",1);c([D(["family","name","library","variant","src","autoWidth","canvas","swapOpacity"],{waitUntilFirstUpdate:!0})],O.prototype,"setIcon",1);O=c([T("wa-icon")],O)});var Ha=p(()=>{Yo();Go();no();Be();Qe();me();xt();nt();oe();Je();to();ie();It();Bt();Dt();V();I();Z();ae();Ht();Nt();qt();Ut();R();});var Wa,er=p(()=>{k();Wa=class{constructor(t,e){this.element=t,this.callback=e}start(...t){if(!!1){this.observer??(this.observer=new ResizeObserver(()=>this.check())),this.observer.observe(this.element);for(let e of t)this.observer.observe(e);this.initialCheckHandle??(this.initialCheckHandle=requestAnimationFrame(()=>{this.initialCheckHandle=void 0,this.check()}))}}stop(){this.initialCheckHandle!==void 0&&(cancelAnimationFrame(this.initialCheckHandle),this.initialCheckHandle=void 0),this.observer?.disconnect()}check(){this.callback(this.element.getClientRects().length>0)}}});function Va(t,e){let o=e.getBoundingClientRect();return t.clientX>=o.left&&t.clientX<=o.right&&t.clientY>=o.top&&t.clientY<=o.bottom}function An(){let t=document.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function zn(){let t=Number(getComputedStyle(document.body).paddingRight.replace(/px/,""));return isNaN(t)||!t?0:t}function co(t){if(or.add(t),!document.documentElement.classList.contains("wa-scroll-lock")){let e=An()+zn(),o=getComputedStyle(document.documentElement).scrollbarGutter;(!o||o==="auto")&&(o="stable"),e<2&&(o=""),document.documentElement.style.setProperty("--wa-scroll-lock-gutter",o),document.documentElement.classList.add("wa-scroll-lock"),document.documentElement.style.setProperty("--wa-scroll-lock-size",`${e}px`)}}function uo(t){or.delete(t),or.size===0&&(document.documentElement.classList.remove("wa-scroll-lock"),document.documentElement.style.removeProperty("--wa-scroll-lock-size"))}var or,rr=p(()=>{or=new Set});function ja(t){return t.split(" ").map(e=>e.trim()).filter(e=>e!=="")}var ar=p(()=>{});var mo,Se=p(()=>{mo=class extends Event{constructor(){super("wa-show",{bubbles:!0,cancelable:!0,composed:!0})}}});var ho,Ae=p(()=>{ho=class extends Event{constructor(t){super("wa-hide",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}}});var po,ze=p(()=>{po=class extends Event{constructor(){super("wa-after-hide",{bubbles:!0,cancelable:!1,composed:!0})}}});var fo,Ee=p(()=>{fo=class extends Event{constructor(){super("wa-after-show",{bubbles:!0,cancelable:!1,composed:!0})}}});var Xa,ir=p(()=>{k();Xa=z`
  :host {
    --width: 31rem;
    --spacing: var(--wa-space-l);
    --backdrop-filter: none;
    --show-duration: var(--wa-transition-normal);
    --hide-duration: var(--wa-transition-normal);

    display: none;
  }

  :host([open]) {
    display: block;
  }

  .dialog {
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: var(--width);
    max-width: calc(100% - var(--wa-space-2xl));
    max-height: calc(100% - var(--wa-space-2xl));
    color: inherit;
    background-color: var(--wa-color-surface-raised);
    border-radius: var(--wa-panel-border-radius);
    border: none;
    box-shadow: var(--wa-shadow-l);
    padding: 0;
    margin: auto;

    &.show {
      animation: show-dialog var(--show-duration) ease;

      &::backdrop {
        animation: show-backdrop var(--show-duration, 200ms) ease;
      }
    }

    &.hide {
      animation: show-dialog var(--hide-duration) ease reverse;

      &::backdrop {
        animation: show-backdrop var(--hide-duration, 200ms) ease reverse;
      }
    }

    &.pulse {
      animation: pulse 250ms ease;
    }
  }

  .dialog:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog {
      max-height: 80vh;
    }
  }

  .open {
    display: flex;
    opacity: 1;
  }

  .header {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: nowrap;

    padding-inline-start: var(--spacing);
    padding-block-end: 0;

    /* Subtract the close button's padding so that the X is visually aligned with the edges of the dialog content */
    padding-inline-end: calc(var(--spacing) - var(--wa-form-control-padding-block));
    padding-block-start: calc(var(--spacing) - var(--wa-form-control-padding-block));
  }

  .title {
    align-self: center;
    flex: 1 1 auto;
    font-family: inherit;
    font-size: var(--wa-font-size-l);
    font-weight: var(--wa-font-weight-heading);
    line-height: var(--wa-line-height-condensed);
    margin: 0;
  }

  .header-actions {
    align-self: start;
    display: flex;
    flex-shrink: 0;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--wa-space-2xs);
    padding-inline-start: var(--spacing);
  }

  .header-actions wa-button,
  .header-actions ::slotted(wa-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .body {
    flex: 1 1 auto;
    display: block;
    padding: var(--spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      outline: var(--wa-focus-ring);
      outline-offset: var(--wa-focus-ring-offset);
    }
  }

  .footer {
    flex: 0 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: var(--wa-space-xs);
    justify-content: end;
    padding: var(--spacing);
    padding-block-start: 0;
  }

  .footer ::slotted(wa-button:not(:first-of-type)) {
    margin-inline-start: var(--wa-spacing-xs);
  }

  .dialog::backdrop {
    /*
      NOTE: the ::backdrop element doesn't inherit properly in Safari yet, but it will in 17.4! At that time, we can
      remove the fallback values here.
    */
    background-color: var(--wa-color-overlay-modal, rgb(0 0 0 / 0.25));
    backdrop-filter: var(--backdrop-filter);
  }

  @keyframes pulse {
    0% {
      scale: 1;
    }
    50% {
      scale: 1.02;
    }
    100% {
      scale: 1;
    }
  }

  @keyframes show-dialog {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }

  @keyframes show-backdrop {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .dialog {
      border: solid 1px white;
    }
  }
`});function wo(t){ne(t),Wt.push(t)}function ne(t){for(let e=Wt.length-1;e>=0;e--)if(Wt[e]===t){Wt.splice(e,1);break}}function ke(t){return Wt.length>0&&Wt[Wt.length-1]===t}var Wt,$e=p(()=>{Wt=[]});function J(t,e){return new Promise(o=>{let r=new AbortController,{signal:a}=r;if(t.classList.contains(e))return;t.classList.add(e);let i=!1,n=()=>{i||(i=!0,t.classList.remove(e),o(),r.abort())};t.addEventListener("animationend",n,{once:!0,signal:a}),t.addEventListener("animationcancel",n,{once:!0,signal:a}),requestAnimationFrame(()=>{!i&&t.getAnimations().length===0&&n()})})}var Vt=p(()=>{});var Y,Ya=p(()=>{er();rr();ar();Se();Ae();ze();Ee();ir();$e();nt();Vt();V();I();Z();R();k();j();ao();xe();Y=class extends P{constructor(){super(...arguments),this.localize=new X(this),this.hasSlotController=new Lt(this,"footer","header-actions","label"),this.renderedWatcher=new Wa(this,t=>this.handleRenderedChange(t)),this.open=!1,this.label="",this.withoutHeader=!1,this.lightDismiss=!1,this.withFooter=!1,this.withLabel=!1,this.handleDocumentKeyDown=t=>{t.key==="Escape"&&this.open&&ke(this)&&(t.preventDefault(),t.stopPropagation(),this.requestClose(this.dialog))}}firstUpdated(t){super.firstUpdated(t),this.open&&(this.addOpenListeners(),this.dialog.showModal(),co(this),this.renderedWatcher.start(this.dialog))}disconnectedCallback(){super.disconnectedCallback(),this.renderedWatcher.stop(),uo(this),this.removeOpenListeners()}async requestClose(t){let e=new ho({source:t});if(this.dispatchEvent(e),e.defaultPrevented){this.open=!0,J(this.dialog,"pulse");return}this.removeOpenListeners(),await J(this.dialog,"hide"),this.open=!1,this.dialog.close(),uo(this),this.renderedWatcher.stop();let o=this.originalTrigger;typeof o?.focus=="function"&&setTimeout(()=>o.focus()),this.dispatchEvent(new po)}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown),wo(this)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown),ne(this)}handleDialogCancel(t){t.preventDefault(),!this.dialog.classList.contains("hide")&&t.target===this.dialog&&ke(this)&&this.requestClose(this.dialog)}handleDialogClick(t){let o=t.target.closest('[data-dialog="close"]');o&&(t.stopPropagation(),this.requestClose(o))}async handleDialogPointerDown(t){t.target===this.dialog&&!Va(t,this.dialog)&&(this.lightDismiss?this.requestClose(this.dialog):await J(this.dialog,"pulse"))}handleRenderedChange(t){if(!this.open){this.renderedWatcher.stop();return}!t&&this.dialog.open?(this.removeOpenListeners(),this.dialog.close(),uo(this)):t&&!this.dialog.open&&(this.addOpenListeners(),this.dialog.showModal(),co(this))}handleOpenChange(){this.open&&!this.dialog.open?this.show():!this.open&&this.dialog.open?(this.open=!0,this.requestClose(this.dialog)):this.open||this.renderedWatcher.stop()}async show(){let t=new mo;if(this.dispatchEvent(t),t.defaultPrevented){this.open=!1;return}this.addOpenListeners(),this.originalTrigger=document.activeElement,this.open=!0,this.dialog.showModal(),co(this),this.renderedWatcher.start(this.dialog),requestAnimationFrame(()=>{let e=this.querySelector("[autofocus]");e&&typeof e.focus=="function"?e.focus():this.dialog.focus()}),await J(this.dialog,"show"),this.dispatchEvent(new fo)}render(){let t=!this.withoutHeader,e=this.hasSlotController.test("footer","withFooter"),o=this.label.length>0||this.hasSlotController.test("label","withLabel");return A`
      <dialog
        part="dialog"
        aria-labelledby=${F(t&&o?"title":void 0)}
        aria-label=${F(!t&&this.label?this.label:void 0)}
        class=${Tt({dialog:!0,open:this.open})}
        @cancel=${this.handleDialogCancel}
        @click=${this.handleDialogClick}
        @pointerdown=${this.handleDialogPointerDown}
      >
        ${t?A`
              <div part="header" class="header">
                <h2 part="title" class="title" id="title">
                  <!-- If there's no label, use an invisible character to prevent the header from collapsing -->
                  <slot name="label"> ${this.label.length>0?this.label:"\u200B"} </slot>
                </h2>
                <div part="header-actions" class="header-actions">
                  <slot name="header-actions"></slot>
                  <wa-button
                    part="close-button"
                    exportparts="base:close-button__base"
                    class="close"
                    appearance="plain"
                    @click="${r=>this.requestClose(r.target)}"
                  >
                    <wa-icon
                      name="xmark"
                      label=${this.localize.term("close")}
                      library="system"
                      variant="solid"
                    ></wa-icon>
                  </wa-button>
                </div>
              </div>
            `:""}

        <div part="body" class="body"><slot></slot></div>

        <!-- Use a hidden element so we still get "slotchange" events. -->
        <div part="footer" class="footer" ?hidden=${!e}>
          <slot name="footer"></slot>
        </div>
      </dialog>
    `}};Y.css=Xa;c([N(".dialog")],Y.prototype,"dialog",2);c([m({type:Boolean,reflect:!0})],Y.prototype,"open",2);c([m({reflect:!0})],Y.prototype,"label",2);c([m({attribute:"without-header",type:Boolean,reflect:!0})],Y.prototype,"withoutHeader",2);c([m({attribute:"light-dismiss",type:Boolean})],Y.prototype,"lightDismiss",2);c([m({attribute:"with-footer",type:Boolean})],Y.prototype,"withFooter",2);c([m({attribute:"with-label",type:Boolean})],Y.prototype,"withLabel",2);c([D("open",{waitUntilFirstUpdate:!0})],Y.prototype,"handleOpenChange",1);Y=c([T("wa-dialog")],Y);document.addEventListener("click",t=>{let e=t.target.closest("[data-dialog]");if(e instanceof Element){let[o,r]=ja(e.getAttribute("data-dialog")||"");if(o==="open"&&r?.length){let i=e.getRootNode().getElementById(r);i?.localName==="wa-dialog"?i.open=!0:console.warn(`A dialog with an ID of "${r}" could not be found in this document.`)}}}),document.addEventListener("pointerdown",()=>{})});var Ka=p(()=>{Ya();er();rr();ar();Se();Ae();ze();Ee();ir();$e();Yo();Go();no();Be();Qe();me();xt();nt();oe();Je();to();Vt();ie();It();Bt();Dt();V();I();Z();ae();Ht();Nt();qt();Ut();R();});var Ga,nr=p(()=>{Ga=class extends Event{constructor(t){super("wa-select",{bubbles:!0,cancelable:!0,composed:!0}),this.detail=t}}});function*sr(t=document.activeElement){t!=null&&(yield t,"shadowRoot"in t&&t.shadowRoot&&t.shadowRoot.mode!=="closed"&&(yield*sr(t.shadowRoot.activeElement)))}var lr=p(()=>{});var Qa,cr=p(()=>{k();Qa=z`
  :host {
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);
    display: contents;
  }

  #menu {
    display: flex;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;
    overflow: auto;
    max-width: var(--auto-size-available-width) !important;
    max-height: var(--auto-size-available-height) !important;

    &.show {
      animation: show var(--show-duration) ease;
    }

    &.hide {
      animation: show var(--hide-duration) ease reverse;
    }

    ::slotted(h1),
    ::slotted(h2),
    ::slotted(h3),
    ::slotted(h4),
    ::slotted(h5),
    ::slotted(h6) {
      display: block !important;
      margin: 0.25em 0 !important;
      padding: 0.25em 0.75em !important;
      color: var(--wa-color-text-quiet);
      font-family: var(--wa-font-family-body) !important;
      font-weight: var(--wa-font-weight-semibold) !important;
      font-size: var(--wa-font-size-smaller) !important;
    }

    ::slotted(wa-divider) {
      --spacing: 0.25em; /* Component-specific, left as-is */
    }
  }

  wa-popup[data-current-placement^='top'] #menu {
    transform-origin: bottom;
  }

  wa-popup[data-current-placement^='bottom'] #menu {
    transform-origin: top;
  }

  wa-popup[data-current-placement^='left'] #menu {
    transform-origin: right;
  }

  wa-popup[data-current-placement^='right'] #menu {
    transform-origin: left;
  }

  wa-popup[data-current-placement='left-start'] #menu {
    transform-origin: right top;
  }

  wa-popup[data-current-placement='left-end'] #menu {
    transform-origin: right bottom;
  }

  wa-popup[data-current-placement='right-start'] #menu {
    transform-origin: left top;
  }

  wa-popup[data-current-placement='right-end'] #menu {
    transform-origin: left bottom;
  }

  @keyframes show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`});var Za,Ja=p(()=>{Za="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict"});var ti,ei=p(()=>{Ja();ti=(t=21)=>{let e="",o=crypto.getRandomValues(new Uint8Array(t|=0));for(;t--;)e+=Za[o[t]&63];return e}});function dr(t,e,o){let r=a=>Object.is(a,-0)?0:a;return t<e?r(e):t>o?r(o):r(t)}function oi(t=""){return`${t}${ti()}`}var _e=p(()=>{ei();});function ur(t,e,o){return tt(t,st(e,o))}function jt(t,e){return typeof t=="function"?t(e):t}function St(t){return t.split("-")[0]}function Xt(t){return t.split("-")[1]}function mr(t){return t==="x"?"y":"x"}function vo(t){return t==="y"?"height":"width"}function ct(t){let e=t[0];return e==="t"||e==="b"?"y":"x"}function bo(t){return mr(ct(t))}function ii(t,e,o){o===void 0&&(o=!1);let r=Xt(t),a=bo(t),i=vo(a),n=a==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[i]>e.floating[i]&&(n=Pe(n)),[n,Pe(n)]}function ni(t){let e=Pe(t);return[go(t),e,go(e)]}function go(t){return t.includes("start")?t.replace("start","end"):t.replace("end","start")}function _n(t,e,o){switch(t){case"top":case"bottom":return o?e?ai:ri:e?ri:ai;case"left":case"right":return e?kn:$n;default:return[]}}function si(t,e,o,r){let a=Xt(t),i=_n(St(t),o==="start",r);return a&&(i=i.map(n=>n+"-"+a),e&&(i=i.concat(i.map(go)))),i}function Pe(t){let e=St(t);return En[e]+t.slice(e.length)}function Pn(t){var e,o,r,a;return{top:(e=t.top)!=null?e:0,right:(o=t.right)!=null?o:0,bottom:(r=t.bottom)!=null?r:0,left:(a=t.left)!=null?a:0}}function hr(t){return typeof t!="number"?Pn(t):{top:t,right:t,bottom:t,left:t}}function Yt(t){let{x:e,y:o,width:r,height:a}=t;return{width:r,height:a,top:o,left:e,right:e+r,bottom:o+a,x:e,y:o}}var st,tt,Me,Fe,lt,En,ri,ai,kn,$n,yo=p(()=>{st=Math.min,tt=Math.max,Me=Math.round,Fe=Math.floor,lt=t=>({x:t,y:t}),En={left:"right",right:"left",bottom:"top",top:"bottom"};ri=["left","right"],ai=["right","left"],kn=["top","bottom"],$n=["bottom","top"]});function li(t,e,o){let{reference:r,floating:a}=t,i=ct(e),n=bo(e),s=vo(n),l=St(e),d=i==="y",u=r.x+r.width/2-a.width/2,h=r.y+r.height/2-a.height/2,f=r[s]/2-a[s]/2,w;switch(l){case"top":w={x:u,y:r.y-a.height};break;case"bottom":w={x:u,y:r.y+r.height};break;case"right":w={x:r.x+r.width,y:h};break;case"left":w={x:r.x-a.width,y:h};break;default:w={x:r.x,y:r.y}}let g=Xt(e);return g&&(w[n]+=f*(g==="end"?1:-1)*(o&&d?-1:1)),w}async function ci(t,e){var o;e===void 0&&(e={});let{x:r,y:a,platform:i,rects:n,elements:s,strategy:l}=t,{boundary:d="clippingAncestors",rootBoundary:u="viewport",elementContext:h="floating",altBoundary:f=!1,padding:w=0}=jt(e,t),g=hr(w),C=s[f?h==="floating"?"reference":"floating":h],b=Yt(await i.getClippingRect({element:(o=await(i.isElement==null?void 0:i.isElement(C)))==null||o?C:C.contextElement||await(i.getDocumentElement==null?void 0:i.getDocumentElement(s.floating)),boundary:d,rootBoundary:u,strategy:l})),x=h==="floating"?{x:r,y:a,width:n.floating.width,height:n.floating.height}:n.reference,S=await(i.getOffsetParent==null?void 0:i.getOffsetParent(s.floating)),E=await(i.isElement==null?void 0:i.isElement(S))&&await(i.getScale==null?void 0:i.getScale(S))||{x:1,y:1},H=Yt(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:s,rect:x,offsetParent:S,strategy:l}):x);return{top:(b.top-H.top+g.top)/E.y,bottom:(H.bottom-b.bottom+g.bottom)/E.y,left:(b.left-H.left+g.left)/E.x,right:(H.right-b.right+g.right)/E.x}}async function Rn(t,e){let{placement:o,platform:r,elements:a}=t,i=await(r.isRTL==null?void 0:r.isRTL(a.floating)),n=St(o),s=Xt(o),l=ct(o)==="y",d=Fn.has(n)?-1:1,u=i&&l?-1:1,h=jt(e,t),{mainAxis:f,crossAxis:w,alignmentAxis:g}=typeof h=="number"?{mainAxis:h,crossAxis:0,alignmentAxis:null}:{mainAxis:h.mainAxis||0,crossAxis:h.crossAxis||0,alignmentAxis:h.alignmentAxis};return s&&typeof g=="number"&&(w=s==="end"?g*-1:g),l?{x:w*u,y:f*d}:{x:f*d,y:w*u}}var Mn,di,ui,mi,Fn,hi,pi,fi,wi=p(()=>{yo();yo();Mn=50,di=async(t,e,o)=>{let{placement:r="bottom",strategy:a="absolute",middleware:i=[],platform:n}=o,s=n.detectOverflow?n:{...n,detectOverflow:ci},l=await(n.isRTL==null?void 0:n.isRTL(e)),d=await n.getElementRects({reference:t,floating:e,strategy:a}),{x:u,y:h}=li(d,r,l),f=r,w=0,g={};for(let v=0;v<i.length;v++){let C=i[v];if(!C)continue;let{name:b,fn:x}=C,{x:S,y:E,data:H,reset:_}=await x({x:u,y:h,initialPlacement:r,placement:f,strategy:a,middlewareData:g,rects:d,platform:s,elements:{reference:t,floating:e}});u=S??u,h=E??h,g[b]={...g[b],...H},_&&w<Mn&&(w++,typeof _=="object"&&(_.placement&&(f=_.placement),_.rects&&(d=_.rects===!0?await n.getElementRects({reference:t,floating:e,strategy:a}):_.rects),{x:u,y:h}=li(d,f,l)),v=-1)}return{x:u,y:h,placement:f,strategy:a,middlewareData:g}},ui=t=>({name:"arrow",options:t,async fn(e){let{x:o,y:r,placement:a,rects:i,platform:n,elements:s,middlewareData:l}=e,{element:d,padding:u=0}=jt(t,e)||{};if(d==null)return{};let h=hr(u),f={x:o,y:r},w=bo(a),g=vo(w),v=await n.getDimensions(d),C=w==="y",b=C?"top":"left",x=C?"bottom":"right",S=C?"clientHeight":"clientWidth",E=i.reference[g]+i.reference[w]-f[w]-i.floating[g],H=f[w]-i.reference[w],_=await(n.getOffsetParent==null?void 0:n.getOffsetParent(d)),W=_?_[S]:0;(!W||!await(n.isElement==null?void 0:n.isElement(_)))&&(W=s.floating[S]||i.floating[g]);let K=E/2-H/2,rt=W/2-v[g]/2-1,B=st(h[b],rt),de=st(h[x],rt),ue=W-v[g]-de,at=W/2-v[g]/2+K,G=ur(B,at,ue),Et=!l.arrow&&Xt(a)!=null&&at!==G&&i.reference[g]/2-(at<B?B:de)-v[g]/2<0,ut=Et?at<B?at-B:at-ue:0;return{[w]:f[w]+ut,data:{[w]:G,centerOffset:at-G-ut,...Et&&{alignmentOffset:ut}},reset:Et}}}),mi=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,r;let{placement:a,middlewareData:i,rects:n,initialPlacement:s,platform:l,elements:d}=e,{mainAxis:u=!0,crossAxis:h=!0,fallbackPlacements:f,fallbackStrategy:w="bestFit",fallbackAxisSideDirection:g="none",flipAlignment:v=!0,...C}=jt(t,e);if((o=i.arrow)!=null&&o.alignmentOffset)return{};let b=St(a),x=ct(s),S=St(s)===s,E=await(l.isRTL==null?void 0:l.isRTL(d.floating)),H=f||(S||!v?[Pe(s)]:ni(s)),_=g!=="none";!f&&_&&H.push(...si(s,v,g,E));let W=[s,...H],K=await l.detectOverflow(e,C),rt=[],B=((r=i.flip)==null?void 0:r.overflows)||[];if(u&&rt.push(K[b]),h){let G=ii(a,n,E);rt.push(K[G[0]],K[G[1]])}if(B=[...B,{placement:a,overflows:rt}],!rt.every(G=>G<=0)){var de,ue;let G=(((de=i.flip)==null?void 0:de.index)||0)+1,Et=W[G];if(Et&&(!(h==="alignment"?x!==ct(Et):!1)||B.every(Q=>ct(Q.placement)===x?Q.overflows[0]>0:!0)))return{data:{index:G,overflows:B},reset:{placement:Et}};let ut=(ue=B.filter(kt=>kt.overflows[0]<=0).sort((kt,Q)=>kt.overflows[1]-Q.overflows[1])[0])==null?void 0:ue.placement;if(!ut)switch(w){case"bestFit":{var at;let kt=(at=B.filter(Q=>{if(_){let bt=ct(Q.placement);return bt===x||bt==="y"}return!0}).map(Q=>[Q.placement,Q.overflows.filter(bt=>bt>0).reduce((bt,Xi)=>bt+Xi,0)]).sort((Q,bt)=>Q[1]-bt[1])[0])==null?void 0:at[0];kt&&(ut=kt);break}case"initialPlacement":ut=s;break}if(a!==ut)return{reset:{placement:ut}}}return{}}}},Fn=new Set(["left","top"]);hi=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){var o,r;let{x:a,y:i,placement:n,middlewareData:s}=e,l=await Rn(e,t);return n===((o=s.offset)==null?void 0:o.placement)&&(r=s.arrow)!=null&&r.alignmentOffset?{}:{x:a+l.x,y:i+l.y,data:{...l,placement:n}}}}},pi=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){let{x:o,y:r,placement:a,platform:i}=e,{mainAxis:n=!0,crossAxis:s=!1,limiter:l={fn:x=>{let{x:S,y:E}=x;return{x:S,y:E}}},...d}=jt(t,e),u={x:o,y:r},h=await i.detectOverflow(e,d),f=ct(a),w=mr(f),g=u[w],v=u[f],C=(x,S)=>ur(S+h[x==="y"?"top":"left"],S,S-h[x==="y"?"bottom":"right"]);n&&(g=C(w,g)),s&&(v=C(f,v));let b=l.fn({...e,[w]:g,[f]:v});return{...b,data:{x:b.x-o,y:b.y-r,enabled:{[w]:n,[f]:s}}}}}},fi=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){let{placement:o,rects:r,platform:a,elements:i}=e,{apply:n=()=>{},...s}=jt(t,e),l=await a.detectOverflow(e,s),d=St(o),u=Xt(o),h=ct(o)==="y",{width:f,height:w}=r.floating,g,v;d==="top"||d==="bottom"?(g=d,v=u===(await(a.isRTL==null?void 0:a.isRTL(i.floating))?"start":"end")?"left":"right"):(v=d,g=u==="end"?"top":"bottom");let C=w-l.top-l.bottom,b=f-l.left-l.right,x=st(w-l[g],C),S=st(f-l[v],b),E=e.middlewareData.shift,H=!E,_=x,W=S;E!=null&&E.enabled.x&&(W=b),E!=null&&E.enabled.y&&(_=C),H&&!u&&(h?W=f-2*tt(l.left,l.right):_=w-2*tt(l.top,l.bottom)),await n({...e,availableWidth:W,availableHeight:_});let K=await a.getDimensions(i.floating);return f!==K.width||w!==K.height?{reset:{rects:!0}}:{}}}}});function Co(){return typeof window<"u"}function Gt(t){return vi(t)?(t.nodeName||"").toLowerCase():"#document"}function U(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function dt(t){var e;return(e=(vi(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function vi(t){return Co()?t instanceof Node||t instanceof U(t).Node:!1}function et(t){return Co()?t instanceof Element||t instanceof U(t).Element:!1}function vt(t){return Co()?t instanceof HTMLElement||t instanceof U(t).HTMLElement:!1}function gi(t){return!Co()||typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof U(t).ShadowRoot}function Re(t){let{overflow:e,overflowX:o,overflowY:r,display:a}=ot(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+o)&&a!=="inline"&&a!=="contents"}function bi(t){return/^(table|td|th)$/.test(Gt(t))}function Oe(t){try{if(t.matches(":popover-open"))return!0}catch{}try{return t.matches(":modal")}catch{return!1}}function se(t){let e=et(t)?ot(t):t;return Kt(e.transform)||Kt(e.translate)||Kt(e.scale)||Kt(e.rotate)||Kt(e.perspective)||!xo()&&(Kt(e.backdropFilter)||Kt(e.filter))||On.test(e.willChange||"")||Tn.test(e.contain||"")}function yi(t){let e=At(t);for(;vt(e)&&!le(e);){if(se(e))return e;if(Oe(e))return null;e=At(e)}return null}function xo(){return pr==null&&(pr=typeof CSS<"u"&&CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")),pr}function le(t){return/^(html|body|#document)$/.test(Gt(t))}function ot(t){return U(t).getComputedStyle(t)}function Te(t){return et(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.scrollX,scrollTop:t.scrollY}}function At(t){if(Gt(t)==="html")return t;let e=t.assignedSlot||t.parentNode||gi(t)&&t.host||dt(t);return gi(e)?e.host:e}function Ci(t){let e=At(t);return le(e)?(t.ownerDocument||t).body:vt(e)&&Re(e)?e:Ci(e)}function gt(t,e,o){var r;e===void 0&&(e=[]),o===void 0&&(o=!0);let a=Ci(t),i=a===((r=t.ownerDocument)==null?void 0:r.body),n=U(a);if(i){let s=Lo(n);return e.concat(n,n.visualViewport||[],Re(a)?a:[],s&&o?gt(s):[])}else return e.concat(a,gt(a,[],o))}function Lo(t){return t.parent&&Object.getPrototypeOf(t.parent)?t.frameElement:null}var On,Tn,Kt,pr,So=p(()=>{On=/transform|translate|scale|rotate|perspective|filter/,Tn=/paint|layout|strict|content/,Kt=t=>!!t&&t!=="none"});function Si(t){let e=ot(t),o=parseFloat(e.width)||0,r=parseFloat(e.height)||0,a=vt(t),i=a?t.offsetWidth:o,n=a?t.offsetHeight:r,s=Me(o)!==i||Me(r)!==n;return s&&(o=i,r=n),{width:o,height:r,$:s}}function wr(t){return et(t)?t:t.contextElement}function ce(t){let e=wr(t);if(!vt(e))return lt(1);let o=e.getBoundingClientRect(),{width:r,height:a,$:i}=Si(e),n=(i?Me(o.width):o.width)/r,s=(i?Me(o.height):o.height)/a;return(!n||!Number.isFinite(n))&&(n=1),(!s||!Number.isFinite(s))&&(s=1),{x:n,y:s}}function Ai(t){let e=U(t);return!xo()||!e.visualViewport?In:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function Bn(t,e,o){return e===void 0&&(e=!1),!!o&&e&&o===U(t)}function Qt(t,e,o,r){e===void 0&&(e=!1),o===void 0&&(o=!1);let a=t.getBoundingClientRect(),i=wr(t),n=lt(1);e&&(r?et(r)&&(n=ce(r)):n=ce(t));let s=Bn(i,o,r)?Ai(i):lt(0),l=(a.left+s.x)/n.x,d=(a.top+s.y)/n.y,u=a.width/n.x,h=a.height/n.y;if(i&&r){let f=U(i),w=et(r)?U(r):r,g=f,v=Lo(g);for(;v&&w!==g;){let C=ce(v),b=v.getBoundingClientRect(),x=ot(v),S=b.left+(v.clientLeft+parseFloat(x.paddingLeft))*C.x,E=b.top+(v.clientTop+parseFloat(x.paddingTop))*C.y;l*=C.x,d*=C.y,u*=C.x,h*=C.y,l+=S,d+=E,g=U(v),v=Lo(g)}}return Yt({width:u,height:h,x:l,y:d})}function Ao(t,e){let o=Te(t).scrollLeft;return e?e.left+o:Qt(dt(t)).left+o}function zi(t,e){let o=t.getBoundingClientRect(),r=o.left+e.scrollLeft-Ao(t,o),a=o.top+e.scrollTop;return{x:r,y:a}}function Dn(t){let{elements:e,rect:o,offsetParent:r,strategy:a}=t,i=a==="fixed",n=dt(r),s=e?Oe(e.floating):!1;if(r===n||s&&i)return o;let l={scrollLeft:0,scrollTop:0},d=lt(1),u=lt(0),h=vt(r);if((h||!i)&&((Gt(r)!=="body"||Re(n))&&(l=Te(r)),h)){let w=Qt(r);d=ce(r),u.x=w.x+r.clientLeft,u.y=w.y+r.clientTop}let f=n&&!h&&!i?zi(n,l):lt(0);return{width:o.width*d.x,height:o.height*d.y,x:o.x*d.x-l.scrollLeft*d.x+u.x+f.x,y:o.y*d.y-l.scrollTop*d.y+u.y+f.y}}function qn(t){return t.getClientRects?Array.from(t.getClientRects()):[]}function Nn(t){let e=Te(t),o=t.ownerDocument.body,r=tt(t.scrollWidth,t.clientWidth,o.scrollWidth,o.clientWidth),a=tt(t.scrollHeight,t.clientHeight,o.scrollHeight,o.clientHeight),i=-e.scrollLeft+Ao(t),n=-e.scrollTop;return ot(o).direction==="rtl"&&(i+=tt(t.clientWidth,o.clientWidth)-r),{width:r,height:a,x:i,y:n}}function Hn(t,e,o){o===void 0&&(o="viewport");let r=o==="layoutViewport",a=U(t),i=dt(t),n=a.visualViewport,s=i.clientWidth,l=i.clientHeight,d=0,u=0;if(n){let f=!xo()||e==="fixed";r?f||(d=-n.offsetLeft,u=-n.offsetTop):(s=n.width,l=n.height,f&&(d=n.offsetLeft,u=n.offsetTop))}if(Ao(i)<=0){let f=i.ownerDocument,w=f.body,g=getComputedStyle(w),v=f.compatMode==="CSS1Compat"&&parseFloat(g.marginLeft)+parseFloat(g.marginRight)||0,C=Math.abs(i.clientWidth-w.clientWidth-v),b=getComputedStyle(i).scrollbarGutter==="stable both-edges"?C/2:C;b<=Un&&(s-=b)}return{width:s,height:l,x:d,y:u}}function Wn(t,e){let o=Qt(t,!0,e==="fixed"),r=o.top+t.clientTop,a=o.left+t.clientLeft,i=ce(t),n=t.clientWidth*i.x,s=t.clientHeight*i.y,l=a*i.x,d=r*i.y;return{width:n,height:s,x:l,y:d}}function xi(t,e,o){let r;if(e==="viewport"||e==="layoutViewport")r=Hn(t,o,e);else if(e==="document")r=Nn(dt(t));else if(et(e))r=Wn(e,o);else{let a=Ai(t);r={x:e.x-a.x,y:e.y-a.y,width:e.width,height:e.height}}return Yt(r)}function Vn(t,e){let o=e.get(t);if(o)return o;let r=gt(t,[],!1).filter(s=>et(s)&&Gt(s)!=="body"),a=null,i=ot(t).position==="fixed",n=i?At(t):t;for(;et(n)&&!le(n);){let s=ot(n),l=se(n),d=a?a.position:i?"fixed":"";!l&&(d==="fixed"||d==="absolute"&&s.position==="static")?r=r.filter(h=>h!==n):a=s,n=At(n)}return e.set(t,r),r}function jn(t){let{element:e,boundary:o,rootBoundary:r,strategy:a}=t,n=[...o==="clippingAncestors"?Oe(e)?[]:Vn(e,this._c):[].concat(o),r],s=xi(e,n[0],a),l=s.top,d=s.right,u=s.bottom,h=s.left;for(let f=1;f<n.length;f++){let w=xi(e,n[f],a);l=tt(w.top,l),d=st(w.right,d),u=st(w.bottom,u),h=tt(w.left,h)}return{width:d-h,height:u-l,x:h,y:l}}function Xn(t){let{width:e,height:o}=Si(t);return{width:e,height:o}}function Yn(t,e,o){let r=vt(e),a=dt(e),i=o==="fixed",n=Qt(t,!0,i,e),s={scrollLeft:0,scrollTop:0},l=lt(0);if((r||!i)&&((Gt(e)!=="body"||Re(a))&&(s=Te(e)),r)){let f=Qt(e,!0,i,e);l.x=f.x+e.clientLeft,l.y=f.y+e.clientTop}!r&&a&&(l.x=Ao(a));let d=a&&!r&&!i?zi(a,s):lt(0),u=n.left+s.scrollLeft-l.x-d.x,h=n.top+s.scrollTop-l.y-d.y;return{x:u,y:h,width:n.width,height:n.height}}function fr(t){return ot(t).position==="static"}function Li(t,e){if(!vt(t)||ot(t).position==="fixed")return null;if(e)return e(t);let o=t.offsetParent;return dt(t)===o&&(o=o.ownerDocument.body),o}function Ei(t,e){let o=U(t);if(Oe(t))return o;if(!vt(t)){let a=At(t);for(;a&&!le(a);){if(et(a)&&!fr(a))return a;a=At(a)}return o}let r=Li(t,e);for(;r&&bi(r)&&fr(r);)r=Li(r,e);return r&&le(r)&&fr(r)&&!se(r)?o:r||yi(t)||o}function Gn(t){return ot(t).direction==="rtl"}function ki(t,e){return t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height}function Qn(t,e,o){let r=null,a,i=dt(t);function n(){var u;clearTimeout(a),(u=r)==null||u.disconnect(),r=null}function s(u,h){u===void 0&&(u=!1),h===void 0&&(h=1),n();let f=t.getBoundingClientRect(),{left:w,top:g,width:v,height:C}=f;if(u||e(),!v||!C)return;let b=Fe(g),x=Fe(i.clientWidth-(w+v)),S=Fe(i.clientHeight-(g+C)),E=Fe(w),_={rootMargin:-b+"px "+-x+"px "+-S+"px "+-E+"px",threshold:tt(0,st(1,h))||1},W=!0;function K(rt){let B=rt[0].intersectionRatio;if(!ki(f,t.getBoundingClientRect()))return s();if(B!==h){if(!W)return s();B?s(!1,B):a=setTimeout(()=>{s(!1,1e-7)},1e3)}W=!1}try{r=new IntersectionObserver(K,{..._,root:i.ownerDocument})}catch{r=new IntersectionObserver(K,_)}r.observe(t)}let l=U(t),d=()=>s(o);return l.addEventListener("resize",d),s(!0),()=>{l.removeEventListener("resize",d),n()}}function zo(t,e,o,r){r===void 0&&(r={});let{ancestorScroll:a=!0,ancestorResize:i=!0,elementResize:n=typeof ResizeObserver=="function",layoutShift:s=typeof IntersectionObserver=="function",animationFrame:l=!1}=r,d=wr(t),u=a||i?[...d?gt(d):[],...e?gt(e):[]]:[];u.forEach(b=>{a&&b.addEventListener("scroll",o),i&&b.addEventListener("resize",o)});let h=d&&s?Qn(d,o,i):null,f=-1,w=null;n&&(w=new ResizeObserver(b=>{let[x]=b;x&&x.target===d&&w&&e&&(w.unobserve(e),cancelAnimationFrame(f),f=requestAnimationFrame(()=>{var S;(S=w)==null||S.observe(e)})),o()}),d&&!l&&w.observe(d),e&&w.observe(e));let g,v=l?Qt(t):null;l&&C();function C(){let b=Qt(t);v&&!ki(v,b)&&o(),v=b,g=requestAnimationFrame(C)}return o(),()=>{var b;u.forEach(x=>{a&&x.removeEventListener("scroll",o),i&&x.removeEventListener("resize",o)}),h?.(),(b=w)==null||b.disconnect(),w=null,l&&cancelAnimationFrame(g)}}var In,Un,Kn,Ie,Eo,ko,$o,gr,$i,_o,vr=p(()=>{wi();yo();So();So();In=lt(0);Un=25;Kn=async function(t){let e=this.getOffsetParent||Ei,o=this.getDimensions,r=await o(t.floating);return{reference:Yn(t.reference,await e(t.floating),t.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}};Ie={convertOffsetParentRelativeRectToViewportRelativeRect:Dn,getDocumentElement:dt,getClippingRect:jn,getOffsetParent:Ei,getElementRects:Kn,getClientRects:qn,getDimensions:Xn,getScale:ce,isElement:et,isRTL:Gn};Eo=hi,ko=pi,$o=mi,gr=fi,$i=ui,_o=(t,e,o)=>{let r=new Map,a=o??{},i={...Ie,...a.platform,_c:r};return di(t,e,{...a,platform:i})}});var br,q,_i=p(()=>{nr();lr();cr();Se();Ae();ze();Ee();$e();_e();xt();oe();Vt();V();I();Z();R();vr();k();j();br=new Set,q=class extends P{constructor(){super(...arguments),this.submenuCleanups=new Map,this.localize=new X(this),this.userTypedQuery="",this.openSubmenuStack=[],this.open=!1,this.size="m",this.placement="bottom-start",this.distance=0,this.skidding=0,this.handleDocumentKeyDown=async t=>{let e=this.localize.dir()==="rtl";if(t.key==="Escape"&&this.open&&ke(this)){let u=this.getTrigger();t.preventDefault(),t.stopPropagation(),this.open=!1,u?.focus({preventScroll:!0});return}let o=[...sr()].find(u=>u.localName==="wa-dropdown-item"),r=o?.localName==="wa-dropdown-item",a=this.getCurrentSubmenuItem(),i=!!a,n,s,l;i?(n=this.getSubmenuItems(a),s=n.find(u=>u.active||u===o),l=s?n.indexOf(s):-1):(n=this.getItems(),s=n.find(u=>u.active||u===o),l=s?n.indexOf(s):-1);let d;if(t.key==="ArrowUp"&&(t.preventDefault(),t.stopPropagation(),l>0?d=n[l-1]:d=n[n.length-1]),t.key==="ArrowDown"&&(t.preventDefault(),t.stopPropagation(),l!==-1&&l<n.length-1?d=n[l+1]:d=n[0]),t.key===(e?"ArrowLeft":"ArrowRight")&&r&&s&&s.hasSubmenu){t.preventDefault(),t.stopPropagation(),s.submenuOpen=!0,this.addToSubmenuStack(s),setTimeout(()=>{let u=this.getSubmenuItems(s);u.length>0&&(u.forEach((h,f)=>h.active=f===0),u[0].focus({preventScroll:!0}))},0);return}if(t.key===(e?"ArrowRight":"ArrowLeft")&&i){t.preventDefault(),t.stopPropagation();let u=this.removeFromSubmenuStack();u&&(u.submenuOpen=!1,setTimeout(()=>{u.focus({preventScroll:!0}),u.active=!0,(u.slot==="submenu"?this.getSubmenuItems(u.parentElement):this.getItems()).forEach(f=>{f!==u&&(f.active=!1)})},0));return}if((t.key==="Home"||t.key==="End")&&(t.preventDefault(),t.stopPropagation(),d=t.key==="Home"?n[0]:n[n.length-1]),t.key==="Tab"&&await this.hideMenu(),t.key.length===1&&!(t.metaKey||t.ctrlKey||t.altKey)&&!(t.key===" "&&this.userTypedQuery==="")&&(clearTimeout(this.userTypedTimeout),this.userTypedTimeout=setTimeout(()=>{this.userTypedQuery=""},1e3),this.userTypedQuery+=t.key,n.some(u=>{let h=(u.textContent||"").trim().toLowerCase(),f=this.userTypedQuery.trim().toLowerCase();return h.startsWith(f)?(d=u,!0):!1})),d){t.preventDefault(),t.stopPropagation(),n.forEach(u=>u.active=u===d),d.focus({preventScroll:!0}),d.scrollIntoView({block:"nearest"});return}(t.key==="Enter"||t.key===" "&&this.userTypedQuery==="")&&r&&s&&(t.preventDefault(),t.stopPropagation(),s.hasSubmenu?(s.submenuOpen=!0,this.addToSubmenuStack(s),setTimeout(()=>{let u=this.getSubmenuItems(s);u.length>0&&(u.forEach((h,f)=>h.active=f===0),u[0].focus({preventScroll:!0}))},0)):this.makeSelection(s,t))},this.handleDocumentPointerDown=t=>{t.composedPath().some(r=>r instanceof HTMLElement?r===this||r.closest('wa-dropdown, [part="submenu"]'):!1)||(this.open=!1)},this.handleGlobalMouseMove=t=>{let e=this.getCurrentSubmenuItem();if(!e?.submenuOpen||!e.submenuElement)return;let o=e.submenuElement.getBoundingClientRect(),r=this.localize.dir()==="rtl",a=r?o.right:o.left,i=r?Math.max(t.clientX,a):Math.min(t.clientX,a),n=Math.max(o.top,Math.min(t.clientY,o.bottom));e.submenuElement.style.setProperty("--safe-triangle-cursor-x",`${i}px`),e.submenuElement.style.setProperty("--safe-triangle-cursor-y",`${n}px`);let s=t.composedPath(),l=e.matches(":hover"),d=!!e.submenuElement?.matches(":hover"),u=l||!!s.find(f=>f===e),h=d||!!s.find(f=>f instanceof HTMLElement&&f.closest('[part="submenu"]')===e.submenuElement);!u&&!h&&setTimeout(()=>{!l&&!d&&(e.submenuOpen=!1)},100)}}handleSizeChange(){ee(this.localName,this.size)}disconnectedCallback(){super.disconnectedCallback(),clearInterval(this.userTypedTimeout),this.closeAllSubmenus(),this.submenuCleanups.forEach(t=>t()),this.submenuCleanups.clear(),document.removeEventListener("mousemove",this.handleGlobalMouseMove),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),ne(this)}firstUpdated(t){super.firstUpdated(t),this.syncAriaAttributes()}async updated(t){if(t.has("open")){let e=t.get("open");if(e===this.open||e===void 0&&this.open===!1)return;this.customStates.set("open",this.open),this.open?await this.showMenu():(this.closeAllSubmenus(),await this.hideMenu())}t.has("size")&&this.syncItemSizes()}getItems(t=!1){let e=(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(o=>o.localName==="wa-dropdown-item");return t?e:e.filter(o=>!o.disabled)}getSubmenuItems(t,e=!1){let o=t.shadowRoot?.querySelector('slot[name="submenu"]')||t.querySelector('slot[name="submenu"]');if(!o)return[];let r=o.assignedElements({flatten:!0}).filter(a=>a.localName==="wa-dropdown-item");return e?r:r.filter(a=>!a.disabled)}syncItemSizes(){(this.defaultSlot?.assignedElements({flatten:!0})??[]).filter(e=>e.localName==="wa-dropdown-item").forEach(e=>e.size=this.size)}addToSubmenuStack(t){let e=this.openSubmenuStack.indexOf(t);e!==-1?this.openSubmenuStack=this.openSubmenuStack.slice(0,e+1):this.openSubmenuStack.push(t)}removeFromSubmenuStack(){return this.openSubmenuStack.pop()}getCurrentSubmenuItem(){return this.openSubmenuStack.length>0?this.openSubmenuStack[this.openSubmenuStack.length-1]:void 0}closeAllSubmenus(){this.getItems(!0).forEach(e=>{e.submenuOpen=!1}),this.openSubmenuStack=[]}closeSiblingSubmenus(t){let e=t.closest('wa-dropdown-item:not([slot="submenu"])'),o;e?o=this.getSubmenuItems(e,!0):o=this.getItems(!0),o.forEach(r=>{r!==t&&r.submenuOpen&&(r.submenuOpen=!1)}),this.openSubmenuStack.includes(t)||this.openSubmenuStack.push(t)}getTrigger(){return this.querySelector('[slot="trigger"]')}async showMenu(){if(!this.getTrigger()||!this.popup||!this.menu)return;let e=new mo;if(this.dispatchEvent(e),e.defaultPrevented){this.open=!1;return}if(this.popup.active)return;br.forEach(r=>r.open=!1),this.popup.active=!0,this.open=!0,br.add(this),wo(this),this.syncAriaAttributes(),document.addEventListener("keydown",this.handleDocumentKeyDown),document.addEventListener("pointerdown",this.handleDocumentPointerDown),document.addEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("hide"),await J(this.menu,"show");let o=this.getItems();o.length>0&&(o.forEach((r,a)=>r.active=a===0),o[0].focus({preventScroll:!0})),this.dispatchEvent(new fo)}async hideMenu(){if(!this.popup||!this.menu)return;let t=new ho({source:this});if(this.dispatchEvent(t),t.defaultPrevented){this.open=!0;return}this.open=!1,br.delete(this),ne(this),this.syncAriaAttributes(),document.removeEventListener("keydown",this.handleDocumentKeyDown),document.removeEventListener("pointerdown",this.handleDocumentPointerDown),document.removeEventListener("mousemove",this.handleGlobalMouseMove),this.menu.classList.remove("show"),await J(this.menu,"hide"),this.popup.active=this.open,this.dispatchEvent(new po)}handleMenuClick(t){let e=t.target.closest("wa-dropdown-item");if(!(!e||e.disabled)){if(e.hasSubmenu){e.submenuOpen||(this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),e.submenuOpen=!0),t.stopPropagation();return}this.makeSelection(e,t)}}async handleMenuSlotChange(){let t=this.getItems(!0);await Promise.all(t.map(r=>r.updateComplete)),this.syncItemSizes();let e=t.some(r=>r.type==="checkbox"),o=t.some(r=>r.hasSubmenu);t.forEach((r,a)=>{r.setAttribute("aria-posinset",String(a+1)),r.setAttribute("aria-setsize",String(t.length)),r.active=a===0,r.checkboxAdjacent=e,r.submenuAdjacent=o})}handleTriggerClick(){this.open=!this.open}handleSubmenuOpening(t){let e=t.detail.item;this.closeSiblingSubmenus(e),this.addToSubmenuStack(e),this.setupSubmenuPosition(e),this.processSubmenuItems(e)}setupSubmenuPosition(t){if(!t.submenuElement)return;this.cleanupSubmenuPosition(t);let e=zo(t,t.submenuElement,()=>{this.positionSubmenu(t),this.updateSafeTriangleCoordinates(t)});this.submenuCleanups.set(t,e);let o=t.submenuElement.querySelector('slot[name="submenu"]');o&&(o.removeEventListener("slotchange",q.handleSubmenuSlotChange),o.addEventListener("slotchange",q.handleSubmenuSlotChange),q.handleSubmenuSlotChange({target:o}))}static handleSubmenuSlotChange(t){let e=t.target;if(!e)return;let o=e.assignedElements().filter(i=>i.localName==="wa-dropdown-item");if(o.length===0)return;let r=o.some(i=>i.hasSubmenu),a=o.some(i=>i.type==="checkbox");o.forEach(i=>{i.submenuAdjacent=r,i.checkboxAdjacent=a})}processSubmenuItems(t){if(!t.submenuElement)return;let e=this.getSubmenuItems(t,!0),o=e.some(r=>r.hasSubmenu);e.forEach(r=>{r.submenuAdjacent=o})}cleanupSubmenuPosition(t){let e=this.submenuCleanups.get(t);e&&(e(),this.submenuCleanups.delete(t))}positionSubmenu(t){if(!t.submenuElement)return;let o=this.localize.dir()==="rtl"?"left-start":"right-start";_o(t,t.submenuElement,{placement:o,middleware:[Eo({mainAxis:0,crossAxis:-5}),$o({fallbackStrategy:"bestFit"}),ko({padding:8,crossAxis:!0})]}).then(({x:r,y:a,placement:i})=>{t.submenuElement.setAttribute("data-placement",i),Object.assign(t.submenuElement.style,{left:`${r}px`,top:`${a}px`})})}updateSafeTriangleCoordinates(t){if(!t.submenuElement||!t.submenuOpen)return;if(document.activeElement?.matches(":focus-visible")){t.submenuElement.style.setProperty("--safe-triangle-visible","none");return}t.submenuElement.style.setProperty("--safe-triangle-visible","block");let o=t.submenuElement.getBoundingClientRect(),r=this.localize.dir()==="rtl";t.submenuElement.style.setProperty("--safe-triangle-submenu-start-x",`${r?o.right:o.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-start-y",`${o.top}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-x",`${r?o.right:o.left}px`),t.submenuElement.style.setProperty("--safe-triangle-submenu-end-y",`${o.bottom}px`)}makeSelection(t,e){let o=this.getTrigger();if(t.disabled)return;t.type==="checkbox"&&(t.checked=!t.checked);let r=new Ga({item:t});this.dispatchEvent(r),r.defaultPrevented||(t.navigate(e),this.open=!1,o?.focus({preventScroll:!0}))}async syncAriaAttributes(){let t=this.getTrigger(),e;t&&(t.localName==="wa-button"?(await customElements.whenDefined("wa-button"),await t.updateComplete,e=t.shadowRoot.querySelector('[part~="base"]')):e=t,e.hasAttribute("id")||e.setAttribute("id",oi("wa-dropdown-trigger-")),e.setAttribute("aria-haspopup","menu"),e.setAttribute("aria-expanded",this.open?"true":"false"),this.menu?.setAttribute("aria-expanded","false"))}render(){let t=this.didSSR&&!this.hasUpdated?this.open:this.popup?.active;return A`
      <wa-popup
        placement=${this.placement}
        distance=${this.distance}
        skidding=${this.skidding}
        ?active=${t}
        flip
        flip-fallback-strategy="best-fit"
        shift
        shift-padding="10"
        auto-size="vertical"
        auto-size-padding="10"
      >
        <slot
          name="trigger"
          slot="anchor"
          @click=${this.handleTriggerClick}
          @slotchange=${this.syncAriaAttributes}
        ></slot>
        <div
          id="menu"
          part="menu"
          role="menu"
          tabindex="-1"
          aria-orientation="vertical"
          @click=${this.handleMenuClick}
          @submenu-opening=${this.handleSubmenuOpening}
        >
          <slot @slotchange=${this.handleMenuSlotChange}></slot>
        </div>
      </wa-popup>
    `}};q.css=[Ze,Qa];c([N("slot:not([name])")],q.prototype,"defaultSlot",2);c([N("#menu")],q.prototype,"menu",2);c([N("wa-popup")],q.prototype,"popup",2);c([m({type:Boolean,reflect:!0})],q.prototype,"open",2);c([m({reflect:!0})],q.prototype,"size",2);c([D("size")],q.prototype,"handleSizeChange",1);c([m({reflect:!0})],q.prototype,"placement",2);c([m({type:Number})],q.prototype,"distance",2);c([m({type:Number})],q.prototype,"skidding",2);q=c([T("wa-dropdown")],q)});var Pi,Po=p(()=>{k();Pi=z`
  :host {
    display: flex;
    position: relative;
    align-items: center;
    padding: 0.5em 1em;
    border-radius: var(--wa-border-radius-s);
    isolation: isolate;
    color: var(--wa-color-text-normal);
    line-height: var(--wa-line-height-condensed);
    cursor: pointer;
    transition:
      var(--wa-transition-fast) background-color var(--wa-transition-easing),
      var(--wa-transition-fast) color var(--wa-transition-easing);
  }

  @media (hover: hover) {
    :host(:hover:not(:state(disabled))) {
      background-color: var(--wa-color-neutral-fill-normal);
    }
  }

  :host(:state(submenu-open)) {
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host(:focus-visible) {
    z-index: 1;
    outline: var(--wa-focus-ring);
    background-color: var(--wa-color-neutral-fill-normal);
  }

  :host(:state(disabled)),
  :host([disabled]) {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Danger variant */
  :host([variant='danger']),
  :host([variant='danger']) #details {
    color: var(--wa-color-danger-on-quiet);
  }

  @media (hover: hover) {
    :host([variant='danger']:hover) {
      background-color: var(--wa-color-danger-fill-normal);
      color: var(--wa-color-danger-on-normal);
    }
  }

  :host([variant='danger']:state(submenu-open)),
  :host([variant='danger']:focus-visible) {
    background-color: var(--wa-color-danger-fill-normal);
    color: var(--wa-color-danger-on-normal);
  }

  :host([checkbox-adjacent]) {
    padding-inline-start: 2em;
  }

  /* Only add padding when item actually has a submenu */
  :host([submenu-adjacent]:not(:state(has-submenu))) #details {
    padding-inline-end: 0;
  }

  :host(:state(has-submenu)[submenu-adjacent]) #details {
    padding-inline-end: 1.75em;
  }

  /* The link only exists to be clicked programmatically. */
  #link {
    display: none;
  }

  #check {
    visibility: hidden;
    margin-inline-start: -1.5em;
    margin-inline-end: 0.5em;
    font-size: var(--wa-font-size-smaller);
  }

  :host(:state(checked)) #check {
    visibility: visible;
  }

  #icon ::slotted(*) {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    margin-inline-end: 0.75em !important;
    font-size: var(--wa-font-size-smaller);
  }

  #label {
    flex: 1 1 auto;
    min-width: 0;
  }

  #details {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: end;
    color: var(--wa-color-text-quiet);
    font-size: var(--wa-font-size-smaller) !important;
  }

  #details ::slotted(*) {
    margin-inline-start: 2em !important;
  }

  /* Submenu indicator icon */
  #submenu-indicator {
    position: absolute;
    inset-inline-end: 1em;
    color: var(--wa-color-neutral-on-quiet);
    font-size: var(--wa-font-size-smaller);
  }

  /* Flip chevron icon when RTL */
  :host(:dir(rtl)) #submenu-indicator {
    transform: scaleX(-1);
  }

  /* Submenu styles */
  #submenu {
    display: flex;
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    flex-direction: column;
    width: max-content;
    margin: 0;
    padding: 0.25em;
    border: var(--wa-border-style) var(--wa-border-width-s) var(--wa-color-surface-border);
    border-radius: var(--wa-border-radius-m);
    background-color: var(--wa-color-surface-raised);
    box-shadow: var(--wa-shadow-m);
    color: var(--wa-color-text-normal);
    text-align: start;
    user-select: none;

    /* Override default popover styles */
    &[popover] {
      margin: 0;
      inset: auto;
      padding: 0.25em;
      overflow: visible;
      border-radius: var(--wa-border-radius-m);
    }

    &.show {
      animation: submenu-show var(--show-duration, var(--wa-transition-fast)) ease;
    }

    &.hide {
      animation: submenu-show var(--show-duration, var(--wa-transition-fast)) ease reverse;
    }

    /* Submenu placement transform origins */
    &[data-placement^='top'] {
      transform-origin: bottom;
    }

    &[data-placement^='bottom'] {
      transform-origin: top;
    }

    &[data-placement^='left'] {
      transform-origin: right;
    }

    &[data-placement^='right'] {
      transform-origin: left;
    }

    &[data-placement='left-start'] {
      transform-origin: right top;
    }

    &[data-placement='left-end'] {
      transform-origin: right bottom;
    }

    &[data-placement='right-start'] {
      transform-origin: left top;
    }

    &[data-placement='right-end'] {
      transform-origin: left bottom;
    }

    /* Safe triangle styling */
    &::before {
      display: none;
      z-index: 9;
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: transparent;
      content: '';
      clip-path: polygon(
        var(--safe-triangle-cursor-x, 0) var(--safe-triangle-cursor-y, 0),
        var(--safe-triangle-submenu-start-x, 0) var(--safe-triangle-submenu-start-y, 0),
        var(--safe-triangle-submenu-end-x, 0) var(--safe-triangle-submenu-end-y, 0)
      );
      pointer-events: auto; /* Enable mouse events on the triangle */
    }

    &[data-visible]::before {
      display: block;
    }
  }

  ::slotted(wa-dropdown-item) {
    font-size: inherit;
  }

  ::slotted(wa-divider) {
    --spacing: 0.25em;
  }

  @keyframes submenu-show {
    from {
      scale: 0.9;
      opacity: 0;
    }
    to {
      scale: 1;
      opacity: 1;
    }
  }
`});var $,yr=p(()=>{Po();xt();nt();Vt();V();I();R();k();j();xe();$=class extends P{constructor(){super(...arguments),this.hasSlotController=new Lt(this,"[default]","start","end"),this.active=!1,this.variant="default",this.size="m",this.checkboxAdjacent=!1,this.submenuAdjacent=!1,this.type="normal",this.checked=!1,this.disabled=!1,this.submenuOpen=!1,this.hasSubmenu=!1,this.handleSlotChange=()=>{this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState(),this.hasSubmenu?(this.setAttribute("aria-haspopup","menu"),this.setAttribute("aria-expanded",this.submenuOpen?"true":"false")):(this.removeAttribute("aria-haspopup"),this.removeAttribute("aria-expanded"))},this.handleHostClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},this.handleClick=t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())},this.handlePointerEnter=t=>{t.pointerType==="mouse"&&this.hasSubmenu&&!this.disabled&&(this.notifyParentOfOpening(),this.submenuOpen=!0)}}handleSizeChange(){ee(this.localName,this.size)}connectedCallback(){super.connectedCallback(),this.addEventListener?.("click",this.handleHostClick),this.addEventListener?.("pointerenter",this.handlePointerEnter),this.shadowRoot?.addEventListener?.("click",this.handleClick,{capture:!0}),this.shadowRoot?.addEventListener?.("slotchange",this.handleSlotChange)}disconnectedCallback(){super.disconnectedCallback(),this.closeSubmenu(),this.removeEventListener?.("click",this.handleHostClick),this.removeEventListener?.("pointerenter",this.handlePointerEnter),this.shadowRoot?.removeEventListener?.("click",this.handleClick,{capture:!0}),this.shadowRoot?.removeEventListener?.("slotchange",this.handleSlotChange)}firstUpdated(t){super.firstUpdated(t),this.setAttribute("tabindex","-1"),this.hasSubmenu=this.hasSlotController.test("submenu"),this.updateHasSubmenuState()}updated(t){t.has("active")&&(this.setAttribute("tabindex",this.active?"0":"-1"),this.customStates.set("active",this.active)),t.has("checked")&&(this.type==="checkbox"?this.setAttribute("aria-checked",this.checked?"true":"false"):this.removeAttribute("aria-checked"),this.customStates.set("checked",this.checked)),t.has("disabled")&&(this.setAttribute("aria-disabled",this.disabled?"true":"false"),this.customStates.set("disabled",this.disabled)),t.has("type")&&(this.type==="checkbox"?(this.setAttribute("role","menuitemcheckbox"),this.setAttribute("aria-checked",this.checked?"true":"false")):(this.setAttribute("role","menuitem"),this.removeAttribute("aria-checked"))),(t.has("href")||t.has("hasSubmenu"))&&this.customStates.set("link",this.isLink()),t.has("submenuOpen")&&(this.customStates.set("submenu-open",this.submenuOpen),this.submenuOpen?this.openSubmenu():this.closeSubmenu())}updateHasSubmenuState(){this.customStates.set("has-submenu",this.hasSubmenu)}async openSubmenu(){let t=this.submenuElement;!this.hasSubmenu||!t||!this.isConnected||(this.notifyParentOfOpening(),t.showPopover?.(),t.hidden=!1,t.setAttribute("data-visible",""),this.submenuOpen=!0,this.setAttribute("aria-expanded","true"),await J(t,"show"),setTimeout(()=>{let e=this.getSubmenuItems();e.length>0&&(e.forEach((o,r)=>o.active=r===0),e[0].focus({preventScroll:!0}))},0))}notifyParentOfOpening(){let t=new CustomEvent("submenu-opening",{bubbles:!0,composed:!0,detail:{item:this}});this.dispatchEvent(t);let e=this.parentElement;e&&[...e.children].filter(r=>r!==this&&r.localName==="wa-dropdown-item"&&r.getAttribute("slot")===this.getAttribute("slot")&&r.submenuOpen).forEach(r=>{r.submenuOpen=!1})}async closeSubmenu(){let t=this.submenuElement;!this.hasSubmenu||!t||(this.submenuOpen=!1,this.setAttribute("aria-expanded","false"),t.hidden||(await J(t,"hide"),t?.isConnected&&(t.hidden=!0,t.removeAttribute("data-visible"),t.hidePopover?.())))}isLink(){return!!this.href&&!this.hasSubmenu}navigate(t){let e=this.linkElement;!this.isLink()||this.disabled||!e||e.dispatchEvent(new MouseEvent("click",{bubbles:!1,cancelable:!0,composed:!1,altKey:t?.altKey??!1,ctrlKey:t?.ctrlKey??!1,metaKey:t?.metaKey??!1,shiftKey:t?.shiftKey??!1}))}getSubmenuItems(){return[...this.children].filter(t=>t.localName==="wa-dropdown-item"&&t.getAttribute("slot")==="submenu"&&!t.hasAttribute("disabled"))}render(){return A`
      ${this.href?A`
            <a
              id="link"
              href=${this.href}
              target=${F(this.target)}
              rel=${F(this.rel)}
              download=${F(this.download)}
              tabindex="-1"
              aria-hidden="true"
            ></a>
          `:""}
      ${this.type==="checkbox"?A`
            <wa-icon
              id="check"
              part="checkmark"
              exportparts="svg:checkmark__svg"
              library="system"
              name="check"
            ></wa-icon>
          `:""}

      <span id="icon" part="icon">
        <slot name="icon"></slot>
      </span>

      <span id="label" part="label">
        <slot></slot>
      </span>

      <span id="details" part="details">
        <slot name="details"></slot>
      </span>

      ${this.hasSubmenu?A`
            <wa-icon
              id="submenu-indicator"
              part="submenu-icon"
              exportparts="svg:submenu-icon__svg"
              library="system"
              name="chevron-right"
            ></wa-icon>
          `:""}
      ${this.hasSubmenu?A`
            <div
              id="submenu"
              part="submenu"
              popover="manual"
              role="menu"
              tabindex="-1"
              aria-orientation="vertical"
              hidden
            >
              <slot name="submenu"></slot>
            </div>
          `:""}
    `}};$.css=Pi;c([N("#submenu")],$.prototype,"submenuElement",2);c([N("#link")],$.prototype,"linkElement",2);c([m({type:Boolean})],$.prototype,"active",2);c([m({reflect:!0})],$.prototype,"variant",2);c([m({reflect:!0})],$.prototype,"size",2);c([D("size")],$.prototype,"handleSizeChange",1);c([m({attribute:"checkbox-adjacent",type:Boolean,reflect:!0})],$.prototype,"checkboxAdjacent",2);c([m({attribute:"submenu-adjacent",type:Boolean,reflect:!0})],$.prototype,"submenuAdjacent",2);c([m()],$.prototype,"value",2);c([m({reflect:!0})],$.prototype,"type",2);c([m({type:Boolean})],$.prototype,"checked",2);c([m({type:Boolean,reflect:!0})],$.prototype,"disabled",2);c([m({type:Boolean,reflect:!0})],$.prototype,"submenuOpen",2);c([m({reflect:!0})],$.prototype,"href",2);c([m()],$.prototype,"target",2);c([m()],$.prototype,"rel",2);c([m()],$.prototype,"download",2);c([Rt()],$.prototype,"hasSubmenu",2);$=c([T("wa-dropdown-item")],$)});var Mi,Cr=p(()=>{Mi=class extends Event{constructor(){super("wa-reposition",{bubbles:!0,cancelable:!1,composed:!0})}}});var Fi,xr=p(()=>{k();Fi=z`
  :host {
    --arrow-color: black;
    --arrow-size: var(--wa-tooltip-arrow-size);
    --popup-border-width: 0px;
    --show-duration: var(--wa-transition-fast);
    --hide-duration: var(--wa-transition-fast);

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45) to calculate the length of the arrow after rotation.
     *
     * The diamond will be translated inward by --arrow-base-offset, the border thickness, to centralise it on
     * the inner edge of the popup border. This also means we need to increase the size of the arrow by the
     * same amount to compensate.
     *
     * A diamond shaped clipping mask is used to avoid overlap of popup content. This extends slightly inward so
     * the popup border is covered with no sub-pixel rounding artifacts. The diamond corners are mitred at 22.5º
     * to properly merge any arrow border with the popup border. The constant 1.4142 is derived from 1 + tan(22.5).
     *
     */
    --arrow-base-offset: var(--popup-border-width);
    --arrow-size-diagonal: calc((var(--arrow-size) + var(--arrow-base-offset)) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));
    --arrow-size-div: calc(var(--arrow-size-diagonal) * 2);
    --arrow-clipping-corner: calc(var(--arrow-base-offset) * 1.4142);

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);

    /* Clear UA styles for [popover] */
    :where(&) {
      inset: unset;
      padding: unset;
      margin: unset;
      width: unset;
      height: unset;
      color: unset;
      background: unset;
      border: unset;
      overflow: unset;
    }
  }

  .popup-fixed {
    position: fixed;
  }

  .popup:not(.popup-active) {
    display: none;
  }

  .arrow {
    position: absolute;
    width: var(--arrow-size-div);
    height: var(--arrow-size-div);
    background: var(--arrow-color);
    z-index: 3;
    clip-path: polygon(
      var(--arrow-clipping-corner) 100%,
      var(--arrow-base-offset) calc(100% - var(--arrow-base-offset)),
      calc(var(--arrow-base-offset) - 2px) calc(100% - var(--arrow-base-offset)),
      calc(100% - var(--arrow-base-offset)) calc(var(--arrow-base-offset) - 2px),
      calc(100% - var(--arrow-base-offset)) var(--arrow-base-offset),
      100% var(--arrow-clipping-corner),
      100% 100%
    );
    rotate: 45deg;
  }

  :host([data-current-placement|='left']) .arrow {
    rotate: -45deg;
  }

  :host([data-current-placement|='right']) .arrow {
    rotate: 135deg;
  }

  :host([data-current-placement|='bottom']) .arrow {
    rotate: 225deg;
  }

  /* Hover bridge */
  .popup-hover-bridge:not(.popup-hover-bridge-visible) {
    display: none;
  }

  .popup-hover-bridge {
    position: fixed;
    z-index: 899;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    clip-path: polygon(
      var(--hover-bridge-top-left-x, 0) var(--hover-bridge-top-left-y, 0),
      var(--hover-bridge-top-right-x, 0) var(--hover-bridge-top-right-y, 0),
      var(--hover-bridge-bottom-right-x, 0) var(--hover-bridge-bottom-right-y, 0),
      var(--hover-bridge-bottom-left-x, 0) var(--hover-bridge-bottom-left-y, 0)
    );
  }

  /* Built-in animations */
  .show {
    animation: show var(--show-duration) ease;
  }

  .hide {
    animation: show var(--hide-duration) ease reverse;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .show-with-scale {
    animation: show-with-scale var(--show-duration) ease;
  }

  .hide-with-scale {
    animation: show-with-scale var(--hide-duration) ease reverse;
  }

  @keyframes show-with-scale {
    from {
      opacity: 0;
      scale: 0.8;
    }
    to {
      opacity: 1;
      scale: 1;
    }
  }
`});function Ri(t){return Zn(t)}function Lr(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Zn(t){for(let e=t;e;e=Lr(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Lr(t);e;e=Lr(e)){if(!(e instanceof Element))continue;let o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||se(o)||e.tagName==="BODY"))return e}return null}var Oi=p(()=>{So()});function Ti(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t&&("contextElement"in t?t instanceof Element:!0)}var Jn,L,Ii=p(()=>{Cr();xr();I();Z();R();vr();Oi();k();j();ao();Jn=!!globalThis?.HTMLElement?.prototype.hasOwnProperty("popover"),L=class extends P{constructor(){super(...arguments),this.localize=new X(this),this.SUPPORTS_POPOVER=!1,this.active=!1,this.placement="top",this.boundary="viewport",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0,this.hoverBridge=!1,this.updateHoverBridge=()=>{if(this.hoverBridge&&this.anchorEl&&this.popup){let t=this.anchorEl.getBoundingClientRect(),e=this.popup.getBoundingClientRect(),o=this.placement.includes("top")||this.placement.includes("bottom"),r=0,a=0,i=0,n=0,s=0,l=0,d=0,u=0;o?t.top<e.top?(r=t.left,a=t.bottom,i=t.right,n=t.bottom,s=e.left,l=e.top,d=e.right,u=e.top):(r=e.left,a=e.bottom,i=e.right,n=e.bottom,s=t.left,l=t.top,d=t.right,u=t.top):t.left<e.left?(r=t.right,a=t.top,i=e.left,n=e.top,s=t.right,l=t.bottom,d=e.left,u=e.bottom):(r=e.right,a=e.top,i=t.left,n=t.top,s=e.right,l=e.bottom,d=t.left,u=t.bottom),this.style.setProperty("--hover-bridge-top-left-x",`${r}px`),this.style.setProperty("--hover-bridge-top-left-y",`${a}px`),this.style.setProperty("--hover-bridge-top-right-x",`${i}px`),this.style.setProperty("--hover-bridge-top-right-y",`${n}px`),this.style.setProperty("--hover-bridge-bottom-left-x",`${s}px`),this.style.setProperty("--hover-bridge-bottom-left-y",`${l}px`),this.style.setProperty("--hover-bridge-bottom-right-x",`${d}px`),this.style.setProperty("--hover-bridge-bottom-right-y",`${u}px`)}}}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.SUPPORTS_POPOVER=Jn,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){let t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||Ti(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){!this.anchorEl||!this.active||!this.isConnected||(this.popup?.showPopover?.(),this.cleanup=zo(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.popup?.hidePopover?.(),this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl||!this.popup)return;let t=[Eo({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(gr({apply:({rects:r})=>{let a=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=a?`${r.reference.width}px`:"",this.popup.style.height=i?`${r.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height="");let e;this.SUPPORTS_POPOVER&&!Ti(this.anchor)&&this.boundary==="scroll"&&(e=gt(this.anchorEl).filter(r=>r instanceof Element)),this.flip&&t.push($o({boundary:this.flipBoundary||e,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(ko({boundary:this.shiftBoundary||e,padding:this.shiftPadding})),this.autoSize?t.push(gr({boundary:this.autoSizeBoundary||e,padding:this.autoSizePadding,apply:({availableWidth:r,availableHeight:a})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${a}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${r}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push($i({element:this.arrowEl,padding:this.arrowPadding}));let o=this.SUPPORTS_POPOVER?r=>Ie.getOffsetParent(r,Ri):Ie.getOffsetParent;_o(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.SUPPORTS_POPOVER?"absolute":"fixed",platform:{...Ie,getOffsetParent:o}}).then(({x:r,y:a,middlewareData:i,placement:n})=>{let s=this.localize.dir()==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];if(this.setAttribute("data-current-placement",n),Object.assign(this.popup.style,{left:`${r}px`,top:`${a}px`}),this.arrow){let d=i.arrow.x,u=i.arrow.y,h="",f="",w="",g="";if(this.arrowPlacement==="start"){let v=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";h=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",f=s?v:"",g=s?"":v}else if(this.arrowPlacement==="end"){let v=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=s?"":v,g=s?v:"",w=typeof u=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(g=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":"",h=typeof u=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(g=typeof d=="number"?`${d}px`:"",h=typeof u=="number"?`${u}px`:"");Object.assign(this.arrowEl.style,{top:h,right:f,bottom:w,left:g,[l]:"calc(var(--arrow-base-offset) - var(--arrow-size-diagonal))"})}}),requestAnimationFrame(()=>this.updateHoverBridge()),this.dispatchEvent(new Mi)}render(){return A`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <span
        part="hover-bridge"
        class=${Tt({"popup-hover-bridge":!0,"popup-hover-bridge-visible":this.hoverBridge&&this.active})}
      ></span>

      <div
        popover="manual"
        part="popup"
        class=${Tt({popup:!0,"popup-active":this.active,"popup-fixed":!this.SUPPORTS_POPOVER,"popup-has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?A`<div part="arrow" class="arrow" role="presentation"></div>`:""}
      </div>
    `}};L.css=Fi;c([N(".popup")],L.prototype,"popup",2);c([N(".arrow")],L.prototype,"arrowEl",2);c([m({attribute:!1,type:Boolean})],L.prototype,"SUPPORTS_POPOVER",2);c([m()],L.prototype,"anchor",2);c([m({type:Boolean,reflect:!0})],L.prototype,"active",2);c([m({reflect:!0})],L.prototype,"placement",2);c([m()],L.prototype,"boundary",2);c([m({type:Number})],L.prototype,"distance",2);c([m({type:Number})],L.prototype,"skidding",2);c([m({type:Boolean})],L.prototype,"arrow",2);c([m({attribute:"arrow-placement"})],L.prototype,"arrowPlacement",2);c([m({attribute:"arrow-padding",type:Number})],L.prototype,"arrowPadding",2);c([m({type:Boolean})],L.prototype,"flip",2);c([m({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],L.prototype,"flipFallbackPlacements",2);c([m({attribute:"flip-fallback-strategy"})],L.prototype,"flipFallbackStrategy",2);c([m({type:Object})],L.prototype,"flipBoundary",2);c([m({attribute:"flip-padding",type:Number})],L.prototype,"flipPadding",2);c([m({type:Boolean})],L.prototype,"shift",2);c([m({type:Object})],L.prototype,"shiftBoundary",2);c([m({attribute:"shift-padding",type:Number})],L.prototype,"shiftPadding",2);c([m({attribute:"auto-size"})],L.prototype,"autoSize",2);c([m()],L.prototype,"sync",2);c([m({type:Object})],L.prototype,"autoSizeBoundary",2);c([m({attribute:"auto-size-padding",type:Number})],L.prototype,"autoSizePadding",2);c([m({attribute:"hover-bridge",type:Boolean})],L.prototype,"hoverBridge",2);L=c([T("wa-popup")],L)});var Bi=p(()=>{_i();nr();lr();cr();yr();Po();Se();Ae();ze();Ee();Ii();Cr();xr();$e();_e();xt();nt();oe();Vt();ie();It();Bt();Dt();V();I();Z();ae();Ht();Nt();qt();Ut();R();});var Di=p(()=>{yr();Po();xt();nt();Vt();ie();It();Bt();Dt();V();I();Ht();Nt();qt();Ut();R();});var qi,Sr=p(()=>{k();qi=z`
  :host {
    --track-height: 1rem;
    --track-color: var(--wa-color-neutral-fill-normal);
    --indicator-color: var(--wa-color-brand-fill-loud);

    display: flex;
  }

  .progress-bar {
    flex: 1 1 auto;
    display: flex;
    position: relative;
    overflow: hidden;
    height: var(--track-height);
    border-radius: var(--wa-border-radius-pill);
    background-color: var(--track-color);
    color: var(--wa-color-brand-on-loud);
    font-size: var(--wa-font-size-s);
  }

  .indicator {
    width: var(--percentage);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--indicator-color);
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    line-height: 1;
    font-weight: var(--wa-font-weight-semibold);
    transition: all var(--wa-transition-slow, 200ms) var(--wa-transition-easing, ease);
    user-select: none;
    -webkit-user-select: none;
  }

  /* Indeterminate */
  :host([indeterminate]) .indicator {
    position: absolute;
    inset-block: 0;
    inline-size: 50%;
    animation: wa-progress-indeterminate 2.5s infinite cubic-bezier(0.37, 0, 0.63, 1);
  }

  @media (forced-colors: active) {
    .progress-bar {
      outline: solid 1px SelectedItem;
      background-color: var(--wa-color-surface-default);
    }

    .indicator {
      outline: solid 1px SelectedItem;
      background-color: SelectedItem;
    }
  }

  @keyframes wa-progress-indeterminate {
    0% {
      inset-inline-start: -50%;
    }

    75%,
    100% {
      inset-inline-start: 100%;
    }
  }
`});var Zt,Ni=p(()=>{Sr();_e();I();Z();R();k();j();xe();Zt=class extends P{constructor(){super(...arguments),this.localize=new X(this),this.value=0,this.indeterminate=!1,this.label=""}willUpdate(t){this.style==null&&this.setStyleProperty("--percentage",`${dr(this.value,0,100)}%`),super.willUpdate(t)}updated(t){t.has("value")&&requestAnimationFrame(()=>{this.style.setProperty("--percentage",`${dr(this.value,0,100)}%`)}),super.updated(t)}render(){return A`
      <div
        part="base progress-bar"
        class="progress-bar"
        role="progressbar"
        title=${F(this.title)}
        aria-label=${this.label.length>0?this.label:this.localize.term("progress")}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.indeterminate?"0":this.value}
      >
        <div part="indicator" class="indicator">
          ${this.indeterminate?"":A` <slot part="label" class="label"></slot> `}
        </div>
      </div>
    `}};Zt.css=qi;c([m({type:Number,reflect:!0})],Zt.prototype,"value",2);c([m({type:Boolean,reflect:!0})],Zt.prototype,"indeterminate",2);c([m()],Zt.prototype,"label",2);Zt=c([T("wa-progress-bar")],Zt)});var Ui=p(()=>{Ni();Sr();_e();I();Z();ae();R();});var Hi,Ar=p(()=>{k();Hi=z`
  :host {
    --color: var(--wa-color-surface-border);
    --width: var(--wa-border-width-s);
    --spacing: var(--wa-space-m);
    --label-spacing: var(--wa-space-s);
    --label-offset: 0;
  }

  :host(:not([orientation='vertical'])) {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }

  :host([orientation='vertical']) {
    display: inline-block;
    height: 100%;
    border-inline-start: solid var(--width) var(--color);
    margin: 0 var(--spacing);
    min-block-size: 1lh;
  }

  /* With a label, the host's border gives way to two lines that flank the label */
  :host([with-label]) {
    align-items: center;
    gap: var(--label-spacing);
    border: none;
  }

  :host([with-label]:not([orientation='vertical'])) {
    display: flex;
  }

  :host([with-label][orientation='vertical']) {
    display: inline-flex;
    flex-direction: column;
  }

  :host([with-label])::before,
  :host([with-label])::after {
    content: '';
    flex: 1 1 0;
  }

  :host([with-label]:not([orientation='vertical']))::before,
  :host([with-label]:not([orientation='vertical']))::after {
    min-inline-size: 1em;
    border-top: solid var(--width) var(--color);
  }

  :host([with-label][orientation='vertical'])::before,
  :host([with-label][orientation='vertical'])::after {
    min-block-size: 1lh;
    border-inline-start: solid var(--width) var(--color);
  }

  :host([with-label][label-placement='start'])::before,
  :host([with-label][label-placement='end'])::after {
    flex: 0 0 var(--label-offset);
    min-inline-size: 0;
    min-block-size: 0;
  }

  :host(:not([with-label])) .label {
    display: none;
  }

  :host([with-label]) .label {
    display: inline-flex;
    align-items: center;
    gap: var(--wa-space-2xs);
    flex: 0 1 auto;
    color: var(--wa-color-text-quiet);
    font-size: var(--wa-font-size-s);
    line-height: var(--wa-line-height-condensed);
    text-align: center;
  }
`});var zt,Wi=p(()=>{Ar();nt();V();I();R();k();j();zt=class extends P{constructor(){super(...arguments),this.hasSlotController=new Lt(this,"[default]"),this.orientation="horizontal",this.withLabel=!1,this.labelPlacement="center"}connectedCallback(){super.connectedCallback(),this.setAttribute("role","separator")}willUpdate(t){this.withLabel=this.hasSlotController.test("[default]","withLabel"),super.willUpdate(t)}handleVerticalChange(){this.setAttribute("aria-orientation",this.orientation)}handleSlotChange(){this.internals&&(this.internals.ariaLabel=this.textContent?.trim()||null)}render(){return A`
      <div part="label" class="label">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `}};zt.css=Hi;c([m({reflect:!0})],zt.prototype,"orientation",2);c([m({attribute:"with-label",type:Boolean,reflect:!0})],zt.prototype,"withLabel",2);c([m({attribute:"label-placement",reflect:!0})],zt.prototype,"labelPlacement",2);c([D("orientation")],zt.prototype,"handleVerticalChange",1);zt=c([T("wa-divider")],zt)});var Vi=p(()=>{Wi();Ar();nt();V();I();R();});var ji=p(()=>{ie();It();Bt();Dt();V();I();Ht();Nt();qt();Ut();R();});var ts=Yi(()=>{zr();Ha();Ka();Bi();Di();Ui();Vi();ji()});export default ts();
/*! For license information please see components.js.LEGAL.txt */
