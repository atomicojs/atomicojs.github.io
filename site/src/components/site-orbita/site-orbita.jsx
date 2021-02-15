import { c } from "atomico";
import { css, useStyleSheet } from "atomico/css";

function orbita({ number, radius, border }) {
  const space = 100 / number;
  const sizes = [...Array(number)].map((_, index) => space * (index + 1));

  useStyleSheet(style);
  return (
    <host shadowDom>
      <style>{`:host{--b:${border / 16}rem;--r:${radius}}`}</style>
      <div class="box">
        <svg viewBox="0 0 100 100" width="100%">
          <rect width="100" height="100" stroke="none" />
        </svg>
        {sizes.map((size) => (
          <div
            class="item"
            style={`--s:${size}%;--o:${100 - (size - 10)}%`}
          ></div>
        ))}
      </div>
    </host>
  );
}

orbita.props = {
  number: {
    type: Number,
    value: 5,
  },
  radius: {
    type: String,
    value: "100%",
  },
  border: {
    type: Number,
    value: 2,
  },
};

const style = css`
  .box {
    width: 100%;
    position: relative;
  }
  .item {
    width: var(--s);
    height: var(--s);
    --c: calc((100% - var(--s)) / 2);
    left: var(--c);
    top: var(--c);
    border: var(--b) solid white;
    position: absolute;
    border-radius: var(--r);
    opacity: var(--o);
  }
  svg {
    opacity: 0;
  }
`;

customElements.define("site-orbita", c(orbita));
