const express = require("express");
const hocPhan = require("../controllers/hocphan.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    router.use(middlewares.verifyToken);

    router.get("/", hocPhan.findAll);
    router.get("/:mahp", hocPhan.find);

    app.use("/api/hocphan", router);
};