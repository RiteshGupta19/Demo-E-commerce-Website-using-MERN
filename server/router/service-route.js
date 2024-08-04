const express=require("express");
const services = require("../controllers/service-controller");
const { route } = require("./auth-router");

const router=express.Router();

router.route("/service").get(services);

module.exports= router;