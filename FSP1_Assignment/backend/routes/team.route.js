const express = require("express")
const router = express.Router();

const { verifyJWT } = require('../middleware/verifyJWT');
const {
    createTeam,
    getAllTeam
} = require("../controllers/team.controller");

router.post('/', verifyJWT, createTeam);
router.get('/', verifyJWT, getAllTeam);

module.exports = router;