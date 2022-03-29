const mongoose = require('mongoose');
// mongodb+srv://sudeep:fsdproject@cluster0.hohd1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const MONGO_URI = 'mongodb://localhost:27017/fsd';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true
        });
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch (error) {
        console.error('Error');
        process.exit();
    }
}

module.exports = connectDB;