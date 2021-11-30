module.exports = mongoose => {
    const schema = mongoose.Schema({
        mahp: {
            type: String,
        },
        tenhp: {
            type: String
        },
        sotc: {
            type: String
        },
        nhom: {
            type: String
        }
    }, { timestamps: true });

    // Replace _id with id and remove __V
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("DanhSachNhomHocPhan", schema);
};