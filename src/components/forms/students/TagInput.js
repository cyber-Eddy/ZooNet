import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';


function TagInput() {
    const [tags, setTags] = useState([]);
    const [inputValue, setInputValue] = useState('');
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleInputKeyPress = (event) => {
      if (event.key === 'Enter' && inputValue.trim() !== '') {
        setTags([...tags, inputValue]);
        setInputValue('');
      }
    };
  
    const handleTagDelete = (tagToDelete) => {
      setTags(tags.filter((tag) => tag !== tagToDelete));
    };
  
    return (
      <div>
        <TextField
          label="Componentes"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleInputKeyPress}
        />
        <div>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleTagDelete(tag)}
              color="primary"
              style={{ margin: '4px' }}
            />
          ))}
        </div>
      </div>
    );
  }
  
  export default TagInput;
  