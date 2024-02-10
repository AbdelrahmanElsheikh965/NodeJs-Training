const fs = require('fs');

function getAllData() {
    return fs.readFileSync('./todos.json', 'utf8')
}

function deleteAllData() {
    fs.writeFileSync('./todos.json', JSON.stringify([], null, 2))
    return;
}

// To avoid 'TypeError: Todo.getAllData is not a function' :  update exports object
module.exports = {
    getAllData,
    deleteAllData
}