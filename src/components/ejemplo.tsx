import { h, c, Component } from "atomico";

interface Props {
    value: number;
}

const MyComponent: Component<Props> = ({ value }) => (
    <host>Atomico + Typescript</host>
);

MyComponent.props = {
    value: { type: Number, value: 0 },
};

customElements.define("my-component", c(MyComponent));
