// server.js
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgan = require('morgan');
const exerciseRouter = require('./routes/workout/exerciseRouter');
const ingredientRouter = require('./routes/recipe/ingredientRouter');
const workoutRouter = require('./routes/workout/workoutRouter');
const recipeRouter = require('./routes/recipe/recipeRouter');
const todoRouter = require('./routes/todo/todoRouter');
const Token = require('./models/token');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to DB');
    } catch (err) {
        console.log(err);
    }
};

connectToDb();

// Authentication middleware
const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Expecting "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ errMsg: 'No token provided' });
    }

    try {
        const validToken = await Token.findOne({ token });
        if (!validToken) {
            return res.status(403).json({ errMsg: 'Invalid or expired token' });
        }
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        res.status(500).json({ errMsg: 'Server error during authentication' });
    }
};

// Public route to generate an API token (unprotected)
app.post('/api/generate-token', async (req, res) => {
    try {
        const newToken = new Token({
            token: require('crypto').randomBytes(32).toString('hex')
        });
        const savedToken = await newToken.save();
        res.status(201).json({
            token: savedToken.token,
            message: "Make sure to save this token for future use, it will not be shown again"
        });
    } catch (error) {
        console.error('Error generating token:', error);
        res.status(500).json({ errMsg: 'Failed to generate token' });
    }
});

// Protect all /simply/* routes
app.use('/simply', authenticateToken, (req, res, next) => {
    // This is a pass-through middleware to allow subsequent route handlers
    next();
});

// Workout app routes (now protected)
app.use('/simply/exercise', exerciseRouter);
app.use('/simply/workout', workoutRouter);

// Recipe app routes (now protected)
app.use('/simply/ingredient', ingredientRouter);
app.use('/simply/recipe', recipeRouter);

// Todo app routes (now protected)
app.use('/simply/todo', todoRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.log(err);
    return res.send({ errMsg: err.message });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});