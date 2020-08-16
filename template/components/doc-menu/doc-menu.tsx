import { h, c, Component, useHost, useProp, useRef } from "atomico";
import {
    useStateSize,
    useSize,
} from "../../hooks/use-state-size/use-state-size";
import style from "./doc-menu.css";

interface Props {
    bgColor: string;
    brColor: string;
    brRadio: string;
    hrSubColor: string;
    type: string;
    show: boolean;
}

const DocMenu: Component<Props> = ({
    bgColor,
    brRadio,
    brColor,
    hrSubColor,
    type,
}) => {
    const ref = useRef();
    const refHost = useHost();
    const size = useStateSize(type, refHost);
    const [show, setShow] = useProp<boolean>("show");
    const [, height] = useSize(ref);
    const { current } = refHost;
    const nodeListLinks = [
        ...current.querySelectorAll(":scope > [slot^=links-]"),
    ];
    const withFooter = current.querySelector(":scope [slot=footer]");
    const hr = <div class="hr" style={{ background: brColor }}></div>;
    const isLarge = size == "large";
    const toggle = () => setShow(!show);
    return (
        <host
            current-type={size}
            toggle={toggle}
            shadowDom
            style={{
                visibility: "visible",
                background: bgColor,
                border: `1px solid ${brColor}`,
                borderRadius: brRadio,
            }}
        >
            <style>{style}</style>
            <header class={"header" + (isLarge ? " header-large" : "")}>
                <slot name="header"></slot>
                {isLarge && (
                    <button class="burger" onclick={toggle}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </button>
                )}
            </header>
            <div
                class="mask"
                style={isLarge ? { height: (show ? height : 0) + "px" } : {}}
            >
                <div class="mask_sub" ref={ref}>
                    {nodeListLinks.map((_, index) => [
                        hr,
                        <div class="links">
                            <slot name={"links-" + (index + 1)}></slot>
                        </div>,
                    ])}
                    {withFooter && (
                        <div>
                            {hr}
                            <slot name="footer"></slot>
                        </div>
                    )}
                </div>
            </div>
        </host>
    );
};

DocMenu.props = {
    bgColor: {
        type: String,
        value: "#FFF",
    },
    brColor: {
        type: String,
        value: "#EAEEED",
    },
    brRadio: {
        type: String,
        value: ".9rem",
    },
    hrSubColor: {
        type: String,
        value: "#000",
    },
    type: {
        type: String,
        value: "large",
    },
    show: {
        type: Boolean,
        reflect: true,
        value: false,
    },
};

customElements.define("doc-menu", c(DocMenu));
