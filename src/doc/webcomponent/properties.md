---
title: Props(Properties)
description: Visible states of the webcomponent as attribute or property.
order: 3
linkTitle: props(Properties)
link: "doc/webcomponent-properties"
tag: webcomponent
lang: en
links:
    prev:
        link: user-interface.md
    next:
        link: ../hooks/hooks.md
        linkTitle: Hooks
---

Atomico improves the creation of attributes and properties by means of the X object that is assigned to the function, example:

<doc-tabs auto-height tabs="JSX, TS">

```jsx
import { h } from "atomico";

function myComponent({ value }) {
    return <host>... {value}</host>;
}

myComponent.props = {
    value: String,
};
```

```ts
import { Props } from "atomico";
import html from "atomico/html";

function myComponent({ value }: Props<typeof myComponent.props>) {
    return html`<host>... ${value}</host>`;
}

myComponent.props = {
    value: String,
};
```

</doc-tabs>

Props are declared by:

1. **name**: name of the property to associate with the component.
2. **value**: defines the type and behavior of the component property.

## Types of statements

### Simple statements

simple declarations associate the type of the property value.

```js
myComponent.props = {
    myString: String,
};
```

### Structured statements

Structured declarations define the type and additional behaviors, example:

```js
myComponent.props = {
    myString: {
        type: String,
        attr: "mystring",
        event: { type: "ChageMyString" },
        reflect: true,
        value: "Initial string!",
    },
};
```

Where:

-   **type**: [Type](#types) of values accepted by the property.
-   **attr**: String, modify the default generated attribute.
-   **event**: Objeto, Configure the emission of an event every time the property value changes.
-   **reflect**: Boolean, Reflects the value of the property as Attribute.
-   **value**: Any, Defines an initial state for the property.

## Types

Atomico uses [Standard Objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) to recognize Types, the type support is composed of:

| Types    | Support as an attribute |
| -------- | ----------------------: |
| Number   |                      Si |
| String   |                      Si |
| Boolean  |                      Si |
| Array    |                      Si |
| Object   |                      Si |
| Promise  |                       - |
| Function |                       - |
| Symbol   |                       - |
