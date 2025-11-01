const Team = require("../models/team.model");

async function createTeam(req, res) {
    try {
        const { name } = req.body;
        if (name) {
            const newTeam = new Team({ name: name.trim() });
            const savedYeam = await newTeam.save();
            return res.status(200).json({ message: "Team is created", team: savedYeam });
        } else {
            return res.status(404).json({ message: 'Missing required fields' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while creating the team', error });
    }
}

async function getAllTeam(req, res) {
    try {
        const teams = await Team.find();
        if (teams.length > 0) {
            return res.status(200).json({ message: "Teams are found", teams });
        } else {
            return res.status(404).json({ message: 'Teams are not found' });
        }
    } catch (error) {
        return res.status(400).json({ message: 'Error while fetching the teams', error });
    }
}

module.exports = {
    createTeam,
    getAllTeam
}