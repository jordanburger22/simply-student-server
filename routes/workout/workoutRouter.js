const express = require('express')
const workoutRouter = express.Router()
const Workout = require('../../models/workout/workoutModel')

// GET all workouts for a specific user
workoutRouter.get('/:user/get', async (req, res, next) => {
    try {
        const userParam = req.params.user
        const workouts = await Workout.find({ user: userParam })
        return res.status(200).send(workouts)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// POST (create) a new workout for a specific user
workoutRouter.post('/:user/post', async (req, res, next) => {
    try {
        const userParam = req.params.user
        // Make sure we store the user in the workout document
        const newWorkout = new Workout({
            ...req.body,
            user: userParam
        })
        const savedWorkout = await newWorkout.save()
        return res.status(201).send(savedWorkout)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// PUT (update) an existing workout for a specific user
workoutRouter.put('/:user/put/:workoutId', async (req, res, next) => {
    try {
        const { user, workoutId } = req.params

        // Find and update only if it matches the user and ID
        const updatedWorkout = await Workout.findOneAndUpdate(
            { _id: workoutId, user },
            req.body,
            { new: true } // returns the updated doc
        )

        if (!updatedWorkout) {
            return res.status(404).send({ message: 'Workout not found for this user' })
        }

        return res.status(200).send(updatedWorkout)
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

// DELETE an existing workout for a specific user
workoutRouter.delete('/:user/delete/:workoutId', async (req, res, next) => {
    try {
        const { user, workoutId } = req.params

        // Find and delete only if it matches the user and ID
        const deletedWorkout = await Workout.findOneAndDelete({ _id: workoutId, user })
        if (!deletedWorkout) {
            return res.status(404).send({ message: 'Workout not found for this user' })
        }

        return res.status(200).send({ message: 'Workout successfully deleted' })
    } catch (err) {
        res.status(500)
        return next(err)
    }
})

module.exports = workoutRouter
