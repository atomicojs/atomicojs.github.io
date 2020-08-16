import { c, h } from './custom-element-6d69df93.js';
import { c as useMemo } from './hooks-f87b56d6.js';

const DocListTopic = ({ selector, label, sticky }) => {
    const topic = useMemo(() => {
        const parent = document.querySelector(selector);
        const children = [
            ...parent.querySelectorAll(":scope > h2,:scope > h3"),
        ].map((el) => {
            const { localName, textContent, id } = el;
            return {
                lvl: Number(localName.replace("h", "")),
                text: textContent,
                id,
            };
        });

        const min = Math.min(...children.map(({ lvl }) => lvl));

        return children.map((data) => ({
            ...data,
            lvl: data.lvl - min,
        }));
    }, [selector]);

    return (
        h('host', {
            style: {
                display: "block",
                position: sticky ? "sticky" : "",
                top: sticky || "0",
                lineHeight: "1em",
            },}
        
            , h('strong', { style: { marginBottom: ".5em", display: "block" },}
                , label
            )
            , topic.map(({ lvl, text, id }) => (
                h('a', {
                    href: "#" + id,
                    style: {
                        display: "flex",
                        fontSize: ".9rem",
                        color: "currentColor",
                        textDecoration: "none",
                        padding: ".4em 0px",
                    },}
                
                    , h('span', {
                        style: {
                            paddingLeft: `calc(1rem *  ${lvl} )`,
                        },}
                    
                        , text
                    )
                )
            ))
        )
    );
};

DocListTopic.props = {
    selector: String,
    label: String,
    sticky: String,
};

customElements.define("doc-list-topic", c(DocListTopic));
