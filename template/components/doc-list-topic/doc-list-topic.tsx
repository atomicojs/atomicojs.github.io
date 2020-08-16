import { h, c, Component, useMemo } from "atomico";

interface Props {
    selector: string;
    label: string;
    sticky: string;
}

const DocListTopic: Component<Props> = ({ selector, label, sticky }) => {
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
        <host
            style={{
                display: "block",
                position: sticky ? "sticky" : "",
                top: sticky || "0",
                lineHeight: "1em",
            }}
        >
            <strong style={{ marginBottom: ".5em", display: "block" }}>
                {label}
            </strong>
            {topic.map(({ lvl, text, id }) => (
                <a
                    href={"#" + id}
                    style={{
                        display: "flex",
                        fontSize: ".9rem",
                        color: "currentColor",
                        textDecoration: "none",
                        padding: ".4em 0px",
                    }}
                >
                    <span
                        style={{
                            paddingLeft: `calc(1rem *  ${lvl} )`,
                        }}
                    >
                        {text}
                    </span>
                </a>
            ))}
        </host>
    );
};

DocListTopic.props = {
    selector: String,
    label: String,
    sticky: String,
};

customElements.define("doc-list-topic", c(DocListTopic));
