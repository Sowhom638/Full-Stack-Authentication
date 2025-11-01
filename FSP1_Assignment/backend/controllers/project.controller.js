const Project = require("../models/project.model");

async function createProject(req, res) {
    try {
        const { name, description } = req.body;
        if (name && description) {
            const newProject = new Project({ name: name.trim(), description });
            const savedProject = await newProject.save();
            return res.status(200).json({ message: "Project is created", project: savedProject });
        } else {
            return res.status(404).json({ message: 'Missing required fields' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while creating the project', error });
    }
}

async function getAllProjects(req, res) {
    try {
        const projects = await Project.find();
        if (projects.length > 0) {
            return res.status(200).json({ message: "Projects are found", projects });
        }else {
        return res.status(404).json({ message: 'Projects are not found' });
    }
} catch (error) {
    return res.status(400).json({ message: 'Error while fetching the projects', error });
}
}

async function getProjectById(req, res) {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            return res.status(200).json({ message: "Project is found", project });
        }else {
        return res.status(404).json({ message: 'Project is not found' });
    }
} catch (error) {
    return res.status(400).json({ message: 'Error while fetching the project', error });
}
}

module.exports = {
    createProject,
    getAllProjects,
    getProjectById
}