const transformHTML = (html) => {
    return html.replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

document.querySelector('#useUtilesJS').innerHTML = 
`const Utiles = new UtilesClass();`;