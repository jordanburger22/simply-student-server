const express = require('express')
const ingredientRouter = express.Router()
const Ingredient = require('../../models/recipe/ingredientModel')

ingredientRouter.post("/", async (req, res, next) => {
    try {
        const ingredientData = req.body

        if (!Array.isArray(ingredientData) || ingredientData.length === 0) {
            return res.status(400).send({ message: "Request body must be a non-empty array of exercises." })
        }

        // Insert multiple documents into the Exercises collection
        const savedIngredients = await Ingredient.insertMany(ingredientData)
        return res.status(201).send(savedIngredients)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})


ingredientRouter.get("/", async (req, res, next) => {
    try {
        const ingredients = await Ingredient.find()
        return res.status(200).send(ingredients)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = ingredientRouter