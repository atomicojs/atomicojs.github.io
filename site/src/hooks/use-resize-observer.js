import { useEffect, useState } from "atomico";

const LISTENER_ID = Symbol();
const ENTRIES_ID = Symbol();
const OBSERVER_ID = Symbol();

export function useResizeObserverState(ref) {
  const [state, setState] = useState();
  useResizeObserver(ref, setState);
  return state;
}
/**
 *
 * @param {import("atomico").Ref} ref
 * @param {(rect:Rect)=>void} observer
 */
export function useResizeObserver(ref, observer) {
  ref[OBSERVER_ID] = observer;

  useEffect(() => {
    const { current } = ref;

    if (!current[LISTENER_ID]) current[LISTENER_ID] = [];
    /**
     *
     * @param {Rect} rect
     */
    const handler = (rect) => ref[OBSERVER_ID](rect);

    current[LISTENER_ID].push(handler);

    resizeObserver.observe(current);

    if (current[ENTRIES_ID]) handler(current[ENTRIES_ID]);

    return () => {
      current[LISTENER_ID].splice(
        current[LISTENER_ID].indexOf(setState) >>> 0,
        1
      );
    };
  }, [ref]);

  return ref;
}

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry in entries) {
    const { contentRect, target } = entries[entry];
    const clientRect = contentRect.toJSON();
    clientRect.h = clientRect.top + clientRect.bottom;
    clientRect.w = clientRect.left + clientRect.right;
    clientRect.r = clientRect.h / clientRect.w;
    target[LISTENER_ID].forEach((listener) => listener(clientRect));
    target[ENTRIES_ID] = clientRect;
  }
});

/**
 * @typedef {Object} Rect
 * @property {number} h
 * @property {number} w
 * @property {number} r
 */
