import { connect } from "mongoose";

require('dotenv').config();

const databaseConfig = {
    URI: '',
    mongooseConfig: {}
};


databaseConfig.URI = `mongodb+srv://${process.env.DEV_DB_USER}:${process.env.DEV_DB_PASS}@${process.env.DEV_DB_HOST}/${process.env.DEV_DB_NAME}?retryWrites=true&w=majority`;


databaseConfig.mongooseConfig = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
};
const URI = `mongodb://${process.env.DEV_DB_HOST}:${process.env.DEV_DB_PORT}/${process.env.DEV_DB_NAME}`;

const mongoConnect = () => {

    connect(URI, (err) => {
        if (err) {
            console.log('Error to connect the database');
            console.log("🚀 ~ err", err);
        } else {
            console.log('🚀 Mongodb connected');
        }
    });
};

export default { mongoConnect }