const Todo = require('../models/Todo')

function helper(req, res, callback) {
    try {
        let todosData = JSON.parse(Todo.getAllData());
        const target = todosData.find(t => t.id === parseInt(req.params.id))
        callback(target, todosData);
    } catch (error) {
        res.status('404').send('error 404 - not found');
    }
}

module.exports = helper;