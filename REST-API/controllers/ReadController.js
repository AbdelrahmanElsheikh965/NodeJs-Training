const Todo = require('../models/Todo')

function read(req, res) {
    try {
        let todosData = JSON.parse(Todo.getAllData());
        const statusNeedle = req.query.status
        todosData = (statusNeedle) ? todosData.filter(t => t.status === statusNeedle) : todosData;
        res.render('index', { data: todosData })
    } catch (error) {
        res.status('500').send(`Internal Server Error`);
    }
}

function readTodo(req, res) {
    try {
        const todosData = JSON.parse(Todo.getAllData());
        const target = todosData.find(t => t.id === parseInt(req.params.id))
        if (target) res.send(target);
        else throw new Error
    } catch (error) {
        res.status('404').send(`error - 404 Not Found`);
    }
}

module.exports = {
    read,
    readTodo
}