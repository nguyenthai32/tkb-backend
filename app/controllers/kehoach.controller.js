const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const KeHoach = db.KeHoach;
const HocPhan = db.HocPhan;


exports.getAll = async(req, res, next) => {

    const [error, document] = await handle(
        KeHoach.find({
                ownerId: req.userId,
            },
            "-ownerId"))

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

    const [err, kiemtra] = await handle(KeHoach.find({ mahp: data.mahp, ownerId: req.userId }))
    console.log(kiemtra)
    console.log('tag', kiemtra.length)

    if (kiemtra.length === 0) {
        const [error, document] = await handle(KeHoach.create({
            mahp: data.mahp,
            tenhp: data.tenhp,
            tinchi: data.tinchi,
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
    } else {

        res.status(201).send('Hoc Phan da co trong ke hoach')
    }


}

exports.delete = async(req, res, next) => {
    const condition = {
        mahp: req.params.mahp,
        ownerId: req.userId
    }
    const [error, document] = await handle(
        KeHoach.findOneAndDelete(condition, {
            projection: "-ownerId",
        })
    );
    if (error) {
        return next(new BadRequestError(500, 'khong xoa duoc'))
    }
    res.send(document)
}

exports.getNhom = async(req, res, next) => {
    const [error, document] = await handle(KeHoach.find({ ownerId: req.userId }, "-ownerId"))

    if (error) {
        return next(
            new BadRequestError(500, 'loi getAll')
        )
    }
    if (!document) {
        return new BadRequestError(404, 'Khong tim thay ke hoach')
    }
    let ds = []
    for (i = 0; i < document.length; i++) {
        const [err, result] = await handle(HocPhan.distinct('nhom', { mahp: document[i].mahp }));
        console.log(document[i])
        ds[i] = { nhom: result };
    }
    const kq = ds.map((v, i) => Object.assign(v, document[i]['_doc']))
    res.send(kq);

}

exports.getTkb = async(req, res, next) => {
    console.log(req.params.mahp)
    console.log(typeof req.params.nhom)
    const [error, document] = await handle(HocPhan.find({ mahp: req.params.mahp, nhom: req.params.nhom }, { mahp: 1, thu: 1, tietbd: 1, sotiet: 1, nhom: 1 }))

    if (error) {
        return next(
            new BadRequestError(500, 'loi lay tkb')
        )
    }
    if (!document) {
        return new BadRequestError(404, 'Khong tim thay tkb')
    }
    res.send(document)
}