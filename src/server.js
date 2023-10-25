const http = require("http");
const url = require("url");
const PORT = 3000;

// Import Controller
const {
  getAllBooksCtrl,
  getBookCtrl,
  addBookCtrl,
  editBookCtrl,
  deleteBookCtrl,
} = require("./modules/books/books.controller");

// Create an HTTP server
const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const pathname = reqUrl.pathname;

  // Handle Request with Method GET
  if (req.method === "GET") {
    if (pathname === "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Hello world!",
        })
      );
      return;
    } else if (pathname === "/v1/books/get-list") {
      getAllBooksCtrl(req, res);
      return;
    } else if (pathname.includes("/v1/books/get-item/")) {
      const bookID = pathname.replace("/v1/books/get-item/", "");
      req.params = {
        bookID,
      };
      getBookCtrl(req, res);
      return;
    }
  }
  // Handle Request with Method POST
  else if (req.method === "POST") {
    if (pathname === "/v1/books/add") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });
      return req.on("end", () => {
        if (data) {
          // Convert JSON string to object
          try {
            req.body = JSON.parse(data);
          } catch (error) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                message: "Invalid Request Body!",
              })
            );
          }
        } else {
          req.body = {};
        }
        addBookCtrl(req, res);
      });
    }
  }
  // Handel Request with Method PUT
  else if (req.method === "PUT") {
    if (pathname === "/v1/books/edit") {
      let data = "";

      req.on("data", (chunk) => {
        data += chunk;
      });
      return req.on("end", () => {
        if (data) {
          // Convert JSON string to object
          req.body = JSON.parse(data);
        } else {
          req.body = {};
        }
        editBookCtrl(req, res);
      });
    }
  }
  // Handle Request with method DELETE
  else if (req.method === "DELETE") {
    if (pathname.includes("/v1/books/delete/")) {
      const bookID = pathname.replace("/v1/books/delete/", "");
      req.params = {
        bookID,
      };
      deleteBookCtrl(req, res);
      return;
    }
  }

  console.log("NOT FOUND");
  res.writeHead(404, { "Content-Type": "text/plain" });
  res.end("Not Found");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
