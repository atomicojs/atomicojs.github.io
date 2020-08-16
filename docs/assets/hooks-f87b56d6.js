import { a as useHook, i as isEqualArray, H as HOOK_MOUNT, b as isFunction, d as useRender, e as HOOK_UPDATED, f as HOOK_MOUNTED, g as HOOK_UNMOUNT, j as HOOK_UPDATE } from './custom-element-6d69df93.js';

function useState(initialState) {
    let render = useRender();
    return useHook((state, type) => {
        if (HOOK_MOUNT == type) {
            state[0] = isFunction(initialState) ? initialState() : initialState;
            state[1] = (nextState) => {
                nextState = isFunction(nextState)
                    ? nextState(state[0])
                    : nextState;
                if (nextState != state[0]) {
                    state[0] = nextState;
                    render();
                }
            };
        }
        return state;
    }, []);
}
/**
 * @param {()=>void|(()=>void)} callback
 * @param {any[]} [args]
 */
function useEffect(callback, args) {
    // define whether the effect in the render cycle should be regenerated
    let executeEffect;
    useHook((state, type) => {
        if (executeEffect == null) {
            executeEffect =
                args && state[0] ? !isEqualArray(args, state[0]) : true;
            state[0] = args;
        }

        switch (type) {
            case HOOK_UPDATE:
            case HOOK_UNMOUNT:
                // save the current args, for comparison
                if ((executeEffect || type == HOOK_UNMOUNT) && state[1]) {
                    // compare the previous snapshot with the generated state
                    state[1]();
                    // clean the effect collector
                    state[1] = 0;
                }
                // delete the previous argument for a hook
                // run if the hook is inserted in a new node
                // Why? ... to perform again dom operations associated with the parent
                if (type == HOOK_UNMOUNT) {
                    state[0] = null;
                }
                break;
            case HOOK_MOUNTED:
            case HOOK_UPDATED:
                // save the current args, for comparison, repeats due to additional type HOOK_MOUNTED
                if (executeEffect || type == HOOK_MOUNTED) {
                    // save the effect collector
                    state[1] = callback();
                }
                // save the comparison argument
                break;
        }
        return state;
    }, []);
}

/**
 * @template T
 * @param {T} [current]
 * @returns {{current:T}}
 */
function useRef(current) {
    return useHook(0, { current });
}

/**
 * @template T
 * @param {()=>T} callback
 * @param {any[]} [args]
 * @returns {T}
 */
function useMemo(callback, args) {
    let state = useHook(0, []);

    if (!state[0] || (state[0] && (!args || !isEqualArray(state[0], args)))) {
        state[1] = callback();
    }
    state[0] = args;
    return state[1];
}

export { useEffect as a, useRef as b, useMemo as c, useState as u };
