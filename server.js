
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware setup
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection for both leads and agents
// mongoose
//   .connect('mongodb://localhost:27017/itemsdb', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log('Connected to MongoDB'))
//   .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Lead schema and model
// const leadSchema = new mongoose.Schema({
//   name: String,
//   phone: String,
//   email: String,
//   vehicleModel: String,
//   regNumber: String,
//   policyStart: String,
//   policyExpiry: String,
//   currentProvider: String,
//   premium: Number,
//   leadStatus: { type: String, default: 'New Lead' },
// });

// const Lead = mongoose.model('Lead', leadSchema);

// // Agent schema and model
// const agentSchema = new mongoose.Schema({
//   id: { type: Number }, // Auto-increment field
//   name: String,
//   email: String,
//   password: { type: String, required: true }, // Password field (no hashing)
//   leadStatus: { type: String, enum: ['Interested', 'On Hold', 'New Lead'], default: 'New Lead' },
//   assignedLeads: { type: String, default: '' }, // New field for assigned leads
// });

// const Agent = mongoose.model('Agent', agentSchema);

// // Leads Routes
// app.post('/api/leads', async (req, res) => {
//   try {
//     const newLead = new Lead(req.body);
//     const savedLead = await newLead.save();
//     res.status(201).json(savedLead);
//   } catch (error) {
//     console.error('Error saving lead:', error);
//     res.status(500).json({ message: 'Error saving lead', error });
//   }
// });

// app.get('/api/leads', async (req, res) => {
//   try {
//     const leads = await Lead.find();
//     res.json(leads);
//   } catch (error) {
//     console.error('Error fetching leads:', error);
//     res.status(500).json({ message: 'Error fetching leads', error });
//   }
// });

// app.put('/api/leads/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { leadStatus } = req.body;

//     const updatedLead = await Lead.findByIdAndUpdate(
//       id,
//       { leadStatus },
//       { new: true }
//     );

//     if (!updatedLead) {
//       return res.status(404).json({ message: 'Lead not found' });
//     }

//     res.status(200).json({ message: 'Lead status updated successfully', updatedLead });
//   } catch (error) {
//     console.error('Error updating lead status:', error);
//     res.status(500).json({ message: 'Error updating lead status', error });
//   }
// });

// app.delete('/api/leads/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedLead = await Lead.findByIdAndDelete(id);

//     if (!deletedLead) {
//       return res.status(404).json({ message: 'Lead not found' });
//     }

//     res.status(200).json({ message: 'Lead deleted successfully', deletedLead });
//   } catch (error) {
//     console.error('Error deleting lead:', error);
//     res.status(500).json({ message: 'Error deleting lead', error });
//   }
// });

// // Agents Routes
// app.post('/api/agents', async (req, res) => {
//   try {
//     const { id, name, email, password, leadStatus, assignedLeads } = req.body; // Updated to include `id` and `assignedLeads`

//     const newAgent = new Agent({
//       id, // Assigning `id` from request body
//       name,
//       email,
//       password,
//       leadStatus,
//       assignedLeads, // Assigning `assignedLeads` from request body
//     });

//     const savedAgent = await newAgent.save();
//     res.status(201).json(savedAgent);
//   } catch (error) {
//     console.error('Error saving agent data:', error);
//     res.status(500).json({ message: 'Error saving agent data', error });
//   }
// });

// app.get('/api/agents', async (req, res) => {
//   try {
//     const agents = await Agent.find({}, '-_id'); // Exclude MongoDB's default `_id`
//     res.json(agents);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching agents', error });
//   }
// });

// app.put('/api/agents/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { leadStatus } = req.body;

//     const updatedAgent = await Agent.findByIdAndUpdate(
//       id,
//       { leadStatus },
//       { new: true }
//     );

//     if (!updatedAgent) {
//       return res.status(404).json({ message: 'Agent not found' });
//     }

//     res.status(200).json({ message: 'Agent status updated successfully', updatedAgent });
//   } catch (error) {
//     console.error('Error updating agent status:', error);
//     res.status(500).json({ message: 'Error updating agent status', error });
//   }
// });

// app.delete('/api/agents/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const deletedAgent = await Agent.findByIdAndDelete(id);

//     if (!deletedAgent) {
//       return res.status(404).json({ message: 'Agent not found' });
//     }

//     res.status(200).json({ message: 'Agent deleted successfully', deletedAgent });
//   } catch (error) {
//     console.error('Error deleting agent:', error);
//     res.status(500).json({ message: 'Error deleting agent', error });
//   }
// });

// // Start the server
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection
mongoose
  .connect(
    'mongodb+srv://itemsdb:itemsdb@itemsdb.u6zye.mongodb.net/itemsdb?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Error connecting to MongoDB Atlas:', err));

// Lead schema and model
const leadSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  vehicleModel: String,
  regNumber: String,
  policyStart: String,
  policyExpiry: String,
  currentProvider: String,
  premium: Number,
  leadStatus: { type: String, default: 'New Lead' },
});

const Lead = mongoose.model('Lead', leadSchema);

// Agent schema and model
const agentSchema = new mongoose.Schema({
  id: { type: Number }, // Auto-increment field
  name: String,
  email: String,
  password: { type: String, required: true }, // Password field (no hashing)
  leadStatus: { type: String, enum: ['Interested', 'On Hold', 'New Lead'], default: 'New Lead' },
  assignedLeads: { type: String, default: '' }, // New field for assigned leads
});

const Agent = mongoose.model('Agent', agentSchema);

// Leads Routes
app.post('/api/leads', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    const savedLead = await newLead.save();
    res.status(201).json(savedLead);
  } catch (error) {
    console.error('Error saving lead:', error);
    res.status(500).json({ message: 'Error saving lead', error });
  }
});

app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find();
    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Error fetching leads', error });
  }
});

app.put('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { leadStatus } = req.body;

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { leadStatus },
      { new: true }
    );

    if (!updatedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead status updated successfully', updatedLead });
  } catch (error) {
    console.error('Error updating lead status:', error);
    res.status(500).json({ message: 'Error updating lead status', error });
  }
});

app.delete('/api/leads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedLead = await Lead.findByIdAndDelete(id);

    if (!deletedLead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    res.status(200).json({ message: 'Lead deleted successfully', deletedLead });
  } catch (error) {
    console.error('Error deleting lead:', error);
    res.status(500).json({ message: 'Error deleting lead', error });
  }
});

// Agents Routes
app.post('/api/agents', async (req, res) => {
  try {
    const { id, name, email, password, leadStatus, assignedLeads } = req.body; // Updated to include `id` and `assignedLeads`

    const newAgent = new Agent({
      id, // Assigning `id` from request body
      name,
      email,
      password,
      leadStatus,
      assignedLeads, // Assigning `assignedLeads` from request body
    });

    const savedAgent = await newAgent.save();
    res.status(201).json(savedAgent);
  } catch (error) {
    console.error('Error saving agent data:', error);
    res.status(500).json({ message: 'Error saving agent data', error });
  }
});

app.get('/api/agents', async (req, res) => {
  try {
    const agents = await Agent.find({}, '-_id'); // Exclude MongoDB's default `_id`
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching agents', error });
  }
});

app.put('/api/agents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { leadStatus } = req.body;

    const updatedAgent = await Agent.findByIdAndUpdate(
      id,
      { leadStatus },
      { new: true }
    );

    if (!updatedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.status(200).json({ message: 'Agent status updated successfully', updatedAgent });
  } catch (error) {
    console.error('Error updating agent status:', error);
    res.status(500).json({ message: 'Error updating agent status', error });
  }
});

app.delete('/api/agents/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedAgent = await Agent.findByIdAndDelete(id);

    if (!deletedAgent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    res.status(200).json({ message: 'Agent deleted successfully', deletedAgent });
  } catch (error) {
    console.error('Error deleting agent:', error);
    res.status(500).json({ message: 'Error deleting agent', error });
  }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));