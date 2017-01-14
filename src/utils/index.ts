/**
 * Get a parameter value by key.
 *
 * From http://stackoverflow.com/a/901144/1349766
 *
 * @export
 * @param {string} name
 * @param {string} [url]
 * @returns
 */
export function getParameterValue(key: string, url?: string) {
    if (!url) {
        url = window.location.href;
    }
    key = key.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return undefined;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

/**
 * Hash a given string
 *
 * From http://stackoverflow.com/a/34842797/1349766
 *
 * @export
 * @param {string} str
 * @returns
 */
export function hash(str: string) {
    return str.split("").reduce((prevHash, currVal) =>
        ((prevHash << 5) - prevHash) + currVal.charCodeAt(0), 0);
}

/**
 * Generate a random alphanumeric ID, five characters long
 *
 * From http://stackoverflow.com/a/1349426/1349766
 *
 * @export
 * @returns
 */
export function generateId() {

    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}