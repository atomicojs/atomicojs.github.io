---
title: WebComponents con Atomico
linkTitle: Introducción
description: |
    Solo 2.9KB para crear webcomponents 
    con un enfoque unico, simple y funcional
order: 0
category: fundamentals
related:
    next:
        $link: ./doc/fundamentals/user-interface.es.md
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
## Para entornos personalizados
npm install atomico
 
## Generador de proyectos de Atomico
npm init @atomico
```
 
</doc-tabs>

## ¿Que es Atomico?

Atomico es una micro-librería de sintaxis moderna, creada por Matias Trujillo alias [@uppercod](https://github.com/uppercod), Atomico simplifica la creación de webcomponents reemplazando el uso de clases por funciones para sostener lógica, atributos, propiedades, métodos y eventos.

Un webcomponent con Atomico es solo una única función que representa **Interfaz de usuario** y **Lógica**, ejemplo:

<doc-tabs tabs="Js, Jsx, Ts, Tsx">

```js
import { c } from "atomico";
import html from "atomico/html";

function myComponent() {
    return html`<host>Bienvenido a Atomico!</host>`;
}

const MyComponent = c(myComponent);
customElements.define("my-component", MyComponent);
```

```jsx
import { h, c } from "atomico";

function myComponent() {
    return <host>Bienvenido a Atomico!</host>;
}

const MyComponent = c(myComponent);
customElements.define("my-component", MyComponent);
```

```ts
import { c } from "atomico";
import html from "atomico/html";

function myComponent() {
    return html`<host>Bienvenido a Atomico!</host>`;
}

const MyComponent = c(myComponent);
customElements.define("my-component", MyComponent);
```

```tsx
import { h, c } from "atomico";

function myComponent() {
    return <host>Bienvenido a Atomico!</host>;
}

const MyComponent = c(myComponent);
customElements.define("my-component", MyComponent);
```

</doc-tabs>

## Interfaz de usuario

La interfaz de usuario se representa mediante el virtual-dom, el virtual-dom de Atomico posee comportamientos únicos, como:

1. Tag `host`, para representar el estado DOM del Webcomponent.
2. Asociación del shadowDom mediante la propiedad `shadowDom`, ejemplo: `<host shadowDom></host>`.
3. Soporte a la propiedad `is`, para declarar webcomponents sin necesidad del tag.
4. Soporte a keyes para listas optimizadas.
5. Asociación de eventos customizados.
6. Soporte a nodos reales.

## Logica

La lógica de un webcomponent con Atomico pude ser representada mediante Props(Propiedades) y Hooks:

<doc-row col="1fr 1fr, 1fr 620w">

<div>

### Props(Propiedaes)

Las Props define en el webcomponent propiedades y atributos reactivos del webcomponent.

</div>

<div>

### Hooks

Los hooks permiten encapsular lógica sin conocer el contexto del webcomponent para asociar estados y efectos reactivos.

</div>

</doc-row>
