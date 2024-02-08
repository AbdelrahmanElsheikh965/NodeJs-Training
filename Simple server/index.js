const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  if (req.url === '/') {
    const indexPath = path.join(__dirname, 'index.html');
    fs.readFile(indexPath, 'utf8', (err, htmlContent) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
        return;
      }
      const dynamicData = { greeting: 'Hello, World!' };
      const modifiedHtml = htmlContent.replace('{{greeting}}', dynamicData.greeting);
      res.setHeader('Content-Type', 'text/html');
      res.end(modifiedHtml);
    });
  }

  else if (req.url === '/data') {
    let todosData = '';
    const readStream = fs.createReadStream('todos.json', { encoding: 'utf8' });
    readStream.on('data', (chunkOfData) => {
      todosData += chunkOfData;
    });
    readStream.on('end', () => {
      const jsonData = JSON.parse(todosData);
      for (const todo of jsonData) delete todo.id;
      const finalData = JSON.stringify(jsonData, null, "\t");
      res.setHeader('Content-Type', 'application/json');
      res.write(finalData);
      res.end();
    });
    readStream.on('error', (error) => {
      console.error('Error reading file:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    });
  }

  else if (req.url === '/style') {
    const cssPath = path.join(__dirname, 'style.css');
    const readStream = fs.createReadStream(cssPath);
    res.setHeader('Content-Type', 'text/css');
    readStream.pipe(res);
  }

  else if (req.url === '/get-image') {
    const imagePath = 'image.jpg';
    const readStream = fs.createReadStream(imagePath);
    res.setHeader('Content-Type', 'image/jpg');   // optional but nice to have
    readStream.pipe(res);
  }

  else if (req.url === '/download') {
    const imagePath = path.join(__dirname, 'image.jpg');
    res.setHeader('Content-Disposition', 'attachment; filename="image.jpg"');
    res.setHeader('Content-Type', 'image/jpg');
    const readStream = fs.createReadStream(imagePath);
    readStream.pipe(res);
  }

  else if (req.url === '/astronomy') {
    res.write('<html>');
    res.write('<head><title>image</title></head>')
    res.write('<body> <img src="http://localhost:3000/get-image" width="600px" height="400px"> <br><br> </body>')
    res.write('<strong> Desc : </strong> this is a description for it </strong>')
    res.write('<a href="http://localhost:3000/download"> Download')
    res.write('</html>');
    res.end();
  }

  else {
    res.write('<html>');
    res.write('<head><title>Nothing is here</title></head>')
    res.write('<body> 404 </body>')
    res.write('</html>');
    res.end();
  }

});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
