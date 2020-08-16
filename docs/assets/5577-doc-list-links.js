import { c, u as useHost, h } from './custom-element-6d69df93.js';

var style = ":host{width:100%;height:auto;display:block;padding:1.25rem;box-sizing:border-box;}:host([inline]){width:auto;padding:0.9rem 1.25rem;}:host([inline]),.content-inline{display:inline-flex;align-items:center;flex-flow:row wrap;}slot[name]{display:inline-flex;align-items:center;padding:0px 0.25rem;}";

const DocListLinks = ({ label, inline, autoslot }) => {
    let { current } = useHost();
    return (
        h('host', { shadowDom: true,}
            , h('style', null, style)
            , label && (
                h('header', null
                    , h('strong', null, label)
                )
            )
            , h('div', { class: "content" + inline ? " content-inline" : "",}
                , autoslot ? (
                    [...current.children].map((el, index) => {
                        el.slot = "item-" + (index + 1);
                        return h('slot', { name: el.slot,});
                    })
                ) : (
                    h('slot', null)
                )
            )
        )
    );
};

DocListLinks.props = {
    label: String,
    inline: { type: Boolean, reflect: true },
    autoslot: { type: Boolean },
};

customElements.define("doc-list-links", c(DocListLinks));
