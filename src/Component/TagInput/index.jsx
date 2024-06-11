import React, { useState } from 'react';
import './index.css'

const TagsInput = ({ onChange, register }) => {
  const [tags, setTags] = useState([]);
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        const newTags = [...tags, input.trim()];
        setTags(newTags);
        onChange(newTags);
        setInput(''); // Clear input after adding tag
      }
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    onChange(newTags);
  };

  return (
    <div className="tags-input-container">
    <input
      {...register("tags")}
      type="text"
      value={input}
      onChange={(e) => setInput(e.target.value)} // Update input value
      onKeyDown={handleKeyDown}
    />
    <div className="tags-container">
      {tags.map((tag, index) => (
        <div className="tag" key={index}>
          {tag}
          <button type="button" onClick={() => handleRemoveTag(index)}>x</button>
        </div>
      ))}
    </div>
  </div>
  );
};

export default TagsInput;
