const axios = require("axios");

// Constant declarations -> URL Definitions
const DOC_TO_TEXT_SERVER =
  process.env.DOC_TO_TEXT_SERVER || "http://localhost:8000";

const ML_SERVER =
  "https://1eb4-35-230-1-2.ngrok.io" ||
  process.env.ML_SERVER ||
  "http://localhost:6969";

const extractTextURL = {
  extractText: (url) => `${DOC_TO_TEXT_SERVER}/extract-text?url=${url}`,
};

const generateQuestions = {
  generateSubQA: () => `${ML_SERVER}/api/v1/qg/generate/`,
  generateMCQ: () => `${ML_SERVER}/api/v1/qg/generate-mcq/`,
};

const generateSummary = {
  generateSum: () => `${ML_SERVER}/api/v1/ts/generate/`,
};

let URLS = {
  ...extractTextURL,
  ...generateQuestions,
  ...generateSummary,
};

//API call definitions for utility functions

const ExtractText = {
  extractText: async (url) => (await axios.get(URLS.extractText(url))).data,
};

const GenerateQuestions = {
  generateSubQA: async (params) =>
    (await axios.post(URLS.generateSubQA(), params)).data,
  generateMCQ: async (params) =>
    (await axios.post(URLS.generateMCQ(), params)).data,
};

const GenerateSummary = {
  generateSummary: async (params) =>
    (await axios.post(URLS.generateSum(), params)).data,
};

let UTILS = {
  ...ExtractText,
  ...GenerateQuestions,
  ...GenerateSummary,
};

module.exports = {
  ...UTILS,
};
