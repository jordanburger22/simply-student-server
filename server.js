const mongoose = require('mongoose');
const express = require('express');
const app = express();
const morgann = require('morgan');
const exerciseRouter = require('./routes/workout/exerciseRouter');
const ingredientRouter = require('./routes/recipe/ingredientRouter');
const workoutRouter = require('./routes/workout/workoutRouter');
const recipeRouter = require('./routes/recipe/recipeRouter');
const todoRouter = require('./routes/todo/todoRouter');
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(morgann('dev'));



const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to DB');
    } catch (err) {
        console.log(err);
    }
}

connectToDb();

// Workout app routes
app.use('/simply/exercise', exerciseRouter)
app.use('/simply/workout', workoutRouter)


// Recipe app routes
app.use('/simply/ingredient', ingredientRouter)
app.use('/simply/recipe', recipeRouter)

// Todo app routes
app.use('/simply/todo', todoRouter)


app.use((err,req,res,next) => {
    console.log(err);
    return res.send({errMsg: err.message});
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})