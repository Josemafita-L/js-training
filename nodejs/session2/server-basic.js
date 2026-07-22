// const http = require('http');

// // Create an HTTP server.
// // req (request) contains information sent by the client.
// // res (response) is used to send data back to the client.
// const server = http.createServer((req, res) => {

//     // Send HTTP status code 200 and response headers.
//     res.writeHead(200, { 'Content-Type': 'text/plain' });

//     // Send the response body and end the request.
//     res.end('Hello from Node.js!');
// });

// // Start the server on port 3000.
// server.listen(3000, () => {
//     console.log('Server running at http://localhost:3000');
// });

const http = require('http');
// req (request) contains information sent by the client,
// such as the HTTP method, URL, and headers.
// res (response) is used by the server to send data
// back to the client.
const server = http.createServer((req, res) => {

    // Logs the HTTP method and requested URL.
    console.log(`${req.method} ${req.url}`);

    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });

    res.end('Hello from Node.js!');
});
// req.method returns the HTTP request method (GET, POST, etc.).
// req.url returns the requested route or path.
server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});