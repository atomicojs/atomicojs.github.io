---
title: Props(Propiedades)
description: Estados visibles del webcomponent como atributo o propiedad.
linkTitle: Props(Propiedades)
slug: propiedades-del-webcomponent
order: 2
category: fundamentals
related:
    prev:
        $link: ../../doc.es.md
    next:
        $link: user-interface.es.md
---

Atomico mejora la creación de atributos y propiedades, mediante el objeto `props` asociativo al componente funcional, ejemplo:

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

Las props se construyen mediante:

1. **nombre**: nombre de la propiedad a asociar al componente.
2. **valor**: define el tipo y comportamiento de la propiedad del componente.

## Tipos de declaraciones.

### Declaraciones simples

las declaraciones simples asocian el tipo del valor de la propiedad.

```js
myComponent.props = {
    myString: String,
};
```

### Declaraciones estructuradas

Declaraciones estructuradas definen el tipo más una serie de configuraciones opcionales para mejorar el comportamiento de la propiedad, ejemplo:

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

Donde:

-   **type**: [Tipo](#tipos) de valores aceptados por la propiedad.
-   **attr**: String, modificar el atributo generado por defecto.
-   **event**: Objeto, Configura la emisión de un evento cada vez que cambie el valor de la propiedad.
-   **reflect**: Boolean, Refleja el valor de la propiedad como Atributo.
-   **value**: Any, Define un estado inicial para la propiedad.

## Tipos

Atomico usa los [Objectos estandar](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) para reconocer los Tipos, el soporte de tipos se compone de:

| Tipos    | Soporte como atributo |
| -------- | --------------------: |
| Number   |                    Si |
| String   |                    Si |
| Boolean  |                    Si |
| Array    |                    Si |
| Object   |                    Si |
| Promise  |                     - |
| Function |                     - |
| Symbol   |                     - |
