const http = require('http');

const server = http.createServer((req, res) => {

    console.log(`${req.method} ${req.url}`);

    if (req.url === '/') {

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('Home page');

    } else if (req.url === '/about') {

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });

        res.end('About page');

    } else if (req.url === '/status') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            status: 'ok',
            uptime: process.uptime()
        }));

    } else {

        res.writeHead(404, {
            'Content-Type': 'text/plain'
        });

        res.end('404 - Page not found');

    }

});

server.listen(3001, () => {
    console.log('Server running at http://localhost:3001');
});

/*
process.uptime() returns the number of seconds
the Node.js process has been running since the server started.
*/

/*
Content-Type: application/json tells the browser
that the response is JSON data instead of plain text or HTML.
The browser or client can then parse the response correctly.
*/