const  mongoose = require('mongoose');
const Schema = mongoose.Schema;


const todoSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        default: Date.now,
        required: true,
    },
    user: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Todo', todoSchema);