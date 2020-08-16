import { c, h } from './custom-element-6d69df93.js';

const DocNextPage = ({
    href,
    labelDir,
    label,
    description,
    align,
}) => {
    return (
        h('host', { style: align == "next" ? { textAlign: "right" } : {},}
            , h('a', {
                href: href,
                style: {
                    display: "inline-flex",
                    alignItems: "center",
                    color: "unset",
                    textDecoration: "none",
                },}
            
                , h('div', null
                    , labelDir && (
                        h('span', { style: { fontSize: ".8em", opacity: 0.75 },}
                            , labelDir
                        )
                    )
                    , h('h4', { style: { margin: 0, fontSize: "1.25rem" },}, label)
                    , h('p', { style: { margin: 0, fontSize: ".85rem" },}
                        , description
                    )
                )
            )
        )
    );
};

DocNextPage.props = {
    href: String,
    label: String,
    labelDir: String,
    description: String,
    align: String,
};

customElements.define("doc-next-page", c(DocNextPage));
