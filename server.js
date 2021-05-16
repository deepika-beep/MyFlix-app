// const http = require("http");
// http
//   .createServer((request, response) => {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("welcome to my club\n");
//   })
//   .listen(8080);
// console.log("my node server is running on port 8080");
// const express = require("express");
// const app = express();

// let topBooks = [
//   {
//     title: "Harry Potter and the Sorcerer's Stone",
//     author: "J.K. Rowling"
//   },
//   {
//     title: "Lord of the Rings",
//     author: "J.R.R. Tolkien"
//   },
//   {
//     title: "Twilight",
//     author: "Stephanie Meyer"
//   }
// ];
//
// // GET requests
// app.get("/", (req, res) => {
//   res.send("Welcome to my book club!");
// });
//
// app.get("/documentation", (req, res) => {
//   res.sendFile("public/documentation.html", { root: __dirname });
// });
//
// app.get("/books", (req, res) => {
//   res.json(topBooks);
// });
//
// // listen for requests
// app.listen(8080, () => {
//   console.log("Your app is listening on port 8080.");
// });
// const express = require("express");
// const app = express();
// let myLogger = (req, res, next) => {
//   console.log(req.url);
//   next();
// };
//
// app.use(myLogger);
// app.get("/", (req, res) => {
//   res.send("welcome");
// });
// app.get("/secreturl", (req, res) => {
//   res.send("secreturl");
// });
// app.listen(8080, () => {
//   console.log("your app is running on 8080");
// });
const express = require("express");
const app = express();
let myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};
let requestTime = (req, res, next) => {
  req.requestTime = Date.now();
  next();
};
app.use(myLogger);
app.use(requestTime);
app.get("/", (req, res) => {
  let responseText = "welcome";
  responseText += "<small>Requested at:" + req.requestTime + "</small>";
  res.send(responseText);
});

app.get("/secreturl", (req, res) => {
  let responseText = "secreturl";
  responseText += "<small>Requestes time:" + req.requestTime + "</small>";
  res.send(responseText);
});
app.listen(8080, () => {
  console.log("port running on 8080");
});
