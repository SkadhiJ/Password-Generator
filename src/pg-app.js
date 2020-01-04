import { css, LitElement } from 'lit-element';
import { html } from 'lit-html';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import './shared/pg-checkbox';
import './shared/pg-input';
import '@material/mwc-button';

class PgApp extends LitElement {

    static get properties() {
        return {

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
            <pg-checkbox 
                id="checkbox" 
                label="Test" 
                checked 
                text-when-checked="I'm buggered"
                text-when-unchecked="Bugger me"
                @change="${this.handleChange}">
            </pg-checkbox>
            <pg-input id="input" label="maaamooo" value="a value"></pg-input>
            <mwc-button label="Meow" raised @click="${this.handleClick}"></mwc-button>
        `;
    }

    constructor() {
        super();
        setPassiveTouchGestures(true);
    }

    handleChange(event) {
        console.log(event);
    }

    handleClick() {
        const inputValue = this.shadowRoot.querySelector('#input').getValue();
        console.log(inputValue);
    }

    firstUpdated(changedProperties) {
    }

    updated(changedProperties) {
    }

}

window.customElements.define('pg-app', PgApp);
