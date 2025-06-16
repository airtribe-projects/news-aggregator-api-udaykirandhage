
const express = require("express");
const ApiRouter = express.Router(); // Correct initialization
const {GetApi,PutApi} = require("../controllers/Api")
const {validateToken} = require("../Middleswares/Jwt")

ApiRouter.get("/news",[validateToken], GetApi);

ApiRouter.put("/news", PutApi);

module.exports = {ApiRouter};
