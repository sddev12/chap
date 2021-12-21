// Cleans user input to prevent HTML Injection
function cleanHTML (payload) {
    let cleanedInputs = {}
    for (const [key, value] of Object.entries(payload)) {
        cleanValue = value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
        cleanedInputs[key] = cleanValue
    }
    return cleanedInputs
}

module.exports = cleanHTML