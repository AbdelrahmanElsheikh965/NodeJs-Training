const fs = require('fs');

function getAllData() {
    return fs.readFileSync('./todos.json', 'utf8')
}

// To avoid 'TypeError: Todo.getAllData is not a function' :  update exports object
module.exports = {getAllData}