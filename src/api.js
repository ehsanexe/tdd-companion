const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = "";
// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: { responseMimeType: "application/json" },
  systemInstruction:
    "provide output in valid json format, example output: {testCases: string, code: string}. Do not include any explanations; just provide the JSON object.",
});

export const getGeneratedResponse = async (data) => {
  const { description, language, framework, library, tags } = data;

  const prompt = `Write code for test cases based on the provided user story and generate the initial skeleton of the implementation using Test Driven Development (TDD).

*Use the specified language, framework, and libraries. 
*Also, include these tags in your implementation where applicable.

user story: ${description}
language: ${language}
framework: ${framework}
libraries: ${library}
tags: ${tags}

*include assertions in test cases
*Use relevant framework specific functions where applicable
*Use relevant library specific functions where applicable
*provide Model where applicable
*Use relevant specific functions mentioned in tags where applicable
*Use language specific syntax and functions 
`;

  // return;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  let format = text.replace(/```/g, "");
  format = format.replaceAll("json", "");

  const jsonResponse = JSON.parse(format);

  const history = [
    {
      role: "user",
      parts: [{ text: prompt }],
    },
    {
      role: "model",
      parts: [{ text: text }],
    },
  ];

  return { jsonResponse, history };
};

export const sendFeedBack = async (history, prompt) => {
  const chat = model.startChat({
    history,
  });

  const result = await chat.sendMessage(prompt);
  const response = await result.response;

  const text = response.text();

  let format = text.replace(/```/g, "");
  format = format.replaceAll("json", "");

  const jsonResponse = JSON.parse(format);

  let updatedHistory = [
    ...history,
    {
      role: "user",
      parts: [{ text: prompt }],
    },
    {
      role: "model",
      parts: [{ text: text }],
    },
  ];

  return { jsonResponse, updatedHistory };
};
