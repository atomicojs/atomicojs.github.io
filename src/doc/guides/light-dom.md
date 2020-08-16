---
title: Light DOM
description: Webcomponents without Shadow DOM
order: 2
linkTitle: Light DOM
link: "doc/light-dom"
tag: guides
lang: en
links:
    prev:
        link: shadow-dom.md
---

Atomico provides exceptional support for creating webcomponents without the need to use Shadow DOM, solving the use of [Global CSS](#global-css) and [Slot](#slots).

## Global CSS

A recurring feature of CSS, CMS or Templates libraries that manifest global classes whose inheritance is required to preserve the aesthetics of the UI.

<doc-tabs tabs="Componente, HTML">

```js
import { h, c } from "atomico";

function myComponent({ type = "primary" }) {
    return <host class={"alert alert-" + type} role="alert" />;
}

myComponent.props = { type: String };

customElements.define("ui-alert", c(myComponent));
```

```html
<ui-alert>A simple primary alert—check it out!</ui-alert>

<ui-alert type="secondary">A simple secondary alert—check it out!</ui-alert>

<ui-alert type="success">A simple success alert—check it out!</ui-alert>

<ui-alert type="danger">A simple danger alert—check it out!</ui-alert>
```

</doc-tabs>

Si `alert alert-*` fuera una clase de su sistema de CSS global, el componente reflejara el estilo de className en su UI sin inconvenientes. **Este formato de webcomponents sin Shadow DOM es usado por las AMP PAGES**

## Slots

This technique allows to homologate the slots in Light DOM, recovering the instantiated nodes to be used as part of the Virtual DOM.

This is easily exemplified with a customHook that shows how to get these nodes to be manipulated from the component.

```jsx
import { h, c, useHost } from "atomico";

function useSlot(selector) {
    const { current } = useHost();
    return current.querySelector(`:scope > [slot="${selector}"]`);
}

function myComponent() {
    const Title = useSlot("title");
    return (
        <host>
            ...before!
            <Title
                style="color:red"
                onclick={() => console.log("click!")}
            ></Title>
            ...after!
        </host>
    );
}
```

In this example we highlight the use of the special Atomico hook `useHost` this gets a reference as an instance of the tag.
