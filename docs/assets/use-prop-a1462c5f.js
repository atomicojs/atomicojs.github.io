import { u as useHost } from './custom-element-6d69df93.js';

function useProp(name) {
    let ref = useHost();
    if (name in ref.current) {
        if (!ref[name]) {
            ref[name] = [null, (nextValue) => (ref.current[name] = nextValue)];
        }
        ref[name][0] = ref.current[name];
        return ref[name];
    }
}

export { useProp as u };
