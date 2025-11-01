const Task = require("../models/task.model");

async function createTask(req, res) {
    try {
        const { name, project, team, owners, tags, timeToComplete, status } = req.body;
        if (name && project && team && owners && tags && timeToComplete && status) {
            const newTask = new Task({ name, project, team, owners, tags, timeToComplete, status });
            const savedTask = await newTask.save();
            return res.status(200).json({ message: "Task is created", task: savedTask });
        } else {
            return res.status(404).json({ message: 'Missing required fields' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while creating the task', error });
    }
}

async function getAllTasks(req, res) {
    try {
        const tasks = await Task.find().populate(["project", "team", "owners"])
        if (tasks.length > 0) {
            return res.status(200).json({ message: "Tasks are found", tasks });
        } else {
            return res.status(404).json({ message: 'Tasks are not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while fetching the tasks', error });
    }
}

async function getTaskById(req, res) {
    try {
        const task = await Task.findById(req.params.id).populate(["project", "team", "owners"])
        if (task) {
            return res.status(200).json({ message: "Task is found", task });
        } else {
            return res.status(404).json({ message: 'Task is not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while fetching the task', error });
    }
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById
}
