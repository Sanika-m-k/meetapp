const express = require('express');
const mongoose = require('mongoose');

const organizationRouter = express.Router();

const organizationSchema = new mongoose.Schema({
  name: String,
  code: { type: String, unique: true },
  admins: [ ],
  members: [ ],
  tasks: [
    {
      description: String,
      dueDate: String,
      allocatedTime: String,
      assignedTo: [String],
      allocatedBy: String
    }
  ]
});

const Organization = mongoose.model('Organizations', organizationSchema);

const generateCode = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';
  for (let i = 0; i < 10; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

organizationRouter.post('/', async (req, res) => {
  const { name, adminEmail } = req.body;
  let code;

  try {
    do {
      code = generateCode();
    } while (await Organization.findOne({ code }));

    const newOrganization = new Organization({ name, code, admins: [adminEmail], members: [adminEmail] });

    await newOrganization.save();
    res.status(201).json(newOrganization);
  } catch (error) {
    res.status(500).json({ message: 'Error adding organization', error }); 
  }
});

organizationRouter.post('/join', async (req, res) => {
  const { code, email } = req.body;

  try {
    const organization = await Organization.findOne({ code });

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    if (!organization.members.some(member => member === email)) {
      organization.members.push(email);
      await organization.save();
    }

    res.status(200).json(organization);
  } catch (error) {
    res.status(500).json({ message: 'Error joining organization', error });
  }
});

organizationRouter.get('/user/:userId', async (req, res) => {
  const userId = req.params.userId;
  try {
    console.log(`Searching organizations for user: ${userId}`);
    const organizations = await Organization.find({ 'members': userId });
    res.json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error);
    res.status(500).send(error);
  }
});

organizationRouter.get('/code/:code', async (req, res) => {
  const name = req.params.code;
  try {
    const organization = await Organization.findOne({ code });
    res.json(organization);
  } catch (error) {
    res.status(500).send(error);
  }
});

organizationRouter.post('/:orgId/tasks', async (req, res) => {
  const orgId = req.params.orgId;
  const { description, dueDate, allocatedTime } = req.body;
  try {
    const task = { description, dueDate, allocatedTime };
    let organization = await Organization.findOne({ name: orgId });

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    organization.tasks.push(task);

    await organization.save();
    
    res.json(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

organizationRouter.get('/members/:code', async (req, res) => {
  const organizationCode = req.params.code;
  
  try {
    const organization = await Organization.findOne({code:organizationCode} );

    console.log(organization)


    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    res.status(200).json(organization.members);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = organizationRouter;
