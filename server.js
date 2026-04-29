const http = require("http");
const fs = require("fs");
const path = require("path");

const port = 5500;
const host = "127.0.0.1";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
};

http
  .createServer((request, response) => {
    let route = decodeURIComponent(request.url.split("?")[0]);
    if (route === "/") route = "/index.html";

    const filePath = path.join(__dirname, route);
    if (!filePath.startsWith(__dirname)) {
      response.writeHead(403);
      response.end("Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        response.writeHead(404);
        response.end("Not found");
        return;
      }

      response.writeHead(200, {
        "Content-Type": types[path.extname(filePath)] || "application/octet-stream",
      });
      response.end(data);
    });
  })
  .listen(port, host, () => {
    console.log(`Portfolio running at http://${host}:${port}`);
  });
