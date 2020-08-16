import { h, c, Props, useHost, useProp } from "atomico";

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

function docListLink({ active }: Props<typeof docListLink.props>) {
    const { current } = useHost();
    const Slot: any = current.querySelector(":scope > [slot]");
    return (
        <host style={styleLink}>
            <span
                key="dot"
                style={{
                    display: "block",
                    width: ".25em",
                    height: ".25em",
                    borderRadius: "50%",
                    marginRight: ".5em",
                    background: active ? "currentColor" : "transparent",
                }}
            ></span>
            <Slot key="slot"></Slot>
        </host>
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
