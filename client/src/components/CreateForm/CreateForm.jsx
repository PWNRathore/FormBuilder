import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './createForm.css';

function CreateForm() {
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([]);
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const addInput = (type) => {
    const inputTitle = prompt('Enter input title:');
    const placeholder = prompt('Enter input placeholder:');
    if (inputTitle) {
      setInputs([...inputs, { type, title: inputTitle, placeholder }]);
    }
  };

  const editInput = (index) => {
    const newTitle = prompt('Edit input title:', inputs[index].title);
    const newPlaceholder = prompt('Edit input placeholder:', inputs[index].placeholder);
    if (newTitle || newPlaceholder) {
      setInputs(inputs.map((input, i) =>
        i === index ? { ...input, title: newTitle || input.title, placeholder: newPlaceholder || input.placeholder } : input
      ));
    }
  };

  const saveForm = () => {
    axios.post(`${process.env.REACT_APP_POST_URL}`, { title, inputs })
      .then(() => {
        setFeedback('Form saved successfully!');
        setTimeout(() => navigate('/'), 2000);
      })
      .catch(err => {
        console.log(err);
        setFeedback('Failed to save form. Please try again.');
      });
  };

  return (
    <div className="create-form-container">
      <h1>Create Form</h1>
      <input 
        type="text" 
        className="create-form-title" 
        placeholder="Form Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <button onClick={() => addInput('text')} className="create-form-button">Add Text Input</button>
      <button onClick={() => addInput('email')} className="create-form-button">Add Email Input</button>
      <button onClick={() => addInput('password')} className="create-form-button">Add Password Input</button>
      <button onClick={() => addInput('number')} className="create-form-button">Add Number Input</button>
      <button onClick={() => addInput('date')} className="create-form-button">Add Date Input</button>
      <div className="create-form-inputs">
        {inputs.map((input, index) => (
          <div key={index}>
            <p>{input.title} ({input.type})</p>
            <input 
              type={input.type} 
              placeholder={input.placeholder} 
              readOnly 
            />
            <button onClick={() => editInput(index)} className="create-form-button1">Edit</button>
            <button onClick={() => setInputs(inputs.filter((_, i) => i !== index))} className="create-form-button">
              Delete
            </button>
          </div>
        ))}
      </div>
      <button onClick={saveForm} className="create-form-button">Save Form</button>
      {feedback && <p className="feedback-message">{feedback}</p>}
      
      {/* Home Button */}
      <button onClick={() => navigate('/')} class="btn"><i class="fa fa-home"></i> Home</button>{/* Home icon */}
 
    </div>
  );
}

export default CreateForm;
