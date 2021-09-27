import { connect } from "mongoose";

require('dotenv').config();
const host = process.env.DEV_DB_HOST ? process.env.DEV_DB_HOST : 'localhost'
const port = process.env.DEV_DB_PORT ? process.env.DEV_DB_PORT : 27017
const name = process.env.DEV_DB_NAME ? process.env.DEV_DB_NAME : 'melhorcom'
const URI = `mongodb://${host}:${port}/${name}`;

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