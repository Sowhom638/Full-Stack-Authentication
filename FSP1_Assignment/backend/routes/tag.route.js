const express = require("express");
const router = express.Router();
const {
    createTag,
    getAllTag
} = require("../controllers/tag.controller");
const { verifyJWT } = require('../middleware/verifyJWT');

router.post("/", verifyJWT, createTag);
router.get("/", verifyJWT, getAllTag);

module.exports = router;