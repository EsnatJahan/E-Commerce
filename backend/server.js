import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB connected: ${conn.connection.host}`);
    }catch (error) {
        console.error(error);
        process.exit(1);
    }
}

export default connectToDatabase;