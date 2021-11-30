const express = require("express");
const KeHoach = require("../controllers/kehoach.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    router.use(middlewares.verifyToken);

    router.get("/", KeHoach.getAll);
    router.get("/getNhom", KeHoach.getNhom);
    router.get("/getTkb/:mahp/:nhom", KeHoach.getTkb);
    router.post('/', KeHoach.add);
    router.delete('/:mahp', KeHoach.delete);

    app.use("/api/kehoach", router);
};