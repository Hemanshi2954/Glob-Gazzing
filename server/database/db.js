import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const Connection = async () => {
    const { DB_USERNAME, DB_PASSWORD } = process.env;
    const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@blog-website-db.rlxucag.mongodb.net/?retryWrites=true&w=majority&appName=Blog-Website-db`;
    console.log(DB_USERNAME)
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;