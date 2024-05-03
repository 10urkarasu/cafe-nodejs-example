const fs = require("fs");
const http = require("http");
const url = require("url");

const host = "127.0.0.1";
const port = 8000;

const data = fs.readFileSync(`${__dirname}/data/data.json`);
const dataObj = JSON.parse(data);
console.log(dataObj);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    if (pathname === "/") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        console.log("Anasayfa");
        res.end();
    } else if (pathname === "/menu") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        console.log("Menü");
        res.end();
    } else if (pathname === "/contact") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        console.log("İletişim");
        res.end();
    } else {
        res.writeHead(404, {
            "Content-type": "text/html",
        });
        res.end("<h1>Page not found!</h1>");
    }
});

server.listen(port, host, () => {
    console.log(`Listening to requests from ${host} on port ${port}`);
});
