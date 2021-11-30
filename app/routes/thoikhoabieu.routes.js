const express = require("express");
const Tkb = require("../controllers/thoikhoabieu.controller");
const middlewares = require("../middlewares");

module.exports = app => {
    const router = express.Router();

    router.use(middlewares.verifyToken);

    router.get("/", Tkb.getAll);
    router.post('/', Tkb.add);
    router.delete('/:id', Tkb.delete);

    app.use("/api/tkb", router);
};