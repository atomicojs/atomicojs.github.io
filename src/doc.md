---
$ref: doc.yaml
title: Welcome to Atomico
linkTitle: Welcome
description: Atomico is a micro-library for creating webcomponents using only functions and hooks
order: 0
lang: en
tag: introduction
link: doc
symlink: doc-en
menu:
    - query: webcomponent
      title: Component
    - query: hooks
      title: Hooks
    - query: guides
      title: Guides
query:
    webcomponent:
        where:
            tag: webcomponent
            lang: en
        sort: order
        order: 1
    hooks:
        where:
            tag: hooks
            lang: en
        sort: order
        order: 1
    guides:
        where:
            tag: guides
            lang: en
        sort: order
        order: 1
assets:
    logo: ./assets/logo.svg
    logoLight: ./assets/logo-white.svg
links:
    hooks:
        link: ./doc/hooks/hooks-es.md
    props:
        link: ./doc/webcomponent/properties.md
    langs:
        $ref: doc.yaml~langs
    next:
        link: ./doc/webcomponent/quick-start.md
labels:
    direction:
        prev: Prev
        next: Next
    menuContent: Contents
packagesDiff:
    - atomico
    - alpinejs
    - uce
    - preact
    - react+react-dom
    - vue
    - riot
    - slim-js
    - lit-element
fetch:
    bundlephobia: https://bundlephobia.com/api/size?package=atomico
---

[![CircleCI](https://circleci.com/gh/atomicojs/atomico.svg?style=svg)](https://circleci.com/gh/atomicojs/atomico)
[![npm](https://badgen.net/npm/v/atomico)](http://npmjs.com/atomico)
[![gzip](https://badgen.net/bundlephobia/minzip/atomico)](https://bundlephobia.com/result?p=atomico)

<doc-tabs auto-height tabs="Syntax, 🚀 Installation">

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

Atomico is a modern syntax micro-library created by Matias Trujillo alias [@uppercod](https://github.com/uppercod), Atomico simplifies the creation of webcomponents by replacing the use of classes with functions to hold logic, attributes, properties, methods and events.

## Advantages of Atomico

### Small size

The {{page.fetch.bundlephobia.gzip|divided_by:1000|round:1}} KB of Atomico is made up of Virtual DOM, 9 types of Hooks and extended support to WebComponents.

<doc-bundlephobia packages="{{page.packagesDiff|json|escape}}"></doc-bundlephobia>

### Expressive virtual DOM

The virtual DOM is efficient and declarative, thanks to the use of the special `host` tag. Every declaration on the host tag is defined on the webcomponent instance, allowing to associate events, properties and attributes, for example:

<doc-tabs auto-height tabs="Con Atomico, Sin Atomico">

```js
function myComponent() {
    const handler = () => console.log("click!");
    const method = () => console.log("method!");
    return (
        <host
            shadowDom
            onclick={handler}
            style={{ color: "tomato" }}
            method={method}
        >
            Inside Shadow DOM
        </host>
    );
}
```

```js
class MyComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.addEventListener("click", this.handler);
        this.style.color = "tomato";
    }
    connectedCallback() {
        this.shadowRoot.textContent = "Inside Shadow DOM";
    }
    method() {
        console.log("method!");
    }
    #handler() {
        console.log("click!");
    }
}
```

</doc-tabs>

### Props (Properties) as Structured Declaration

The properties as [Structured Declaration]({{page.links.props.link}}) allow advanced configuration for the generation of APIs based on webcomponents, such as:

1. Dispatch an event when modifying the value of the prop.
2. Reflect the value of the prop as an attribute.
3. Forcing types: if you declare a prop with type `Number`, the component will always receive a value of type`number`, even if it comes from a string attribute.
4. Declare initial states for properties and attributes.

### Hooks to compose and abstract logic

[Hooks]({{page.links.hooks.link}}) are a practical solution created by the React team for the abstraction and composition of logic, with hooks you can:

1. Attract the state and associate it with the component on demand, maintaining a predictable behavior, since it does not depend on the internal arguments of the component, only on the invocation of the hook. See [useState]({{page.links.hooks.link}}#usestate).
2. Create and remove effects according to the observed update cycle. See [useEffect]({{page.links.hooks.link}}#useeffect).
3. Create anonymous references limited to the scope of the hook function. See [useRef]({{page.links.hooks.link}}#useref).
4. Memorize returns or callbacks to minimize the cost per execution. See [useMemo]({{page.links.hooks.link}}#useMemo) and [useCallback]({{page.links.hooks.link}}#usecallback).
