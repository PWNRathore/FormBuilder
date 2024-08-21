const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  inputs: [{
    type: { type: String, required: true },
    title: { type: String, required: true },
    placeholder: { type: String },
  }],
});

const Form = mongoose.model('Form', formSchema);

module.exports = Form;
