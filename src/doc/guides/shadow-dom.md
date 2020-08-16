---
title: Shadow DOM
description: native encapsulation for Webcomponent
order: 1
linkTitle: Shadow DOM
link: "doc/shadow-dom"
tag: guides
lang: en
links:
    prev:
        link: light-dom-es.md
---

## Use the Shadow DOM

Every node that declares property `shadowDom` will enable its use, example:

<doc-tabs tabs="JSX, Template String">

```jsx
import { h } from "atomico";
function myComponent() {
    return <host shadowDom>inside the Shadow Dom 🌘 🦇</host>;
}
```

```js
import html from "atomico/html";
function myComponent() {
    return html`<host shadowDom>inside the Shadow Dom 🌘 🦇</host>`;
}
```

</doc-tabs>

## Style encapsulation

The Shadow DOM generates an encapsulation that allows maintaining CSS effects only in the component, example:

<doc-tabs auto-height tabs="JSX, Template String">

```jsx
import { h } from "atomico";
const style = `
    button {
        font-size: 20px;
        display: block;
        background: red;
    }
`;
function myComponent() {
    return (
        <host shadowDom>
            <style>{style}</style>
            <button>inside the shadowDom</button>
        </host>
    );
}
```

```js
import html from "atomico/html";
function myComponent() {
    return html`<host shadowDom>
        <style>
            button {
                font-size: 20px;
                display: block;
                background: red;
            }
        </style>
        <button>inside the shadowDom</button>
    </host>`;
}
```

</doc-tabs>

**indifferent to the use of the global selector `button`, the style effect will only be present inside the component**. This behavior allows the UI to be kept without conflict with the global styles.

### :host

The `:host` pseudo-class that points to the container that declares the use of the Shadow DOM, example:

```jsx
:host{
    display: block;
    background: black;
}
```

The container that the above css applies will own the host declarations.

### Custom Properties

CSS variables are the efficient way to maintain styles with dynamic behaviors.

**Recomendaciones de nombre**:

`--<component>_<value>`: pattern for static local variables, eg: `--myComponent_colorPrimary`, this syntax minimizes the name conflict that can be generated with the use of customProperties.

`- <value>`: pattern for dynamic local variables: `--color`.

**Example**

<doc-tabs auto-height tabs="Static, Dinamic">

```jsx
const style = `
    :host{
        --myComponent_colorPrimary: tomato;
    }
`;

function myComponent() {
    return (
        <host shadowDom>
            <style>{style}</style>
        </host>
    );
}
```

```jsx
const style = `
    :host{
        --color: tomato;
    }
`;

function myComponent({ color }) {
    return (
        <host shadowDom style={{ "--color": color }}>
            <style>{style}</style>
        </host>
    );
}

myComponent.props = {
    color: { type: String },
};
```

</doc-tabs>

### Limitations

**font import**

The Shadow DOM does not support the use of the `@font-face` rule either by import or declaration. Although there is a CSSStyleSheet as a proposal to correct this, it is not yet adopted by all browsers that support WebComponent natively. **For the use of fonts, the resources associated with this must be included in the document** thus allowing the use of the typographic resource.

## Tag slot

The slot tag is a native Shadow DOM resource that allows the component's Light DOM content to be reflected within the Shadow DOM, for example:

<doc-tabs auto-height tabs="Html, Componente">

```html
<my-component>
    <h1>my slot</h1>
</my-component>
```

```jsx
function myComponent() {
    return (
        <host shadowDom>
            before slot...
            <slot></slot>
            after slot...
        </host>
    );
}
```

</doc-tabs>

The DOM of the component will reflect the `h1` tag inside the`slot` tag.

## additional Shadow DOM features

<doc-details summary="::slotted">

### :: slotted

The pseudo-elements `::slotted(<selector>)` allows modifying the style of the html present in the Light DOM associated with the slot. [see more](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted)

```css
/* Selects any element placed inside a slot */
::slotted(*) {
    font-weight: bold;
}

/* Selects any <span> placed inside a slot */
::slotted(span) {
    font-weight: bold;
}
```

</doc-details>
