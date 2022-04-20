const config = {
    BaseDomain: process.env.BACKEND_BASE_DOMAIN
        ? process.env.BACKEND_BASE_DOMAIN
        : "http://localhost:8080",
    MongoDbConnection: process.env.BACKEND_DB_CONNECTION,
};

export default config;
