// const read = require('./controllers/read');
const EditController = require('../controllers/EditController');
const readController = require('../controllers/ReadController');

const fs = require('fs');
const router = require('express').Router();


// Root | Home | Main
router.get('/', (req, res) => {
    readController.read(req, res)
});

// Specific resource + Validation if not found
router.get('/:id', (req, res) => {
    readController.readTodo(req, res);
});

// Create a new resource + Validation -> [title {string - minimum:10}, status {string}]
router.post('/', (req, res) => {
    EditController.create(req, res);
})


// Update a resource + Validation if not found + Validation on input
router.patch('/:id', (req, res) => {
    EditController.update(req, res)
})

// Delete a resource + Validation if not found
router.delete('/:id', (req, res) => {
    EditController.deleteTodo(req, res)
})

module.exports = router