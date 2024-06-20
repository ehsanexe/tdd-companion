const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "AIzaSyCyWmVYjexmNtS2dTGu-8NgRLQaRQLefg4";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "provide output in valid json format, example output: {testCases: string, code: string}. Don't give an explanation of it, just provide json object.",
});

export const getGeneratedResponse = async (data) => {
  const { description, language, framework, library, role } = data;

  const prompt = `write code of test cases for the user story and provide initial skeleton of code using Test Driven Development (TDD)
  user story: ${description}, language: ${language}, framework: ${framework}, libraries: ${library}, user role: ${role}`;
  console.log({ prompt });
  // return;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  let format = text.replace(/```/g,"")
  format = format.replaceAll("json","");

  const jsonResponse = JSON.parse(format)

  return jsonResponse;
};
