
// const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// const agentSchema = new mongoose.Schema({
//   id: { type: Number },
//   name: String,
//   email: String,
//   password: String,
//   leadStatus: { type: String, enum: ['Interested', 'On Hold', 'New Lead'], default: 'New Lead' },
//   role: { type: String, enum: ['admin', 'agent'], default: 'agent' }, // New field for role
// });

// // Apply AutoIncrement plugin only once
// agentSchema.plugin(AutoIncrement, { inc_field: 'id' });

// const Agent = mongoose.model('Agent', agentSchema);

// module.exports = Agent;

// ...................................

// const mongoose = require('mongoose');
// const AutoIncrement = require('mongoose-sequence')(mongoose);

// const agentSchema = new mongoose.Schema({
//   id: { type: Number },
//   name: String,
//   email: String,
//   password: String,
//   agentlead: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
//   role: { type: String, enum: ['admin', 'agent'], default: 'agent' }, // New field for role
//   assignedLeads: { type: String, default: '' }, // New field for assigned leads
// });

// // Apply AutoIncrement plugin only once
// agentSchema.plugin(AutoIncrement, { inc_field: 'id' });

// const Agent = mongoose.model('Agent', agentSchema);

// module.exports = Agent;



const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define the Agent schema
const agentSchema = new mongoose.Schema({
  id: { type: Number },
  name: { type: String, required: true }, // Adding 'required' for name field
  email: { type: String, required: true, unique: true }, // Adding 'required' and 'unique' for email field
  password: { type: String, required: true }, // Adding 'required' for password field
  agentlead: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
  role: { type: String, enum: ['admin', 'agent'], default: 'agent' },
  assignedLeads: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lead' }], // Updated to an array of Lead objects
});

// Apply AutoIncrement plugin for the id field
agentSchema.plugin(AutoIncrement, { inc_field: 'id' });

// Create and export the Agent model
const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
