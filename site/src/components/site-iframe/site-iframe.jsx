import { c } from "atomico";
import { css, useStyleSheet } from "atomico/css";

const style = css`
  :host {
    position: relative;
    display: block;
  }
  iframe {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

function iframe({ src }) {
  useStyleSheet(style);
  return (
    <host shadowDom>
      <svg viewBox="0 0 1366 768">
        <rect width="1366" height="768"></rect>
      </svg>
      <iframe src={src} frameborder="0"></iframe>
    </host>
  );
}

iframe.props = {
  src: String,
};

customElements.define("site-iframe", c(iframe));
