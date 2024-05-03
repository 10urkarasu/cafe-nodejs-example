const fs = require("fs");
const http = require("http");
const url = require("url");

const host = "127.0.0.1";
const port = 8000;

const data = fs.readFileSync(`${__dirname}/data/data.json`);
const dataObj = JSON.parse(data);
console.log(dataObj);

const tempLayout = fs.readFileSync(
    `${__dirname}/templates/template-layout.html`,
    "utf-8"
);
const tempMain = fs.readFileSync(
    `${__dirname}/templates/template-main.html`,
    "utf-8"
);
const tempMenu = fs.readFileSync(
    `${__dirname}/templates/template-menu.html`,
    "utf-8"
);
const tempContact = fs.readFileSync(
    `${__dirname}/templates/template-contact.html`,
    "utf-8"
);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);
    if (pathname === "/") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        console.log("Anasayfa");
        const output = tempLayout.replace("{%PAGE%}", tempMain);
        res.end(output);
    } else if (pathname === "/menu") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        console.log("Menü");
        const output = tempLayout.replace("{%PAGE%}", tempMenu);
        res.end(output);
    } else if (pathname === "/contact") {
        res.writeHead(200, {
            "Content-type": "text/html",
        });
        console.log("İletişim");
        const output = tempLayout.replace("{%PAGE%}", tempContact);
        res.end(output);
    } else if (pathname === "/index.css") {
        fs.readFile(`${__dirname}/index.css`, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(err);
                return;
            }
            res.writeHead(200, { "Content-Type": "text/css" });
            res.write(data);
            res.end();
        });
    } else if (pathname === "/templates/assets/coffe.png") {
        fs.readFile(`${__dirname}/templates/assets/coffe.png`, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end(err);
                return;
            }
            res.writeHead(200, { "Content-Type": "image/png" });
            res.write(data);
            res.end();
        });
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
