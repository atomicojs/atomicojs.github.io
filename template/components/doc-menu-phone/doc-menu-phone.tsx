import { h, c, Component } from "atomico";

interface Props {
    position: string;
}

const DocMenuPhone: Component<Props> = ({ position }) => {
    return (
        <host>
            <button class="burger"></button>
        </host>
    );
};

DocMenuPhone.props = {
    position: {
        type: String,
        reflect: true,
        value: "bottom right",
    },
};

customElements.define("doc-menu-phone", c(DocMenuPhone));
