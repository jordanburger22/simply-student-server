const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ingredientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    foodType: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Ingredient", ingredientSchema) 