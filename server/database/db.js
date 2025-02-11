import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Connection = async () => {
    const { DB_USERNAME, DB_PASSWORD } = process.env;
    const URL = process.env.DB_URL;
    console.log(DB_USERNAME)
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;