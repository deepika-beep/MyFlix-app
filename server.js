//  imports the http module and listens for requests on port 8080.
const http = require("http");
const fs = require("fs");
const url = require("url");

// For incoming requests, parse the request.url to determine if the URL contains the word “documentation”
http
  .createServer((request, response) => {
    let addr = request.url,
      q = url.parse(addr, true),
      filePath = "";
    // For all requests coming in to  “server.js” file, use the fs module to log both the request URL and a timestamp to the “log.txt” file.
    fs.appendFile(
      "log.txt",
      "Url:" + addr + "\ntimestamp:" + new Date() + "\n",
      err => {
        if (err) {
          console.log(err);
        } else {
          console.log("added to log");
        }
      }
    );

    // If URL contains the word “documentation return the “documentation.html” file to the user, otherwise return the “index.html” file.
    if (q.pathname.includes("documentation")) {
      filePath = __dirname + "/documentation.html";
    } else {
      filePath = "index.html";
    }
    fs.readFile(filePath, (err, data) => {
      if (err) {
        throw err;
      }
      response.writeHead(200, { "Content-type": "text/html" });
      response.write(data);
      response.end();
    });
  })
  .listen(8080);

console.log("My first Node test server is running on Port 8080.");
