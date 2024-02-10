const Todo = require('../models/Todo')
const helper = require('./helper');
const fs = require('fs');

function create(req, res) {
    const [title, status = "to-do"] = [req.body.title, req.body.status];

    try {
        let todosData = JSON.parse(Todo.getAllData());

        if (typeof title !== 'string' || title.length < 10) {
            res.send('Error, Check your input...').status('403')
        } else {
            const newTodo = {
                id: (todosData.length > 0) ? todosData[todosData.length - 1].id + 1 : 1,
                title: req.body.title,
                status: status
            }

            todosData.push(newTodo);
            fs.writeFileSync('./todos.json', JSON.stringify(todosData, null, 2))
            res.send(newTodo);
        }

    } catch (error) {
        res.status('404').send(`error: Not found`);
    }

}

function update(req, res) {

    const patchCallback = (target, todosData) => {
        const [title, status = target.status] = [req.body.title, req.body.status]
        const allowedStatuses = ["to-do", "done", "in-progress"];

        // validation
        if (typeof title !== 'string' || !allowedStatuses.includes(status)) {
            res.status(403).send("Bad input")
        } else {

            target.id = (req.body.id) ?? target.id
            target.title = (req.body.title) ?? target.title
            target.status = (req.body.status) ?? target.status

            fs.writeFileSync('./todos.json', JSON.stringify(todosData, null, 2))
            res.send(target);
        }
    };

    // passing a reference to a function as a callback
    helper(req, res, patchCallback)
}

function deleteTodo(req, res) {
    helper(req, res, (target, todosData) => {
        todosData = todosData.filter(t => t.id !== parseInt(target.id))
        fs.writeFileSync('./todos.json', JSON.stringify(todosData, null, 2))
        res.send('deleted');
    })
}

module.exports = {
    create,
    update,
    deleteTodo
}