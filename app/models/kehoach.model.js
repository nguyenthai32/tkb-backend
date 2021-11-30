module.exports = mongoose => {
    const schema = mongoose.Schema({
        mahp: {
            type: String,
        },
        tenhp: {
            type: String
        },
        tinchi: {
            type: String
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

    return mongoose.model("kehoach", schema);
};