import { css, LitElement } from 'lit-element';
import { html } from 'lit-html';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';

const checkboxId = 'checkbox';

class PgCheckbox extends LitElement {

    constructor() {
        super();
        this.checked = false;
        this.label = '';
        this.textWhenChecked = '';
        this.textWhenUnchecked = '';
    }

    static get properties() {
        return {
            checked: {
                type: Boolean,
                reflect: true,
            },
            label: {
                type: String
            },
            textWhenChecked: {
                type: String,
                attribute: 'text-when-checked'
            },
            textWhenUnchecked: {
                type: String,
                attribute: 'text-when-unchecked'
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
            <div>
                <mwc-formfield label="${this.label}">
                    <mwc-checkbox id="${checkboxId}" ?checked="${this.checked}" @change="${this.handleChange}"></mwc-checkbox>
                </mwc-formfield>
            </div>
            <div>
                ${this.checked ? this.textWhenChecked : this.textWhenUnchecked}
            </div>
        `;
    }

    handleChange() {
        this.checked = this.shadowRoot.querySelector(`#${checkboxId}`).checked;
        this.dispatchEvent(new CustomEvent('change', {
            detail: {
                checked: this.checked
            }
        }));
    }

    firstUpdated(changedProperties) {
    }

    updated(changedProperties) {
    }

}

window.customElements.define('pg-checkbox', PgCheckbox);
