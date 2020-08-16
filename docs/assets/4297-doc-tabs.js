import { h, c, u as useHost } from './custom-element-6d69df93.js';
import { u as useProp } from './use-prop-a1462c5f.js';

var style = ":host{display:block;width:100%;position:relative;overflow:hidden;--docTabs_btn-color:white;--docTabs_btn-padding:12px 20px 8px;--docTabs_btn-inactive:#404040;--docTabs_btn-radio:8px;--docTabs_btn-fontSize:0.9em;--docTabs-bgcolor:#2b2b2b;border-radius:0.9rem;background:var(--docTabs-bgcolor);}.slides{display:flex;}.slide{max-width:100%;min-width:100%;display:inline-block;box-sizing:border-box;}.header{display:flex;margin-bottom:10px;position:relative;overflow-x:auto;}.header_line{position:absolute;width:100%;height:10px;background:var(--docTabs_btn-inactive);}.header_fill{flex:0%;background:var(--docTabs_btn-inactive);transition:0.3s ease all;}.button{background:transparent;color:var(--docTabs_btn-color);padding:var(--docTabs_btn-padding);border:none;transition:0.3s ease all;border:none;cursor:pointer;position:relative;background:var(--docTabs_btn-inactive);outline:none;font-size:var(--docTabs_btn-fontSize);}.button-active{--radio:calc(var(--docTabs_btn-radio) * 1.5);opacity:1;background:transparent;border-radius:var(--radio) var(--radio) 0px 0px;background:var(--docTabs-bgcolor);}.button-active+.header_fill,.button-next{border-radius:0px 0px 0px var(--docTabs_btn-radio);}.button-prev{border-radius:0px 0px var(--docTabs_btn-radio) 0px;}";

const staticStyle = h('style', null, style);

function docTab({
    tabs,
    msAnimation,
    autoHeight,
}) {
    const [tab, setTab] = useProp("tab");
    const host = useHost();
    const { current } = host;
    const tabsList = tabs.split(/ *, */);

    const heights = [...current.children].map((child, index) => {
        if (child.slot != tabsList[index]) {
            child.slot = tabsList[index];
        }
        child.style.margin = "0px";
        return child.clientHeight + "px";
    });

    return (
        h('host', { items: tabsList, shadowDom: true,}
            , staticStyle
            , h('header', { class: "header",}
                , h('div', { class: "header_line",})
                , tabsList.map((title, index) => (
                    h('button', {
                        class: 
                            "button " +
                            (index == tab
                                ? "button-active"
                                : index == tab - 1
                                ? "button-prev"
                                : index == tab + 1
                                ? "button-next"
                                : "")
                        ,
                        onclick: () => setTab(index),}
                    
                        , title
                    )
                ))
                , h('div', { class: "header_fill",})
            )
            , h('div', {
                class: "slides",
                style: `transition:${msAnimation} ease all;transform:translateX(${
                    -100 * tab
                }%);height:${autoHeight ? heights[tab] : "100%"}`,}
            
                , tabsList.map((title) => (
                    h('div', { class: "slide",}
                        , h('slot', { name: title,})
                    )
                ))
            )
        )
    );
}

docTab.props = {
    items: Array,
    tabs: String,
    tab: {
        type: Number,
        value: 0,
    },
    msAnimation: {
        type: String,
        value: ".35s",
    },
    autoHeight: { type: Boolean, reflect: true },
};

customElements.define("doc-tabs", c(docTab));
