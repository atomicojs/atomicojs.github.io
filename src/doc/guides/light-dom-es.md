---
title: Light dom
description: Webcomponents libres del Shadow DOM
order: 2
linkTitle: Light DOM
link: "doc/es/light-dom"
tag: guides
lang: es
links:
    prev:
        link: shadow-dom-es.md
---

Atomico entrega un soporte excepcional para la creacion de webcomponents sin la necesidad de usar Shadow DOM, resolviendo el uso de [CSS Global](#css-global) y [Slot](#slot).

## CSS global

característica recurrente de bibliotecas de CSS, CMS o Templates que manifiestan clases globales de cuya herencia es requerida para conservar la estética de la UI.

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

## Slot

Esta técnica permite homologar los slot en Light DOM recuperando los nodos instanciado para ser usados como parte del Virtual DOM .

Esto se ejemplifica fácilmente con un customHook que enseña como obtener estos nodos para ser manipulados desde el componente.

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

Del ejemplo se destaca el uso del hook especial de Atomico `useHost` este obtiene una referencia como instancia del tag asociado al componente.
