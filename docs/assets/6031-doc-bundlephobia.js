import{c as e,h as o}from"./custom-element-6d69df93.js";import{u as t,a as i}from"./hooks-f87b56d6.js";const s={},r=e=>s[e]=s[e]||fetch(e).then(e=>e.json()),a=([e,...o])=>o.reduce((e,{gzip:o,size:t})=>(e.gzip+=o,e.size+=t,e),e);function n({packages:e,reverse:s,colors:n}){const l=function(e){const[o,s]=t([]),n="https://bundlephobia.com/api/size?package=";return i(()=>{let o;return Promise.all(e.map(e=>{const o=e.split(/ *\+ */);return o.length>1?Promise.all(o.map(e=>r(n+e))).then(a):r(n+e)})).then(o=>{s(o.map((o,t)=>[e[t],o]))}),()=>o=!0},e),o}(e),p=Math.max(...l.map(([,{gzip:e}])=>e)),[c,m,d,g]=n.split(";");return o("host",{shadowDom:!0},o("style",null,":host{font-size:1rem;font-family:monospace;}.row{position:relative;width:100%;}.row .btn-remove{opacity:0;}.row:hover .btn-remove{opacity:1;}.col{flex:0%;display:flex;align-items:center;}.col div{height:0.5em;border-radius:100px;}.tag{background:rgba(0, 0, 0, 0.15);font-size:0.8em;display:inline-block;padding:0px 0.25rem;line-height:1.5em;border-radius:100px;margin-left:0.5em;font-weight:bold;}"),l.sort(([,{gzip:e}],[,{gzip:o}])=>(e>o?-1:1)*(s?1:-1)).map(([e,{gzip:t}])=>{const i=t/p;return o("div",{class:"row"},o("div",null,e,o("span",{class:"tag"},(t/1e3).toFixed(1),"kb")),o("div",{class:"col"},o("div",{style:{width:100*i+"%",background:i>.75?g:i>.5?d:i>.25?m:c}})))}))}n.props={reverse:Boolean,packages:{type:Array,value:()=>[]},colors:{type:String,value:"#15d1e4;#15e4b4;orange;tomato"}},customElements.define("doc-bundlephobia",e(n));