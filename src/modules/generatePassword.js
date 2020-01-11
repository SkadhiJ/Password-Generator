export const generatePassword = async (alias, secret) => {
    const buffer = await crypto.subtle.digest('SHA-256', (new TextEncoder()).encode(alias + secret));
    const hash = Array.prototype.map.call(new Uint8Array(buffer), (item) => (('00' + item.toString(16)).slice(-2))).join('');
    return btoa(hash).substring(17, 49);
};