const express = require('express');
const Todo = require('../../models/todo/todoModel');
const todoRouter = express.Router();



todoRouter.get('/:user/get', async (req, res, next) => {
    try {
        const user = req.params.user;
        const todos = await Todo.find({ user });
        return res.status(200).send(todos);
    } catch (error) {
        res.status(500)
        return next(error);
    }
});

todoRouter.post('/:user/post', async (req, res, next) => {
    try {
        const user = req.params.user;
        req.body.user = user;
        const newTodo = new Todo(req.body);
        const savedTodo = await newTodo.save();
        return res.status(201).send(savedTodo);
    } catch (error) {
        res.status(500)
        return next(error);
    }
});

todoRouter.put('/:user/put/:todoId', async (req, res, next) => {
    try {
        const user = req.params.user;
        const todoId = req.params.todoId;
        const updatedTodo = await Todo.findOneAndUpdate(
            { _id: todoId, user },
            req.body,
            { new: true }
        );
        return res.status(200).send(updatedTodo);
    } catch (error) {
        res.status(500)
        return next(error);
    }
});

todoRouter.delete('/:user/delete/:todoId', async (req, res, next) => {
    try {
        const user = req.params.user;
        const todoId = req.params.todoId;
        const deletedTodo = await Todo.findOneAndDelete({ _id: todoId, user });
        return res.status(200).send(`Deleted: ${deletedTodo}`);
    } catch (error) {
        res.status(500)
        return next(error);
    }
});

module.exports = todoRouter;