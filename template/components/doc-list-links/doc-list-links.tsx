import { h, c, Component, useHost } from "atomico";
import style from "./doc-list-links.css";

interface Props {
    label: string;
    inline: boolean;
    autoslot: boolean;
}

const DocListLinks: Component<Props> = ({ label, inline, autoslot }) => {
    let { current } = useHost();
    return (
        <host shadowDom>
            <style>{style}</style>
            {label && (
                <header>
                    <strong>{label}</strong>
                </header>
            )}
            <div class={"content" + inline ? " content-inline" : ""}>
                {autoslot ? (
                    [...current.children].map((el, index) => {
                        el.slot = "item-" + (index + 1);
                        return <slot name={el.slot}></slot>;
                    })
                ) : (
                    <slot></slot>
                )}
            </div>
        </host>
    );
};

DocListLinks.props = {
    label: String,
    inline: { type: Boolean, reflect: true },
    autoslot: { type: Boolean },
};

customElements.define("doc-list-links", c(DocListLinks));
