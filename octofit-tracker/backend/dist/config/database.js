import mongoose from 'mongoose';
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;
mongoose
    .connect(connectionString)
    .then(() => {
    console.log('Connected to octofit_db');
})
    .catch((error) => {
    console.warn('MongoDB connection failed. Continuing without database for local API development.', error instanceof Error ? error.message : error);
});
db.on('error', console.error.bind(console, 'connection error:'));
export default db;
