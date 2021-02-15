import { c, useProp, useRef } from "atomico";
import { useGist } from "../../hooks/use-gist.js";
import base from "./theme/base.css";
import solaris from "./theme/solaris.css";

function code({ src }) {
  const refIframe = useRef();
  const [index, setIndex] = useProp("index");
  const files = useGist(src, refIframe);
  const select = !index && files[0] ? files[0][0] : index;
  return (
    <host shadowDom>
      <link key="base" rel="stylesheet" href={base.href} />
      <link key="theme" rel="stylesheet" href={solaris.href} />
      <div key="gist" class="gist">
        <header class="gist-header">
          {files.map(([fileName], i) => (
            <button
              class={
                "gist-header_button" +
                (fileName == select ? " gist-header_button-active" : "")
              }
              onclick={() => setIndex(fileName)}
            >
              {fileName}
            </button>
          ))}
        </header>
        <div class="gist-files">
          {files
            .filter(([fileName]) => fileName == select)
            .map(([, content]) => (
              <div class="gist-file">
                <pre innerHTML={content}></pre>
              </div>
            ))}
        </div>
      </div>
      <iframe
        key={src}
        ref={refIframe}
        sandbox="allow-same-origin allow-scripts"
        frameborder="0"
      ></iframe>
    </host>
  );
}

code.props = {
  src: String,
  index: String,
};

customElements.define("site-gist", c(code));
