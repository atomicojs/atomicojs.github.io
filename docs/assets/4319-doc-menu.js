import { c, u as useHost, h } from './custom-element-6d69df93.js';
import { u as useProp } from './use-prop-a1462c5f.js';
import { u as useState, a as useEffect, b as useRef } from './hooks-f87b56d6.js';

// Create a private index on the node,
// avoiding overloading the browser with multiple instances of ResizeObserver
const RESIZE_OBSERVER = Symbol("ResizeObserver");
// Caches the result of the object returned by getSize
const CACHE_SIZES = {};

/**
 * Subscribe to the reference to all size changes
 * @param {Ref} ref
 * @param {(entry:object)=>void} [proxyObserver] - Replace status update with a handler
 * @return {ResizeObserverEntry}
 */
function useResizeObserver(ref, proxyObserver) {
    let [state, setState] = useState();

    useEffect(() => {
        let { current } = ref;
        // Create or reuse the listener associated with the resizeObserver event
        if (!current[RESIZE_OBSERVER]) {
            let handlers = [];
            let prevent;
            //@ts-ignore
            let observer = new ResizeObserver(([entry]) => {
                observer.entry = entry;
                // Skip to next fps to ensure styles resize box before eventLoop
                if (prevent) return;
                prevent = true;
                requestAnimationFrame(() => {
                    handlers.forEach((handler) => handler(entry));
                    prevent = false;
                });
            });
            observer.handlers = handlers;

            observer.observe(current);

            current[RESIZE_OBSERVER] = observer;
        }

        let { handlers, entry } = current[RESIZE_OBSERVER];

        let handler = (entry) => (proxyObserver || setState)(entry);

        handlers.push(handler);

        if (entry) handler(entry);

        return () => {
            handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            if (!handlers.length) {
                current[RESIZE_OBSERVER].disconnect();
                delete current[RESIZE_OBSERVER];
            }
        };
    }, [ref]);

    return state;
}
/**
 * @param {Ref} ref
 * @param {()=>any} [proxyObserver]
 */
function useSize(ref, proxyObserver) {
    let getState = (resizeObserverEntry) => {
        if (resizeObserverEntry) {
            let {
                contentRect: { width, height },
            } = resizeObserverEntry;
            return [width, height];
        } else {
            return [];
        }
    };

    let nextProxyObserver = proxyObserver
        ? (resizeObserverEntry) => proxyObserver(getState(resizeObserverEntry))
        : null;

    let resizeObserverEntry = useResizeObserver(ref, nextProxyObserver);

    return !nextProxyObserver && getState(resizeObserverEntry);
}
/**
 *
 * @param {*} value
 * @param {Ref} ref
 * @returns {string|string[]}
 */
function useStateSize(value, ref) {
    let sizes = getSizes(value);
    let valueIsArray = sizes.w && sizes.h;
    let [state, setState] = useState(valueIsArray ? [] : null);

    useSize(ref, ([width, height]) =>
        setState((state) => {
            let getValue = ([cases, currentSize]) => {
                let media = cases.find(([, size]) => size >= currentSize);
                return media ? media[0] : sizes.default;
            };

            let w = [sizes.w, width];
            let h = [sizes.h, height];
            if (valueIsArray) {
                let nextState = [w, h].map(getValue);

                let newState = Array.isArray(state)
                    ? nextState.some((value, index) => state[index] !== value)
                    : true;
                if (newState) {
                    return nextState;
                }
            } else {
                if (sizes.w) {
                    return [w].map(getValue).find((value) => value);
                } else if (sizes.h) {
                    return [h].map(getValue).find((value) => value);
                } else {
                    return sizes.default;
                }
            }
            return state;
        })
    );
    return state;
}

function getSizes(value) {
    if (CACHE_SIZES[value]) return CACHE_SIZES[value];

    let sizes = {};

    value.split(/ *, */).forEach((value) => {
        let size = value.match(/(.+)\s+(\d+)(w|h)$/);
        if (size) {
            let [, value, number, type] = size;
            number = Number(number);
            sizes[type] = sizes[type] || [];
            sizes[type].push([value, number]);
        } else {
            sizes.default = value;
        }
    });

    let sort = ([, a], [, b]) => (a > b ? 1 : -1);

    for (let key in sizes) {
        if (Array.isArray(sizes[key])) sizes[key].sort(sort);
    }

    return (CACHE_SIZES[value] = sizes);
}

/**
 * @typedef {{borderBoxSize: Object, contentBoxSize: Object, contentRect: DOMRectReadOnly, target: Element}} ResizeObserverEntry
 */

/**
 * @typedef {{current?: Element}} Ref
 */

var style = ":host{width:100%;height:auto;display:block;}.header{padding:20px;box-sizing:border-box;display:flex;align-items:center;justify-content:center;}.header-large{justify-content:space-between;}.mask{height:auto;overflow:hidden;transition:0.3s ease all;}.mask_sub{max-height:75vh;overflow:auto;}.burger{width:2rem;height:1rem;padding:0px;border:none;background:transparent;}.burger div{width:100%;height:calc(100% / 5);background:currentColor;border-radius:100px;}.burger div:nth-child(2){margin:calc(100% / 7) 0px;}.hr{width:100%;height:1px;border:none;margin:0px;}.hr >div{width:50px;height:100%;}";

const DocMenu = ({
    bgColor,
    brRadio,
    brColor,
    hrSubColor,
    type,
}) => {
    const ref = useRef();
    const refHost = useHost();
    const size = useStateSize(type, refHost);
    const [show, setShow] = useProp("show");
    const [, height] = useSize(ref);
    const { current } = refHost;
    const nodeListLinks = [
        ...current.querySelectorAll(":scope > [slot^=links-]"),
    ];
    const withFooter = current.querySelector(":scope [slot=footer]");
    const hr = h('div', { class: "hr", style: { background: brColor },});
    const isLarge = size == "large";
    const toggle = () => setShow(!show);
    return (
        h('host', {
            'current-type': size,
            toggle: toggle,
            shadowDom: true,
            style: {
                visibility: "visible",
                background: bgColor,
                border: `1px solid ${brColor}`,
                borderRadius: brRadio,
            },}
        
            , h('style', null, style)
            , h('header', { class: "header" + (isLarge ? " header-large" : ""),}
                , h('slot', { name: "header",})
                , isLarge && (
                    h('button', { class: "burger", onclick: toggle,}
                        , h('div', null)
                        , h('div', null)
                        , h('div', null)
                    )
                )
            )
            , h('div', {
                class: "mask",
                style: isLarge ? { height: (show ? height : 0) + "px" } : {},}
            
                , h('div', { class: "mask_sub", ref: ref,}
                    , nodeListLinks.map((_, index) => [
                        hr,
                        h('div', { class: "links",}
                            , h('slot', { name: "links-" + (index + 1),})
                        ),
                    ])
                    , withFooter && (
                        h('div', null
                            , hr
                            , h('slot', { name: "footer",})
                        )
                    )
                )
            )
        )
    );
};

DocMenu.props = {
    bgColor: {
        type: String,
        value: "#FFF",
    },
    brColor: {
        type: String,
        value: "#EAEEED",
    },
    brRadio: {
        type: String,
        value: ".9rem",
    },
    hrSubColor: {
        type: String,
        value: "#000",
    },
    type: {
        type: String,
        value: "large",
    },
    show: {
        type: Boolean,
        reflect: true,
        value: false,
    },
};

customElements.define("doc-menu", c(DocMenu));
