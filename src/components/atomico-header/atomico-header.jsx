import { h, c } from "atomico";
import style from "./atomico-header.css";

const AtomicoHeader = () => {
    return (
        <host shadowDom>
            <style>{style}</style>
            <slot name="brand"></slot>
            <slot name="menu"></slot>
        </host>
    );
};

AtomicoHeader.props = {
    position: {
        type: String,
        value: "top",
        reflect: true,
    },
    fixed: {
        type: Boolean,
        reflect: true,
    },
};

customElements.define("atomico-header", c(AtomicoHeader));
