import { css, LitElement } from 'lit-element';
import { html } from 'lit-html';
import './shared/pg-button';
import '@material/mwc-dialog';
import { copyToClipboard } from './modules/copyToClipboard';

class PgAppResult extends LitElement {

    static get properties() {
        return {
            password: {
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
            
            div {
                border: 1px solid black;
                background-color: lightgrey;
            }
        `;
    }

    //language=HTML
    render() {
        return html`  
            <mwc-dialog heading="Your password:" open @closed="${(event) => console.log(event)}">
                <div>${this.password}</div> 
                <p>You can now select your password and copy it to your clipboard, or use the "Copy to clipboard" button below.</p>
                <p>Also, if you're on a publicly accessible computer, don't forget to clear the generator form before you leave the app!</p>
                <pg-button label="Copy to clipboard" slot="primaryAction" outlined @click="${this.handleClipboardClick}"></pg-button>
                <pg-button label="Hide" slot="secondaryAction" dialogAction="close"></pg-button>
            </mwc-dialog>
        `;
    }

    constructor() {
        super();
    }

    handleClipboardClick() {
        copyToClipboard(this.password);
    }
}

window.customElements.define('pg-app-result', PgAppResult);
