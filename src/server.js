const express = require("express");
const { config } = require("dotenv");
config();
const PORT = 3000;
require("./connections/mysql");
// Setup DB
require("./temp");
const app = express();

const booksRouter = require("./modules/books/books.route");
// Handle data JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});
app.use("/v1/books/", booksRouter);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = { app, server };
