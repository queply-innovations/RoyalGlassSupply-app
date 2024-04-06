var O=(s,t,e)=>{if(!t.has(s))throw TypeError("Cannot "+e)};var o=(s,t,e)=>(O(s,t,"read from private field"),e?e.call(s):t.get(s)),d=(s,t,e)=>{if(t.has(s))throw TypeError("Cannot add the same private member more than once");t instanceof WeakSet?t.add(s):t.set(s,e)},y=(s,t,e,r)=>(O(s,t,"write to private field"),r?r.call(s,e):t.set(s,e),e);var g=(s,t,e)=>(O(s,t,"access private method"),e);import{m as x,b$ as A,c0 as T,c1 as C,c2 as Y,c3 as E,k as F,r as M,c4 as J,c5 as U}from"./index-f92271f0.js";/**
 * @license lucide-react v0.338.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const R=x("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);var m,l,i,h,p,v,f,S,P,k=(P=class extends A{constructor(t,e){super();d(this,p);d(this,f);d(this,m,void 0);d(this,l,void 0);d(this,i,void 0);d(this,h,void 0);y(this,m,t),this.setOptions(e),this.bindMethods(),g(this,p,v).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){var r;const e=this.options;this.options=o(this,m).defaultMutationOptions(t),T(this.options,e)||o(this,m).getMutationCache().notify({type:"observerOptionsUpdated",mutation:o(this,i),observer:this}),e!=null&&e.mutationKey&&this.options.mutationKey&&C(e.mutationKey)!==C(this.options.mutationKey)?this.reset():((r=o(this,i))==null?void 0:r.state.status)==="pending"&&o(this,i).setOptions(this.options)}onUnsubscribe(){var t;this.hasListeners()||(t=o(this,i))==null||t.removeObserver(this)}onMutationUpdate(t){g(this,p,v).call(this),g(this,f,S).call(this,t)}getCurrentResult(){return o(this,l)}reset(){var t;(t=o(this,i))==null||t.removeObserver(this),y(this,i,void 0),g(this,p,v).call(this),g(this,f,S).call(this)}mutate(t,e){var r;return y(this,h,e),(r=o(this,i))==null||r.removeObserver(this),y(this,i,o(this,m).getMutationCache().build(o(this,m),this.options)),o(this,i).addObserver(this),o(this,i).execute(t)}},m=new WeakMap,l=new WeakMap,i=new WeakMap,h=new WeakMap,p=new WeakSet,v=function(){var e;const t=((e=o(this,i))==null?void 0:e.state)??Y();y(this,l,{...t,isPending:t.status==="pending",isSuccess:t.status==="success",isError:t.status==="error",isIdle:t.status==="idle",mutate:this.mutate,reset:this.reset})},f=new WeakSet,S=function(t){E.batch(()=>{var e,r,n,a,u,c,D,w;if(o(this,h)&&this.hasListeners()){const b=o(this,l).variables,$=o(this,l).context;(t==null?void 0:t.type)==="success"?((r=(e=o(this,h)).onSuccess)==null||r.call(e,t.data,b,$),(a=(n=o(this,h)).onSettled)==null||a.call(n,t.data,null,b,$)):(t==null?void 0:t.type)==="error"&&((c=(u=o(this,h)).onError)==null||c.call(u,t.error,b,$),(w=(D=o(this,h)).onSettled)==null||w.call(D,void 0,t.error,b,$))}this.listeners.forEach(b=>{b(o(this,l))})})},P);function H(s,t){const e=F(t),[r]=M.useState(()=>new k(e,s));M.useEffect(()=>{r.setOptions(s)},[r,s]);const n=M.useSyncExternalStore(M.useCallback(u=>r.subscribe(E.batchCalls(u)),[r]),()=>r.getCurrentResult(),()=>r.getCurrentResult()),a=M.useCallback((u,c)=>{r.mutate(u,c).catch(J)},[r]);if(n.error&&U(r.options.throwOnError,[n.error]))throw n.error;return{...n,mutate:a,mutateAsync:n.mutate}}const I=()=>{const s=new Date,t=s.getFullYear(),e=s.getMonth()+1,r=s.getDate(),n=s.getHours()+":"+s.getMinutes()+":"+s.getSeconds();return`${t}-${e}-${r} at ${n}`},L=()=>new Date().toISOString(),j=s=>{const t=new Date(s),e=t.getFullYear(),r=t.getMonth()+1,n=t.getDate();let a=t.getHours();const u=t.getMinutes(),c=a>=12?"PM":"AM";return a=a%12,a=a||12,`${e}-${r<10?"0":""}${r}-${n<10?"0":""}${n} ${a}:${u<10?"0":""}${u} ${c}`},q=s=>{const t=["January","February","March","April","May","June","July","August","September","October","November","December"],e=new Date(s),r=e.getFullYear(),n=t[e.getMonth()],a=e.getDate();let u=e.getHours();const c=u>=12?"PM":"AM";return`${n} ${a<10?"0":""}${a} ${r} at ${u}:${e.getMinutes()} ${c}`},B=()=>`${["January","February","March","April","May","June","July","August","September","October","November","December"][new Date().getMonth()]}`;function Q(s){return new Intl.NumberFormat("en-US",{style:"currency",currency:"PHP"}).format(s)}export{R as P,j as a,L as b,B as c,q as d,Q as f,I as g,H as u};