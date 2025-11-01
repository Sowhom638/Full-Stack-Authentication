const express = require("express")
const router = express.Router();

const { verifyJWT } = require('../middleware/verifyJWT');
const {
    createUser,
    loginUser,
    getAllUser,
    getMe
} = require("../controllers/user.controller");

router.post('/login', loginUser);
router.post('/signup', createUser);
router.get('/users', verifyJWT, getAllUser);
router.get('/me', verifyJWT, getMe);

module.exports = router;