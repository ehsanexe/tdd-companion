const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "provide output in valid json format, example output: {testCases: string, code: string}. Do not include any explanations; just provide the JSON object.",
});

export const getGeneratedResponse = async (data) => {
  const { description, language, framework, library, tags } = data;

  const prompt = `Write code for test cases based on the provided user story and generate the initial skeleton of the implementation using Test Driven Development (TDD). Use the specified language, framework, and libraries. Also, include these tags in your implementation.
user story: ${description}
language: ${language}
framework: ${framework}
libraries: ${library}
tags: ${tags}`;

  // return;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  let format = text.replace(/```/g, "");
  format = format.replaceAll("json", "");

  const jsonResponse = JSON.parse(format);

  return jsonResponse;
};
