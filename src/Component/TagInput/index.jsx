import React, { useState } from "react";
import "./index.css";
import { Chip, TextField } from "@mui/material";

const TagsInput = ({ onChange, setValue, tags, setTags }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        const newTags = [...tags, input.trim()];
        setTags(newTags);
        onChange(newTags);
        setValue("tags", newTags);
        setInput(""); // Clear input after adding tag
      }
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    onChange(newTags);
    setValue("tags", newTags);
  };

  return (
    <div className="tags-input-container">
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)} // Update input value
        onKeyDown={handleKeyDown}
        sx={{ width: 300 }}
        label="Tags"
      />
      <div className="tags-container">
        {tags.map((tag, index) => (
          <Chip
            label={tag}
            variant="outlined"
            onDelete={() => handleRemoveTag(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagsInput;
