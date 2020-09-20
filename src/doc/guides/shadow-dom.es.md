---
title: Shadow DOM
description: enpcasulamiento nativo para webcomponent.
order: 1
linkTitle: Shadow DOM
category: guides
links:
    next:
        link: light-dom-es.md
---

## Usar el Shadow DOM

Todo nodo que declare la propiedad `shadowDom` habilitara su uso, ejemplo:

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

## Encapsulación de estilo

El Shadow DOM genera un encapsulamiento que permite mantener efectos del CSS solo en el componente, ejemplo:

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

**Indiferente al uso del selector global `button` el efecto de estilo solo estará presente en el interior del componente**. Este comportamiento permite mantener UI sin conflicto con el estilos globales.

### :host

El pseudo-clase `:host` que apunta al contenedor que declare el uso del Shadow DOM, ejemplo:

```jsx
:host{
    display: block;
    background: black;
}
```

El contenedor que aplique el css anterior poseerá las declaraciones de host.

### Custom Properties

Las variables de CSS son la forma eficiente de mantener estilos con comportamientos dinámicos.

**Recomendaciones de nombre**:

`--<component>_<value>` : patron para variables locales estáticas, ej: `--myComponent_colorPrimary`, esta sintaxis minimiza a el conflicto de nombre que puede generarse con el uso de las customProperties.

`--<value>` : patron para variables locales dinámicas : `--color`.

**Ejemplo de alcances**

<doc-tabs auto-height tabs="Estático, Dinámico">

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

### Limitaciones

**importación de fuentes**

El Shadow DOM no soporta el uso de la regla `@font-face` sea por importación o declaración, Si bien existe CSSStyleSheet como propuesta para corregir esto aun no es adoptada por todos los navegadores que soportan WebComponent de forma nativa. **Para el uso de fuentes se deberá incluir en documento los recursos asociados a esta** permitiendo asi el uso del recurso tipográfico.

## Tag slot

El tag slot es un recurso nativo del Shadow DOM que permite reflejar el contenido del Light DOM del componente dentro del Shadow DOM, ejemplo:

<doc-tabs auto-height tabs="Html, Componente">

```html
<my-component>
    <h1>mi slot</h1>
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

El DOM del componente reflejara el tag `h1` en el interior del tag `slot`.

## características adicionales del Shadow DOM

<doc-details summary="::slotted">

### ::slotted

El pseudo-elementos `::slotted(<selector>)` permite modificar el estilo del html presente en el Light DOM asociado al slot. [ver más](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted)

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
