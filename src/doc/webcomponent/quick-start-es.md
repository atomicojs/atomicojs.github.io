---
title: Atomico webcomponents
description: Diseñado  para simplificar la creación de webcomponents
order: 1
linkTitle: Introducción
link: "doc/es/inicio-rapido"
tag: webcomponent
lang: es
links:
    userInterface:
        link: user-interface-es.md
    properties:
        link: properties-es.md
    prev:
        link: ../../doc-es.md
    next:
        link: user-interface-es.md
---

Atomico se diseña para simplificar la creación de webcomponents, reemplazando las Clases por funciones expresivas y minimalistas.

**Ejemplo de webcomponent con atomico**

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

Donde:

-   **myCounter**: Representa la [interfaz de usuario]({{page.links.userInterface.link}}) y lógica del componente.
-   **myCounter.props**: Representa las [propiedades del componente]({{page.links.properties.link}}).

## Componente

Un componente con Atomico se divide en 2 partes: [Función](#función) y [Props(propiedades)](#propspropiedades).

### Función

Representa la [Interfaz de usuario]({{page.links.userInterface.link}}) y lógica del componente, de este uso de funciones como componente podemos destacar lo siguiente:

1. La UI se declara mediante Virtual Dom usando JSX o Template String.
2. Todo componente con Atomico debe retornar el tag `<host/>`.
3. El uso del shadowDom no es obligatorio. Si quiere hacer uso de este debe definir la propiedad shadowDom en el tag host, ejemplo: `<host shadowDom> 🌒 Inside ShadowDom! </host>`.
4. Los métodos se declaran en el tag `<host/>`, ejemplo: `<host myMethod={()=>{...}/>`.
5. La lógica se representa mediante Hooks.

### Props(Propiedades)

Las `props` representan las [propiedades del componente]({{page.links.properties.link}}), de las props podemos destacar lo siguiente:

1. Los tipos son estrictos.
2. Cada propiedad es un estado visible desde el tag, ejemplo: `document.querySelector("my-component").value`.
3. Las propiedades pueden ser [declaraciones simples]({{page.links.properties.link}}#declaraciones-simples) o [ declaraciones estructuradas]({{page.links.properties.link}}#declaraciones-estructuradas).
4. Atomico genera automáticamente el atributo, transformando el nombre de la `prop`(nombre de la propiedad) de camelCase a kebab-case, ejemplo:

    La propiedad `myCounter` será reconocida como el atributo `my-counter`. Este comportamiento puede modificarse con el uso de [ declaraciones estructuradas]({{page.links.properties.link}}#declaraciones-estructuradas).
