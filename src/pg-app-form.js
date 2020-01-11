import { css, LitElement } from 'lit-element';
import { html } from 'lit-html';
import './shared/pg-checkbox';
import './shared/pg-input';
import './shared/pg-button';
import { copyToClipboard } from './modules/copyToClipboard';
import { storage } from './modules/storage';
import { generatePassword } from './modules/generatePassword';

const ALIAS_INPUT = 'aliasInput';
const SECRET_INPUT = 'secretInput';
const SAVE_SECRET_CHECKBOX = 'saveSecretCheckbox';
const CLIPBOARD_CHECKBOX = 'clipboardCheckbox';
const SHOW_PASSWORD_CHECKBOX = 'showPasswordCheckbox';
const GENERATE_BUTTON = 'generateButton';
const CLEAR_BUTTON = 'clearButton';

class PgAppForm extends LitElement {

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
            <pg-input id="${ALIAS_INPUT}" label="Alias" value="yellow"></pg-input>
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
                @change="${this.handleClipboardCheckboxChange}">
            </pg-checkbox> 
            <pg-checkbox 
                id="${SHOW_PASSWORD_CHECKBOX}" 
                label="Show password" 
                text-when-checked="Generated password will be displayed on your device's screen."
                text-when-unchecked="Generated password will not be visible."
                @change="${this.handleShowPasswordCheckboxChange}">
            </pg-checkbox>
            <pg-button id="${GENERATE_BUTTON}" label="Generate" unelevated @click="${this.handleGenerateButtonClick}"></pg-button>
            <pg-button id="${CLEAR_BUTTON}" label="Clear" outlined @click="${this.handleClearButtonClick}"></pg-button>
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

    constructor() {
        super();
    }

    firstUpdated(_changedProperties) {
        const secretFromStorage = storage.getSecret();
        if (secretFromStorage !== null) {
            this.saveSecretCheckbox.checked = true;
            this.secretInput.value = secretFromStorage;
        }

        if (storage.getClipboard() !== null) {
            this.clipboardCheckbox.checked = true;
        }

        if (storage.getShowPassword() !== null) {
            this.showPasswordCheckbox.checked = true;
        }
    }

    // --- Inputs --------------------------------------------------------------------------------------------------- //

    handleSecretInput() {
        if (this.saveSecretCheckbox.checked) {
            this.saveSecret();
        }
    }

    // --- Checkboxes ----------------------------------------------------------------------------------------------- //

    handleSaveSecretChange(event) {
        if (event.detail.checked) {
            this.saveSecret();
        } else {
            storage.removeSecret();
        }
    }

    handleClipboardCheckboxChange(event) {
        if (event.detail.checked) {
            storage.setClipboard();
        } else {
            storage.removeClipboard();
        }
    }

    handleShowPasswordCheckboxChange(event) {
        if (event.detail.checked) {
            storage.setShowPassword();
        } else {
            storage.removeShowPassword();
        }
    }

    // --- Buttons -------------------------------------------------------------------------------------------------- //

    handleGenerateButtonClick() {
        const alias = this.aliasInput.value;
        const secret = this.secretInput.value;
        generatePassword(alias, secret).then((password) => {
            if (this.clipboardCheckbox.checked) {
                copyToClipboard(password);
            }
            if (this.showPasswordCheckbox.checked) {
                this.dispatchPasswordGeneratedEvent(password);
            }
        });
    }

    handleClearButtonClick() {
        // Inputs
        this.aliasInput.value = '';
        this.secretInput.value = '';

        // Checkboxes
        this.saveSecretCheckbox.checked = false;
        this.clipboardCheckbox.checked = false;
        this.showPasswordCheckbox.checked = false;

        // Local storage
        storage.removeSecret();
        storage.removeClipboard();
        storage.removeShowPassword();
    }

    // --- Helper functions ----------------------------------------------------------------------------------------- //

    saveSecret() {
        storage.setSecret(this.secretInput.value);
    }

    dispatchPasswordGeneratedEvent(password) {
        this.dispatchEvent(new CustomEvent('password-generated', {
            detail: {
                password,
            }
        }));
    }

}

window.customElements.define('pg-app-form', PgAppForm);
