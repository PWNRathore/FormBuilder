import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './homePage.css'; // Import the CSS file

function HomePage() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_GET_URL}`);
      setForms(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

  const deleteForm = (id) => {
    const url = `${process.env.REACT_APP_DELETE_URL}/${id}`;
    console.log("Delete Request URL:", url); // Debug: Log the URL

    axios.delete(url)
      .then(() => {
        setForms(forms.filter(form => form._id !== id));
      })
      .catch(err => {
        console.error("Error deleting form:", err.response ? err.response.data : err.message);
      });
  };

  return (
    <div className="home-page-container">
      <h1 className="home-page-title">Welcome To Form Builder</h1>
      <Link to="/form/create" className="create-form-link">Create Form</Link>
      <ul className="forms-list">
        {forms.map(form => (
          <li key={form._id} className="form-item">
            <div className="form-title">{form.title}</div>
            <div className="form-actions">
              <button className="view-button" onClick={() => navigate(`/form/${form._id}`)}>View</button>
              <button className="edit-button" onClick={() => navigate(`/form/${form._id}/edit`)}>Edit</button>
              <button className="delete-button" onClick={() => deleteForm(form._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
