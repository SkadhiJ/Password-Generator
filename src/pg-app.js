import { css, LitElement } from 'lit-element';
import { html } from 'lit-html';
import { setPassiveTouchGestures } from '@polymer/polymer/lib/utils/settings.js';
import './shared/pg-checkbox';
import './shared/pg-input';
import '@material/mwc-button';

const SECRET_LOCALSTORAGE_KEY = '__pg_secret';
const ALIAS_INPUT = 'aliasInput';
const SECRET_INPUT = 'secretInput';
const SAVE_SECRET_CHECKBOX = 'saveSecretCheckbox';
const CLIPBOARD_CHECKBOX = 'clipboardCheckbox';
const SHOW_PASSWORD_CHECKBOX = 'showPasswordCheckbox';
const GENERATE_BUTTON = 'generateButton';
const CLEAR_BUTTON = 'clearButton';
const TEXTAREA_PLACEHOLDER = 'textareaPlaceholder';

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
            <pg-input id="${ALIAS_INPUT}" label="Alias"></pg-input>
            <pg-input 
                id="${SECRET_INPUT}" 
                label="Secret"
                @change="${this.handleSecretInput}"
                ></pg-input>
            <pg-checkbox 
                id="${SAVE_SECRET_CHECKBOX}" 
                label="Save secret" 
                text-when-checked="Any time you click 'Generate' button, current secret value will be saved in browser's local storage memory."
                text-when-unchecked="Your secret will not be stored anywhere after you close the app."
                @change="${this.handleSaveSecretChange}">
            </pg-checkbox> 
            <pg-checkbox 
                id="${CLIPBOARD_CHECKBOX}" 
                label="Copy to clipboard" 
                text-when-checked="Generated password will be copied to your clipboard (CTRL+C command)."
                text-when-unchecked="Generated password will not be copied to your clipboard."
                @change="${this.handleChange}">
            </pg-checkbox> 
            <pg-checkbox 
                id="${SHOW_PASSWORD_CHECKBOX}" 
                label="Show password" 
                text-when-checked="Generated password will be displayed on your device's screen."
                text-when-unchecked="Generated password will not be visible."
                @change="${this.handleChange}">
            </pg-checkbox>
            <mwc-button id="${GENERATE_BUTTON}" label="Generate" raised @click="${this.handleGenerateClick}"></mwc-button>
            <mwc-button id="${CLEAR_BUTTON}" label="Clear" raised @click="${this.handleClick}"></mwc-button>
            <div id="${TEXTAREA_PLACEHOLDER}"></div>
        `;
    }

    get aliasInput() {
        return this.shadowRoot.querySelector(`#${ALIAS_INPUT}`);
    }

    get secretInput() {
        return this.shadowRoot.querySelector(`#${SECRET_INPUT}`);
    }

    get saveSecretCheckbox() {
        return this.shadowRoot.querySelector(`#${SAVE_SECRET_CHECKBOX}`);
    }

    get clipboardCheckbox() {
        return this.shadowRoot.querySelector(`#${CLIPBOARD_CHECKBOX}`);
    }

    get showPasswordCheckbox() {
        return this.shadowRoot.querySelector(`#${SHOW_PASSWORD_CHECKBOX}`);
    }

    get generateButton() {
        return this.shadowRoot.querySelector(`#${GENERATE_BUTTON}`);
    }

    get clearButton() {
        return this.shadowRoot.querySelector(`#${CLEAR_BUTTON}`);
    }

    get textareaPlaceholder() {
        return this.shadowRoot.querySelector(`#${TEXTAREA_PLACEHOLDER}`);
    }

    constructor() {
        super();
        setPassiveTouchGestures(true);
    }

    handleChange(event) {
        console.log(event);
    }

    handleClick() {
        const inputValue = this.shadowRoot.querySelector('#input').value;
    }

    handleSecretInput() {
        if (this.saveSecretCheckbox.checked) {
            this.saveSecretToLocalstorage();
        }
    }

    handleSaveSecretChange(event) {
        if (event.detail.checked) {
            this.saveSecretToLocalstorage();
        } else {
            localStorage.removeItem(SECRET_LOCALSTORAGE_KEY);
        }
    }

    handleGenerateClick() {
        const textareaPlaceholder = this.textareaPlaceholder;
        const textarea = document.createElement('textarea');
        textarea.value = 'mapper';
        textareaPlaceholder.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textareaPlaceholder.removeChild(textarea);
    }

    saveSecretToLocalstorage() {
        localStorage.setItem(SECRET_LOCALSTORAGE_KEY, this.secretInput.value);
    }

    firstUpdated(changedProperties) {
    }

    updated(changedProperties) {
    }

}

window.customElements.define('pg-app', PgApp);
