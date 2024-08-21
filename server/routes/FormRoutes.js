const express = require('express');
const router = express.Router();
const { createForm, getForms, getFormById, updateFormById, deleteFormById } = require('../controllers/formController');

// Create a new form
router.post('/forms', createForm);

// Get all forms
router.get('/forms', getForms);

// Get a form by ID
router.get('/forms/:id', getFormById);

// Update a form by ID
router.put('/forms/:id', updateFormById);

// Delete a form by ID
router.delete('/forms/:id', deleteFormById);

module.exports = router;
