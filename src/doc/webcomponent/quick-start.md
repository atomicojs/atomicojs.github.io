---
title: Atomico webcomponents
description: Designed to simplify the creation of webcomponents
order: 1
linkTitle: Introduction
link: "doc/quick-start"
tag: webcomponent
lang: en
links:
    userInterface:
        link: user-interface.md
    properties:
        link: properties.md
    prev:
        link: ../../doc.md
    next:
        link: user-interface.md
---

Atomico is created to simplify the development of webcomponents, replacing Classes with expressive and minimalist functions, example:

**Component example**

<doc-tabs auto-height tabs="JS, JSX, TS, TSX">

```js
import { c } from "atomico";
import html from "atomico/html";

function myComponent({ value }) {
    return html`<host>
        <h1>Title</h1>
        <p>Content: ${value}</p>
    </host>`;
}

myComponent.props = {
    value: String,
};

customElements.define("my-component", c(myComponent));
```

```jsx
import { h, c } from "atomico";

function myComponent({ value }) {
    return (
        <host>
            <h1>Title</h1>
            <p>Content {value}</p>
        </host>
    );
}

myComponent.props = {
    value: String,
};

customElements.define("my-component", c(myComponent));
```

```ts
import { c, Props } from "atomico";
import html from "atomico/html";

function myComponent({ value }: Props<typeof myComponent.props>) {
    return html`<host>
        <h1>Title!</h1>
        <p>Content!</p>
    </host>`;
}

myComponent.props = {
    value: String,
};

customElements.define("my-component", c(myComponent));
```

```tsx
import { h, c, Props } from "atomico";

function myComponent({ value }: Props<typeof myComponent.props>) {
    return (
        <host>
            <h1>Title!</h1>
            <p>Content!</p>
        </host>
    );
}

myComponent.props = {
    value: String,
};

customElements.define("my-component", c(myComponent));
```

</doc-tabs>

Where:

-   **myCounter**: Represents the [user interface]({{page.links.userInterface.link}}) and logic of the component.
-   **myCounter.props**: Represents the [component properties]({{page.links.properties.link}}).

## Component

A component with Atomico is composed of 2 parts, function and props (properties).

### Function

represents the [User Interface]({{page.links.userInterface.link}}) and logic, of the component as a function we can highlight:

1. The [User Interface]({{page.links.userInterface.link}}) is created from Virtual Dom using JSX or Template String.
2. Every component created with Atomico must return the tag `<host/>`.
3. The shadow Dom is optional, if you want to use it you must define property `shadowDom` in the tag host, example `<host shadowDom> 🌒 Inside Shadow Dom! </host>`
4. the methods are declared in the tag `<host/>`, example `<host myMethod={() => {...}/>`.
5. The logic is represented by Hooks.

### props(Properties)

The props represent the [component properties]({{page.links.properties.link}}), of the props we can highlight:

1. The types are strict.
2. Each property is a visible state from the tag, example `document.querySelector("my-component").value`
3. The properties can be [simple declarations]({{page.links.properties.link}}#simple-declarations) or [structured declarations]({{page.links.properties.link}}#structured-declarations).
4. Atomico automatically generates the attribute, transforming the prop name from camelCase to kebab-case, example: property `myCounter` is recognized as attribute `my-counter`. This behavior can be modified with the use of [structured statements]({{page.links.properties.link}}#structured-statements).
