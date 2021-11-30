const { BadRequestError } = require("../helpers/errors");
const handle = require("../helpers/promise");
const db = require("../models");
const HocPhan = db.HocPhan;


// Retrieve all contacts of a user from the database
exports.findAll = async(req, res, next) => {

    const [error, document] = await handle(
        HocPhan.find()
    )
    if (error) {
        throw error
    }
    return res.send(document);
};

// Find a single contact with an id
exports.find = async(req, res, next) => {



    const condition = {
        mahp: {
            $regex: `.*${req.params.mahp}.*`,
            $options: 'i'
        }
    }

    const [error, document] = await handle(
        HocPhan.aggregate([{
                "$match": condition,
            },
            {
                "$group": {
                    '_id': {
                        mahp: "$mahp",
                        tenhp: "$tenhp",
                        tinchi: "$tinchi"
                    }
                }
            }, {
                "$project": {
                    '_id': 0,
                    mahp: "$_id.mahp",
                    tenhp: "$_id.tenhp",
                    tinchi: "$_id.tinchi"
                }
            },
        ])
    );

    if (error) {
        return next(
            new BadRequestError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }

    if (!document) {
        return next(new BadRequestError(404, "Contact not found"));
    }

    return res.send(document);
};