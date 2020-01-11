import { css, LitElement } from 'lit-element';
import { html } from 'lit-html';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import './pg-app-form';
import './pg-app-result';

const RESULT_ELEMENT = 'result';

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
            <pg-app-form @password-generated="${this.handlePasswordGenerated}"></pg-app-form>
            <pg-app-result id="${RESULT_ELEMENT}"></pg-app-result>
        `;
    }

    constructor() {
        super();
        setPassiveTouchGestures(true);
    }

    get resultElement() {
        return this.shadowRoot.querySelector(`#${RESULT_ELEMENT}`);
    }

    handlePasswordGenerated(event) {
        // console.log(this.resultElement.password);
        this.resultElement.password = event.detail.password;
        // console.log(this.resultElement.password);
    }
}

window.customElements.define('pg-app', PgApp);
