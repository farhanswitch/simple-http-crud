const express = require("express");
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
