const express = require('express')
const exerciseRouter = express.Router()
const Exercise = require('../../models/workout/exerciseModel')

exerciseRouter.post("/", async (req, res, next) => {
    try {
        // Expecting req.body to be an array of exercise objects
        // e.g. [{ name: "Bench Press", muscleGroup: "Chest" }, ...]
        const exercisesData = req.body

        if (!Array.isArray(exercisesData) || exercisesData.length === 0) {
            return res.status(400).send({ message: "Request body must be a non-empty array of exercises." })
        }

        // Insert multiple documents into the Exercises collection
        const savedExercises = await Exercise.insertMany(exercisesData)
        return res.status(201).send(savedExercises)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})


exerciseRouter.get("/", async (req, res, next) => {
    try {
        const exercises = await Exercise.find()
        return res.status(200).send(exercises)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = exerciseRouter