module.exports = mongoose => {
    const schema = mongoose.Schema({
        tenTkb: {
            type: String,
        },
        data: {
            type: Array,
        },
        ownerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },

    }, { timestamps: true });
    // Replace _id with id and remove __V
    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    return mongoose.model("thoikhoabieu", schema);
};