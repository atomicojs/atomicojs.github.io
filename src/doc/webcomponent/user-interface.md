---
title: Virtual Dom
description: Designed to be simple and expressive with the UI
order: 2
linkTitle: User interface
link: "doc/webcomponent-ui"
tag: webcomponent
lang: en
links:
    prev:
        link: quick-start.md
    next:
        link: properties.md
---

The UI of the webcomponent is created with Virtual DOM, this can be declared using JSX or Template String, example:

<doc-tabs auto-height tabs="JSX, Template String">

```jsx
import { h } from "atomico";

function myComponent({ src }) {
    return (
        <host>
            <h1>Soy un titulo</h1>
            <img src={src} alt="imagen" />
            {[1, 2, 3].map((value) => (
                <span>Texto {value}</span>
            ))}
        </host>
    );
}
```

```js
import html from "atomico/html";

function myComponent({ src }) {
    return html`
        <host>
            <h1>Soy un titulo</h1>
            <img src=${src} alt="imagen" />
            ${[1, 2, 3].map((value) => html`<span>Texto ${value}</span>`)}
        </host>
    `;
}
```

</doc-tabs>

**It is a requirement for the `JSX` compiler to always configure and import the `h` function**

<doc-details summary="JSX configuration in Babel">

```json
{
    "plugins": [
        [
            "@babel/plugin-transform-react-jsx",
            {
                "pragma": "h"
            }
        ]
    ]
}
```

</doc-details>

<doc-details summary="JSX configuration in Typescript">

```json
{
    "compilerOptions": {
        ...
        "jsx": "preserve",
        "jsxFactory": "h",
        ...
    }
}
```

</doc-details>

## Supported logical operators

The supported operators to condition nodes or values are:

1. **short-circuit** : `value && <div/>`.
2. **Ternaries** : `value ? <div/> : <img/>`.

<doc-tabs auto-height tabs="JSX, Template String">

```jsx
function myComponent({ value }) {
    return (
        <host style={value ? "color:red" : "color:black"}>
            {value && <button>with value</button>}
            {value ? <button>with value</button> : <span>without value</span>}
        </host>
    );
}
```

```js
function myComponent({ value }) {
    return html`<host style=${value ? "color:red" : "color:black"}>
        ${value && html`<button>with value</button>`}
        <!--ternario-->
        ${value
            ? html`<button>with value</button>`
            : html`<span>without value</span>`}
    </host>`;
}
```

</doc-tabs>

## Simple lists and lists with key

Lists can be simple or associative to a reference declared by property `key`, example:

### Simple lists

<doc-tabs auto-height tabs="JSX, Template String">

```jsx
function myComponent({ users }) {
    return (
        <host>
            <ul>
                <li>Users:</li>
                {list.map((user) => (
                    <li>User {user.name}</li>
                ))}
            </ul>
        </host>
    );
}
```

```js
function myComponent({ users }) {
    return html`
        <host>
            <ul>
                <li>Users:</li>
                ${list.map((user) => html`<li>User ${user.name}</li>`)}
            </ul>
        </host>
    `;
}
```

</doc-tabs>

### Lists with key

The use of the `key` property enables the use of reference maps to optimize the removal, recovery and reordering of nodes.

<doc-tabs auto-height tabs="JSX, Template String">

```jsx
function myComponent({ users }) {
    return (
        <host>
            <ul>
                <li key="header">Users:</li>
                {list.map((user) => (
                    <li key={user.id}>User {user.name}</li>
                ))}
            </ul>
        </host>
    );
}
```

```js
function myComponent({ users }) {
    return html`
        <host>
            <ul>
                <li key="header">Users:</li>
                ${list.map(
                    (user) => html`<li key=${user.id}>User ${user.name}</li>`
                )}
            </ul>
        </host>
    `;
}
```

</doc-tabs>
<br>
<doc-details summary="Reglas de listas con key">

1. All nodes in the list must declare the key property.
2. Every value of the key property must be different between the nodes in the list.
3. The value for the key property must be other than null || undefined.

</doc-details>

## Event handling

The events are defined without forcing the changes from uppercase to lowercase, so `onClick! = Onclick`, to associate an event to the DOM, 2 conditions must be met:

1. The event must start with the prefix `on`.
2. The value of the event must be of type function.

<doc-tabs tabs="JSX, Template String">

```jsx
function myComponent() {
    const handler = () => console.log("click!");
    return <host onclick={handler} />;
}
```

```js
function myComponent() {
    const handler = () => console.log("click!");
    return html`<host onclick=${handler} />`;
}
```

</doc-tabs>

## Properties and Attributes.

Atomico checks in the following order `Property || Attribute`, the behavior of this varies in:

1. **Property**: It is associated when the node has the use of this in its instance, example the `input.value`.
2. **Attribute**: It is associated when the property or method is not fulfilled, if the attribute is of the object type it will be transformed by `JSON.stringify`.
