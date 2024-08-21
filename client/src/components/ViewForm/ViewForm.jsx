import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './viewForm.css'; // Import the CSS file

function ViewForm() {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    // Use environment variable for API base URL
    const url = `${process.env.REACT_APP_API_URL}/${id}`;
    console.log("Request URL:", url); // Debug: Log the URL

    axios.get(url)
      .then(res => {
        console.log("Response Data:", res.data); // Debug: Log the response data
        setForm(res.data);
      })
      .catch(err => {
        console.error("Error fetching data:", err.response ? err.response.data : err.message);
      });
  }, [id]);

  if (!form) return <p>Loading...</p>;

  return (
    <div className="view-form-container">
      <h1 className="view-form-title">{form.title}</h1>
      <form className="view-form-form">
        {form.inputs.map((input, index) => (
          <div key={index}>
            <label>{input.title}</label>
            <input 
              type={input.type} 
              placeholder={input.placeholder} 
              required={input.required} 
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ViewForm;
