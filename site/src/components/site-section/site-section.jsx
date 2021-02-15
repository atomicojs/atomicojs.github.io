import { c } from "atomico";
import style from "./site-section.css";

function section({ number }) {
  return (
    <host shadowDom>
      <link rel="stylesheet" href={style.href} />
      <section class="section">
        <div class="section_content section_content-1x2">
          <span class="section_content_big-number">
            <span>{number}</span>
          </span>
          <div class="section_content_item">
            <slot></slot>
          </div>
          <div class="section_content_item">
            <slot name="example"></slot>
          </div>
        </div>
      </section>
    </host>
  );
}

section.props = {
  number: { type: Number, value: 0 },
};

customElements.define("site-section", c(section));
