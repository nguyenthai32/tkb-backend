const mongoose = require("mongoose");
const createHocPhanModel = require("./hocohan.model");
const createKeHoachModel = require('./kehoach.model')
const createThoiKhoaBieuModel = require('./thoikhoabieu.model')
const createUserModel = require("./user.model");

const db = {};
db.mongoose = mongoose;
db.HocPhan = createHocPhanModel(mongoose);
db.KeHoach = createKeHoachModel(mongoose);
db.ThoiKhoaBieu = createThoiKhoaBieuModel(mongoose);
db.User = createUserModel(mongoose);

module.exports = db;