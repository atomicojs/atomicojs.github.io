---
title: Hooks
description: Logic as a component
linkTitle: "Introduccion"
tag: hooks
link: "doc/hooks"
lang: en
links:
    prev:
        link: ../webcomponent/properties.md
    next:
        link: ../guides/shadow-dom.md
---

## Introducción

Hooks are a practical solution created by the React team for the attraction and composition of logic, with hooks you can:

1. Attract the state and associate it with the component on demand, maintaining a predictable behavior, since it does not depend on the internal arguments of the component, only on the invocation of the hook, see [useState](#usestate).
2. Create and remove effects according to the observed update cycle, see [useEffect](#useeffect).
3. Create anonymous references, limited to the scope of the hook function, see [useRef](#useref).
4. Memorize returns or callback, to minimize the cost per process execution, see [useMemo](#useMemo) and [useCallback](#usecallback).

## Atomico Hooks

### useProp

Hook that allows to reflect the changes of state on a property from inside the webcomponent.

<doc-tabs tabs="JS, TS">

```js
const [value, setValue] = useProp(propName);
```

```ts
const [value, setValue] = useProp<type>(propName:string);
```

</doc-tabs>

Where:

1. `const [value, setValue]`: Return of `useProp`, the arguments allow reading and updating of the state associated with the `propName` property of the webcomponent.
2. `propName` : String defining the property to use by the `useProp` of the webcomponent.

#### Example

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

Hook that allows to emit an event from the webcomponent.

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

Where:

1. `dispatchEvent` : `Function` that dispatches the event defined by `myEvent`.
2. `myEvent` : `String` defining the event to dispatch by `useEvent`
3. `optionalEventInit` :Optional configuration of the event to dispatch, `{bubbles?: boolean, cancelable?: boolean, composed?: boolean, detail?: any}`. https://developer.mozilla.org/en-US/docs/Web/API/Event/Event

### useHost

Hook that creates a reference where current is the instance of the webcomponent.

```js
const refHost = useHost();
```

**useHost is useful for adding functionalities associated with the component instance, such as CSSStyleSheet support**

## React Hooks

### useState

Hook that allows creating a state on the webcomponent.

<doc-tabs tabs="JS,TS">

```js
const [state, setState] = useState(optionalInitialState);
```

```ts
const [state, setState] = useState<typeState>(optionalInitialState);
```

</doc-tabs>

Where:

1. `const [state,setState]` : Return of `useState`, the arguments allow reading and updating of the state associated with the hook instance.
    - `state` : Current state.
    - `setState`: state update function.
2. `useState( optionalInitialState )`: Hook function that associates the state with the webcomponent:
    - `optionalInitialState`: Optional parameter that defines the start state associated with the hook instance, **If `optionalInitialState` is a function it will be executed to obtain the initial state only at the moment of the hook instance for the first time**

#### Example

```jsx
function MyComponent() {
    const [count, setCount] = useState(0);
    return <host onclick={() => setCount(count + 1)}> {count} </host>;
}
```

### useEffect

Hook that allows associating effects to the webcomponent.

<doc-tabs auto-height tabs="JS, TS">

```js
useEffect(effectCallback, optionalArgumentList);
```

```ts
// Args, allows you to declare the types for the second parameter of useEffect
useEffect<Args>(effectCallback, optionalArgumentList);
```

</doc-tabs>

Where:

1. `effectCallback`: Function that executes one or more times to `effectCallback` according to the arguments of the`optionalArgumentList` Array, `effectCallback` can return a function that will be executed only if`effectCallback` is re-executed or the wecomponents are dismounted.
2. `optionalArgumentList`: Array of arguments to watch for `useEffect`, if one of these arguments switches between renders,`effectCallback` will be executed again. If `optionalArgumentList` is defined as an empty array (`[]`), useEffect will only run`effectCallback` when creating the webcomponent.

#### Example

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

Hook that allows memorizing the return of a callback.

<doc-tabs auto-height tabs="JS, TS">

```js
const memoValue = useMemo(callback, optionalArgumentList);
```

```ts
// Args, allows you to declare the types for the second parameter of useMemo
const memoValue = useMemo<TypeMemoValue, Args>(callback, optionalArgumentList);
```

</doc-tabs>

Where:

1. `memoValue` : Return memorized by useMemo.
2. `callback`: Function that runs one or more times according to `optionalArgumentList`.
3. `optionalArgumentList`: Array of arguments to be observed by `useMemo`, if one of these arguments changes between`useMemo` renders it will execute the `callback` again, memorizing a new return.

### useCallback

Hook that allows memorizing a callback so that it conserves its scope.

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

Where:

1. `memoCallback`: Return memorized by useCallback

### useRef

Hook that creates an object for reference.

```js
const ref = useRef(currentOptional);
```

Where:

1. `ref` : Return object of useRef, this allows to preserve differences between render.
2. `currentOptional`: Defines the `current` property within the`ref` object.
