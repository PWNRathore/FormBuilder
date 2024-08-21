import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import CreateForm from './components/CreateForm/CreateForm';
import ViewForm from './components/ViewForm/ViewForm';
import EditForm from './components/EditForm/EditForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/form/create" element={<CreateForm />} />
          <Route path="/form/:id" element={<ViewForm />} />
          <Route path="/form/:id/edit" element={<EditForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
