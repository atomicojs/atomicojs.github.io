---
title: Hooks
description: Logica como componente
linkTitle: Hooks
category: hooks
links:
    prev:
        link: ../webcomponent/properties-es.md
    next:
        link: ../guides/shadow-dom-es.md
---

## Introducción

Los hooks son una solución práctica creada por el equipo de React para la abstracción y composición de lógica, con los hooks tu podrá:

1. Abstraer el estado y asociarlo al componente a demanda, mantenido un comportamiento predecible, ya que este no depende de los argumentos internos del componente, solo de la invocación del hook, ver [useProp](#useprop) y [useState](#usestate).
2. Crear y eliminar efectos según el ciclo de actualizaciones observado, ver [useEffect](#useeffect).
3. Crear referencias anónimas, limitadas al scope de la función hook, ver [useRef](#useref)
4. Memorizar retornos o callback, para minimizar el costo por ejecución de procesos, ver [useMemo](#usememo) y [useCallback](#usecallback).

## Hooks de Atomico

### useProp

Hook que permite reflejar los cambios de estado sobre una propiedad desde el interior del wecomponent.

<doc-tabs tabs="JS, TS">

```js
const [value, setValue] = useProp(propName);
```

```ts
const [value, setValue] = useProp<type>(propName:string);
```

</doc-tabs>

Donde :

1. `const [value, setValue]`: Retorno de `useProp`, los argumentos permiten la lectura y actualización del estado asociad a la propiedad `propName` del webcomponent.
2. `propName` : String que define la propiedad a usar por `useProp` del webcomponent.

#### Ejemplo

<doc-tabs tabs="JSX, TS">

```jsx
function myComponent() {
    const [count, setCount] = useProp("count");
    return (
        <host>
            <button onclick={() => setCount(count + 1)}>+</button>
            <span>{count}</span>
        </host>
    );
}

MyComponent.props = { count: { type: Number, value: 0 } };
```

```ts
function myComponent() {
    const [count, setCount] = useProp<number>("count");
    return html`
        <host>
            <button onclick=${() => setCount(count + 1)}>+</button>
            <span>${count}</span>
        </host>
    `;
}

MyComponent.props = { count: { type: Number, value: 0 } };
```

</doc-tabs>

### useEvent

Hook que permite emitir un evento desde el webcomponent.

<doc-tabs auto-height tabs="JS, TS">

```js
const dispatchEvent = useEvent(myEvent, optionalEventInit);
```

```ts
const dispatchEvent = useEvent(myEvent:string, optionalEventInit?:CustomEventInit);

// Associate the argument for dispatchEvent according to typeDetail
const dispatchEvent = useEvent<typeDetail>(myEvent:string, optionalEventInit?:CustomEventInit);
```

</doc-tabs>

Donde :

1. `dispatchEvent` : Función que despacha el evento definido por `myEvent`.
2. `myEvent` : String que define el evento a despachar por `useEvent`
3. `optionalEventInit` : Configuración del evento a despachar, `{bubbles?: boolean, cancelable?: boolean, composed?: boolean, detail?: any}`. https://developer.mozilla.org/en-US/docs/Web/API/Event/Event

### useHost

Hook que crea una referencia en la que current es la instancia del webcomponent.

```js
const refHost = useHost();
```

**useHost es util para añadir funcionalidades asociadas a la instancia del componente, como soporte a CSSStyleSheet**

## Hooks de React

### useState

Hook que permite crear un estado sobre el webcomponent.

<doc-tabs tabs="JS,TS">

```js
const [state, setState] = useState(optionalInitialState);
```

```ts
const [state, setState] = useState<typeState>(optionalInitialState);
```

</doc-tabs>

Donde:

1. `const [state,setState]` : Retorno de `useState`, los argumentos permiten lectura y actualización del estado asociado a la instancia del hook.
    - `state` : Estado actual.
    - `setState`: Actualizador de estado
2. `useState( optionalInitialState )`: Función hook que asocia el estado al webcomponent:
    - `optionalInitialState`: Parámetro opcional que define el estado inicia asociado a la instancia del hook, **Si `optionalInitialState` es una función se ejecutara para así obtener el estado inicial solo al momento de instancia el hook por primera vez**

#### Ejemplo

```jsx
function MyComponent() {
    const [count, setCount] = useState(0);
    return <host onclick={() => setCount(count + 1)}> {count} </host>;
}
```

### useEffect

Hook que permite asociar efectos al webcomponent.

<doc-tabs auto-height tabs="JS, TS">

```js
useEffect(effectCallback, optionalArgumentList);
```

```ts
// Args, allows you to declare the types for the second parameter of useEffect
useEffect<Args>(effectCallback, optionalArgumentList);
```

</doc-tabs>

Donde :

1. `effectCallback` : Función que se ejecuta una o mas veces a `effectCallback` según los argumentos del Array `optionalArgumentList`, `effectCallback` puede retornar una función que será ejecutada solo si `effectCallback` es nuevamente ejecutado o el wecomponents es desmontado.
2. `optionalArgumentList`: Array de argumentos a observar por `useEffect`, si uno de estos argumentos cambia entre renderizaciones `effectCallback` será ejecutado nuevamente. Si `optionalArgumentList` se define como una array vacío(`[]`), useEffect solo ejecutara `effectCallback` al crear el webcomponent .

#### Ejemplo

```js
function listenerClickWindow() {
    function handlerClick() {
        console.log("Click window!");
    }

    window.addEventListener("click", handlerClick);

    return function unlistenerClickWindow() {
        window.removeEventListener("click", handlerClick);
    };
}
useEffect(listenerClickWindow, []);
```

### useMemo

Hook que permite memorizar el retorno de un callback.

<doc-tabs auto-height tabs="JS, TS">

```js
const memoValue = useMemo(callback, optionalArgumentList);
```

```ts
// Args, allows you to declare the types for the second parameter of useMemo
const memoValue = useMemo<TypeMemoValue, Args>(callback, optionalArgumentList);
```

</doc-tabs>

Donde :

1. `memoValue` : Retorno memorizado por useMemo
2. `callback`: Función que se ejecuta una o mas veces según `optionalArgumentList`.
3. `optionalArgumentList`: Array de argumentos a observar por `useEffect`, si uno de estos argumentos cambia entre renderizaciones `useEffect` ejecutara nuevamente el `callback`, memorizando un nuevo retorno.

### useCallback

Hook que permite memorizar un callback para que este conserve su scope.

<doc-tabs auto-height tabs="JS, TS">

```js
const memoCallback = useCallack(callback, optionalArgumentList);
```

```ts
// Args, allows you to declare the types for the second parameter of useCallack
const memoCallback = useCallackuseMemo<TypeMemoCallback, Args>(
    callback,
    optionalArgumentList
);
```

</doc-tabs>

Donde:

1. `memoCallback` : Retorno memorizado por useCallback

### useRef

Hook que crea un objeto como referencia.

```js
const ref = useRef(currentOptional);
```

Donde :

1. `ref` : Objeto de retorno de useRef, este permite conservar referencias entre render.
2. `currentOptional`: Define la propeidad `current` dentro del ojeto `ref`.

### useReduce
