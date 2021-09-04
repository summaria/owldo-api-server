const axios = require('axios')

// Constant declarations -> URL Definitions
const DOC_TO_TEXT_SERVER = process.env.DOC_TO_TEXT_SERVER || "http://localhost:8000";

const extractTextURL = {
    extractText :(url) => `${DOC_TO_TEXT_SERVER}/extract-text?url=${url}`,
}

let URLS = {
    ...extractTextURL
}

//API call definitions for utility functions

const ExtractText = {
    extractText : async (url) => (await axios.get(URLS.extractText(url))).data,
}


let UTILS = {
    ...ExtractText
}

module.exports = {
    ...UTILS
}