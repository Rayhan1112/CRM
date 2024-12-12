
// const express = require('express');
// const Agent = require('./agentSchema');
// const bcrypt = require('bcrypt'); // For password hashing

// const router = express.Router();

// // POST route to create a new agent
// router.post('/', async (req, res) => {
//   try {
//     const { name, email, password, leadStatus } = req.body;

//     // Hash the password before saving it
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newAgent = new Agent({
//       name,
//       email,
//       password: hashedPassword,
//       leadStatus,
//     });

//     const savedAgent = await newAgent.save();
//     res.status(201).json(savedAgent);
//   } catch (error) {
//     console.error('Error saving agent:', error);
//     res.status(500).json({ message: 'Error saving agent', error });
//   }
// });

// module.exports = router;
const express = require('express');
const Agent = require('./agentSchema');
const bcrypt = require('bcrypt'); // For password hashing

const router = express.Router();

// POST route to create a new agent
router.post('/', async (req, res) => {
  try {
    const { id, name, email, password, leadStatus, assignedLeads } = req.body; // Added `id` and `assignedLeads`

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new Agent({
      id, // Assign `id` from request body
      name,
      email,
      password: hashedPassword,
      leadStatus,
      assignedLeads, // Assign `assignedLeads` from request body
    });

    const savedAgent = await newAgent.save();
    res.status(201).json(savedAgent);
  } catch (error) {
    console.error('Error saving agent:', error);
    res.status(500).json({ message: 'Error saving agent', error });
  }
});

module.exports = router;
