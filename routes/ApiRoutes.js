
const express = require("express");
const ApiRouter = express.Router(); // Correct initialization
const {GetApi,PutApi} = require("../controllers/Api")

ApiRouter.get("/news", GetApi);

ApiRouter.put("/news", PutApi);

module.exports = {ApiRouter};
