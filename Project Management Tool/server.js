const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/projectmanagement', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const projectSchema = new mongoose.Schema({
    name: String,
    tasks: [{ name: String, assignedTo: String, comments: [String] }],
});

const Project = mongoose.model('Project', projectSchema);

// Routes
app.post('/api/projects', async (req, res) => {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json(newProject);
});

app.get('/api/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});