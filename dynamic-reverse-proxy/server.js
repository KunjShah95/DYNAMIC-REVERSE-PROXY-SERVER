import httpProxy from 'http-proxy';
import http from 'http';

const proxy = httpProxy.createProxyServer({});

const server = http.createServer((req, res) => {
    const target = req.headers['x-target'];
    // expecting the target url in the header
    if (target) {
        proxy.web(req, res, { target }, (err) => {
            res.writeHead(502);
            res.end('Bad Gateway');
        });
    } else {
        res.writeHead(400);
        res.end('No target specified');
    }
});

server.listen(3000, () => {
    console.log("Dynamic Reverse Proxy listening on port 3000");
});