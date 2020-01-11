const SECRET_LOCALSTORAGE_KEY = '__pg_secret';
const CLIPBOARD_LOCALSTORAGE_KEY = '__pg_clipboard';
const SHOW_PASSWORD_LOCALSTORAGE_KEY = '__pg_showPassword';

/*----------Save & Remove----------*/

export const storage = {

    getSecret: () => {
        return localStorage.getItem(SECRET_LOCALSTORAGE_KEY);
    },

    setSecret: (secret) => {
        localStorage.setItem(SECRET_LOCALSTORAGE_KEY, secret);
    },

    removeSecret: () => {
        localStorage.removeItem(SECRET_LOCALSTORAGE_KEY);
    },

    // Clipboard
    getClipboard: () => {
        return localStorage.getItem(CLIPBOARD_LOCALSTORAGE_KEY);
    },

    setClipboard: () => {
        localStorage.setItem(CLIPBOARD_LOCALSTORAGE_KEY, '');
    },

    removeClipboard: () => {
        localStorage.removeItem(CLIPBOARD_LOCALSTORAGE_KEY);
    },

    // Show Password
    getShowPassword: () => {
        return localStorage.getItem(SHOW_PASSWORD_LOCALSTORAGE_KEY);
    },

    setShowPassword: () => {
        localStorage.setItem(SHOW_PASSWORD_LOCALSTORAGE_KEY, '');
    },

    removeShowPassword: () => {
        localStorage.removeItem(SHOW_PASSWORD_LOCALSTORAGE_KEY);
    }
};
