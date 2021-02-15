import { useState, useEffect } from "atomico";
/**
 *
 * @param {string} src
 * @param {import("atomico").Ref<HTMLIFrameElement>} ref
 */
export function useGist(src, ref) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const { current } = ref;
    const { contentWindow, contentDocument } = current;

    src += src.endsWith(".js") ? "" : ".js";

    contentWindow.iframeLoad = () => {
      [
        ...contentDocument.querySelectorAll("link,script,img"),
        current,
      ].forEach((el) => el.remove());

      setFiles(
        [...contentDocument.documentElement.querySelectorAll(".gist-file")].map(
          (file) => {
            return [
              file.querySelector(".gist-meta a:nth-child(2)").textContent,
              file.querySelector("table.highlight").outerHTML,
            ];
          }
        )
      );
    };
    contentDocument.write(
      `<script onload="iframeLoad()" src="${src}"></script>`
    );
  }, [src]);

  return files;
}
