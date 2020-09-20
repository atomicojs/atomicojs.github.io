---
title: Virtual Dom
description: Diseñado para ser simple y expresivo con la UI
order: 2
linkTitle: Interfaz de usuario
category: fundamentals
related:
    prev:
        $link: properties.es.md
    next:
        $link: ../hooks/hooks.es.md
---

La UI del webcomponent se crea con Virtual DOM, este puede ser declarado mediante JSX o Template String, ejemplo:

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

**Es un requisito para el compilador de JSX configurar e importar siempre la funcion `h`**

<doc-details summary="Configuracion para el uso de JSX con Babel">

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

<doc-details summary="Configuracion para el uso de JSX con Typesript">

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

## Operadores logicos soportados

los operadores soportados para condicionar nodos o valores son:

1. **corto circuitos** : `value && <div/>`.
2. **Ternarios** : `value ? <div/> : <img/>`.

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

## Listas simples y listas con key

Las listas pueden ser simples o asociativas a una referencia declarada mediante la propiedad key, ejemplo:

### Listas simples

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

### Listas con key

El uso de la propiedad `key` habilitá el uso de mapas de referencia para optimiza la eliminacion, recuperación y reordenamiento de nodos.

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

1. Todos los nodos de la lista debera declarar la propiedad key.
2. Todo valor de la propiedad key debe ser distinta entre los nodos de la lista.
3. El valor para la propiedad key debe ser distinto a null || undefined.

</doc-details>

## Manejo de eventos

Los eventos son definidos sin forzar los cambios de mayúsculas a minúsculas por lo que `onClick != onclick`, para asociar un evento al Dom se deben cumplir 2 condiciones :

1. El evento debe comenzar con el prefijo `on`
2. El valor del evento debe ser del tipo función.

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

## Propiedades y Atributos

Atomico verifica en el siguiente orden `Propiedad || Atributo`, el comportamiento de este varia en:

1. **Propiedad**: Se asocia cuando el nodo posee el uso de esta en su instancia, ejemplo el `input.value`.
2. **Atributo**: Se asocia cuando no se cumple la propiedad o método, si del atributo es del tipo objeto será transformado mediante `JSON.stringify`.
