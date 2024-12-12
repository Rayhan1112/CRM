
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
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const agentSchema = new mongoose.Schema({
  id: { type: Number },
  name: String,
  email: String,
  password: String,
  leadStatus: { type: String, enum: ['Interested', 'On Hold', 'New Lead'], default: 'New Lead' },
  role: { type: String, enum: ['admin', 'agent'], default: 'agent' }, // New field for role
  assignedLeads: { type: String, default: '' }, // New field for assigned leads
});

// Apply AutoIncrement plugin only once
agentSchema.plugin(AutoIncrement, { inc_field: 'id' });

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
