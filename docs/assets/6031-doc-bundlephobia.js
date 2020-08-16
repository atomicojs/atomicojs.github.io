import { c, h } from './custom-element-6d69df93.js';
import { u as useState, a as useEffect } from './hooks-f87b56d6.js';

var style = ":host{font-size:1rem;font-family:monospace;}.row{position:relative;width:100%;}.row .btn-remove{opacity:0;}.row:hover .btn-remove{opacity:1;}.col{flex:0%;display:flex;align-items:center;}.col div{height:0.5em;border-radius:100px;}.tag{background:rgba(0, 0, 0, 0.15);font-size:0.8em;display:inline-block;padding:0px 0.25rem;line-height:1.5em;border-radius:100px;margin-left:0.5em;font-weight:bold;}";

const cache = {};

const request = (url) =>
    (cache[url] = cache[url] || fetch(url).then((res) => res.json()));

const mergePackage = ([pkg, ...packages]) =>
    packages.reduce((pkg, { gzip, size }) => {
        pkg.gzip += gzip;
        pkg.size += size;
        return pkg;
    }, pkg);

function useBundlephobia(packages) {
    const [state, setState] = useState([]);
    const api = "https://bundlephobia.com/api/size?package=";

    useEffect(() => {
        let prevent;
        Promise.all(
            packages.map((name) => {
                const pkgs = name.split(/ *\+ */);
                if (pkgs.length > 1) {
                    return Promise.all(
                        pkgs.map((name) => request(api + name))
                    ).then(mergePackage);
                } else {
                    return request(api + name);
                }
            })
        ).then((response) => {
            setState(response.map((data, index) => [packages[index], data]));
        });
        return () => (prevent = true);
    }, packages);

    return state;
}

function docBundlephobia({
    packages,
    reverse,
    colors,
}) {
    const data = useBundlephobia(packages);
    const max = Math.max(...data.map(([, { gzip }]) => gzip));
    const [color1, color2, color3, color4] = colors.split(";");
    return (
        h('host', { shadowDom: true,}
            , h('style', null, style)
            , data
                .sort(
                    ([, { gzip: gzipA }], [, { gzip: gzipB }]) =>
                        (gzipA > gzipB ? -1 : 1) * (reverse ? 1 : -1)
                )
                .map(([name, { gzip }]) => {
                    const percent = gzip / max;
                    return (
                        h('div', { class: "row",}
                            , h('div', null
                                , name
                                , h('span', { class: "tag",}
                                    , (gzip / 1000).toFixed(1), "kb"
                                )
                            )
                            , h('div', { class: "col",}
                                , h('div', {
                                    style: {
                                        width: percent * 100 + "%",
                                        background:
                                            percent > 0.75
                                                ? color4
                                                : percent > 0.5
                                                ? color3
                                                : percent > 0.25
                                                ? color2
                                                : color1,
                                    },}
                                )
                            )
                        )
                    );
                })
        )
    );
}

docBundlephobia.props = {
    reverse: Boolean,
    packages: {
        type: Array,
        value: () => [],
    },
    colors: {
        type: String,
        value: "#15d1e4;#15e4b4;orange;tomato",
    },
};

customElements.define("doc-bundlephobia", c(docBundlephobia));
