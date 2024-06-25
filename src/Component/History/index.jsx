import React, { useMemo } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import "./index.css";

export default function ChatHistory({ role, response }) {
  const text = useMemo(() => {
    if (role === "user") {
      return response;
    } else {
      let format = response.replace(/```/g, "");
      format = format.replaceAll("json", "");

      return JSON.parse(format);
    }
  }, []);

  return (
    <div className="history-item" >
      {role === "user" && <span>{text}</span>}
      {role === "model" && (
        <div className="code-block">
          <div className="block">
            <p>Test Cases:</p>
            <CopyBlock
              text={text.testCases}
              showLineNumbers
              wrapLines
              theme={dracula}
            />
          </div>
          <div className="block">
            <p>Code:</p>
            <CopyBlock
              text={text.code}
              showLineNumbers
              wrapLines
              theme={dracula}
            />
          </div>
        </div>
      )}
    </div>
  );
}
