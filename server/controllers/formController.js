const Form = require('../models/Form');

// Controller to create a new form
const createForm = async (req, res) => {
  try {
    const { title, inputs } = req.body;
    const newForm = new Form({ title, inputs });
    await newForm.save();
    res.status(201).send('Form saved successfully');
  } catch (error) {
    res.status(500).send('Failed to save form');
  }
};

// Controller to get all forms
const getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).send('Failed to fetch forms');
  }
};

// Controller to get a form by ID
const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    res.status(200).json(form);
  } catch (error) {
    res.status(500).send('Failed to fetch form');
  }
};

// Controller to update a form by ID
const updateFormById = async (req, res) => {
  try {
    const { title, inputs } = req.body;
    const form = await Form.findByIdAndUpdate(
      req.params.id,
      { title, inputs },
      { new: true, runValidators: true }
    );
    res.status(200).json(form);
  } catch (error) {
    res.status(500).send('Failed to update form');
  }
};

// Controller to delete a form by ID
const deleteFormById = async (req, res) => {
  try {
    await Form.findByIdAndDelete(req.params.id);
    res.status(200).send('Form deleted successfully');
  } catch (error) {
    res.status(500).send('Failed to delete form');
  }
};


module.exports = {
  createForm,
  getForms,
  getFormById,
  updateFormById,
  deleteFormById,
};
