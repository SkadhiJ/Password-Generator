import { css, LitElement } from 'lit-element';
import { html } from 'lit-html';
import '@material/mwc-button';

class PgButton extends LitElement {

    constructor() {
        super();
    }

    static get properties() {
        return {
            label: {
                type: String,
            },
            outlined: {
                type: Boolean,
            },
            raised: {
                type: Boolean,
            },
            unelevated: {
                type: Boolean,
            },
            dense: {
                type: Boolean,
            }
        };
    }

    //language=CSS
    static get styles() {
        return css`
            :host {
                display: inline;
            }
        `;
    }

    //language=HTML
    render() {
        return html`
            <mwc-button 
                label="${this.label}" 
                ?outlined="${this.outlined}" 
                ?raised="${this.raised}" 
                ?unelevated="${this.unelevated}"
                ?dense="${this.dense}">
            </mwc-button>
        `;
    }
}

window.customElements.define('pg-button', PgButton);