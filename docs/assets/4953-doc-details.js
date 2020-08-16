import { c, h } from './custom-element-6d69df93.js';

function docDetails({ summary }) {
    return (
        h('host', { shadowDom: true,}
            , h('details', null
                , h('summary', null, summary)
                , h('slot', null)
            )
        )
    );
}

docDetails.props = {
    summary: {
        type: String,
    },
};

customElements.define("doc-details", c(docDetails));
