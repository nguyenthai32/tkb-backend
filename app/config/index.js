const config = {
    app: {
        port: process.env.PORT || 3939
    },
    db: {
        url: "mongodb://localhost:27017/thoikhoabieu"
    },
    jwt: {
        secret: "contactbook-secret-key"
    }
};

module.exports = config;