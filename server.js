const http = require("http");
url = require("url");

http
  .createServer((request, response) => {
    let addr = request.url,
      q = url.parse(addr, true),
      filePath = "";
    fs.appendFile(
      "log.txt",
      "Url:" + addr + "\ntimestamp" + newDate() + "\n",
      err => {
        if (err) {
          console.log(err);
        } else {
          console.log("added to log");
        }
      }
    );
    if (q.pathName.includes("documentation")) {
      filePath = __dirName + "/documentation.html";
    } else {
      filePath = "index.html";
    }
  })
  .listen(8080);

console.log("My first Node test server is running on Port 8080.");
