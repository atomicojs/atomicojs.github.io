import{h as a,c as t,u as o}from"./custom-element-6d69df93.js";import{u as e}from"./use-prop-a1462c5f.js";const i=a("style",null,":host{display:block;width:100%;position:relative;overflow:hidden;--docTabs_btn-color:white;--docTabs_btn-padding:12px 20px 8px;--docTabs_btn-inactive:#404040;--docTabs_btn-radio:8px;--docTabs_btn-fontSize:0.9em;--docTabs-bgcolor:#2b2b2b;border-radius:0.9rem;background:var(--docTabs-bgcolor);}.slides{display:flex;}.slide{max-width:100%;min-width:100%;display:inline-block;box-sizing:border-box;}.header{display:flex;margin-bottom:10px;position:relative;overflow-x:auto;}.header_line{position:absolute;width:100%;height:10px;background:var(--docTabs_btn-inactive);}.header_fill{flex:0%;background:var(--docTabs_btn-inactive);transition:0.3s ease all;}.button{background:transparent;color:var(--docTabs_btn-color);padding:var(--docTabs_btn-padding);border:none;transition:0.3s ease all;border:none;cursor:pointer;position:relative;background:var(--docTabs_btn-inactive);outline:none;font-size:var(--docTabs_btn-fontSize);}.button-active{--radio:calc(var(--docTabs_btn-radio) * 1.5);opacity:1;background:transparent;border-radius:var(--radio) var(--radio) 0px 0px;background:var(--docTabs-bgcolor);}.button-active+.header_fill,.button-next{border-radius:0px 0px 0px var(--docTabs_btn-radio);}.button-prev{border-radius:0px 0px var(--docTabs_btn-radio) 0px;}");function r({tabs:t,msAnimation:r,autoHeight:n}){const[s,d]=e("tab"),b=o(),{current:l}=b,c=t.split(/ *, */),p=[...l.children].map((a,t)=>(a.slot!=c[t]&&(a.slot=c[t]),a.style.margin="0px",a.clientHeight+"px"));return a("host",{items:c,shadowDom:!0},i,a("header",{class:"header"},a("div",{class:"header_line"}),c.map((t,o)=>a("button",{class:"button "+(o==s?"button-active":o==s-1?"button-prev":o==s+1?"button-next":""),onclick:()=>d(o)},t)),a("div",{class:"header_fill"})),a("div",{class:"slides",style:`transition:${r} ease all;transform:translateX(${-100*s}%);height:${n?p[s]:"100%"}`},c.map(t=>a("div",{class:"slide"},a("slot",{name:t})))))}r.props={items:Array,tabs:String,tab:{type:Number,value:0},msAnimation:{type:String,value:".35s"},autoHeight:{type:Boolean,reflect:!0}},customElements.define("doc-tabs",t(r));
