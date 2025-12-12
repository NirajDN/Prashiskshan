const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/uploads', express.static('uploads'));

// Database Connection
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB
        // You should put your connection string in the .env file
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/prashikshan';
        const conn = await mongoose.connect(uri);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        // If local connection fails, we don't exit to allow the server to still serve simple routes if desired,
        // but in a real app you might want to exit.
        // process.exit(1);
    }
};

// Basic Route
app.get('/', (req, res) => {
    res.json({ message: 'Prashikshan API is running successfully!' });
});

app.use('/api/internships', require('./routes/internships'));
app.use('/api/applications', require('./routes/applications'));
app.use('/api/users', require('./routes/users'));

// Start Server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Network access allowed`);
    connectDB();
});
