const fs = require('fs');
const server = require('http');

// change this scope
var todosData = '';

/**
 * Use streams for the image (think of chunking - buffer - concat())
 * Add a description below it
 * Style the home page with css files (think of .replace())
 * Make an option to download the image (usually using a button)
 */

/** -----------Todos File ----------------------- */
const readStream = fs.createReadStream('todos.json');
readStream.setEncoding('UTF8');

readStream.on('data', (chunckOfData) => {
    todosData += chunckOfData;
});


// initiate a server
server.createServer(function (req, res) {

    if (req.url === '/') {
        // convert from string to Json
        var newData = JSON.parse(todosData);

        // delete id for each todo element
        for (var todo of newData) {
            delete todo.id;
        }

        // convert back again to string with pretty presentation
        const FinalData = JSON.stringify(newData, null, "\t")
        res.write(FinalData);
        res.end();

    }else if (req.url === '/get-image') {
        const imagePath = 'image.jpg';
        const readStream = fs.createReadStream(imagePath);
        // res.setHeader('Content-Type', 'image/jpg'); 
        readStream.pipe(res);
        
    } else if (req.url === '/style.css') {

        const cssPath = path.join(__dirname, 'style.css');
        const readStream = fs.createReadStream(cssPath);
        res.setHeader('Content-Type', 'text/css');
        readStream.pipe(res);
        
    } else  if (req.url === '/astronomy') {
        
        res.write('<html>');
        res.write('<head><title>image</title></head>')
        res.write('<link rel="stylesheet" href="style.css">')
        res.write('<body> <img src="http://localhost:3000/get-image" width="600px" height="400px"> <br><br> </body>')
        res.write('<strong> Desc : </strong> this is a description for it ')
        res.write('</html>');
        res.end();
    } else {

        res.write('<html>');
        res.write('<head><title>No</title></head>')
        res.write('<body> 404 </body>')
        res.write('</html>');
        res.end();
    }

    // write to the response
}).listen(3000, () => console.log('listening ...'));


