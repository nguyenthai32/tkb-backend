const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
// const { ThoiKhoaBieu } = require("../models");
const db = require("../models");
const Tkb = db.ThoiKhoaBieu;


exports.getAll = async(req, res, next) => {

    const [error, document] = await handle(Tkb.find({ ownerId: req.userId }, "-ownerId"))

    if (error) {
        return next(
            new BadRequestError(500, 'loi getAll')
        )
    }
    if (!document) {
        return new BadRequestError(404, 'Khong tim thay ke hoach')
    }
    res.send(document)

}
exports.add = async(req, res, next) => {

    const data = req.body
    console.log('tag', data)


    const [error, document] = await handle(
        Tkb.create({
            tenTkb: data.tenTkb,
            data: data.detail,
            ownerId: req.userId
        }))

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error add with this data!`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }
    res.send(document)



}

exports.delete = async(req, res, next) => {
    const condition = {
        _id: req.params.id,
        ownerId: req.userId,
    }
    const [error, document] = await handle(
        Tkb.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(new BadRequestError(500, 'khong xoa duoc'))
    }
    res.send(document)
}