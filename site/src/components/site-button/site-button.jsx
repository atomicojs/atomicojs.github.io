import { c, useRef } from "atomico";
import { useResizeObserver } from "../../hooks/use-resize-observer.js";
import style from "./site-button.css";

function button({ type, href }) {
  const ref = useRef();
  useResizeObserver(ref, (size) => (ref.current.style.width = size.h + "px"));
  const Type = type == "link" ? "a" : "button";
  return (
    <host shadowDom>
      <link rel="stylesheet" href={style.href} />
      <Type class="button" href={href}>
        <slot class="button_icon" name="icon" ref={ref}></slot>
        <span class="button_content">
          <slot></slot>
        </span>
      </Type>
    </host>
  );
}

button.props = {
  href: String,
  type: {
    type: String,
    value: "link",
  },
};

customElements.define("site-button", c(button));
