const express = require("express")
const router = express.Router();

const { verifyJWT } = require('../middleware/verifyJWT');
const {
    createTask,
    getAllTasks,
    getTaskById
} = require("../controllers/task.controller");

router.post('/', verifyJWT, createTask);
router.get('/', verifyJWT, getAllTasks);
router.get('/:id', verifyJWT, getTaskById);

module.exports = router;