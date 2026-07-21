const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const filePath = path.join(__dirname, 'data.json');

const server = http.createServer((req, res) => {

    console.log(`${req.method} ${req.url}`);

    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (req.method === 'GET' && req.url === '/users') {

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        return res.end(JSON.stringify(users));

    }

    else if (req.method === 'GET' && req.url === '/users/top') {

        const topUsers = users.filter(user => user.score >= 90);

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        return res.end(JSON.stringify(topUsers));

    }

    else if (req.method === 'GET' && req.url.startsWith('/users/')) {

        const id = parseInt(req.url.split('/')[2]);

        const user = users.find(u => u.id === id);

        if (user) {

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            return res.end(JSON.stringify(user));

        }

        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        return res.end(JSON.stringify({
            error: 'User not found'
        }));

    }

    else if (req.method === 'GET' && req.url === '/health') {

        const totalMB = Math.round(os.totalmem() / 1024 / 1024);
        const freeMB = Math.round(os.freemem() / 1024 / 1024);

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        return res.end(JSON.stringify({
            status: 'ok',
            platform: os.platform(),
            memory: {
                totalMB,
                freeMB
            },
            uptime: process.uptime()
        }));

    }

    else {

        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            error: 'Route not found'
        }));

    }

});

server.listen(3000, () => {

    console.log('Server running at http://localhost:3000');

});

/*
Health check endpoints are used to monitor whether a backend service is
running correctly. Monitoring tools like Docker, Kubernetes, cloud load
balancers, and uptime monitoring services periodically call this endpoint
to verify that the application is healthy and responsive.
*/