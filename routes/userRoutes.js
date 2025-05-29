const express = require('express')
const router = express.Router();
const {login,register} = require("../controllers/user")
router.use(express.json());

router.post("/",login)
router.post("/",register)


module.exports = router