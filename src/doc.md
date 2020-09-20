---
title: Welcome to Atomico
linkTitle: Welcome!
link: /
category: fundamentals
---

<doc-tabs auto-height tabs="Sintaxis, 🚀 Instalación">
 
```jsx
import { h, c } from "atomico";
 
function myComponent({ message }) {
    return (
        <host>
            <strong>Hello {message}</strong>
        </host>
    );
}
 
myComponent.props = { message: { type: String, value: "World" } };
 
customElements.define("my-component", c(myComponent));
```
 
```bash
## For custom environments
npm install atomico
 
## Atomico project generator
npm init @atomico
```
 
</doc-tabs>

## What is Atomico?

Atomico is a modern syntax micro-library, created by Matias Trujillo alias [@uppercod](https://github.com/uppercod), Atomico simplifies the creation of webcomponents by replacing the use of classes with functions to support logic, attributes, properties, methods and events.

A webcomponent with Atomico is just a single function representing **User Interface** and **Logic**, example:

<doc-tabs tabs="Js, Jsx, Ts, Tsx">

```js
import { c } from "atomico";
import html from "atomico/html";

function myComponent() {
    return html`<host>Welcome to Atomico!</host>`;
}

const MyComponent = c(myComponent);
customElements.define("my-component", MyComponent);
```

```jsx
import { h, c } from "atomico";

function myComponent() {
    return <host>Welcome to Atomico!</host>;
}

const MyComponent = c(myComponent);
customElements.define("my-component", MyComponent);
```

```ts
import { c } from "atomico";
import html from "atomico/html";

function myComponent() {
    return html`<host>Welcome to Atomico!</host>`;
}

const MyComponent = c(myComponent);
customElements.define("my-component", MyComponent);
```

```tsx
import { h, c } from "atomico";

function myComponent() {
    return <host>Welcome to Atomico!</host>;
}

const MyComponent = c(myComponent);
customElements.define("my-component", MyComponent);
```

</doc-tabs>

## User interface

The user interface is represented by the virtual-dom, Atomico's virtual-dom has unique behaviors such as:

1. Tag `host`, to represent the DOM state of the Webcomponent.
2. Association of the shadowDom using the `shadowDom` property, example:`<host shadowDom> </host>`.
3. Support for the `is` property, to declare webcomponents without the need for the tag.
4. Support for keyes for optimized lists.
5. Association of customized events.
6. Support for real nodes.

## Logic

The logic of a webcomponent with Atomico can be represented by Props(Properties) and Hooks:

<doc-row col="1fr 1fr, 1fr 620w">

<div>

### Props(Propiedaes)

Las Props define en el webcomponent propiedades y atributos reactivos del webcomponent.

</div>

<div>

### Hooks

Hooks allow you to encapsulate logic without knowing the context of the webcomponent to associate reactive states and effects.

</div>

</doc-row>
