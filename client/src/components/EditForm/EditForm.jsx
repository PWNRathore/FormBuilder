import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './editForm.css'; // Import the CSS file

function EditForm() {
  const { id } = useParams();  // Get the form ID from the URL
  const [title, setTitle] = useState('');
  const [inputs, setInputs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_BASE_URL}/forms/${id}`;
    console.log("Request URL:", url); // Debug: Log the URL
    axios.get(url)
      .then(res => {
        setTitle(res.data.title);
        setInputs(res.data.inputs);
      })
      .catch(err => {
        console.error("Error fetching data:", err.response ? err.response.data : err.message);
      });
  }, [id]);

  const addInput = (type) => {
    const inputTitle = prompt('Enter input title:');
    const placeholder = prompt('Enter input placeholder:');
    if (inputTitle) {
      setInputs([...inputs, { type, title: inputTitle, placeholder }]);
    }
  };

  const editInput = (index) => {
    const newTitle = prompt('Enter new input title:', inputs[index].title);
    const newPlaceholder = prompt('Enter new input placeholder:', inputs[index].placeholder);

    if (newTitle) {
      const updatedInputs = inputs.map((input, i) =>
        i === index ? { ...input, title: newTitle, placeholder: newPlaceholder } : input
      );
      setInputs(updatedInputs);
    }
  };

  const updateForm = () => {
    // Construct the URL with the form ID
    const url = `${process.env.REACT_APP_PUT_URL}/${id}`;
    console.log("Update Request URL:", url); // Debug: Log the URL

    axios.put(url, { title, inputs })
      .then(() => {
        console.log("Form updated successfully"); // Debug: Success message
        navigate('/'); // Navigate back to HomePage after updating
      })
      .catch(err => {
        console.error("Error updating form:", err.response ? err.response.data : err.message);
      });
  };

  return (
    <div className="edit-form-container">
      <h1>Edit Form</h1>
      <input 
        type="text" 
        className="edit-form-title" 
        placeholder="Form Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
      />
      <button onClick={() => addInput('text')} className="edit-form-button">Add Text Input</button>
      <button onClick={() => addInput('email')} className="edit-form-button">Add Email Input</button>
      <button onClick={() => addInput('password')} className="edit-form-button">Add Password Input</button>
      <button onClick={() => addInput('number')} className="edit-form-button">Add Number Input</button>
      <button onClick={() => addInput('date')} className="edit-form-button">Add Date Input</button>
      <div className="edit-form-inputs">
        {inputs.map((input, index) => (
          <div key={index} className="input-item">
            <p>{input.title} ({input.type})</p>
            <input 
              type={input.type} 
              placeholder={input.placeholder} 
              readOnly 
            />
                <div className='editbutton1'>
                <button onClick={() => editInput(index)} className="edit-form-button">Edit</button>
                  </div>

            <div className="input-actions">
             
              <button onClick={() => setInputs(inputs.filter((_, i) => i !== index))} className="edit-form-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={updateForm} className="edit-form-button">Update Form</button>
    </div>
  );
}

export default EditForm;
