import { c, u as useHost, h } from './custom-element-6d69df93.js';

const styleLink = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    fontSize: "0.936rem",
    padding: "0.25rem",
    boxSizing: "border-box",
    cursor: "pointer",
    textDecoration: "none",
    color: "unset",
};

function docListLink({ active }) {
    const { current } = useHost();
    const Slot = current.querySelector(":scope > [slot]");
    return (
        h('host', { style: styleLink,}
            , h('span', {
                key: "dot",
                style: {
                    display: "block",
                    width: ".25em",
                    height: ".25em",
                    borderRadius: "50%",
                    marginRight: ".5em",
                    background: active ? "currentColor" : "transparent",
                },}
            )
            , h(Slot, { key: "slot",})
        )
    );
}

docListLink.props = {
    active: {
        type: Boolean,
    },
};

customElements.define("doc-list-link", c(docListLink, HTMLAnchorElement), {
    extends: "a",
});
