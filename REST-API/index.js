const express = require('express');
const router = require('./routes/todos');
const app = express();

// Middleware to parse JSON data
app.use(express.json());

// set ejs as the view engine
app.set('view engine', 'ejs')

// prepare styles directory for serving static files
app.use('/styles', express.static('styles'));

// serve static files (i.e. images)
app.use(express.static('public'));

// image
app.get('/image', (req, res) => {
    res.render('image', { text: "This is beautiful in fayoum." });
})

app.use('/todos', router)

app.listen(3000)