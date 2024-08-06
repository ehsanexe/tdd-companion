# TDD Companion

## Introduction
TDD Companion is a utility designed to streamline the development process using the Test-Driven Development (TDD) methodology. By leveraging generative AI, TDD Companion assists developers by accepting input requirements and outputting detailed test cases as prescribed by TDD. Additionally, it provides an initial skeleton of the code, helping developers get started quickly and ensure adherence to TDD principles.

## Features
- Accepts input requirements from developers
- Outputs detailed test cases following TDD methodology
- Provides an initial skeleton of the code
- Ensures adherence to TDD principles

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
- Node.js
- npm (Node Package Manager)

### Installation
- 
    ```bash
    npm install
    ```

### API Key Setup

TDD Companion uses the generative AI API provided by Google. You need to generate an API key to use this feature.

1. Go to [Google's Gemini API documentation](https://ai.google.dev/gemini-api/docs/api-key) to generate your API key.
2. Once you have obtained your API key, open the `src/api.js` file.
3. Replace the placeholder `const API_KEY = "";` with your actual API key:
    ```javascript
    const API_KEY = "your_key_here";
    ```

### Running the Application
You can run the application in two ways:

1.
    ```bash
    npm start
    ```
    This will start the application in development mode. Open [http://localhost:3005](http://localhost:3005) to view it in the browser.

2.
    - Open the `build` folder and then simply open the `index.html` file in a browser.
    
    To create a production build, run:
    ```bash
    npm run build
    ```
    This will create an optimized production build of your application.

## Usage
1. Input your requirements in the provided input fields.
2. TDD Companion will generate detailed test cases based on the input.
3. Review the generated test cases.
4. TDDWizard will also provide an initial skeleton of the code.
