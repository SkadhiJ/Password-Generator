/**
 * @param {string} stringToCopy
 */
export const copyToClipboard = (stringToCopy) => {
    const textarea = document.createElement('textarea');
    textarea.value = stringToCopy;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
};
