import { h, c, Component } from "atomico";

interface Props {
    href: string;
    label: string;
    description: string;
    align: string;
    labelDir: string;
}

const DocNextPage: Component<Props> = ({
    href,
    labelDir,
    label,
    description,
    align,
}) => {
    return (
        <host style={align == "next" ? { textAlign: "right" } : {}}>
            <a
                href={href}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    color: "unset",
                    textDecoration: "none",
                }}
            >
                <div>
                    {labelDir && (
                        <span style={{ fontSize: ".8em", opacity: 0.75 }}>
                            {labelDir}
                        </span>
                    )}
                    <h4 style={{ margin: 0, fontSize: "1.25rem" }}>{label}</h4>
                    <p style={{ margin: 0, fontSize: ".85rem" }}>
                        {description}
                    </p>
                </div>
            </a>
        </host>
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
