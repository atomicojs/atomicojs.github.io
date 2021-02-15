import { c, useEffect, useProp } from "atomico";
import style from "./site-rank.css";

function rank({ pkgs }) {
  const [data, setData] = useProp("data");

  useEffect(() => {
    let cancel;
    Promise.all(
      pkgs
        .split(/ *, */)
        .map((name) =>
          fetch(
            `https://bundlephobia.com/api/size?package=${name}&record=true`
          ).then((res) => res.json())
        )
    ).then((pkgs) => setData(pkgs));
    return () => (cancel = true);
  }, [pkgs]);

  const sizes = data.map(({ gzip }) => gzip);
  const max = Math.max(...sizes);

  return (
    <host shadowDom>
      <link rel="stylesheet" href={style.href} />
      <div class="rank">
        {data
          .sort((a, b) => (a.gzip > b.gzip ? 1 : -1))
          .map(({ gzip, name }) => (
            <div
              class={`rank_item rank_item-${
                gzip > max * 0.75
                  ? "danger"
                  : gzip > max * 0.5
                  ? "warning"
                  : "success"
              }`}
              style={`width:${(gzip / max) * 100}%`}
            >
              <span>{name}</span>
              <div class="rank_size">
                <span>{Math.abs(gzip / 1000).toFixed(1)}</span>
                <span>kB</span>
              </div>
            </div>
          ))}
      </div>
    </host>
  );
}

rank.props = {
  pkgs: String,
  data: {
    type: Array,
    value: () => [],
  },
};

customElements.define("site-rank", c(rank));
