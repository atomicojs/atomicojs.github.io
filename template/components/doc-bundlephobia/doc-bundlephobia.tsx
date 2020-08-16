import { h, Props, c, useEffect, useState } from "atomico";
import style from "./doc-bundlephobia.css";

const cache = {};

const request = (url) =>
    (cache[url] = cache[url] || fetch(url).then((res) => res.json()));

const mergePackage = ([pkg, ...packages]) =>
    packages.reduce((pkg, { gzip, size }) => {
        pkg.gzip += gzip;
        pkg.size += size;
        return pkg;
    }, pkg);

function useBundlephobia(packages: string[]): [string, any][] {
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
}: Props<typeof docBundlephobia.props>) {
    const data = useBundlephobia(packages);
    const max = Math.max(...data.map(([, { gzip }]) => gzip));
    const [color1, color2, color3, color4] = colors.split(";");
    return (
        <host shadowDom>
            <style>{style}</style>
            {data
                .sort(
                    ([, { gzip: gzipA }], [, { gzip: gzipB }]) =>
                        (gzipA > gzipB ? -1 : 1) * (reverse ? 1 : -1)
                )
                .map(([name, { gzip }]) => {
                    const percent = gzip / max;
                    return (
                        <div class="row">
                            <div>
                                {name}
                                <span class="tag">
                                    {(gzip / 1000).toFixed(1)}kb
                                </span>
                            </div>
                            <div class="col">
                                <div
                                    style={{
                                        width: percent * 100 + "%",
                                        background:
                                            percent > 0.75
                                                ? color4
                                                : percent > 0.5
                                                ? color3
                                                : percent > 0.25
                                                ? color2
                                                : color1,
                                    }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
        </host>
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
