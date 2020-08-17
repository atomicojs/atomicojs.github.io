---
$ref: doc.yaml
title: Hola, soy Atomico
linkTitle: Bienvenido
description: Atomico es micro-librería para la creación de webcomponents solo usando funciones y hooks
order: 0
lang: es
tag: introduction
link: doc/es
symlink: doc-es
menu:
    - query: webcomponent
      title: Component
    - query: hooks
      title: Hooks
    - query: guides
      title: Guías
query:
    webcomponent:
        where:
            tag: webcomponent
            lang: es
        sort: order
        order: 1
    hooks:
        where:
            tag: hooks
            lang: es
        sort: order
        order: 1
    guides:
        where:
            tag: guides
            lang: es
        sort: order
        order: 1
assets:
    logo: ./assets/logo.svg
    logoLight: ./assets/logo-white.svg
links:
    hooks:
        link: ./doc/hooks/hooks-es.md
    props:
        link: ./doc/webcomponent/properties-es.md
    langs:
        $ref: doc.yaml~langs
    next:
        link: ./doc/webcomponent/quick-start-es.md
labels:
    direction:
        prev: Anterior
        next: Siguiente
    menuContent: Contenidos
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
 
Atómico es una micro-librería de sintaxis moderna, creada por Matias Trujillo alias [@uppercod](https://github.com/uppercod), Atomico simplifica la creación de webcomponents reemplazando el uso de clases por funciones para sostener lógica, atributos, propiedades, métodos y eventos.
 
## Ventajas de Atomico
 
### Tamaño pequeño
 
Los {{page.fetch.bundlephobia.gzip|divided_by:1000|round:1}} KB de Atomico se conforman de Virtual DOM, 9 tipos Hooks y soporte extendido a WebComponents.
 
<doc-bundlephobia packages="{{page.packagesDiff|json|escape}}"></doc-bundlephobia>
 
### Virtual DOM peculiar
 
El virtual DOM de Atomico se diseñó para ser eficiente y declarativo, gracias al uso del tag especial `host`. Toda declaración sobre el tag host se define sobre la instancia del webcomponent, permitiendo asociar eventos, propiedades y atributos, ejemplo:
 
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
 
### Props(Propiedades) como declaración estructuradas
 
Las `props`(propiedades) como [declaración estructuradas]({{page.links.props.link}}) permiten la configuración avanzada para la generación de APIS a base de webcomponents, como:
 
1. Despachar un evento al modificar el valor de la prop.
2. Reflejar el valor de la prop como atributo.
3. Forzar tipos: Si declara una prop con tipo `Number`, el componente siempre recibirá un valor tipo `number`, incluso si este proviene de un atributo string.
4. Declarar estados iniciales para propiedades y atributos.
 
### Hooks para componer y abstraer lógica
 
Los [Hooks]({{page.links.hooks.link}}) son una solución práctica creada por el equipo de React para la abstracción y composición de lógica, con los hooks  podrás:
 
1. Abstraer el estado y asociarlo al componente a demanda, mantenido un comportamiento predecible, ya que este no depende de los argumentos internos del componente, solo de la invocación del hook. Ver [useProp]({{page.links.hooks.link}}#useprop) y [useState]({{page.links.hooks.link}}#usestate)
2. Crear y eliminar efectos según el ciclo de actualizaciones observado. Ver [useEffect]({{page.links.hooks.link}}#useeffect)
3. Crear referencias anónimas limitadas al scope de la función hook. Ver [useRef]({{page.links.hooks.link}}#useref)
4. Memorizar retornos o callback para minimizar el costo por ejecución. Ver [useMemo]({{page.links.hooks.link}}#usememo) y [useCallback]({{page.links.hooks.link}}#usecallback)
