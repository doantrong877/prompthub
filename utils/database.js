import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('MongoDB is Connected');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'share_prompt',
            // No need for useNewUrlParser and useUnifiedTopology
        });

        isConnected = true;
        console.log('MongoDB is Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Optionally rethrow error to handle it elsewhere
    }
};
