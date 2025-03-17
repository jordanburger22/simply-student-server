const express = require('express')
const recipeRouter = express.Router()
const Recipe = require('../../models/recipe/recipeModel') // Adjust the path as needed

// GET all recipes for a specific user
recipeRouter.get('/:user/get', async (req, res, next) => {
    try {
        const userParam = req.params.user
        const recipes = await Recipe.find({ user: userParam })
        return res.status(200).send(recipes)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// GET a single recipe by ID for a specific user (optional pattern)
recipeRouter.get('/:user/get/:recipeId', async (req, res, next) => {
    try {
        const { user, recipeId } = req.params
        const recipe = await Recipe.findOne({ _id: recipeId, user })

        if (!recipe) {
            return res.status(404).send({ message: 'Recipe not found for this user' })
        }
        return res.status(200).send(recipe)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// POST (create) a new recipe for a specific user
recipeRouter.post('/:user/post', async (req, res, next) => {
    try {
        const userParam = req.params.user
        // Include the user in the new recipe document
        const newRecipe = new Recipe({
            ...req.body,
            user: userParam
        })
        const savedRecipe = await newRecipe.save()
        return res.status(201).send(savedRecipe)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// PUT (update) an existing recipe for a specific user
recipeRouter.put('/:user/put/:recipeId', async (req, res, next) => {
    try {
        const { user, recipeId } = req.params

        // Update only if _id and user match
        const updatedRecipe = await Recipe.findOneAndUpdate(
            { _id: recipeId, user },
            req.body,
            { new: true } // returns the updated document
        )

        if (!updatedRecipe) {
            return res.status(404).send({ message: 'Recipe not found for this user' })
        }

        return res.status(200).send(updatedRecipe)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// DELETE an existing recipe for a specific user
recipeRouter.delete('/:user/delete/:recipeId', async (req, res, next) => {
    try {
        const { user, recipeId } = req.params

        // Delete only if _id and user match
        const deletedRecipe = await Recipe.findOneAndDelete({ _id: recipeId, user })
        if (!deletedRecipe) {
            return res.status(404).send({ message: 'Recipe not found for this user' })
        }

        return res.status(200).send({ message: 'Recipe successfully deleted' })
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = recipeRouter
