const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Workout', workoutSchema);