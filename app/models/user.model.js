module.exports = mongoose => {
    const schema = mongoose.Schema({
        username: {
            type: String,
            required: [true, "Username is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
    });

    return mongoose.model("user", schema);
};