import { css, LitElement } from 'lit-element';
import { html } from 'lit-html';
import '@material/mwc-textfield';

class PgInput extends LitElement {

    constructor() {
        super();
        this.value = '';
        this.type = '';
        this.label = '';
        this.placeholder = '';
    }

    static get properties() {
        return {
            value: {
                type: String,
            },
            type: {
                type: String,
            },
            label: {
                type: String,
            },
            placeholder: {
                type: String,
            }
        };
    }

    //language=CSS
    static get styles() {
        return css`
            :host {
                display: block;
            }
        `;
    }

    //language=HTML
    render() {
        return html`
            <mwc-textfield 
                id="textfield" 
                value="${this.value}" 
                type="${this.type}" 
                label="${this.label}" 
                placeholder="${this.placeholder}"
                @input="${this.handleInput}"
                >
            </mwc-textfield>
        `;
    }

    handleInput() {
        this.value = this.shadowRoot.querySelector('#textfield').value;
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                value: this.value
            }
        }));
    }
}

window.customElements.define('pg-input', PgInput);
