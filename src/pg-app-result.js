import { css, LitElement } from 'lit-element';
import { html } from 'lit-html';
import './shared/pg-button';
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
            <h1>Your password:</h1>
            <div>${this.password}</div>
            <p>You can now select your password and copy it to your clipboard, or use the "Copy to clipboard" button below.</p>
            <p>Also, if you're on a publicly accessible computer, don't forget to clear the generator form before you leave the app!</p>
            <pg-button label="Copy to clipboard" outlined @click="${this.handleClipboardClick}"></pg-button>
            <pg-button label="Hide"></pg-button>
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
